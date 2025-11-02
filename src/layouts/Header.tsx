import { clsx } from 'clsx'
import { links } from '@/data/portfolio'
import { useState, useEffect, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'
import { HiMenu, HiX } from 'react-icons/hi'

type HeaderProps = {
  activeSection: string
  isScrolled: boolean
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, link: (typeof links)[number]) => void
  onAchievementsClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

function MobileHeader({ activeSection, onLinkClick, onAchievementsClick }: Omit<HeaderProps, 'isScrolled'>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof links)[number],
  ) => {
    setIsMenuOpen(false)
    onLinkClick(e, link)
  }

  const handleAchievementsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false)
    onAchievementsClick(e)
  }

  return (
    <>
      <div className="md:hidden fixed left-4 top-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-400 hover:text-gray-300 transition-colors bg-[var(--color-bg)] rounded-full shadow-lg border border-white/10 border-black/10"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={clsx(
          'fixed left-0 top-0 h-full w-64 bg-[var(--color-bg)] shadow-2xl border-r border-white/10 border-black/10 z-40 md:hidden transition-transform duration-300 ease-in-out',
          {
            '-translate-x-full': !isMenuOpen,
            'translate-x-0': isMenuOpen,
          },
        )}
      >
        <ul className="flex flex-col gap-2 list-none pt-20 px-4">
          {links.map((link) => {
            const isActive = activeSection === link.name
            return (
              <li key={link.hash}>
                <a
                  className={clsx(
                    'relative px-4 py-3 rounded-lg text-base font-normal text-gray-400 transition-all duration-200 block cursor-pointer',
                    {
                      'hover:text-gray-300 hover:bg-white/5': !isActive,
                      'bg-[var(--color-card)] text-gray-300': isActive,
                    },
                  )}
                  href={link.hash}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.name}
                </a>
              </li>
            )
          })}
          <li>
            <a
              className={clsx(
                'relative px-4 py-3 rounded-lg text-base font-normal text-gray-400 transition-all duration-200 block cursor-pointer',
                {
                  'hover:text-gray-300 hover:bg-white/5': activeSection !== 'Achievements',
                  'bg-[#1E202A] text-gray-300': activeSection === 'Achievements',
                },
              )}
              href="/achievements"
              onClick={handleAchievementsClick}
            >
              Achievements
            </a>
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

function DesktopHeader({ activeSection, isScrolled, onLinkClick, onAchievementsClick }: HeaderProps) {
  return (
    <nav
      className={`hidden md:flex fixed left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ${isScrolled ? 'top-2 -translate-y-2' : 'top-6'}`}
    >
      <div className="bg-[var(--color-bg)] rounded-full px-5 py-2.5 shadow-2xl border border-white/10 border-black/10">
        <ul className="flex items-center justify-center gap-6 list-none whitespace-nowrap">
          {links.map((link) => {
            const isActive = activeSection === link.name
            return (
              <li key={link.hash}>
                <a
                  className={clsx(
                    'relative px-4 py-2 rounded-full text-sm font-normal text-gray-400 transition-all duration-200 block cursor-pointer',
                    {
                      'hover:text-gray-300': !isActive,
                    },
                  )}
                  href={link.hash}
                  onClick={(e) => onLinkClick(e, link)}
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
                'relative px-4 py-2 rounded-full text-sm font-normal text-gray-400 transition-all duration-200 block cursor-pointer',
                {
                  'hover:text-gray-300': activeSection !== 'Achievements',
                },
              )}
              href="/achievements"
              onClick={onAchievementsClick}
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
  )
}

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
      <MobileHeader
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
        onAchievementsClick={handleAchievementsClick}
      />

      <DesktopHeader
        activeSection={activeSection}
        isScrolled={isScrolled}
        onLinkClick={handleLinkClick}
        onAchievementsClick={handleAchievementsClick}
      />

      <div className={`fixed right-4 md:right-6 z-50 transition-transform duration-300 ${isScrolled ? 'top-2 md:top-2 -translate-y-2' : 'top-4 md:top-6'}`}>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default memo(Header)
