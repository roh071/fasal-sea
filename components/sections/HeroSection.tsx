import Link from "next/link";
import { ArrowRight, Building2, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0f2417] overflow-hidden">
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2417] via-[#1a3a23] to-[#0d1f14]" />
      {/* TODO: replace with licensed aerial plantation photography */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.3'%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/30 text-[#86efac] text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            100+ Enterprise Customers Across Asia
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Precision Agriculture
            <br />
            <span className="text-[#4ade80]">for Southeast Asia&apos;s</span>
            <br />
            Largest Estates
          </h1>

          <p className="text-lg sm:text-xl text-[#a8a29e] mb-10 max-w-xl leading-relaxed">
            IoT field sensors + crop intelligence that cuts water use by 30–40%, boosts yields, and automates irrigation — deployed across 12,000+ devices on plantations in Asia.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-8 rounded-xl min-h-[52px] text-base transition-colors"
            >
              <Building2 className="h-5 w-5" />
              I manage a plantation estate
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/distributor"
              className="inline-flex items-center justify-center gap-2 border border-[#0d9488] text-[#2dd4bf] hover:bg-[#0d9488]/10 font-semibold px-8 rounded-xl min-h-[52px] text-base bg-transparent transition-colors"
            >
              <Users className="h-5 w-5" />
              I want to distribute Fasal
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#78716c]">
            <span>✓ 12,000+ Devices Deployed</span>
            <span>✓ 83 Billion Litres Water Saved</span>
            <span>✓ ~85% Customer Retention</span>
            <span>✓ Forbes Asia 100 to Watch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
