/* Estructura común a todas las páginas: Header, Drawer (menú lateral), backdrop, contenido y footer */

import { Outlet } from 'react-router-dom'

import { useNavDrawer } from '../../hooks/useNavDrawer'
import Header from './Header'
import Drawer from './Drawer'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  const { open, toggle, close } = useNavDrawer()

  return (
    <>
      <ScrollToTop />
      <Header navOpen={open} onToggleNav={toggle} />
      <Drawer open={open} onClose={close} />

      {/* Overlay sombreado con blur: al pulsarlo se cierra el menú */}
      <div className="nav-backdrop" aria-hidden="true" onClick={close} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
