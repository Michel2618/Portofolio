import HeroSectionDark from "@/components/HeroSectionDark";
import HeroSectionLight from "@/components/HeroSectionLight";
import QuoteDark from "@/components/QuoteDark";
import QuoteLight from "@/components/QuoteLight";
import ProjectsSectionDark from "@/components/ProjectsSectionDark";
import ProjectsSectionLight from "@/components/ProjectsSectionLight";
import SkillsSectionDark from "@/components/SkillsSectionDark";
import SkillsSectionLight from "@/components/SkillsSectionLight";
import AboutSectionDark from "@/components/AboutSectionDark";
import AboutSectionLight from "@/components/AboutSectionLight";
import ContactsSectionDark from "@/components/ContactsSectionDark";
import ContactsSectionLight from "@/components/ContactsSectionLight";
import SectionSwitcher from "@/components/SectionSwitcher";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main>
      <SectionSwitcher 
        darkComponent={<HeroSectionDark />} 
        lightComponent={<HeroSectionLight />} 
      />
      <SectionSwitcher 
        darkComponent={<QuoteDark />} 
        lightComponent={<QuoteLight />} 
      />
      <SectionSwitcher 
        darkComponent={<ProjectsSectionDark />} 
        lightComponent={<ProjectsSectionLight />} 
      />
      <SectionSwitcher 
        darkComponent={<SkillsSectionDark />} 
        lightComponent={<SkillsSectionLight />} 
      />
      <SectionSwitcher 
        darkComponent={<AboutSectionDark />} 
        lightComponent={<AboutSectionLight />} 
      />
      <SectionSwitcher 
        darkComponent={<ContactsSectionDark />} 
        lightComponent={<ContactsSectionLight />} 
      />
    </main>
  );
}
