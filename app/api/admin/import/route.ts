import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/supabase";
import { scoreLeadWithAI } from "@/lib/ai/score-lead";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!token || !adminPassword) return false;
  return token === Buffer.from(adminPassword).toString("base64");
}

interface EnterpriseRow {
  company: string;
  crops: string[];
  challenge: string | null;
  remark3: string | null;
  remark4: string | null;
  remark5: string | null;
  remark6: string | null;
}

interface DistributorRow {
  full_name: string;
  phone: string;
  email: string;
  country: string;
  company: string | null;
  ad_name: string | null;
  campaign_name: string | null;
  primary_region: string | null;
  what_looking_for: string | null;
  existing_business: string;
  investment_range: string | null;
  budget: string;
  farmer_network: string;
  agribusiness_type: string | null;
  business_type: string;
  city: string | null;
  district: string | null;
  province: string | null;
  remark4: string | null;
  remark5: string | null;
  remark6: string | null;
  source: string;
}

const BATCH = 50;

async function insertBatch(table: string, rows: Record<string, unknown>[]): Promise<string[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (getSupabase().from(table) as any)
    .insert(rows)
    .select("id");
  if (error) throw new Error(error.message);
  return (data as { id: string }[]).map((r) => r.id);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { type: "enterprise" | "distributor"; rows: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, rows } = body;
  if (type !== "enterprise" && type !== "distributor") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  if (!Array.isArray(rows)) {
    return NextResponse.json({ error: "rows must be an array" }, { status: 400 });
  }

  let imported = 0;
  let skipped = 0;

  if (type === "enterprise") {
    // Fetch all existing company names in one query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (getSupabase().from("enterprise_leads") as any)
      .select("company");
    const existingCompanies = new Set<string>(
      (existing ?? []).map((r: { company: string }) => r.company?.toLowerCase().trim())
    );

    const toInsert: Record<string, unknown>[] = [];
    for (const raw of rows) {
      const row = raw as EnterpriseRow;
      const company = row.company?.trim();
      if (!company) { skipped++; continue; }
      if (existingCompanies.has(company.toLowerCase())) { skipped++; continue; }
      existingCompanies.add(company.toLowerCase()); // prevent intra-batch dupes
      toInsert.push({
        source: "excel_import",
        first_name: company,
        last_name: "",
        email: "",
        phone: null,
        job_title: "",
        company,
        country: "",
        land_area: "",
        crops: row.crops ?? [],
        challenge: row.challenge ?? null,
        lead_source: null,
        city: null,
        ad_name: null,
        campaign_name: null,
        status: "new",
        remark3: row.remark3 ?? null,
        remark4: row.remark4 ?? null,
        remark5: row.remark5 ?? null,
        remark6: row.remark6 ?? null,
      });
    }

    for (let i = 0; i < toInsert.length; i += BATCH) {
      const chunk = toInsert.slice(i, i + BATCH);
      try {
        const ids = await insertBatch("enterprise_leads", chunk);
        imported += ids.length;
        // fire-and-forget AI scoring for each new lead
        ids.forEach((id, j) => {
          const row = chunk[j];
          scoreLeadWithAI("enterprise", id, {
            company: row.company,
            crops: row.crops,
            challenge: row.challenge,
          }).catch(() => {});
        });
      } catch {
        skipped += chunk.length;
      }
    }

  } else {
    // Fetch all existing emails and phones in one query each
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingEmails } = await (getSupabase().from("distributor_leads") as any)
      .select("email, phone");
    const emailSet = new Set<string>(
      (existingEmails ?? [])
        .map((r: { email: string }) => r.email?.toLowerCase().trim())
        .filter(Boolean)
    );
    const phoneSet = new Set<string>(
      (existingEmails ?? [])
        .map((r: { phone: string }) => r.phone?.trim())
        .filter(Boolean)
    );

    const toInsert: Record<string, unknown>[] = [];
    for (const raw of rows) {
      const row = raw as DistributorRow;
      if (!row.full_name?.trim()) { skipped++; continue; }

      const email = row.email?.toLowerCase().trim() ?? "";
      const phone = row.phone?.trim() ?? "";

      if ((email && emailSet.has(email)) || (phone && phoneSet.has(phone))) {
        skipped++;
        continue;
      }
      // prevent intra-batch dupes
      if (email) emailSet.add(email);
      if (phone) phoneSet.add(phone);

      toInsert.push({
        source: row.source || "Facebook Ads",
        full_name: row.full_name.trim(),
        phone: row.phone || "",
        email: row.email || "",
        company: row.company ?? null,
        country: row.country || "",
        business_type: row.business_type || "distributor",
        farmer_network: row.farmer_network || "",
        budget: row.budget || "",
        existing_business: row.existing_business || "",
        message: null,
        city: row.city ?? null,
        district: row.district ?? null,
        province: row.province ?? null,
        primary_region: row.primary_region ?? null,
        ad_name: row.ad_name ?? null,
        campaign_name: row.campaign_name ?? null,
        investment_range: row.investment_range ?? null,
        what_looking_for: row.what_looking_for ?? null,
        agribusiness_type: row.agribusiness_type ?? null,
        status: "new",
        remark4: row.remark4 ?? null,
        remark5: row.remark5 ?? null,
        remark6: row.remark6 ?? null,
      });
    }

    for (let i = 0; i < toInsert.length; i += BATCH) {
      const chunk = toInsert.slice(i, i + BATCH);
      try {
        const ids = await insertBatch("distributor_leads", chunk);
        imported += ids.length;
        ids.forEach((id, j) => {
          const row = chunk[j];
          scoreLeadWithAI("distributor", id, {
            full_name: row.full_name,
            country: row.country,
            business_type: row.business_type,
            farmer_network: row.farmer_network,
            budget: row.budget,
          }).catch(() => {});
        });
      } catch {
        skipped += chunk.length;
      }
    }
  }

  return NextResponse.json({ imported, skipped });
}
