import Hero from "@/components/Hero";
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
      <Hero />
      <Quote />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactsSection />
    </main>
  );
}
