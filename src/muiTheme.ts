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
      fontFamily: themeConfig.fontFamily.sans.join(','),
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
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 0,
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
              // border: 'none'
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

