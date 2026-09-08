import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyDriveFlow } from "@/components/home/WhyDriveFlow";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HomeLocations } from "@/components/home/HomeLocations";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedCars />
      <WhyDriveFlow />
      <HowItWorks />
      <HomeLocations />
      <FinalCta />
    </>
  );
}
