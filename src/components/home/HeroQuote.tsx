/* Frase principal del hero: título, autor y waves */

import { useRef } from 'react'
import type { ReactNode } from 'react'

import { useHeroScroll } from '../../hooks/useHeroScroll'
import { useLanguage } from '../../hooks/useLanguage'

/* Divide un texto en letras */
function renderLetters(text: string, keyPrefix: string): ReactNode[] {
  return Array.from(text).map((character, index) =>
    character === ' ' ? (
      ' '
    ) : (
      <span className="hero-letter" key={`${keyPrefix}-${index}`}>
        {character}
      </span>
    ),
  )
}

export default function HeroQuote() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const { quoteBefore, quoteHighlight, quoteAfter } = t.home
  useHeroScroll(sectionRef, titleRef, quoteBefore + quoteHighlight + quoteAfter)

  return (
    <section className="hero__container flex-column" ref={sectionRef}>
      <div className="hero__block">
        <h2 className="text-lg" ref={titleRef}>
          {renderLetters(quoteBefore, 'b')}
          <span className="glimmers-word">{renderLetters(quoteHighlight, 'h')}</span>
          {renderLetters(quoteAfter, 'a')}
        </h2>
        <p className="text-md">{t.home.quoteAuthor}</p>
      </div>

      {/* Waves*/}

      <div className="wave__container">
        <div className="wave pink__wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs>
              <pattern id="pinkWaveHeroTexture" patternUnits="userSpaceOnUse" width="360" height="360">
                <rect width="100%" height="100%" fill="#fbc5d8"></rect>
                <image className="pathern" href="/Media/pathern.webp" opacity="1"></image>
                <image href="/Media/natural-paper.png" x="0" y="0" opacity="0.95"></image>
              </pattern>
            </defs>
            <path
              fill="url(#pinkWaveHeroTexture)"
              fillOpacity="1"
              d="M0,32L30,48C60,64,120,96,180,122.7C240,149,300,171,360,181.3C420,192,480,192,540,160C600,128,660,64,720,69.3C780,75,840,149,900,197.3C960,245,1020,267,1080,245.3C1140,224,1200,160,1260,128C1320,96,1380,96,1410,96L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="wave purple__wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#55115a"
              fillOpacity="1"
              d="M0,288L34.3,261.3C68.6,235,137,181,206,144C274.3,107,343,85,411,101.3C480,117,549,171,617,197.3C685.7,224,754,224,823,192C891.4,160,960,96,1029,101.3C1097.1,107,1166,181,1234,208C1302.9,235,1371,213,1406,202.7L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
