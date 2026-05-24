import type { DiscoveryInput, EmailGenInput, DeepResearchInput } from "@/lib/validations/leads-tool.schema";

export const SYSTEM_PROMPT = `You are Rohan's B2B lead intelligence assistant for Fasal, an Indian AgriTech company selling IoT crop-monitoring sensors (FasalOne) to large plantation companies in Malaysia and Philippines.

Fasal's ideal customer profile (ICP):
- Company type: plantation company that OWNS its own farms (not contract-only intermediaries or pure traders)
- Geography: Malaysia (Sabah, Sarawak, Peninsular) or Philippines (Mindanao, Visayas, Luzon)
- Scale: 1,000+ ha total planted area, 50–200+ employees
- Crops: palm oil, banana (Cavendish / Lakatan), sugarcane, durian, rubber, coconut, cacao, coffee/tea, pineapple
- Pain points: over-irrigation costs, disease/pest early warning, ESG/RSPO reporting, yield improvement, manual scouting at scale

Fasal's proven reference cases (use only these — never invent statistics):
- IOI Group (Malaysia) — banana, 1,500 acres, 25% irrigation saved, 15% yield uplift, 12% higher bunch weight
- Navabharath NBL (India) — oil palm, 65,000+ acres deployed, 14 parameters monitored 24x7
- KVK Baramati (India) — sugarcane, 17% yield increase, 22% input cost reduction, 37% water saved
- AVT McCormick (India) — chilli/contract farming, 22% irrigation reduction, ~$316/ha cost saved

Do not invent false statistics about companies you mention. If you know a company is real but don't have specific numbers, use qualifiers like "reportedly", "estimated", or "publicly listed — scale unconfirmed".`;

const PAIN_POINT_CONTEXT: Record<string, { problem: string; fasalFix: string; proof: string }> = {
  "water costs": {
    problem: "irrigation scheduling is done manually or by calendar — leading to 30–40% over-irrigation and wasted pump energy",
    fasalFix: "FasalOne's soil-moisture sensors trigger irrigation only when crops actually need water, cutting consumption 25–37%",
    proof: "At KVK Baramati's sugarcane operations in India, Fasal delivered 37% water savings in the first season. At IOI Group Malaysia, banana irrigation dropped 25%.",
  },
  "disease risk": {
    problem: "disease outbreaks (ganoderma, fusarium, leaf spot, black sigatoka) are caught visually — by which time the outbreak has already spread to adjacent blocks",
    fasalFix: "FasalOne's microclimate sensors feed AI models that flag disease-conducive conditions 5–7 days before visible symptoms appear, so sprays hit at exactly the right moment",
    proof: "Early warning has allowed Fasal estates to cut fungicide applications to the right place at the right time, replacing blanket calendar sprays.",
  },
  "ESG reporting": {
    problem: "water-use and input-cost data for RSPO, MSPO, or investor ESG reports is assembled manually from log books — time-consuming and frequently challenged by auditors",
    fasalFix: "FasalOne logs all sensor readings automatically with an export-ready dashboard for water-use, input cost, and yield data — RSPO and ESG-ready",
    proof: "Fasal's enterprise customers use the platform directly for sustainability certification reporting without additional data collection effort.",
  },
  "yield improvement": {
    problem: "agronomists make variety and fertiliser decisions based on regional averages, not block-level microclimate and soil data — leading to sub-optimal timing and under/over-application",
    fasalFix: "Block-level VPD, soil moisture, and GDD data lets your agronomy team fine-tune irrigation and nutrition timing per zone, per crop stage",
    proof: "IOI Group's banana operations in Malaysia saw a 15% yield uplift and 12% higher bunch weight after deploying FasalOne.",
  },
  "manual scouting": {
    problem: "at 1,000+ ha, agronomists physically cannot walk every block daily — critical stress signals and disease hotspots get missed until they become expensive problems",
    fasalFix: "FasalOne puts 12 sensor parameters per zone onto one dashboard, so your team monitors hundreds of blocks from one screen without increasing field staff",
    proof: "Navabharath deployed Fasal across 65,000+ acres in India, monitoring 14 parameters per zone 24x7 without increasing agronomist headcount.",
  },
};

