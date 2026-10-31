/* Aparición de las tarjetas del personal */

import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useStaffReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = container.querySelectorAll('.staff-card')

    // Se muestran con JS, si JS falla, las tarjetas se ven igualmente
    container.classList.add('is-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          cards.forEach((card) => card.classList.add('is-visible'))
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      container.classList.remove('is-ready')
    }
  }, [containerRef])
}
