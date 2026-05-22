import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, DollarSign, MapPin, Package, CheckCircle2 } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { DistributorLeadForm } from "@/components/forms/DistributorLeadForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Become a Fasal Distributor in Malaysia or Philippines | Fasal SEA",
  description:
    "Distribute Fasal IoT precision agriculture devices across your farmer network. Earn on hardware and subscriptions. Apply to become an authorized Fasal distributor in Malaysia or Philippines.",
};

const faqs = [
  {
    q: "What is the minimum stock level to get started?",
    a: "We recommend starting with 10–20 devices to cover an initial farmer cluster. Fasal provides training and onboarding support before you make any inventory commitment.",
  },
  {
    q: "Is the distributorship exclusive to my territory?",
    a: "Territory arrangements are discussed individually. Malaysia currently has no active distributor — a first mover can negotiate strong terms. Philippines has open territories in Mindanao and Metro Manila.",
  },
  {
    q: "What training and support does Fasal provide?",
    a: "Full product training, installation guides, sales collateral, and a dedicated support helpline. Fasal's team is available throughout the onboarding process and as you grow.",
  },
  {
    q: "Who pays for device installation on the farmer's plot?",
    a: "Installation is typically included in the hardware price. You handle logistics in your territory; Fasal's engineers can assist for the first few installations to get you up to speed.",
  },
  {
    q: "What crops and farm types does Fasal work with?",
    a: "FasalOne supports 40+ crops — rice, vegetables, banana, chilli, tomato, sugarcane, mango, durian, coconut, and more. It works for any outdoor field-based farming. It is not suitable for indoor/hydroponic/aquaculture operations.",
  },
];

const territories = [
  { country: "🇲🇾 Malaysia", status: "open", label: "Open — First Mover", note: "No active distributor. Full country available.", color: "#16a34a" },
  { country: "🇵🇭 Philippines", status: "partial", label: "Partially Open", note: "Open: Mindanao, NCR. ANB active in N/C Luzon; Salakot in S Luzon/Visayas.", color: "#0d9488" },
  { country: "🇮🇩 Indonesia", status: "taken", label: "Exclusive Distributor", note: "PT Wahana holds national exclusivity.", color: "#78716c" },
  { country: "🇹🇭 Thailand", status: "partial", label: "Partially Covered", note: "Tangnam (NE), KKE (East), TKE (Central/North/West), KT Agrotech (North).", color: "#78716c" },
];

