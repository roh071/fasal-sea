import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/supabase";
import { SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { getAnthropicClient } from "@/lib/ai/client";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!token || !adminPassword) return false;
  return token === Buffer.from(adminPassword).toString("base64");
}

function buildDraftEmailPrompt(lead: Record<string, unknown>): string {
  const company = String(lead.company ?? "");
  const country = String(lead.country ?? "");
  const crops = Array.isArray(lead.crops) ? (lead.crops as string[]).join(", ") : String(lead.crops ?? "");
  const landArea = String(lead.land_area ?? "");
  const challenge = lead.challenge ? String(lead.challenge) : null;
  const firstName = String(lead.first_name ?? lead.full_name ?? "");

  // Match crops to available case studies
  const cropList = Array.isArray(lead.crops) ? (lead.crops as string[]) : [];
  const caseStudies: string[] = [];
  if (cropList.some(c => c.toLowerCase().includes("palm oil") || c.toLowerCase().includes("oil palm"))) {
    caseStudies.push("Navabharath NBL (India) — oil palm, 65,000+ acres, 14 sensor parameters monitored 24x7, significant water and input cost savings");
  }
  if (cropList.some(c => c.toLowerCase().includes("banana"))) {
    caseStudies.push("IOI Corporation (Malaysia) — banana, 1,500 acres, 25% irrigation saved, 15% yield uplift, 12% higher bunch weight");
  }
  if (cropList.some(c => c.toLowerCase().includes("sugarcane"))) {
    caseStudies.push("KVK Baramati (India) — sugarcane, 17% yield increase, 22% input cost reduction, 37% water saved");
  }

  const caseStudyBlock = caseStudies.length > 0
    ? `Relevant case study to include: ${caseStudies.join("; ")}`
    : "No exact crop match — skip the case study paragraph.";

  const challengeLine = challenge ? `Their stated challenge: ${challenge}.` : "";

  return `Write a warm inbound-response email from Rohan Kumar Sharma at Fasal to a lead who just submitted an enquiry form on the website.

Lead details:
- Name: ${firstName}
- Company: ${company}
- Country: ${country}
- Crops: ${crops}
- Farm area: ${landArea}
- ${challengeLine}
- ${caseStudyBlock}

Use EXACTLY this email structure and tone (do not shorten or compress):

1. Greeting: "Hi [first name],"

2. Opening line: "Hope you are doing well."

3. Introduction paragraph: "I am Rohan from Fasal. Thank you for posting an inquiry. We have received your details and wanted to schedule a meeting with you for further discussion, to understand your requirements in more detail, and to present how Fasal will be of best benefit to you. Please feel free to reply to this email with your response."

4. About Fasal paragraph (use exactly this, do not shorten): "About Fasal: We are pioneers and the market leader for precision agriculture technologies in India. Established in 2018 and headquartered in Bangalore, India, we currently work with 100+ enterprises and 200,000+ acres of farmland across India and Southeast Asia. We have so far deployed 13,000+ IoT devices across 40+ crops in 6 countries."

5. Case study paragraph (only if a matching crop case study exists): One or two sentences referencing the specific case study results and company name provided above, framed as "For [crop] operations like yours, [case study result]."

6. Impact paragraph (use exactly this): "Our technology has enabled 82 billion litres of water saved, 210,000 kgs of pesticides avoided, and 56,000 metric tonnes of GHG emissions avoided. Our growers see a 15–30% increase in yield, up to 15% reduction in cost of cultivation, and full visibility and traceability across their production. We have the privilege of working with enterprises like Bayer, Syngenta, Corteva, IOI Corporation, PepsiCo, Olam, and ITC, and 12,400+ growers across India and Southeast Asia."

7. Closing: "Looking forward to hearing from you."

8. Signature (exactly): "Best regards,\\nRohan Kumar Sharma\\nInternational Business | Fasal\\nrohan.sharma@wolkus.com"

Output ONLY a JSON object (no markdown, no code fences):
{
  "subject": "Re: Your enquiry — Fasal precision agriculture for [company or crop]",
  "body": "Full email body following the structure above"
}`;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let type: string;
  try {
    const body = await req.json();
    type = body.type;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (type !== "enterprise" && type !== "distributor") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const table = type === "enterprise" ? "enterprise_leads" : "distributor_leads";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: lead, error } = await (getSupabase().from(table) as any)
    .select("*")
    .eq("id", id)
    .single();

  if (error || !lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  try {
    const message = await getAnthropicClient().messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildDraftEmailPrompt(lead) }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Draft email generation failed:", err);
    return NextResponse.json({ error: "Failed to generate email" }, { status: 500 });
  }
}