export function buildDiscoveryPrompt(input: DiscoveryInput): string {
  const sizeClause =
    input.sizeFilter && input.sizeFilter !== "Any size"
      ? ` Prioritise companies with planted area in the ${input.sizeFilter} range, but include a few outside this range if they are otherwise high-ICP matches.`
      : " Include a range of sizes — some at 1,000–5,000 ha and some at 5,000+ ha.";

  return `Generate a researched list of 18–22 plantation companies in ${input.country} that grow ${input.crop} and match Fasal's ICP (own their farms, 1,000+ ha, 50+ employees).${sizeClause}

Output ONLY a JSON array. Each element must exactly match this structure:
{
  "name": "Company full legal or trading name",
  "icpScore": "High" | "Medium" | "Low",
  "icpReason": "One concrete sentence — reference specific known facts about this company",
  "crops": ["Primary crop", "Secondary crop if known"],
  "estimatedScale": "e.g. ~8,000 ha across Sabah and Sarawak, publicly listed",
  "linkedinHint": "Exact search string for LinkedIn company search, e.g. 'Sime Darby Plantation Malaysia'",
  "targetTitles": ["Head of Plantations", "VP Estates", "Head of Agronomy", "Estate Manager"],
  "fasalHook": "One sentence — why FasalOne solves a specific, known challenge at THIS company"
}

ICP scoring rules:
- High: owns 5,000+ ha, primary crop is ${input.crop}, active in ${input.country}, has known ESG/sustainability commitments OR known to invest in precision agriculture technology
- Medium: owns 1,000–5,000 ha, OR primarily a different crop with ${input.crop} operations, OR limited public information available but company type fits
- Low: mainly a trader, processor, or cooperative without own plantations — OR too small — OR operates primarily in a different country

Return ONLY the raw JSON array. No markdown, no code fences, no explanation. Start with [ and end with ].`;
}

export function buildEmailPrompt(input: EmailGenInput): string {
  const ctx = PAIN_POINT_CONTEXT[input.painPoint];
  const firstName = input.contactName.split(" ")[0];

  return `Write a cold outreach email sequence from Rohan Kumar Sharma (International Business at Fasal, rohan.sharma@wolkus.com) to a plantation company contact.

Contact:
- Name: ${input.contactName} (use first name "${firstName}" in greeting)
- Title: ${input.contactTitle}
- Company: ${input.companyName}
- Primary crop: ${input.crop}
- Core pain point: ${input.painPoint}

Pain point context:
- The problem: ${ctx.problem}
- How Fasal solves it: ${ctx.fasalFix}
- Proof point to use: ${ctx.proof}

Writing rules:
- Initial email: 130–150 words maximum. One pain point. One proof case. One clear CTA.
- Tone: direct, professional, peer-to-peer. No buzzwords (no "synergy", "leverage", "game-changing", "cutting-edge").
- No excessive enthusiasm. Write like a senior BD professional who knows the crop sector.
- Short paragraphs — 2–3 sentences max per paragraph.
- Follow-up 1: 70–80 words, Day 3. Reference prior email. Add one new angle or question.
- Follow-up 2: 70–80 words, Day 7. This is the final touch. Mention a quick call. Include placeholder [YOUR CALENDLY LINK]. Offer two time slots as placeholders [Day 1] and [Day 2].
- All emails end with this signature block exactly: \\n\\nBest,\\nRohan Kumar Sharma\\nInternational Business | Fasal\\nrohan.sharma@wolkus.com

Output ONLY a JSON object with this exact structure:
{
  "subjects": [
    "Subject variant 1 — curiosity or insight angle",
    "Subject variant 2 — specific ROI stat or result",
    "Subject variant 3 — question format"
  ],
  "initialEmail": "Full email body starting with Hi ${firstName}, — do NOT include Subject: line",
  "followUp1": "Follow-up email body for Day 3",
  "followUp2": "Follow-up email body for Day 7 with call CTA"
}

Return ONLY the raw JSON object. No markdown, no code fences. Start with { and end with }.`;
}

