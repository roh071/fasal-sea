import Link from "next/link";
import { ArrowRight, Building2, Users } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";

export function DualCTA() {
  return (
    <SectionContainer>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">
          Ready to bring precision agriculture to your operation?
        </h2>
        <p className="text-[#78716c] mt-3 max-w-lg mx-auto">
          Tell us about your estate or farming network and we&apos;ll be in touch within 2 business days.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        <Link
          href="/enterprise#enterprise-form"
          className="group rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#16a34a]/15 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-[#16a34a]" />
            </div>
            <div>
              <p className="font-semibold text-[#1c1917] text-sm">Request a Pilot</p>
              <p className="text-xs text-[#78716c]">For plantation estates</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-[#16a34a] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/distributor#distributor-form"
          className="group rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-6 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0d9488]/15 flex items-center justify-center">
              <Users className="h-5 w-5 text-[#0d9488]" />
            </div>
            <div>
              <p className="font-semibold text-[#1c1917] text-sm">Apply as Distributor</p>
              <p className="text-xs text-[#78716c]">For agri distributors & agents</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-[#0d9488] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </SectionContainer>
  );
}
