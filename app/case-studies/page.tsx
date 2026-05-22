import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Case Studies — Fasal Precision Agriculture Results | Fasal SEA",
  description:
    "Real outcomes from Fasal IoT deployments: IOI Group Malaysia (25% irrigation saved), Navabharath 65K acres, KVK Baramati sugarcane (37% water saved). Proof for SEA plantations.",
};

const caseStudies = [
  {
    id: "ioi-group",
    flag: "🇲🇾",
    country: "Malaysia",
    crop: "Banana",
    company: "IOI Group",
    tagline: "Malaysia's biggest banana deployment — and counting",
    stats: [
      { value: "25%", label: "Irrigation saved" },
      { value: "15%", label: "Yield uplift" },
      { value: "12%", label: "Higher bunch weight" },
      { value: "1,500", label: "Acres deployed" },
    ],
    summary:
      "IOI Group — one of Malaysia's largest diversified plantation conglomerates — deployed FasalOne across 1,500 acres of Cavendish banana. The estate's irrigation team shifted from calendar-based scheduling to soil-moisture-triggered irrigation, immediately cutting water use by 25%. Disease-risk early warning reduced late-stage interventions, and improved crop hydration produced measurably heavier bunches and higher overall yield.",
    segment: "Plantation estates — banana, palm oil",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    relevantFor: ["Banana estates", "Palm oil plantations", "Malaysia & Philippines enterprises"],
  },
  {
    id: "navabharath",
    flag: "🇮🇳",
    country: "India",
    crop: "Oil Palm",
    company: "Navabharath (NBL)",
    tagline: "Scale credibility — 65,000+ acres of oil palm monitoring",
    stats: [
      { value: "65K+", label: "Acres deployed" },
      { value: "14", label: "Parameters monitored" },
      { value: "24×7", label: "Micro-farm data" },
      { value: "100%", label: "Remote visibility" },
    ],
    summary:
      "Navabharath Plantations Limited operates one of India's largest oil palm estates. With FasalOne deployed across 65,000+ acres, their agronomy team has 24×7 visibility into 14 crop and micro-climate parameters across every block. The deployment demonstrates Fasal's proven capability at the scale of Southeast Asia's largest palm oil operators — including Sime Darby, FGV, and KLK equivalents.",
    segment: "Large-scale palm oil operators",
    color: "#15803d",
    bgColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    relevantFor: ["Palm oil estates", "Large plantation groups", "Multi-block deployments"],
  },
  {
    id: "kvk-baramati",
    flag: "🇮🇳",
    country: "India",
    crop: "Sugarcane",
    company: "KVK Baramati",
    tagline: "Sugarcane — the benchmark proof for Philippines sugar mills",
    stats: [
      { value: "37%", label: "Water saved" },
      { value: "17%", label: "Yield increase" },
      { value: "22%", label: "Input costs down" },
      { value: "Full season", label: "Verified results" },
    ],
    summary:
      "KVK Baramati — a Krishi Vigyan Kendra research station in Maharashtra — deployed FasalOne across sugarcane plots for one full growing season. Disease risk models reduced fungal intervention timing errors, precision irrigation cut water use by 37%, and optimised nutrient scheduling drove a 17% yield increase with 22% lower input costs. These numbers are directly applicable to sugarcane operations in the Philippines.",
    segment: "Sugarcane estates — Philippines sugar mills",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    relevantFor: ["Sugarcane estates", "Philippines sugar mills", "Contract farming"],
  },
  {
    id: "avt-mccormick",
    flag: "🇮🇳",
    country: "India",
    crop: "Chilli / Contract Farming",
    company: "AVT McCormick",
    tagline: "F&B contract farming — $316 saved per hectare",
    stats: [
      { value: "22%", label: "Irrigation reduction" },
      { value: "$316/ha", label: "Cost saved per ha" },
      { value: "120", label: "Acres monitored" },
      { value: "Full dashboard", label: "Enterprise view" },
    ],
    summary:
      "AVT McCormick — a joint venture between AVT Natural Products and McCormick & Company — deployed FasalOne on contract chilli farms. The enterprise dashboard gave the procurement team complete visibility into crop conditions across multiple farmer plots. Irrigation efficiency gains saved $316 per hectare in water and pump costs, directly improving the economics of the contract farming programme.",
    segment: "F&B companies with contract farming programmes",
    color: "#0d9488",
    bgColor: "#f0fdfa",
    borderColor: "#99f6e4",
    relevantFor: ["F&B companies", "Contract farming", "Multi-site monitoring"],
  },
  {
    id: "world-bank-atal-bhujal",
    flag: "🇮🇳",
    country: "India",
    crop: "Grapes / Pomegranate",
    company: "World Bank — Atal Bhujal Yojana",
    tagline: "Government programme — 83% smallholder adoption rate",
    stats: [
      { value: "50%", label: "Water reduction" },
      { value: "83%", label: "Farmer adoption rate" },
      { value: "20", label: "Gram Panchayats" },
      { value: "World Bank", label: "Funded programme" },
    ],
    summary:
      "Under India's World Bank-funded Atal Bhujal Yojana (groundwater management programme), FasalOne was deployed across 20 Gram Panchayats covering grape and pomegranate smallholders. The 50% water reduction and 83% voluntary farmer adoption rate demonstrate that Fasal works at scale across fragmented smallholder landscapes — directly relevant for government agricultural programmes, co-operatives, and distributors building farmer networks in Malaysia and the Philippines.",
    segment: "Government / cooperative / smallholder programmes",
    color: "#0d9488",
    bgColor: "#f0fdfa",
    borderColor: "#99f6e4",
    relevantFor: ["Government programmes", "Co-operatives", "Distributor farmer networks"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2417] to-[#1a3a23] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest">Proven Results</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            Real outcomes.<br />
            <span className="text-[#4ade80]">Real estates. Real numbers.</span>
          </h1>
          <p className="text-lg text-[#a8a29e] max-w-2xl leading-relaxed">
            Every Fasal case study is a verified, customer-authorised result. No lab conditions. No cherry-picked plots. These are full-season outcomes from commercial operations.
          </p>
        </div>
      </section>

      {/* Quick summary strip */}
      <div className="bg-white border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "65K+", label: "Largest single deployment (acres)" },
              { value: "50%", label: "Best water saving recorded" },
              { value: "22%", label: "Input cost reduction (sugarcane)" },
              { value: "83%", label: "Smallholder adoption rate" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-[#16a34a]">{s.value}</div>
                <div className="text-xs text-[#78716c] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case studies */}
      <SectionContainer>
        <div className="space-y-10">
          {caseStudies.map((cs, i) => (
            <div
              key={cs.id}
              className="rounded-2xl border p-7 sm:p-8"
              style={{ borderColor: cs.borderColor, backgroundColor: cs.bgColor }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{cs.flag}</span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#78716c]">
                      {cs.country} · {cs.crop}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1c1917]">{cs.company}</h2>
                  <p className="text-sm text-[#78716c] mt-0.5">{cs.tagline}</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: cs.color + "15", color: cs.color }}
                >
                  {cs.segment}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {cs.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white border border-[#e7e5e4] p-4 text-center">
                    <div className="text-xl font-bold" style={{ color: cs.color }}>{s.value}</div>
                    <div className="text-[10px] text-[#78716c] mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <p className="text-sm text-[#44403c] leading-relaxed mb-5">{cs.summary}</p>

              {/* Relevant for */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-[#78716c] font-medium">Most relevant for:</span>
                {cs.relevantFor.map((r) => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#e7e5e4] text-[#44403c]">
                    {r}
                  </span>
                ))}
              </div>

              {i === 0 && (
                <div className="mt-5 pt-5 border-t border-[#e7e5e4]">
                  <p className="text-xs text-[#78716c] italic">
                    IOI Group is Malaysia&apos;s first Fasal enterprise deployment and the primary proof case for Southeast Asian plantation audiences.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer variant="dark">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel variant="light" className="block text-center">Start Your Own Case Study</SectionLabel>
          <h2 className="text-3xl font-bold text-white mb-4">Your estate could be next.</h2>
          <p className="text-[#a8a29e] mb-8">
            Every case study above started as a small paid pilot — one block, 6–10 weeks, measurable results. The numbers then justified the full estate rollout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Request a Pilot <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              See the Products
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
