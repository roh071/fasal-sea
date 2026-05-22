import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Wifi, Droplets, Thermometer, Wind, CloudRain, Zap, Smartphone, Shield } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "FasalOne 5.0 & 6.0 — Precision Agriculture IoT Devices | Fasal SEA",
  description:
    "FasalOne 5.0 monitors 12 crop parameters and predicts disease 5–7 days early. FasalOne 6.0 adds precision soil-moisture sensing for up to 50% water savings. Built for plantations in Malaysia and Philippines.",
};

const sensors50 = [
  { icon: Droplets, name: "Soil Moisture", desc: "Multi-depth readings" },
  { icon: Thermometer, name: "Soil Temperature", desc: "Root-zone conditions" },
  { icon: Thermometer, name: "Air Temperature", desc: "Canopy-level" },
  { icon: Wifi, name: "Air Humidity", desc: "Relative humidity %" },
  { icon: Wind, name: "Air Pressure", desc: "Atmospheric data" },
  { icon: Droplets, name: "Leaf Wetness", desc: "Disease trigger indicator" },
  { icon: CloudRain, name: "Rainfall", desc: "Precision tipping bucket" },
  { icon: Wind, name: "Wind Speed", desc: "Spray timing safety" },
  { icon: Wind, name: "Wind Direction", desc: "Drift prediction" },
  { icon: Zap, name: "VPD", desc: "Vapour pressure deficit" },
  { icon: Droplets, name: "Evapotranspiration", desc: "Crop water demand" },
  { icon: Thermometer, name: "GDD", desc: "Growing degree days" },
];

