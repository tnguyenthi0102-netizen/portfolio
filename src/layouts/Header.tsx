import { Link, NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { useTheme } from '@/contexts/theme'

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('px-3 py-2 rounded-md text-[--text-sm] font-medium', isActive ? 'text-[--color-accent]' : 'text-[--color-muted] hover:text-[--color-fg]')

  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[--color-card]/80 supports-[backdrop-filter]:bg-[--color-card]/70 border-b border-[--color-border]">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide">
          S5Tech Warrior
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <button
            className="ml-2 px-3 py-1.5 rounded-md text-[--text-xs] border border-[--color-border] bg-[--color-card] text-[--color-fg] hover:bg-[--color-border]/20"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header


