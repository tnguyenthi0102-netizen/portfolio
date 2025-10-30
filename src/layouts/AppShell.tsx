import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[--color-bg] text-[--color-fg]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppShell


