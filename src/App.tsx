import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import ErrorBoundary from '@/components/ErrorBoundary'
import ThemeContextProvider from '@/contexts/theme'

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </ErrorBoundary>
  )
}

export default App
