import type { Metadata } from "next";
import { LeadsToolClient } from "@/components/leads-tool/LeadsToolClient";

export const metadata: Metadata = {
  title: "Lead Research Tool — Fasal SEA",
  robots: { index: false, follow: false },
};

export default function LeadsToolPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
            Internal Tool · Not Indexed
          </p>
          <h1 className="text-3xl font-bold text-[#1c1917] mb-2">
            AI Lead Research Tool
          </h1>
          <p className="text-[#78716c] text-base max-w-2xl">
            Discover ICP-matched plantation companies in Malaysia and Philippines, then generate
            personalised cold email sequences — all grounded in Fasal&apos;s real proof cases.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e7e5e4] p-6 md:p-8 shadow-sm">
          <LeadsToolClient />
        </div>

        <p className="mt-6 text-xs text-[#a8a29e] text-center">
          For Rohan&apos;s use only · AI output — always verify company details before outreach
        </p>
      </div>
    </main>
  );
}
