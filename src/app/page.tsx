import HeroSection from "@/components/HeroSection";
import Quote from "@/components/Quote";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ContactsSection from "@/components/ContactsSection";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Quote />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactsSection />
    </main>
  );
}
