import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { AboutHero } from "@/components/about/about-hero";
import { JourneyTimeline } from "@/components/about/journey-timeline";
import { SkillsRadar } from "@/components/about/skills-radar";
import { ValuesSection } from "@/components/about/values-section";
import { CTASection } from "@/components/home/cta-section";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About | Yousief Sameh",
  description:
    "Learn more about Yousief Sameh - a passionate full-stack developer building modern web experiences.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <MainLayout>
      <AboutHero introText={settings.about_intro} />
      <ValuesSection />
      <SkillsRadar />
      <JourneyTimeline />
      <CTASection />
    </MainLayout>
  );
}
