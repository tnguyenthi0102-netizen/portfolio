import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[--color-bg] text-[--color-fg]">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppShell


