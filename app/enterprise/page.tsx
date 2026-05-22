import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Droplets, ShieldAlert, ScanLine, BarChart3 } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EnterpriseLeadForm } from "@/components/forms/EnterpriseLeadForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Precision Agriculture for Large Plantations | Fasal SEA",
  description:
    "FasalOne helps palm oil, banana, rubber and sugarcane estates in Malaysia and the Philippines cut water use 30–40% and improve yields. Request a pilot today.",
};

const caseStudies = [
  {
    label: "Malaysia · Banana",
    company: "IOI Group",
    stats: [
      { v: "25%", l: "Irrigation saved" },
      { v: "15%", l: "Yield uplift" },
      { v: "12%", l: "Higher bunch weight" },
    ],
    area: "1,500 acres",
    color: "#16a34a",
  },
  {
    label: "India · Oil Palm",
    company: "Navabharath (NBL)",
    stats: [
      { v: "65K+", l: "Acres deployed" },
      { v: "14", l: "Parameters monitored" },
      { v: "24×7", l: "Micro-farm data" },
    ],
    area: "Scale credibility",
    color: "#15803d",
  },
  {
    label: "India · Sugarcane",
    company: "KVK Baramati",
    stats: [
      { v: "17%", l: "Yield increase" },
      { v: "22%", l: "Input cost down" },
      { v: "37%", l: "Water saved" },
    ],
    area: "Philippine sugar mills",
    color: "#16a34a",
  },
];

const faqs = [
  {
    q: "Does Fasal work for outdoor field agriculture only?",
    a: "Yes — FasalOne is designed exclusively for outdoor, field-based farming: plantations, estates, open-field contract farms, and export farms. It is not suitable for indoor/vertical/CEA farming, hydroponics, or aquaculture.",
  },
  {
    q: "What is the minimum farm size?",
    a: "There is no hard minimum, but Fasal delivers the strongest ROI on operations of 50 ha and above. Enterprise pilots typically start with one block of 50–500 ha and expand across the estate once results are proven.",
  },
  {
    q: "What does the installation process look like?",
    a: "Fasal's trained engineers handle installation. A pilot block can typically be instrumented in 1–2 days. Hardware ships with 1 year of free subscription, warranty, and a dedicated service helpline.",
  },
  {
    q: "Who owns the farm data?",
    a: "You do. Fasal collects sensor readings to power advisory models and improve them over time, but the farm data belongs to the estate. You can export all historical data at any time.",
  },
  {
    q: "Is Fasal already operating in Malaysia and Philippines?",
    a: "Yes — Fasal has an active deployment at IOI Group in Malaysia (1,500 acres, banana) and is expanding across Southeast Asia. Philippines is an open priority market with no existing deployment — first movers gain a competitive advantage.",
  },
  {
    q: "What happens after I submit this form?",
    a: "Rohan from Fasal's International Business team will reach out within 2 business days to understand your estate, discuss a pilot scope, and share a tailored proposal.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2417] to-[#1a3a23] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="h-5 w-5 text-[#4ade80]" />
            <span className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest">For Enterprise Estates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Built for Southeast Asia&apos;s Plantations.
            <br />
            <span className="text-[#4ade80]">Deployed in Malaysia.</span>
            <br />
            Now in the Philippines.
          </h1>
          <p className="text-lg text-[#a8a29e] max-w-2xl mb-8 leading-relaxed">
            FasalOne gives palm oil, banana, rubber, sugarcane, and durian estates complete visibility into crop health, water use, and yield — so your agronomy and operations team make better decisions, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Request a Pilot <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              See Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <SectionContainer>
        <div className="text-center mb-12">
          <SectionLabel variant="green">The Problems You Know</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">Every plantation manager faces these</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Droplets, title: "Over-irrigation draining your budget", desc: "Estates waste 30–40% of irrigation water on average. Every litre you over-apply is pump energy and water cost wasted." },
            { icon: ShieldAlert, title: "Disease outbreaks caught too late", desc: "Ganoderma, fusarium, and leaf spot can wipe out a season's revenue. By the time it's visible, it's already spreading." },
            { icon: ScanLine, title: "Manual scouting doesn't scale", desc: "Your agronomists can't walk every block every day. At 500+ ha, critical signals get missed before they become costly." },
            { icon: BarChart3, title: "ESG and RSPO reporting demands rising", desc: "Investors, buyers, and certification bodies want water-use and input-cost data. Manual records don't cut it anymore." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-[#1c1917] mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-[#78716c] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Solution fit */}
      <SectionContainer variant="earth">
        <div className="text-center mb-12">
          <SectionLabel variant="green">How Fasal Solves It</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">Complete crop intelligence for large estates</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "12-sensor micro-climate intelligence", desc: "FasalOne 5.0 monitors soil moisture, temperature, air conditions, leaf wetness, rainfall, wind, VPD, and evapotranspiration — hyper-local data, not just weather station averages." },
            { title: "Precision soil-moisture irrigation", desc: "FasalOne 6.0 satellite units extend soil-moisture coverage across every block. Irrigate at exactly the right time and quantity — up to 50% water savings in optimal deployments." },
            { title: "Disease & pest early warning", desc: "AI agronomy models flag disease risk 5–7 days before visible symptoms. You spray at the optimal time, for maximum efficacy and minimum chemical use." },
            { title: "Multi-block dashboard + ESG export", desc: "Manage hundreds of sensor zones from one screen. Export water-use, input-cost, and yield data directly for RSPO compliance and ESG reporting." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white border border-[#e7e5e4] p-6 flex gap-4">
              <CheckCircle2 className="h-5 w-5 text-[#16a34a] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1c1917] mb-1.5">{item.title}</h3>
                <p className="text-sm text-[#78716c] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Crops */}
      <SectionContainer>
        <div className="text-center mb-10">
          <SectionLabel variant="green">Supported Crops</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">Built for Malaysia & Philippines crops</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {["🌴 Palm Oil", "🍌 Banana (Cavendish / Lakatan)", "🎋 Sugarcane", "🥭 Durian", "🌿 Rubber", "🥥 Coconut", "🍫 Cacao", "☕ Coffee / Tea", "🍍 Pineapple", "🌶️ Chilli", "🍅 Tomato", "40+ more"].map((crop) => (
            <span key={crop} className="px-4 py-2 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-sm text-[#15803d] font-medium">
              {crop}
            </span>
          ))}
        </div>
      </SectionContainer>

      {/* ROI table */}
      <SectionContainer variant="earth">
        <div className="text-center mb-10">
          <SectionLabel variant="green">Return on Investment</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">What does 25% water saving mean for your estate?</h2>
          <p className="text-sm text-[#78716c] mt-2">Illustrative estimates — actual results depend on crop, baseline, and irrigation method.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead>
              <tr className="bg-[#16a34a] text-white">
                <th className="text-left px-4 py-3 rounded-tl-xl font-semibold">Estate Size</th>
                <th className="text-left px-4 py-3 font-semibold">Water Cost Saved / Year</th>
                <th className="text-left px-4 py-3 font-semibold">Yield Uplift Value</th>
                <th className="text-left px-4 py-3 rounded-tr-xl font-semibold">Typical Payback</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["500 ha", "~$45,000", "~$60,000", "12–18 months"],
                ["1,000 ha", "~$90,000", "~$120,000", "10–15 months"],
                ["5,000+ ha", "~$450,000+", "~$600,000+", "8–12 months"],
              ].map(([size, water, yield_, payback], i) => (
                <tr key={size} className={i % 2 === 0 ? "bg-white" : "bg-[#fafaf9]"}>
                  <td className="px-4 py-3 font-semibold text-[#1c1917] border-b border-[#e7e5e4]">{size}</td>
                  <td className="px-4 py-3 text-[#16a34a] font-medium border-b border-[#e7e5e4]">{water}</td>
                  <td className="px-4 py-3 text-[#16a34a] font-medium border-b border-[#e7e5e4]">{yield_}</td>
                  <td className="px-4 py-3 text-[#44403c] border-b border-[#e7e5e4]">{payback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>

      {/* Case studies */}
      <SectionContainer>
        <div className="text-center mb-12">
          <SectionLabel variant="green">Proven Results</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">Real outcomes on real estates</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {caseStudies.map((cs) => (
            <div key={cs.company} className="rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">{cs.label}</p>
              <h3 className="font-bold text-[#1c1917] text-lg mb-4">{cs.company}</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {cs.stats.map((s) => (
                  <div key={s.l} className="text-center rounded-xl bg-white border border-[#e7e5e4] py-3">
                    <div className="text-lg font-bold" style={{ color: cs.color }}>{s.v}</div>
                    <div className="text-[10px] text-[#78716c] mt-0.5 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#78716c]">{cs.area}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[#16a34a] font-semibold text-sm hover:gap-3 transition-all">
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionContainer>

      {/* Decision maker fit */}
      <SectionContainer variant="earth">
        <div className="text-center mb-10">
          <SectionLabel variant="green">Who Should Reach Out</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">We work best with these roles</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Head of Plantations / VP Estates",
            "Chief Agronomy & Sustainability Officer",
            "Head of Innovation / Digital Transformation",
            "Head of Sustainability",
            "Estate Manager (single-estate operations)",
            "Head of Agronomy / SVP Agronomy",
          ].map((role) => (
            <div key={role} className="rounded-xl bg-white border border-[#e7e5e4] px-5 py-4 flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0" />
              <span className="text-sm font-medium text-[#1c1917]">{role}</span>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Pilot model */}
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel variant="green" className="block text-center">Low-Risk Entry</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917] mb-4">Start small. Prove it. Then scale.</h2>
          <p className="text-[#78716c] mb-10">
            Every enterprise deployment starts as a paid pilot on one block. You get measurable results in 6–10 weeks. If the numbers work, you expand across the estate.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { step: "01", title: "Pilot one block", desc: "Install on 50–500 ha. Engineers handle setup in 1–2 days." },
              { step: "02", title: "Measure results", desc: "Real data in 6–10 weeks. Water, yield, input costs." },
              { step: "03", title: "Scale estate-wide", desc: "Expand without replacing hardware. Modular architecture." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] p-5 text-center">
                <div className="text-2xl font-bold text-[#16a34a] mb-2">{s.step}</div>
                <div className="font-semibold text-[#1c1917] text-sm mb-1.5">{s.title}</div>
                <div className="text-xs text-[#78716c] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Enterprise form */}
      <SectionContainer id="enterprise-form" variant="earth">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel variant="green" className="block text-center">Request a Pilot</SectionLabel>
            <h2 className="text-3xl font-bold text-[#1c1917]">Tell us about your estate</h2>
            <p className="text-[#78716c] mt-2 text-sm">Rohan will be in touch within 2 business days with a tailored pilot proposal.</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-6 sm:p-8 shadow-sm">
            <EnterpriseLeadForm />
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel variant="green" className="block text-center">FAQ</SectionLabel>
            <h2 className="text-3xl font-bold text-[#1c1917]">Common questions</h2>
          </div>
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-[#e7e5e4] px-4">
                <AccordionTrigger className="text-left text-sm font-semibold text-[#1c1917] py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#78716c] leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>
    </>
  );
}
