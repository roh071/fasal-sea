import { getAnthropicClient } from "@/lib/ai/client";
import { updateLead } from "@/lib/db/leads";

interface ScoreResult {
  icpScore: "High" | "Medium" | "Low";
  qualificationNote: string;
  nextAction: string;
}

const SCORING_PROMPT = `You are a B2B lead qualifier for Fasal, an AgriTech company selling IoT crop-monitoring sensors (FasalOne) to plantation companies in SE Asia.

ICP scoring rules:
- High: 1,000+ ha (land_area "1,000–4,999 ha", "5,000–49,999 ha", or "50,000+ ha"), primary SE Asia crops (palm oil/banana/rubber/sugarcane/durian/coconut/cacao), Malaysia/Philippines/Indonesia
- Medium: 500–999 ha OR secondary/other crops OR Vietnam/Other country
- Low: Under 500 ha ("50–499 ha") OR non-plantation business type OR unqualified country

Return ONLY valid JSON (no markdown, no code fences):
{
  "icpScore": "High" | "Medium" | "Low",
  "qualificationNote": "One sentence referencing specific data points from this lead (company, land area, crop, country)",
  "nextAction": "One sentence recommended next step for Rohan (e.g. send initial email, schedule call, low priority)"
}`;

export async function scoreLeadWithAI(
  type: "enterprise" | "distributor",
  id: string,
  data: Record<string, unknown>
): Promise<void> {
  try {
    const leadJson = JSON.stringify(data, null, 2);

    const message = await getAnthropicClient().messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `${SCORING_PROMPT}\n\nLead data:\n${leadJson}`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    const result: ScoreResult = JSON.parse(cleaned);

    await updateLead(type, id, {
      remark1: `[AI] ICP: ${result.icpScore} — ${result.qualificationNote}`,
      remark2: `[AI] Next action: ${result.nextAction}`,
    });
  } catch (err) {
    console.error(`scoreLeadWithAI failed for ${type}/${id}:`, err);
  }
}
