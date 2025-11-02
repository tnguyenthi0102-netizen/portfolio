import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ThemeProvider } from './ThemeProvider'
import { Toaster } from 'sonner'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'

function App() {
  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </ThemeProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  )
}

export default App
