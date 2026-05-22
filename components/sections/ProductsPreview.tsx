import Link from "next/link";
import { ArrowRight, Wifi, Droplets } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";

const products = [
  {
    name: "FasalOne 5.0",
    sub: "Main Unit — Crop Intelligence",
    icon: Wifi,
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    badge: "Enterprise Entry Point",
    desc: "12-sensor crop-intelligence weather station. The unit that produces your headline ROI numbers.",
    features: [
      "Disease & pest prediction — 5–7 days early",
      "Spray advisory for maximum efficacy",
      "Irrigation alerts based on actual crop stress",
      "Growing Degree Days (GDD) tracking",
      "OTA updates, Bluetooth offline, IP65-rated",
    ],
    price: "~$1,500 hardware · $120/yr subscription",
  },
  {
    name: "FasalOne 6.0",
    sub: "Soil Moisture Unit — Irrigation Precision",
    icon: Droplets,
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    badge: "Irrigation Intelligence",
    desc: "Precision soil-moisture satellite. Extends coverage across estate blocks — drives the water-savings story.",
    features: [
      "Continuous multi-depth soil moisture monitoring",
      "Live on the Fasal mobile app",
      "Signals the exact right time and quantity to irrigate",
      "Pairs with FasalOne 5.0 as a satellite unit",
      "Deploy across zones without replacing hardware",
    ],
    price: "~$500 hardware · $80/yr subscription",
  },
];

export function ProductsPreview() {
  return (
    <SectionContainer variant="earth">
      <div className="text-center mb-12">
        <SectionLabel variant="green">Technology</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">
          FasalOne — One platform, complete crop intelligence
        </h2>
        <p className="text-[#78716c] mt-3 max-w-xl mx-auto text-sm">
          Start small with one device. Expand across the estate without replacing hardware.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {products.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className="rounded-2xl border p-7 flex flex-col"
              style={{ backgroundColor: p.bg, borderColor: p.border }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: p.color + "20" }}
                >
                  <Icon className="h-5 w-5" style={{ color: p.color }} />
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: p.color + "15", color: p.color }}
                >
                  {p.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1c1917] mb-0.5">{p.name}</h3>
              <p className="text-xs text-[#78716c] mb-3">{p.sub}</p>
              <p className="text-sm text-[#44403c] mb-5 leading-relaxed">{p.desc}</p>
              <ul className="space-y-2 mb-5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="text-sm text-[#44403c] flex items-start gap-2">
                    <span style={{ color: p.color }} className="mt-1 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#78716c] border-t pt-3" style={{ borderColor: p.border }}>
                {p.price}
              </p>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-[#16a34a] font-semibold text-sm hover:gap-3 transition-all"
        >
          Full product specs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionContainer>
  );
}
