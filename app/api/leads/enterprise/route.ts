import { NextRequest, NextResponse } from "next/server";
import { enterpriseLeadSchema } from "@/lib/validations/enterprise-lead.schema";
import { sendEnterpriseLeadEmail } from "@/lib/email/send-lead-email";
import { insertEnterpriseLead } from "@/lib/db/leads";
import { appendEnterpriseRow } from "@/lib/sheets/google-sheets";
import { scoreLeadWithAI } from "@/lib/ai/score-lead";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = enterpriseLeadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const d = result.data;

  try {
    await sendEnterpriseLeadEmail(d as unknown as Record<string, unknown>);
  } catch (err) {
    console.error("Email send failed:", err);
    // Non-fatal — continue to persist the lead
  }

  try {
    const id = await insertEnterpriseLead({
      source: "website",
      first_name: d.firstName,
      last_name: d.lastName,
      email: d.email,
      phone: null,
      job_title: d.jobTitle,
      company: d.company,
      country: d.country,
      land_area: d.landArea,
      crops: d.crops,
      challenge: d.challenge ?? null,
      lead_source: d.source ?? null,
      city: d.region ?? null,
      ad_name: d.investmentRange ?? null,
      campaign_name: null,
    });
    scoreLeadWithAI("enterprise", id, {
      company: d.company,
      country: d.country,
      land_area: d.landArea,
      crops: d.crops,
      challenge: d.challenge,
      job_title: d.jobTitle,
    }).catch(() => {});
  } catch (err) {
    console.error("DB insert failed:", err);
  }

  // Non-blocking Sheets push
  appendEnterpriseRow({
    firstName: d.firstName,
    lastName: d.lastName,
    email: d.email,
    company: d.company,
    jobTitle: d.jobTitle,
    country: d.country,
    landArea: d.landArea,
    crops: d.crops,
    challenge: d.challenge,
    source: d.source,
  }).catch((err) => console.error("Sheets append failed:", err));

  return NextResponse.json({ success: true });
}
