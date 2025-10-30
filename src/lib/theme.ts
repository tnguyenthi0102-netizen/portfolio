export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

function getSystemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function getPreferredTheme(): ThemeMode {
  const saved = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) : null
  return saved ?? 'system'
}

export function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemPrefersDark() ? 'dark' : 'light'
  return mode
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const effective = resolveTheme(mode)
  root.classList.toggle('dark', effective === 'dark')
}

export function setTheme(mode: ThemeMode): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, mode)
  applyTheme(mode)
}

export function initTheme(): void {
  const mode = getPreferredTheme()
  applyTheme(mode)
}