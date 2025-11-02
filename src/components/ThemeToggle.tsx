import { useTheme } from '@/ThemeProvider.tsx'
import { BsMoon, BsSun } from 'react-icons/bs'

function ThemeToggle() {
  const { mode, toggleColorMode } = useTheme()
  const isDark =
    mode === 'dark' ||
    (mode === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-card 
      flex items-center justify-center text-xl md:text-2xl text-fg shadow-lg 
      hover:scale-110 active:scale-105 transition 
      fixed top-16 right-4 md:top-4 md:right-6 z-50"
      onClick={toggleColorMode}
      aria-label="Toggle theme"
    >
      {isDark ? <BsSun /> : <BsMoon />}
    </button>
  )
}

export default ThemeToggle