const crops50 = [
  "🌴 Palm Oil", "🍌 Banana", "🎋 Sugarcane", "🥭 Durian", "🌿 Rubber",
  "🥥 Coconut", "🍫 Cacao", "☕ Coffee / Tea", "🍍 Pineapple", "🌶️ Chilli",
  "🍅 Tomato", "🍇 Grapes", "🥜 Groundnut", "🌾 Rice", "🌽 Maize",
  "40+ more crops",
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2417] to-[#1a3a23] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex items-center gap-2 mb-6">
            <Wifi className="h-5 w-5 text-[#4ade80]" />
            <span className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest">Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Complete Crop Intelligence.
            <br />
            <span className="text-[#4ade80]">Start Small. Scale Everything.</span>
          </h1>
          <p className="text-lg text-[#a8a29e] max-w-2xl mb-8 leading-relaxed">
            FasalOne is a modular IoT platform for outdoor field agriculture. Deploy one unit on a pilot block and expand across your entire estate without replacing hardware.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Request a Pilot <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/distributor#distributor-form"
              className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              Become a Distributor
            </Link>
          </div>
        </div>
      </section>

      {/* Product comparison strip */}
      <SectionContainer>
        <div className="text-center mb-12">
          <SectionLabel variant="green">The Platform</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917]">Two devices. One integrated system.</h2>
          <p className="text-[#78716c] mt-3 max-w-xl mx-auto text-sm">
            Start with the FasalOne 5.0 main unit on one block. Add 6.0 satellite units to extend soil-moisture coverage across your estate. They work together out of the box.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* FasalOne 5.0 */}
          <div className="rounded-2xl border-2 border-[#16a34a] bg-[#f0fdf4] p-7 relative">
            <div className="absolute top-5 right-5">
              <span className="text-xs font-bold bg-[#16a34a] text-white px-3 py-1.5 rounded-full">Pilot Entry Point</span>
            </div>
            <div className="mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#16a34a] flex items-center justify-center mb-4">
                <Wifi className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1c1917]">FasalOne 5.0</h3>
              <p className="text-sm text-[#78716c] mt-1">Main Unit — Crop Intelligence Station</p>
            </div>
            <div className="text-[#1c1917] mb-5">
              <div className="text-2xl font-bold text-[#16a34a]">~$1,500</div>
              <div className="text-xs text-[#78716c]">hardware + $120/yr subscription · 1 year free included</div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {[
                "12 integrated sensors in one unit",
                "Disease & pest prediction (5–7 days early)",
                "Spray timing advisory",
                "Irrigation alert & scheduling",
                "GDD crop-stage tracking",
                "OTA firmware updates over-the-air",
                "Bluetooth offline mode",
                "IP65 weather-rated enclosure",
                "1-year warranty + free subscription",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16a34a] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#44403c]">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full justify-center"
            >
              Request a Pilot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* FasalOne 6.0 */}
          <div className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-7">
            <div className="mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#0d9488] flex items-center justify-center mb-4">
                <Droplets className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1c1917]">FasalOne 6.0</h3>
              <p className="text-sm text-[#78716c] mt-1">Soil Moisture Unit — Irrigation Precision Satellite</p>
            </div>
            <div className="text-[#1c1917] mb-5">
              <div className="text-2xl font-bold text-[#0d9488]">~$500</div>
              <div className="text-xs text-[#78716c]">hardware + $80/yr subscription · pairs with 5.0</div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {[
                "Multi-depth soil moisture sensing",
                "Extends coverage across every block",
                "Pairs seamlessly with FasalOne 5.0",
                "Same dashboard — no extra software",
                "Up to 50% water savings in optimal deployments",
                "Drives precision irrigation scheduling",
                "Ideal for large multi-zone estates",
                "RSPO water-use data export ready",
                "IP65 rated, same form factor",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#0d9488] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#44403c]">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full justify-center"
            >
              Ask About 6.0 Add-On <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* 12 Sensors */}
      <SectionContainer variant="earth">
        <div className="text-center mb-10">
          <SectionLabel variant="green">12 Sensors · One Station</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">Everything FasalOne 5.0 measures</h2>
          <p className="text-[#78716c] mt-2 text-sm">Hyper-local data from inside your crop canopy — not from a distant weather station.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {sensors50.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="rounded-xl bg-white border border-[#e7e5e4] p-4 text-center">
                <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center mx-auto mb-2">
                  <Icon className="h-4 w-4 text-[#16a34a]" />
                </div>
                <div className="text-xs font-bold text-[#1c1917]">{s.name}</div>
                <div className="text-[10px] text-[#78716c] mt-0.5">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Intelligence layer */}
      <SectionContainer>
        <div className="text-center mb-12">
          <SectionLabel variant="green">AI Advisory Models</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">Sensor data → actionable decisions</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Disease Risk Prediction",
              desc: "AI models trained on crop pathology data flag disease risk 5–7 days before visible symptoms. You spray at optimal timing with minimal chemical use.",
              color: "#16a34a",
            },
            {
              title: "Irrigation Scheduling",
              desc: "Soil moisture + ET data drive precise irrigation alerts — irrigate only when and how much the crop needs. Typical savings: 25–40%.",
              color: "#16a34a",
            },
            {
              title: "Spray Window Advisory",
              desc: "Wind speed, direction, and leaf wetness data identify the optimal spray window for maximum efficacy and minimum drift.",
              color: "#16a34a",
            },
            {
              title: "Crop Stage Tracking (GDD)",
              desc: "Growing Degree Days accumulation tracks crop development stage so your agronomy team applies inputs at the biologically optimal moment.",
              color: "#0d9488",
            },
            {
              title: "Microclimate Analytics",
              desc: "Block-level micro-climate variance — not farm averages. Identify hotspots, stress zones, and productivity outliers across multi-block estates.",
              color: "#0d9488",
            },
            {
              title: "ESG & RSPO Reporting Export",
              desc: "Water-use, input-cost, and yield data exportable for RSPO sustainability certification and corporate ESG reporting.",
              color: "#0d9488",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-5">
              <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: item.color }} />
              <h3 className="font-semibold text-[#1c1917] mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-[#78716c] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Crops supported */}
      <SectionContainer variant="earth">
        <div className="text-center mb-10">
          <SectionLabel variant="green">Supported Crops</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">40+ crops. Your estate is covered.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {crops50.map((crop) => (
            <span key={crop} className="px-4 py-2 rounded-full bg-white border border-[#e7e5e4] text-sm text-[#44403c] font-medium">
              {crop}
            </span>
          ))}
        </div>
        <p className="text-center text-xs text-[#78716c] mt-6">
          FasalOne is designed for outdoor field-based farming only. Not suitable for indoor/vertical farming, hydroponics, or aquaculture.
        </p>
      </SectionContainer>

      {/* FasalJet upsell */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel variant="teal">Automation Layer</SectionLabel>
            <h2 className="text-3xl font-bold text-[#1c1917]">FasalJet — from monitoring to action</h2>
            <p className="text-[#78716c] mt-2 text-sm">After your pilot proves ROI on FasalOne, add irrigation automation. Discussed after the initial deployment.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-6">
              <h3 className="font-bold text-[#1c1917] mb-2">FasalJet</h3>
              <p className="text-xs text-[#78716c] mb-4">Mobile-controlled irrigation automation. Control pumps and valves from your phone, triggered by FasalOne soil-moisture data.</p>
              <ul className="space-y-2">
                {["Remote pump/valve control", "Automated irrigation schedules", "Alert on pump failure or leak", "Works with existing infrastructure"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#44403c]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d9488] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-6">
              <h3 className="font-bold text-[#1c1917] mb-2">FasalJet Pro</h3>
              <p className="text-xs text-[#78716c] mb-4">Irrigation + fertigation automation. Adds nutrient dosing to the irrigation control stack — full precision input management.</p>
              <ul className="space-y-2">
                {["All FasalJet features", "Fertigation automation", "Nutrient dosing precision", "Multi-zone fertigation scheduling"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#44403c]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d9488] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Deployment model */}
      <SectionContainer variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel variant="light" className="block text-center">Deployment Model</SectionLabel>
          <h2 className="text-3xl font-bold text-white mb-4">Modular. No rip-and-replace.</h2>
          <p className="text-[#a8a29e] mb-10">
            FasalOne is designed for incremental deployment. Start with one unit on a pilot block. Prove the numbers. Add 6.0 units for soil-moisture coverage. Then scale across the full estate — same hardware, same app, no migration.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { step: "1", label: "1 device", desc: "Pilot block: 50–500 ha" },
              { step: "2", label: "Add 6.0 units", desc: "Extend soil coverage" },
              { step: "3", label: "Scale blocks", desc: "Full estate rollout" },
              { step: "4", label: "Add FasalJet", desc: "Automate irrigation" },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <div className="text-3xl font-bold text-[#4ade80] mb-2">{s.step}</div>
                <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
                <div className="text-xs text-[#a8a29e]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Compliance / certs */}
      <SectionContainer variant="earth">
        <div className="text-center mb-8">
          <SectionLabel variant="green">Certifications & Trust</SectionLabel>
          <h2 className="text-3xl font-bold text-[#1c1917]">Built to enterprise standards</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Shield, label: "TEC Certified", desc: "Telecom Engineering Centre type approval" },
            { icon: Shield, label: "IMD Certified", desc: "India Meteorological Department approval" },
            { icon: Shield, label: "NABL Accredited", desc: "Sensor calibration — national standards" },
            { icon: Shield, label: "3 Patents Granted", desc: "Proprietary crop-AI models" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl bg-white border border-[#e7e5e4] p-5 text-center">
                <Icon className="h-6 w-6 text-[#16a34a] mx-auto mb-2" />
                <div className="text-sm font-bold text-[#1c1917] mb-1">{item.label}</div>
                <div className="text-xs text-[#78716c]">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Final CTA */}
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1c1917] mb-4">Ready to see it on your estate?</h2>
          <p className="text-[#78716c] mb-8">Every deployment starts as a paid pilot on one block. Fasal&apos;s engineers handle installation — you get data and results in 6–10 weeks.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Request a Pilot <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/distributor#distributor-form"
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Become a Distributor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
