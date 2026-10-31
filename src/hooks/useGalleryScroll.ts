/* Animación de la galería al hacer scroll las dos fotos se separan hacia los lados y aparece el texto central */

import { useEffect } from 'react'
import type { RefObject } from 'react'

interface GalleryRefs {
  section: RefObject<HTMLElement | null>
  block: RefObject<HTMLElement | null>
  left: RefObject<HTMLElement | null>
  right: RefObject<HTMLElement | null>
  text: RefObject<HTMLElement | null>
}

export function useGalleryScroll(refs: GalleryRefs, contentKey: string) {
  const { section: sectionRef, block: blockRef, left: leftRef, right: rightRef, text: textRef } = refs

  useEffect(() => {
    const section = sectionRef.current
    const block = blockRef.current
    const leftPhoto = leftRef.current
    const rightPhoto = rightRef.current
    const centerText = textRef.current
    if (!section || !block || !leftPhoto || !rightPhoto || !centerText) return

    const compactQuery = window.matchMedia('(max-width: 1024px)')

    let galleryStart = 0
    let galleryScrollRange = 1
    let textStart = 0.1
    let frameId: number | null = null

    const updateMetrics = () => {
      galleryStart = section.offsetTop
      galleryScrollRange = Math.max(section.offsetHeight - window.innerHeight, 1)
      textStart = 0.1

      if (compactQuery.matches) {
        const viewport = window.innerHeight

        // Empieza a abrirse cuando el bloque llega al 80 % de la pantalla...
        galleryStart = section.offsetTop + block.offsetTop - viewport * 0.8
        // ...y termina de abrirse en medio recorrido de pantalla, para aparecer el texto en el centro de la pantalla
        galleryScrollRange = Math.max(viewport * 0.5, 1)

        // El texto aparece cuando el hueco entre las fotos ya es tan ancho como él
        const widest = Array.from(centerText.children).reduce((max, element) => {
          const range = document.createRange()
          range.selectNodeContents(element)
          return Math.max(max, range.getBoundingClientRect().width)
        }, 0)
        const textRatio = Math.min((widest + 24) / window.innerWidth, 0.95)
        textStart = Math.max(0.1, textRatio - 0.12)
      }
    }

    const update = () => {
      frameId = null
      const scrollY = window.scrollY

      if (scrollY > galleryStart && scrollY < galleryStart + galleryScrollRange) {
        const progress = (scrollY - galleryStart) / galleryScrollRange
        leftPhoto.style.transform = `translateX(-${progress * 100}%)`
        rightPhoto.style.transform = `translateX(${progress * 100}%)`

        const textProgress = Math.min(Math.max((progress - textStart) / 0.12, 0), 1)
        centerText.style.opacity = String(textProgress)
        centerText.style.transform = `translateX(-50%) scale(${0.9 + 0.1 * textProgress})`
      } else if (scrollY >= galleryStart + galleryScrollRange) {
        // Pasado el tramo de la animación, las fotos quedan abiertas del todo
        leftPhoto.style.transform = 'translateX(-100%)'
        rightPhoto.style.transform = 'translateX(100%)'
        centerText.style.opacity = '1'
        centerText.style.transform = 'translateX(-50%) scale(1)'
      } else {
        leftPhoto.style.transform = 'translateX(0)'
        rightPhoto.style.transform = 'translateX(0)'
        centerText.style.opacity = '0'
        centerText.style.transform = 'translateX(-50%) scale(0.9)'
      }
    }

    const schedule = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      updateMetrics()
      schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onResize)
    updateMetrics()
    schedule()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [sectionRef, blockRef, leftRef, rightRef, textRef, contentKey])
}
