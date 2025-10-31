import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react-router'
import { initTheme } from '@/lib/theme'
import Header from './Header'
import Footer from './Footer'

function AppShell() {
  useEffect(() => {
    initTheme()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[--color-bg] text-[--color-fg]">
      <Header />
      <main className="flex-1 mt-30">
        <NuqsAdapter>
          <Outlet />
        </NuqsAdapter>
      </main>
      <Footer />
    </div>
  )
}

export default AppShell


