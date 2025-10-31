import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/layouts/AppShell'
import Landing from '@/pages/Landing'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import Contact from '@/pages/Contact'
import Achievements from '@/pages/Achievements'
import NotFound from '@/pages/NotFound'
import RouteError from '@/components/RouteError'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
      { path: 'achievements', element: <Achievements /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router


