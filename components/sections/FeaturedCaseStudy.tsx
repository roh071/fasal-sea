import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";

export function FeaturedCaseStudy() {
  return (
    <SectionContainer variant="dark">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4ade80] mb-4">
            Featured Case Study
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            IOI Group, Malaysia —<br />
            <span className="text-[#4ade80]">Banana Plantation</span>
          </h2>
          <p className="text-[#a8a29e] mb-8 leading-relaxed">
            IOI Group, one of Malaysia&apos;s leading agribusinesses, deployed FasalOne across a 1,500-acre banana plantation. The results validated precision agriculture at commercial estate scale.
          </p>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#4ade80] font-semibold text-sm hover:gap-3 transition-all"
          >
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { stat: "25%", label: "Irrigation water saved" },
            { stat: "15%", label: "Yield uplift" },
            { stat: "12%", label: "Higher bunch weight" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <div className="text-3xl font-bold text-white mb-2">{item.stat}</div>
              <p className="text-xs text-[#a8a29e] leading-snug">{item.label}</p>
            </div>
          ))}
          <div className="col-span-3 rounded-2xl bg-[#16a34a]/10 border border-[#16a34a]/20 p-4 text-center">
            <p className="text-[#4ade80] font-semibold text-sm">1,500 acres · Malaysia · Banana</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
