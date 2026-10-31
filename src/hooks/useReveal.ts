/* Aparición al hacer scroll */

import { useEffect } from 'react'
import type { RefObject } from 'react'


const DEFAULT_OPTIONS: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }

export function useReveal(
  containerRef: RefObject<HTMLElement | null>,
  refreshKey: unknown = null,
  options: IntersectionObserverInit = DEFAULT_OPTIONS,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('.reveal')
    if (!items.length) return

    container.classList.add('is-ready')

    // Navegadores antiguos: se muestra todo directamente
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      options,
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [containerRef, refreshKey, options])
}
