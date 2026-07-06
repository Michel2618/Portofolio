import HeroSectionDark from "@/components/HeroSectionDark";
import HeroSectionLight from "@/components/HeroSectionLight";
import SectionSwitcher from "@/components/SectionSwitcher";
import QuoteDark from "@/components/QuoteDark";
import ProjectsSectionDark from "@/components/ProjectsSectionDark";
import SkillsSectionDark from "@/components/SkillsSectionDark";
import AboutSectionDark from "@/components/AboutSectionDark";
import ContactsSectionDark from "@/components/ContactsSectionDark";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main>
      <SectionSwitcher 
        darkComponent={<HeroSectionDark />} 
        lightComponent={<HeroSectionLight />} 
      />
      <QuoteDark />
      <ProjectsSectionDark />
      <SkillsSectionDark />
      <AboutSectionDark />
      <ContactsSectionDark />
    </main>
  );
}
