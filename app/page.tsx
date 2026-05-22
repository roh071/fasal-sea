import { HeroSection } from "@/components/sections/HeroSection";
import { AudienceSplitCards } from "@/components/sections/AudienceSplitCards";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { DualCTA } from "@/components/sections/DualCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AudienceSplitCards />
      <StatsStrip />
      <HowItWorksSteps />
      <FeaturedCaseStudy />
      <ProductsPreview />
      <DualCTA />
    </>
  );
}
