import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Globe, ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Contact Fasal SEA — Speak to Rohan | Fasal SEA",
  description:
    "Contact Fasal's international business team for enterprise pilots, distributor enquiries, or partnerships in Malaysia and the Philippines. Reach Rohan Kumar Sharma directly.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2417] to-[#1a3a23] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 max-w-2xl">
            Let&apos;s talk.
            <br />
            <span className="text-[#4ade80]">Rohan is one email away.</span>
          </h1>
          <p className="text-lg text-[#a8a29e] max-w-xl leading-relaxed">
            Whether you manage a plantation, run an agri-business, or want to distribute Fasal in your region — Rohan will get back to you within 2 business days.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {/* Enterprise */}
          <div className="rounded-2xl border-2 border-[#bbf7d0] bg-[#f0fdf4] p-7">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a]">Plantation Estates</span>
              <h2 className="text-xl font-bold text-[#1c1917] mt-1">Enterprise Enquiry</h2>
              <p className="text-sm text-[#78716c] mt-2">
                Large plantation or estate looking to pilot Fasal? Use the form — Rohan will scope a pilot proposal for your specific estate.
              </p>
            </div>
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
            >
              Request a Pilot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Distributor */}
          <div className="rounded-2xl border-2 border-[#99f6e4] bg-[#f0fdfa] p-7">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488]">Distributors & Agents</span>
              <h2 className="text-xl font-bold text-[#1c1917] mt-1">Distributor Application</h2>
              <p className="text-sm text-[#78716c] mt-2">
                Work with farmers and want to distribute Fasal in your territory? Apply using the distributor form — Malaysia is fully open, Philippines has open zones.
              </p>
            </div>
            <Link
              href="/distributor#distributor-form"
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
            >
              Apply as Distributor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* Direct contact */}
      <SectionContainer variant="earth">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel variant="green">Direct Contact</SectionLabel>
            <h2 className="text-2xl font-bold text-[#1c1917]">Rohan Kumar Sharma</h2>
            <p className="text-sm text-[#78716c] mt-1">Assistant Manager — International Business</p>
          </div>
          <div className="rounded-2xl bg-white border border-[#e7e5e4] p-7 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-[#16a34a]" />
              </div>
              <div>
                <div className="text-xs text-[#78716c] mb-0.5">Email</div>
                <a href="mailto:rohan.sharma@wolkus.com" className="text-sm font-semibold text-[#1c1917] hover:text-[#16a34a] transition-colors">
                  rohan.sharma@wolkus.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-[#16a34a]" />
              </div>
              <div>
                <div className="text-xs text-[#78716c] mb-0.5">Company</div>
                <a href="https://www.fasal.co" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1c1917] hover:text-[#16a34a] transition-colors">
                  Wolkus Technology Solutions Pvt. Ltd.
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-[#fafaf9] border border-[#e7e5e4] px-4 py-3 text-xs text-[#78716c]">
              Response time: within 2 business days (Mon–Fri, IST/GMT+5:30). For urgent matters, please note IST in your subject line.
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* About Fasal */}
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel variant="green" className="block text-center">About Fasal</SectionLabel>
          <h2 className="text-2xl font-bold text-[#1c1917] mb-4">Who we are</h2>
          <p className="text-sm text-[#78716c] leading-relaxed mb-6">
            Fasal (by Wolkus Technology Solutions) is an Indian AgriTech company founded in 2018, headquartered in Bengaluru. We build IoT + AI precision agriculture solutions for outdoor field-based farming. Backed by ~$20M from TDK Ventures and British International Investment (BII). Recognised by Forbes Asia as a &quot;100 to Watch&quot; company in 2021.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "100+ Enterprise Customers",
              "12,000+ Devices Deployed",
              "40+ Crops Supported",
              "Forbes Asia 100 to Watch",
              "~$20M Raised",
              "TDK Ventures + BII Backed",
            ].map((fact) => (
              <span key={fact} className="px-3 py-1.5 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-xs text-[#15803d] font-medium">
                {fact}
              </span>
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
