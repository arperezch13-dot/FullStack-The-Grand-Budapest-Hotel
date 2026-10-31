/* Página de inicio. Une las secciones: vídeo, cita, alojamientos y galería personal */

import GallerySection from '../components/home/GallerySection'
import HeroQuote from '../components/home/HeroQuote'
import ServiceSection from '../components/home/ServiceSection'
import VideoBanner from '../components/home/VideoBanner'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLanguage } from '../hooks/useLanguage'
import { useRooms } from '../hooks/useRooms'

export default function Home() {
  const { t } = useLanguage()
  const { rooms } = useRooms()
  useDocumentTitle(t.home.title)

  return (
    <>
      <VideoBanner />
      <HeroQuote />
      <ServiceSection rooms={rooms} />
      <GallerySection />
    </>
  )
}
