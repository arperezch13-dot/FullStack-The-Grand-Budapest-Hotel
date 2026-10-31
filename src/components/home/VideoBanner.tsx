/* Video y botones de salto a momentos concretos del vídeo */

import { useRef } from 'react'

import { useLanguage } from '../../hooks/useLanguage'
import { useTypewriter } from '../../hooks/useTypewriter'

// Segundos del vídeo a los que salta cada botón
const SEEK_TIMES = [0, 16, 26, 41]

export default function VideoBanner() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const typedTitle = useTypewriter(t.home.title, 150, 500)

  const seekTo = (seconds: number) => {
    if (videoRef.current) videoRef.current.currentTime = seconds
  }

  return (
    <section className="carrousel">
      <div className="carrousel__container">
        <video ref={videoRef} id="gbhvideo" playsInline autoPlay muted loop preload="auto">
          <source src="/Media/Videos/0112_1_.webm" type="video/webm" />
          <source src="/Media/Videos/0112(1).mp4" type="video/mp4" />
        </video>

        <div className="carrousel__content">
          <h1 id="main-title" className="text-xl" aria-label={t.home.title}>
            {typedTitle}
          </h1>
        </div>

        <div className="carrousel-control flex-row">
          {SEEK_TIMES.map((time) => (
            <button key={time} type="button" className="Mendls-btn" onClick={() => seekTo(time)}>
              <img src="/Media/icon.webp" alt={t.home.seekAlt} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
