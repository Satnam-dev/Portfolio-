import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { fetchPortfolioData } from "@/lib/fetchData";

export default async function HomePage() {
  const { projects, certifications, experiences, portfolio } =
    await fetchPortfolioData();

  return (
    <div className="page-grid page-glow">
      <HeroSection portfolio={portfolio} />
      <ProjectsSection projects={projects} />
      <AboutSection portfolio={portfolio} />
      <ExperienceSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
      <SkillsSection portfolio={portfolio} />
      <GitHubSection />
      <ContactSection portfolio={portfolio} />
    </div>
  );
}
