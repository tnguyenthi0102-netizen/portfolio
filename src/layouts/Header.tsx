import { clsx } from 'clsx'
import { getPreferredTheme, resolveTheme, setTheme, type ThemeMode } from '@/lib/theme'
import { links } from '@/data/portfolio'
import { useState, useEffect } from 'react'

function Header() {
  const current = resolveTheme(getPreferredTheme())
  const nextMode = (current: 'light' | 'dark'): ThemeMode => (current === 'dark' ? 'light' : 'dark')
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

  return (
    <header className="z-[999] relative">
      {/* Navigation Bar */}
      <nav className="flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[#282A36] rounded-full px-5 py-2.5 shadow-lg">
          <ul className="flex items-center justify-center gap-6 list-none">
            {links.map((link) => {
              const isActive = activeSection === link.name
              return (
                <li key={link.hash}>
                  <a
                    className={clsx(
                      'relative px-4 py-2 rounded-full text-sm font-normal text-gray-400 transition-all duration-200 block',
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

      {/* Theme Toggle - Top right corner */}
      <div className="fixed top-6 right-6 z-50">
        <button
          className="px-3 py-2 rounded-full text-lg border border-black/10 bg-white/80 dark:bg-gray-950/80 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:scale-110 active:scale-105 transition shadow-lg"
          onClick={() => setTheme(nextMode(current))}
          aria-label="Toggle theme"
        >
          {current === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header
