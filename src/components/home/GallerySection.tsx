/* Sección de la galería: título, texto y tarjetas del personal */

import { useRef } from 'react'

import { useGalleryScroll } from '../../hooks/useGalleryScroll'
import { useLanguage } from '../../hooks/useLanguage'
import StaffCards from './StaffCards'

export default function GallerySection() {
  const { t } = useLanguage()
  const { gallery } = t.home

  const sectionRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGalleryScroll(
    { section: sectionRef, block: blockRef, left: leftRef, right: rightRef, text: textRef },
    gallery.staffBefore + gallery.staffAfter,
  )

  return (
    <section className="gallery flex-column" ref={sectionRef}>
      <div className="gallery__block" ref={blockRef}>
        <div className="gallery__tittle">
          <h2 className="text-lg">
            {gallery.titleBefore}
            <strong>{gallery.titleStrong}</strong> <span className="italic">{gallery.titleItalic}</span>
          </h2>
        </div>

        <div className="staff-text" ref={textRef}>
          <h3>
            {gallery.staffBefore}
            <span className="italic">{gallery.staffItalic}</span>
            {gallery.staffAfter}
          </h3>
          <p>{gallery.staffText}</p>
        </div>

        <div className="gallery-image right" ref={rightRef}>
          <div className="gallery-frame">
            <img src="/Media/Concierge.webp" alt={gallery.image1Alt} />
          </div>
        </div>
        <div className="gallery-image left" ref={leftRef}>
          <div className="gallery-frame">
            <img src="/Media/Mendls.webp" alt={gallery.image2Alt} />
          </div>
        </div>
      </div>

      {/* Tarjetas del personal */}
      <StaffCards />
    </section>
  )
}
