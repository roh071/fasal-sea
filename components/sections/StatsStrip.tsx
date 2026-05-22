import { CountUpNumber } from "@/components/shared/CountUpNumber";
import { SectionContainer } from "@/components/shared/SectionContainer";

const stats = [
  { value: 12000, suffix: "+", label: "IoT Devices Deployed" },
  { value: 83, suffix: "B L", label: "Water Saved Across Asia" },
  { value: 100, suffix: "+", label: "Enterprise Customers" },
  { value: 85, suffix: "%", label: "Customer Retention Rate" },
];

export function StatsStrip() {
  return (
    <SectionContainer variant="dark" className="py-12 sm:py-16 lg:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              <CountUpNumber target={s.value} suffix={s.suffix} />
            </div>
            <p className="text-sm text-[#a8a29e]">{s.label}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
