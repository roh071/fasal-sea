import { Cpu, BarChart3, Zap } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";

const steps = [
  {
    icon: Cpu,
    number: "01",
    title: "Install",
    desc: "Rugged IoT sensors go in the field — soil, crop microclimate, weather. IP65-rated, OTA-updated, works offline via Bluetooth.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Monitor",
    desc: "FasalOne dashboard shows real-time crop health, water stress, disease risk, and growth stage — across every block.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Act",
    desc: "Automated irrigation triggers, advisory alerts 5–7 days before visible symptoms, yield prediction, ESG data exports.",
  },
];

export function HowItWorksSteps() {
  return (
    <SectionContainer>
      <div className="text-center mb-14">
        <SectionLabel variant="green">The Platform</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">
          From field sensor to farm decision in minutes
        </h2>
      </div>
      <div className="relative grid lg:grid-cols-3 gap-8">
        {/* Connecting line on desktop */}
        <div className="hidden lg:block absolute top-10 left-1/3 right-1/3 h-px bg-[#e7e5e4]" />
        {steps.map((step, i) => (
          <div key={step.number} className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
            {/* Mobile vertical line */}
            {i < steps.length - 1 && (
              <div className="lg:hidden absolute left-6 top-14 bottom-0 w-px bg-[#e7e5e4] -mb-8" />
            )}
            <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
              <div className="relative z-10 w-12 h-12 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center shrink-0 lg:mb-6">
                <step.icon className="h-5 w-5 text-[#16a34a]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#16a34a] mb-1">{step.number}</p>
                <h3 className="text-lg font-bold text-[#1c1917] mb-2">{step.title}</h3>
                <p className="text-[#78716c] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
