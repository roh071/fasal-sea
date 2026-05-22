import type { Metadata } from "next";
import { CopyButton } from "@/components/leads-tool/shared/CopyButton";

export const metadata: Metadata = {
  title: "Prompt Pack — Fasal SEA Lead Research",
  robots: { index: false, follow: false },
};

const PROMPTS = [
  {
    title: "1. Company Discovery",
    description: "Find 18–22 ICP-matched plantation companies in a target country and crop.",
    prompt: `You are a B2B lead researcher for Fasal, an Indian AgriTech company selling IoT crop-monitoring sensors (FasalOne) to large plantation companies in Malaysia and Philippines.

Fasal's ICP: owns its own farms (not pure traders/intermediaries), 1,000+ ha total planted area, 50+ employees, outdoor field crops.

Generate a researched list of 18–22 plantation companies in [COUNTRY] that grow [CROP] and match this ICP.

For each company output a JSON object with:
- name: company full name
- icpScore: "High" | "Medium" | "Low"
- icpReason: one concrete sentence referencing known facts
- crops: array of crops they grow
- estimatedScale: e.g. "~8,000 ha across Sabah and Sarawak, publicly listed"
- targetTitles: relevant decision-maker titles to search on LinkedIn
- fasalHook: one sentence on why FasalOne solves a specific challenge at this company

ICP scoring:
- High: owns 5,000+ ha, primary crop is [CROP], active in [COUNTRY], has ESG or precision ag commitments
- Medium: owns 1,000–5,000 ha, OR different primary crop with [CROP] operations, OR limited public info
- Low: mainly trader/processor/cooperative without own plantations, OR too small, OR different country

Output ONLY a raw JSON array. No explanation.`,
  },
  {
    title: "2. ICP Scoring",
    description: "Paste a company description and get a scored ICP assessment with reasoning.",
    prompt: `You are scoring a prospect company against Fasal's Ideal Customer Profile (ICP).

Fasal sells IoT crop-monitoring sensors (FasalOne) to large plantation companies in Malaysia and Philippines.

ICP criteria:
- Owns and operates its own farms (not a pure trader, processor, or cooperative)
- 1,000+ ha total planted area
- 50+ employees
- Outdoor field crops: palm oil, banana, sugarcane, durian, rubber, coconut, cacao, coffee/tea, pineapple
- Based in Malaysia or Philippines

Company description:
[PASTE COMPANY DESCRIPTION HERE]

Respond with:
1. ICP Score: High / Medium / Low
2. Reason: 2–3 sentences explaining the score with specific evidence from the description
3. Best angle: the single most compelling reason to reach out
4. Risk: the main reason this prospect might not convert`,
  },
  {
    title: "3. Decision-Maker Title Mapping",
    description: "Identify the economic buyer and champion titles for a plantation company type.",
    prompt: `I'm selling FasalOne (IoT crop-monitoring sensors) to plantation companies in Malaysia and Philippines.

Company type: [PASTE COMPANY TYPE — e.g. "publicly listed palm oil plantation group, 50,000+ ha, Malaysia, RSPO certified"]

Identify:
1. Economic buyer: the title that controls the capex/opex budget for farm technology (typically 1–2 titles)
2. Champion: the title that feels the day-to-day pain and would advocate internally (typically 1–2 titles)
3. Blocker: the title most likely to slow the deal down and why
4. LinkedIn search strings: exact search phrases to find these people on LinkedIn Sales Navigator (include company name placeholder "[COMPANY]")
5. Apollo.io filter: job title keywords to use in Apollo's title filter

Format as a structured list. Be specific — avoid generic titles like "Manager" without context.`,
  },
  {
    title: "4. Cold Email Sequence",
    description: "Generate a personalised 3-email sequence for a specific contact and pain point.",
    prompt: `Write a cold outreach email sequence from Rohan Kumar Sharma (International Business at Fasal, rohan.sharma@wolkus.com) to a plantation company contact.

Contact:
- Name: [FULL NAME]
- Title: [JOB TITLE]
- Company: [COMPANY NAME]
- Primary crop: [CROP]
- Core pain point: [water costs | disease risk | ESG reporting | yield improvement | manual scouting]

Fasal proof cases to draw from (use only what's relevant — never invent stats):
- IOI Group Malaysia — banana, 25% irrigation saved, 15% yield uplift, 12% higher bunch weight, 1,500 acres
- KVK Baramati India — sugarcane, 37% water saved, 17% yield up, 22% input cost down
- Navabharath India — oil palm, 65,000+ acres, 14 parameters monitored 24x7
- AVT McCormick India — chilli, 22% irrigation reduction, ~$316/ha saved

Writing rules:
- Initial email: 130–150 words max. One pain point. One proof case. One CTA.
- Tone: direct, professional, peer-to-peer. No buzzwords.
- Follow-up 1 (Day 3): 70–80 words, add one new angle or question
- Follow-up 2 (Day 7): 70–80 words, final touch, include [YOUR CALENDLY LINK] and two time slot placeholders
- All emails end with: Best,\\nRohan Kumar Sharma\\nInternational Business | Fasal\\nrohan.sharma@wolkus.com

Output the initial email, subject line variants (3), follow-up 1, and follow-up 2.`,
  },
  {
    title: "5. Follow-Up Sequence",
    description: "Paste an existing initial email and get Day 3 and Day 7 follow-ups.",
    prompt: `I sent the following cold email but haven't received a reply. Write two follow-up emails.

Original email:
---
[PASTE YOUR INITIAL EMAIL HERE]
---

Follow-up rules:
- Follow-up 1 (Day 3): 70–80 words. Reference the prior email. Add one new angle, data point, or question. Do not repeat the original pitch.
- Follow-up 2 (Day 7): 70–80 words. Final touch. Acknowledge it may not be the right time. Offer a short call with a Calendly link placeholder [YOUR CALENDLY LINK] and two available time slot placeholders [Day 1] and [Day 2].
- Tone: professional, low-pressure. Not desperate or pushy.
- Both end with: Best,\\nRohan Kumar Sharma\\nInternational Business | Fasal\\nrohan.sharma@wolkus.com

Output Follow-up 1 and Follow-up 2 separately.`,
  },
];

export default function PromptPackPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
            Internal Resource · Not Indexed
          </p>
          <h1 className="text-3xl font-bold text-[#1c1917] mb-3">Lead Research Prompt Pack</h1>
          <p className="text-[#78716c] text-base max-w-2xl">
            5 battle-tested prompts for ChatGPT or Claude. Fill in the bracketed placeholders
            and paste into any AI tool. All prompts are grounded in Fasal&apos;s real ICP, proof cases,
            and outreach context.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {PROMPTS.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-[#e7e5e4] p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-lg font-semibold text-[#1c1917]">{item.title}</h2>
                  <p className="text-sm text-[#78716c] mt-0.5">{item.description}</p>
                </div>
                <CopyButton text={item.prompt} label="Copy prompt" className="shrink-0 mt-0.5" />
              </div>
              <pre className="mt-4 whitespace-pre-wrap text-sm text-[#44403c] bg-[#fafaf9] border border-[#e7e5e4] rounded-lg p-4 font-sans leading-relaxed overflow-x-auto">
                {item.prompt}
              </pre>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-[#a8a29e] text-center">
          For Rohan&apos;s use only · Always verify AI output before outreach
        </p>
      </div>
    </main>
  );
}
