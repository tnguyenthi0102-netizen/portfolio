import { createTheme } from '@mui/material/styles'

const getCSSVariable = (varName: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return value || fallback
}

const isDark = document.documentElement.classList.contains('dark')

const getThemeColor = () => {
  const accent = getCSSVariable('--color-accent', '#6366f1')
  const bg = getCSSVariable('--color-bg', isDark ? '#111827' : '#ffffff')
  const card = getCSSVariable('--color-card', isDark ? '#717172' : '#f9fafb')
  const fg = getCSSVariable('--color-fg', isDark ? '#f9fafb' : '#1f2937')
  const muted = getCSSVariable('--color-muted', isDark ? '#9ca3af' : '#6b7280')
  const border = getCSSVariable('--color-border', isDark ? '#5b5c5d' : '#e5e7eb')
  
  return { accent, bg, card, fg, muted, border }
}

const colors = getThemeColor()

export const muiTheme = createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    primary: {
      main: colors.accent,
    },
    background: {
      default: colors.bg,
      paper: colors.card,
    },
    text: {
      primary: colors.fg,
      secondary: colors.muted,
    },
    divider: colors.border,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bg,
          color: colors.fg,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.accent,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.accent,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: colors.fg,
          },
          '& .MuiInputLabel-root': {
            color: colors.muted,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            color: colors.fg,
            borderColor: colors.border,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
          color: colors.fg,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.card,
          color: colors.fg,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.bg,
          color: colors.fg,
        },
      },
    },
  },
})

export const createDynamicTheme = () => {
  const colors = getThemeColor()
  
  return createTheme({
    palette: {
      mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      primary: {
        main: colors.accent,
      },
      background: {
        default: colors.bg,
        paper: colors.card,
      },
      text: {
        primary: colors.fg,
        secondary: colors.muted,
      },
      divider: colors.border,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: colors.bg,
            color: colors.fg,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.accent,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.accent,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: colors.fg,
            },
            '& .MuiInputLabel-root': {
              color: colors.muted,
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              color: colors.fg,
              borderColor: colors.border,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: colors.border,
            color: colors.fg,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.card,
            color: colors.fg,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.bg,
            color: colors.fg,
          },
        },
      },
    },
  })
}
