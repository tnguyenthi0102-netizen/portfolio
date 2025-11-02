type ColorTokens = {
  bg: string
  fg: string
  muted: string
  border: string
  card: string
  accent: string
  accentFg: string
}

type FontSizeTokens = {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

const lightColors = {
  bg: '#fefefe',
  fg: '#1f2937',
  cardBg: '#ffffff',
  muted: '#6b7280',
  border: '#e5e7eb',
  card: '#f5f5f5',
  accent: '#6366f1',
  accentFg: '#ffffff',
  error: '#ef5544',
}

const darkColors = {
  bg: '#111827',
  cardBg: '#1f2937',
  fg: '#f9fafb',
  muted: '#9ca3af',
  border: '#5b5c5d',
  card: '#1f2937',
  accent: '#818cf8',
  accentFg: '#ffffff',
  error: '#ef5544',
}

export function getColors(isDark: boolean) {
  return isDark ? darkColors : lightColors
}

const fontSizes: FontSizeTokens = {
  xs: 'clamp(0.75rem, 0.71rem + 0.19vw, 0.8rem)',
  sm: 'clamp(0.875rem, 0.84rem + 0.23vw, 0.95rem)',
  base: 'clamp(1rem, 0.95rem + 0.27vw, 1.1rem)',
  lg: 'clamp(1.125rem, 1.06rem + 0.35vw, 1.3rem)',
  xl: 'clamp(1.25rem, 1.15rem + 0.46vw, 1.6rem)',
  '2xl': 'clamp(1.5rem, 1.35rem + 0.73vw, 2rem)',
  '3xl': 'clamp(1.875rem, 1.63rem + 1.23vw, 2.5rem)',
  '4xl': 'clamp(2.25rem, 1.92rem + 1.64vw, 3rem)',
}

export function applyColorsToCSSVariables(mode: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return
  const colors = themeConfig[mode]
  Object.entries(colors).forEach(([k, v]) =>
    document.documentElement.style.setProperty(
      `--color-${k.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
      v,
    ),
  )
}

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

function getSystemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export function getPreferredTheme(): ThemeMode {
  const saved =
    typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) : null
  return saved ?? 'system'
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return getSystemPrefersDark() ? 'dark' : 'light'
  return mode
}

export function setDocumentTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const effective = resolveTheme(mode)
  root.classList.toggle('dark', effective === 'dark')
  applyColorsToCSSVariables(effective)
}

export function setTheme(mode: ThemeMode): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, mode)
  setDocumentTheme(mode)
}

export function initTheme(): void {
  const mode = getPreferredTheme()
  setDocumentTheme(mode)
}

export const themeConfig = {
  light: {
    bg: lightColors.bg,
    cardBg: lightColors.cardBg,
    fg: lightColors.fg,
    muted: lightColors.muted,
    border: lightColors.border,
    card: lightColors.card,
    accent: lightColors.accent,
    accentFg: lightColors.accentFg,
  },
  dark: {
    bg: darkColors.bg,
    cardBg: darkColors.cardBg,
    fg: darkColors.fg,
    muted: darkColors.muted,
    border: darkColors.border,
    card: darkColors.card,
    accent: darkColors.accent,
    accentFg: darkColors.accentFg,
  },

  fontSize: {
    xs: fontSizes.xs,
    sm: fontSizes.sm,
    base: fontSizes.base,
    lg: fontSizes.lg,
    xl: fontSizes.xl,
    '2xl': fontSizes['2xl'],
    '3xl': fontSizes['3xl'],
    '4xl': fontSizes['4xl'],
  },
}
