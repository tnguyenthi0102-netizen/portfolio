import { useEffect, useState } from 'react'
import { getPreferredTheme, resolveTheme, setTheme, type ThemeMode } from '@/lib/theme'
import { BsMoon, BsSun } from 'react-icons/bs'

function ThemeToggle() {
  const [current, setCurrent] = useState<'light' | 'dark'>(resolveTheme(getPreferredTheme()))

  const nextMode = (mode: 'light' | 'dark'): ThemeMode => (mode === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme-preference') setCurrent(resolveTheme(getPreferredTheme()))
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMedia = () => setCurrent(resolveTheme(getPreferredTheme()))

    window.addEventListener('storage', handleStorage)
    if (mql.addEventListener) mql.addEventListener('change', handleMedia)
    else mql.addListener(handleMedia)

    return () => {
      window.removeEventListener('storage', handleStorage)
      if (mql.removeEventListener) mql.removeEventListener('change', handleMedia)
      else mql.removeListener(handleMedia)
    }
  }, [])

  const onClick = () => {
    const next = nextMode(current)
    setTheme(next)
    setCurrent(resolveTheme(next))
  }

  return (
    <button
      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-gray-950/80 flex items-center justify-center text-xl md:text-2xl text-gray-700 dark:text-gray-200 shadow-lg hover:scale-110 active:scale-105 transition fixed top-4 right-4 md:top-6 md:right-6 z-50"
      onClick={onClick}
      aria-label="Toggle theme"
    >
      {current === 'dark' ? <BsSun /> : <BsMoon />}
    </button>
  )
}

export default ThemeToggle


