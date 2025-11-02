import { clsx } from 'clsx'
import { links } from '@/data/portfolio'
import { useState, useEffect, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('Home')
  const [isScrolled, setIsScrolled] = useState(false)
  const isLandingPage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      if (!isLandingPage) return

      const sections = links.map((link) => link.hash.slice(1))
      const scrollPosition = scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(
              section === 'home' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1),
            )
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLandingPage])

  useEffect(() => {
    if (location.pathname === '/achievements') {
      setActiveSection('Achievements')
    } else if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo
      const sectionName =
        sectionId === 'home' ? 'Home' : sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
      setActiveSection(sectionName)
    }
  }, [location.pathname, location.state])

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof links)[number],
  ) => {
    e.preventDefault()
    setActiveSection(link.name)

    if (!isLandingPage) {
      navigate('/', { state: { scrollTo: link.hash.slice(1) } })
    } else {
      const element = document.getElementById(link.hash.slice(1))
      if (element) {
        const offsetTop = element.offsetTop - 100
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }
  }

  const handleAchievementsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setActiveSection('Achievements')
    navigate('/achievements')
  }

  return (
    <header className="z-[999] relative">
      <nav
        className={`flex fixed left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ${isScrolled ? 'top-2 md:top-2 -translate-y-2' : 'top-4 md:top-6'}`}
      >
        <div className="bg-[var(--color-bg)] rounded-full px-3 py-1.5 md:px-5 md:py-2.5 shadow-2xl border border-white/10 border-black/10 max-w-[calc(90vw-3rem)] overflow-x-auto">
          <ul className="flex items-center justify-center gap-3 md:gap-6 list-none whitespace-nowrap">
            {links.map((link) => {
              const isActive = activeSection === link.name
              return (
                <li key={link.hash}>
                  <a
                    className={clsx(
                      'relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-normal text-gray-400 transition-all duration-200 block cursor-pointer',
                      {
                        'hover:text-gray-300': !isActive,
                      },
                    )}
                    href={link.hash}
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute inset-0 bg-[#1E202A] rounded-full -z-10 shadow-inner"></span>
                    )}
                  </a>
                </li>
              )
            })}
            <li>
              <a
                className={clsx(
                  'relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-normal text-gray-400 transition-all duration-200 block cursor-pointer',
                  {
                    'hover:text-gray-300': activeSection !== 'Achievements',
                  },
                )}
                href="/achievements"
                onClick={handleAchievementsClick}
              >
                Achievements
                {activeSection === 'Achievements' && (
                  <span className="absolute inset-0 bg-[#1E202A] rounded-full -z-10 shadow-inner"></span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`fixed right-4 md:right-6 z-50 transition-transform duration-300`}>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default memo(Header)