export function buildDeepResearchPrompt(input: DeepResearchInput): string {
  const regionClause = input.region ? ` in the ${input.region} region` : "";
  const cropClause = input.crop ? ` that grow ${input.crop}` : " across all plantation crops";
  const cropLabel = input.crop ?? "plantation crops";

  return `You are a B2B market intelligence analyst. Research 8–10 real plantation companies in ${input.country}${regionClause}${cropClause} with a minimum of 1,000 ha under management.

For each company, produce a deep research profile using all publicly available information: annual reports, sustainability reports, news articles, LinkedIn, industry databases, and plantation industry publications.

Output ONLY a JSON array. Each element must exactly match this structure:
{
  "name": "Company full legal or trading name",
  "country": "${input.country}",
  "region": "Specific state/province/region if known, else 'Various' or '${input.country}'",
  "icpScore": "High" | "Medium" | "Low",
  "crops": ["Primary crop", "Other crops if known"],
  "estimatedScale": "Total planted area estimate with source qualifier if uncertain",
  "teamStructure": "Estimated field staff, management layers, agronomy team if known",
  "productionCapacity": "Annual output estimate (MT/year or bunches/year) with qualifier",
  "last5YearProduction": "Known production trend 2019–2024 or estimate with qualifier",
  "next5YearPlan": "Known expansion plans, ESG targets, or strategic direction if publicly disclosed",
  "budget": "Estimated annual agri-input or operational spend, or investment range if disclosed",
  "investmentPlan": "Known precision ag, smart farming, or technology investment signals from public sources",
  "currentChallenges": ["Challenge 1", "Challenge 2"],
  "smartFarmingTech": "Known tech in use (e.g. Trimble GPS, variable rate irrigation, remote sensing) or 'None publicly known'",
  "dripIrrigation": "Drip / flood / sprinkler / mixed / unknown — specify if known",
  "farmStructure": "Single contiguous estate OR multiple scattered estates — number of locations if known",
  "terrainSlope": "Flat coastal / Undulating / Hilly highland / Mixed — specify if known",
  "farmerCount": "Estimated permanent + seasonal worker count if publicly available",
  "keyContact": {
    "name": "Full name of the most relevant agri/plantation decision-maker at this company — Head of Plantations, VP Estates, Head of Agronomy, Estate Manager, Director of Agriculture, Agronomy Manager, or Head of Operations. Do NOT use CEO, President, COO, or CFO unless no agri-specific role is publicly known. These are large plantation companies — an agronomy or estates lead almost always appears in annual reports, press releases, LinkedIn, or trade publications. Search hard before writing 'Not publicly available'.",
    "designation": "Their exact job title",
    "email": "Their professional email only if found in a public source (LinkedIn, website, press release) — else ''",
    "phone": "Their direct or company phone number only if found in a public source — else ''"
  },
  "linkedinHint": "Exact search string for LinkedIn company search",
  "fasalHook": "One specific sentence — why FasalOne solves a known challenge at THIS company, referencing their actual data"
}

ICP scoring rules:
- High: 5,000+ ha, ${cropLabel} as primary crop, active ESG/sustainability programme, or known precision ag investments
- Medium: 1,000–5,000 ha OR ${cropLabel} as secondary crop OR limited public information
- Low: Mainly trader/processor, under 1,000 ha, or does not own its own plantations

Use qualifiers ("reportedly", "estimated", "publicly listed — unconfirmed") when data is uncertain. Never invent statistics. For keyContact: the name and designation are almost always findable for companies of this size — check annual reports, company websites, LinkedIn, and news articles. Only leave name as 'Not publicly available' if you genuinely cannot find any named executive after a thorough search. Never fabricate emails or phone numbers.

Return ONLY the raw JSON array. No markdown, no code fences. Start with [ and end with ].`;
}
