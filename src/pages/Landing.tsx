import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/About'
import ProjectsSection from '@/components/sections/Projects'
import SkillsSection from '@/components/sections/Skills'
import ExperienceSection from '@/components/sections/Experience'
import ContactSection from '@/components/sections/Contact'
import SectionDivider from '@/components/sections/SectionDivider'

function Landing() {
  return (
    <main className="flex flex-col items-center px-4">
      <Hero />
      <SectionDivider />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      {/* <ExperienceSection /> */}
      <ContactSection />
    </main>
  )
}

export default Landing
