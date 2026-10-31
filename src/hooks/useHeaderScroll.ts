/* Devuelve true cuando se ha bajado más de 40px */

import { useEffect, useState } from 'react'

const SHRINK_AFTER = 40

export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > SHRINK_AFTER)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AFTER)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}
