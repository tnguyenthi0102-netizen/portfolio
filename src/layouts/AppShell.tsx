import { Outlet } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router'
import Header from './Header'
import Footer from './Footer'

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg">
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


