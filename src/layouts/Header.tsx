import { clsx } from 'clsx'
import { links } from '@/data/portfolio'
import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

function Header() {
  const [activeSection, setActiveSection] = useState('Home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => link.hash.slice(1))
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section === 'home' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1))
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme toggle handled by ThemeToggle component

  return (
    <header className="z-[999] relative">
      <nav className="flex fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[var(--color-bg)] rounded-full px-3 py-1.5 md:px-5 md:py-2.5 shadow-2xl dark:border dark:border-white/10 border-black/10 max-w-[90vw] overflow-x-auto">
          <ul className="flex items-center justify-center gap-3 md:gap-6 list-none whitespace-nowrap">
            {links.map((link) => {
              const isActive = activeSection === link.name
              return (
                <li key={link.hash}>
                  <a
                    className={clsx(
                      'relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-normal text-gray-400 transition-all duration-200 block',
                      {
                        'hover:text-gray-300': !isActive,
                      }
                    )}
                    href={link.hash}
                    onClick={() => setActiveSection(link.name)}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute inset-0 bg-[#1E202A] rounded-full -z-10 shadow-inner"></span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
