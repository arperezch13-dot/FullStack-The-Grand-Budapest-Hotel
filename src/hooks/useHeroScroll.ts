/* Efecto de scroll en la frase del hero, lalestras se iluminan una a una al bajar y la palabra destacada "glimmers" brilla al pasar */

import { useEffect } from 'react'
import type { RefObject } from 'react'

const STEPS = 12

export function useHeroScroll(
  sectionRef: RefObject<HTMLElement | null>,
  titleRef: RefObject<HTMLElement | null>,
  contentKey: string,
) {
  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    if (!section || !title) return

    const letters = Array.from(title.querySelectorAll<HTMLElement>('.hero-letter'))
    const glimmers = title.querySelector<HTMLElement>('.glimmers-word')

    // Estado limpio (por si el efecto se vuelve a ejecutar)
    letters.forEach((letter) => letter.classList.remove('is-active'))
    glimmers?.classList.remove('is-highlighted')

    let heroStart = section.offsetTop
    let heroScrollRange = 1
    let activeLetters = 0
    let highlighted = false
    let lastStep = -1
    let frameId: number | null = null

    const updateMetrics = () => {
      heroStart = section.offsetTop
      heroScrollRange = Math.max(section.offsetHeight * 0.18, window.innerHeight * 0.35, 1)
    }

    const update = () => {
      frameId = null
      const progress = Math.min(Math.max((window.scrollY - heroStart) / heroScrollRange, 0), 1)
      const step = Math.round(progress * STEPS)

      if (step !== lastStep) {
        const next = Math.ceil((step / STEPS) * letters.length)

        if (next > activeLetters) {
          for (let i = activeLetters; i < next; i += 1) letters[i]?.classList.add('is-active')
        } else if (next < activeLetters) {
          for (let i = next; i < activeLetters; i += 1) letters[i]?.classList.remove('is-active')
        }

        activeLetters = next
        lastStep = step
      }

      const shouldHighlight = progress >= 0.08
      if (glimmers && shouldHighlight !== highlighted) {
        glimmers.classList.toggle('is-highlighted', shouldHighlight)
        highlighted = shouldHighlight
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
  }, [sectionRef, titleRef, contentKey])
}
