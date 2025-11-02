import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { getMuiTheme } from './muiTheme'
import { getPreferredTheme, setTheme, setDocumentTheme, type ThemeMode } from './theme'

type ThemeContextType = {
  mode: ThemeMode
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => getPreferredTheme())
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (mode === 'system') {
      return (
        typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    }
    return mode === 'dark'
  })

  useEffect(() => {
    setDocumentTheme(mode)
    const effectiveIsDark =
      mode === 'system'
        ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        : mode === 'dark'
    setIsDark(effectiveIsDark)

    if (mode === 'system' && typeof window !== 'undefined') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        const newIsDark = mql.matches
        setIsDark(newIsDark)
        setDocumentTheme('system')
      }
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
  }, [mode])

  const toggleColorMode = () => {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setMode(nextMode)
    setTheme(nextMode)
  }

  const muiTheme = getMuiTheme(isDark)

  const value = {
    mode,
    toggleColorMode,
  }

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
