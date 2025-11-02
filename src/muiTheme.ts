import { createTheme } from '@mui/material/styles'
import { getColors, themeConfig } from './theme'

export function getMuiTheme(isDark: boolean) {
  const colors = getColors(isDark)
  
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { 
        main: colors.bg,
      },
      error: {
        main: colors.error,
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
    typography: {
      fontSize: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            backgroundColor: colors.bg,
            color: colors.muted,
            '&:hover': {
              backgroundColor: colors.card,
            },
          },
          text: {
            color: isDark ? colors.fg : '#9ca3af',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            },
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
              borderColor: colors.border,
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
            '& .MuiInputLabel-root.Mui-focused': {
              color: colors.muted,
            },
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              color: colors.muted,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: colors.muted,
            },
            '&.MuiInputLabel-shrink.Mui-focused': {
              color: colors.muted,
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '&.MuiPickersTextField-root .MuiPickersInputBase-root': {
              backgroundColor: colors.bg,
            },

          },
        },
      },
      
    },
  })
}