export default function DistributorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2b28] to-[#134e48] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-[#2dd4bf]" />
            <span className="text-sm font-semibold text-[#2dd4bf] uppercase tracking-widest">For Distributors & Agents</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Build a Precision Agriculture Business
            <br />
            <span className="text-[#2dd4bf]">Across Your Farmer Network</span>
          </h1>
          <p className="text-lg text-[#a8a29e] max-w-2xl mb-8 leading-relaxed">
            You already work with farmers. You know your territory. Fasal gives you a proven IoT product to install on their fields — and you earn on every device sold plus recurring subscription revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#distributor-form"
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Apply as Distributor <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              See the Products
            </Link>
          </div>
        </div>
      </section>

      {/* Business model */}
      <SectionContainer>
        <div className="text-center mb-12">
          <SectionLabel variant="teal">The Business Model</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">Simple. Proven. Recurring.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Package, step: "01", title: "Stock devices", desc: "Start with 10–20 Fasal devices. Fasal provides full training and all sales collateral before you commit to inventory." },
            { icon: MapPin, step: "02", title: "Install on farmer plots", desc: "You or Fasal's engineers install on your farmers' fields. Typically 1–2 hours per farm. Farmers see results within 1–2 weeks." },
            { icon: DollarSign, step: "03", title: "Earn on hardware + subscription", desc: "Earn ~30% margin on every device sold, plus recurring annual software revenue for every active device in your territory." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] border border-[#99f6e4] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#0d9488]" />
                  </div>
                  <span className="text-2xl font-bold text-[#0d9488]">{item.step}</span>
                </div>
                <h3 className="font-bold text-[#1c1917] mb-2">{item.title}</h3>
                <p className="text-sm text-[#78716c] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Economics */}
      <SectionContainer variant="earth">
        <div className="text-center mb-10">
          <SectionLabel variant="teal">Earning Potential</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">What a 20-device portfolio looks like</h2>
          <p className="text-sm text-[#78716c] mt-2">Illustrative — based on FasalOne 5.0 at ~$1,500 hardware + $120/yr subscription per device.</p>
        </div>
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-4">
          {[
            { label: "Hardware margin (20 devices)", value: "~$9,000", sub: "One-time at ~30% margin" },
            { label: "Annual subscription revenue", value: "~$720/yr", sub: "Recurring, per active device" },
            { label: "3-year total (20 devices)", value: "~$11,160", sub: "Hardware + 3 subscription cycles" },
            { label: "Scale to 100 devices", value: "~$50K+", sub: "Year-1 hardware + recurring SaaS" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white border border-[#e7e5e4] p-5 text-center">
              <div className="text-2xl font-bold text-[#0d9488] mb-1">{item.value}</div>
              <div className="text-xs font-semibold text-[#1c1917] mb-1">{item.label}</div>
              <div className="text-xs text-[#78716c]">{item.sub}</div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Territory map */}
      <SectionContainer>
        <div className="text-center mb-10">
          <SectionLabel variant="teal">Territory Availability</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">Where Fasal is looking to expand</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {territories.map((t) => (
            <div
              key={t.country}
              className="rounded-2xl border p-5"
              style={{ borderColor: t.status === "open" ? "#bbf7d0" : t.status === "partial" ? "#99f6e4" : "#e7e5e4", backgroundColor: t.status === "taken" ? "#fafaf9" : t.status === "open" ? "#f0fdf4" : "#f0fdfa" }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-bold text-[#1c1917]">{t.country}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: t.color + "15", color: t.color }}>
                  {t.label}
                </span>
              </div>
              <p className="text-xs text-[#78716c]">{t.note}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Fact sheet */}
      <SectionContainer variant="dark">
        <div className="text-center mb-8">
          <SectionLabel variant="light" className="block text-center">Fasal at a Glance</SectionLabel>
          <h2 className="text-3xl font-bold text-white">What you&apos;re distributing</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "📡", stat: "12,000+", label: "IoT devices deployed across Asia" },
            { icon: "💧", stat: "30–40%", label: "Typical water savings" },
            { icon: "🌱", stat: "40+", label: "Crops supported" },
            { icon: "🏢", stat: "100+", label: "Enterprise customers" },
            { icon: "📱", stat: "2 Products", label: "FasalOne 5.0 & 6.0 — modular" },
            { icon: "🎓", stat: "Full Support", label: "Training, onboarding, helpline" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xl font-bold text-white mb-1">{item.stat}</div>
              <div className="text-xs text-[#a8a29e]">{item.label}</div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* What you get */}
      <SectionContainer variant="earth">
        <div className="text-center mb-10">
          <SectionLabel variant="teal">Distributor Benefits</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">What Fasal provides to distributors</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            "Hardware + software pricing with ~30% margin",
            "Full product and installation training",
            "Sales collateral, case studies, demo materials",
            "Ongoing technical support helpline",
            "Co-marketing support for your territory",
            "Access to the farmer-facing Fasal mobile app",
          ].map((item) => (
            <div key={item} className="rounded-xl bg-white border border-[#e7e5e4] px-5 py-4 flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#0d9488] shrink-0" />
              <span className="text-sm text-[#44403c]">{item}</span>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Form */}
      <SectionContainer id="distributor-form">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel variant="teal" className="block text-center">Apply Now</SectionLabel>
            <h2 className="text-3xl font-bold text-[#1c1917]">Your distributor application</h2>
            <p className="text-[#78716c] mt-2 text-sm">Rohan will reach out within 2 business days to discuss your territory and next steps.</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-6 sm:p-8 shadow-sm">
            <DistributorLeadForm />
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer variant="earth">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel variant="teal" className="block text-center">FAQ</SectionLabel>
            <h2 className="text-3xl font-bold text-[#1c1917]">Distributor questions</h2>
          </div>
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-[#e7e5e4] px-4 bg-white">
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
