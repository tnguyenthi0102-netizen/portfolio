import { Link, NavLink } from 'react-router-dom'
import { clsx } from 'clsx'

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('px-3 py-2 rounded-md text-sm font-medium', isActive ? 'text-white' : 'text-neutral-300 hover:text-white')

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70 bg-neutral-900/80 border-b border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide">
          S5Tech Warrior
        </Link>
        <nav className="flex items-center gap-1">
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
        </nav>
      </div>
    </header>
  )
}

export default Header


