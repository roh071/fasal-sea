import Link from "next/link";
import { Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionLabel } from "@/components/shared/SectionLabel";

const enterprise = {
  icon: Building2,
  color: "#16a34a",
  bg: "#f0fdf4",
  border: "#bbf7d0",
  label: "For Enterprises",
  title: "Large Plantations & Estates",
  desc: "500+ ha operations. Palm oil, banana, rubber, sugarcane, durian. You own the land, you grow and export.",
  points: [
    "Automate irrigation across large estate blocks",
    "Reduce water and input costs — proven ROI",
    "Disease early warning 5–7 days before symptoms",
    "ESG and sustainability data reporting built in",
  ],
  cta: "Explore Enterprise Solutions",
  href: "/enterprise",
};

const distributor = {
  icon: Users,
  color: "#0d9488",
  bg: "#f0fdfa",
  border: "#99f6e4",
  label: "For Distributors",
  title: "Agricultural Distributors & Agents",
  desc: "You work with farmers. You manage fields. You want to add a high-value product to your portfolio.",
  points: [
    "Stock 10–20 devices, install on farmer plots",
    "Earn on hardware (~30% margin) + subscription",
    "Full training, onboarding and sales support",
    "Malaysia open territory — first-mover advantage",
  ],
  cta: "Become a Distributor",
  href: "/distributor",
};

function AudienceCard({ card }: { card: typeof enterprise }) {
  const Icon = card.icon;
  return (
    <div
      className="rounded-2xl border p-8 flex flex-col h-full hover:shadow-md transition-shadow"
      style={{ backgroundColor: card.bg, borderColor: card.border }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: card.color + "20" }}
      >
        <Icon className="h-6 w-6" style={{ color: card.color }} />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: card.color }}>
        {card.label}
      </p>
      <h3 className="text-xl font-bold text-[#1c1917] mb-3">{card.title}</h3>
      <p className="text-[#44403c] text-sm mb-5 leading-relaxed">{card.desc}</p>
      <ul className="space-y-2.5 mb-7 flex-1">
        {card.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-[#44403c]">
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: card.color }} />
            {p}
          </li>
        ))}
      </ul>
      <Link
        href={card.href}
        className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors w-fit"
        style={{ backgroundColor: card.color, color: "white" }}
      >
        {card.cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function AudienceSplitCards() {
  return (
    <SectionContainer variant="earth">
      <SectionLabel className="text-center block">Who is this for</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917] text-center mb-4">
        Two paths. One platform.
      </h2>
      <p className="text-[#78716c] text-center max-w-xl mx-auto mb-12">
        Whether you run a large estate or distribute to farmers — Fasal has a model built for how you work.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <AudienceCard card={enterprise} />
        <AudienceCard card={distributor} />
      </div>
    </SectionContainer>
  );
}
