import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/About'
import ProjectsSection from '@/components/sections/Projects'
import SkillsSection from '@/components/sections/Skills'
import ExperienceSection from '@/components/sections/Experience'
import ContactSection from '@/components/sections/Contact'
import SectionDivider from '@/components/sections/SectionDivider'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Landing() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo)
        if (element) {
          const offsetTop = element.offsetTop - 100
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.state])

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
