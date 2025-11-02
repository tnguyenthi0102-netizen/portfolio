import { Outlet } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg">
      <Header />
      <main className="flex-1">
        <Box sx={{ mt: { xs: 5, sm: 15 } }}>
        <NuqsAdapter>
          <Outlet />
        </NuqsAdapter>
        </Box>
      </main>
      <Footer />
    </div>
  )
}

export default AppShell
