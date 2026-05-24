import { NextRequest, NextResponse } from "next/server";
import { distributorLeadSchema } from "@/lib/validations/distributor-lead.schema";
import { sendDistributorLeadEmail } from "@/lib/email/send-lead-email";
import { insertDistributorLead } from "@/lib/db/leads";
import { appendDistributorRow } from "@/lib/sheets/google-sheets";
import { scoreLeadWithAI } from "@/lib/ai/score-lead";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = distributorLeadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const d = result.data;

  try {
    await sendDistributorLeadEmail(d as unknown as Record<string, unknown>);
  } catch (err) {
    console.error("Email send failed:", err);
  }

  try {
    const id = await insertDistributorLead({
      source: "website",
      full_name: d.fullName,
      phone: d.phone,
      email: d.email,
      company: d.company ?? null,
      country: d.country,
      business_type: d.businessType,
      farmer_network: d.farmerNetwork,
      budget: d.budget,
      existing_business: d.existingBusiness,
      message: d.message ?? null,
      city: null,
      district: null,
      province: null,
      primary_region: null,
      ad_name: null,
      campaign_name: null,
      investment_range: null,
      what_looking_for: null,
      agribusiness_type: null,
    });
    scoreLeadWithAI("distributor", id, {
      full_name: d.fullName,
      company: d.company,
      country: d.country,
      business_type: d.businessType,
      farmer_network: d.farmerNetwork,
      budget: d.budget,
    }).catch(() => {});
  } catch (err) {
    console.error("DB insert failed:", err);
  }

  appendDistributorRow({
    fullName: d.fullName,
    email: d.email,
    phone: d.phone,
    company: d.company,
    country: d.country,
    businessType: d.businessType,
    farmerNetwork: d.farmerNetwork,
    budget: d.budget,
    existingBusiness: d.existingBusiness,
  }).catch((err) => console.error("Sheets append failed:", err));

  return NextResponse.json({ success: true });
}
