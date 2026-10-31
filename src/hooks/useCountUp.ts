/*  Contador animado: sube de 0 al valor final */

import { useEffect, useState } from 'react'

const DURATION = 900

export function useCountUp(finalValue: number) {
  const [current, setCurrent] = useState(0)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return

    let frameId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // frena al final
      setCurrent(Math.round(finalValue * eased))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [finalValue, reduceMotion])

  return reduceMotion ? finalValue : current
}
