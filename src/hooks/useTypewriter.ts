/* Efecto máquina de escribir */

import { useEffect, useState } from 'react'

export function useTypewriter(fullText: string, typingSpeed = 150, startDelay = 500) {
  // Guardamos también el texto al que pertenece el contador, para reiniciar si cambia
  const [progress, setProgress] = useState({ text: fullText, length: 0 })

  useEffect(() => {
    // Velocidad mínima de 40 ms para que no sea demasiado rápida
    const speed = Math.max(typingSpeed, 40)
    let timer: number
    let length = 0

    const typeNext = () => {
      length += 1
      setProgress({ text: fullText, length })
      if (length < fullText.length) {
        timer = window.setTimeout(typeNext, speed)
      }
    }

    timer = window.setTimeout(typeNext, startDelay)
    return () => window.clearTimeout(timer)
  }, [fullText, typingSpeed, startDelay])

  return progress.text === fullText ? fullText.slice(0, progress.length) : ''
}
