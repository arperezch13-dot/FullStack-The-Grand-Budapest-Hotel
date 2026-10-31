/* Página izquierda de la carta (solo lectura): escudo, título, cita de M. Gustave, datos postales y posdata */

import { useLanguage } from '../../hooks/useLanguage'

export default function LetterLeftPage() {
  const { t } = useLanguage()
  const { letter } = t

  return (
    <div className="letter-page letter-page--left">
      <div className="letter-crest" aria-hidden="true">
        <strong>1932</strong>
        <span>{letter.crestLabel}</span>
      </div>
      <p className="letter-typed">{letter.country}</p>
      <h1 className="letter-title">{letter.title}</h1>
      <p className="letter-society">{letter.society}</p>

      <figure className="letter-quote">
        <blockquote>{letter.quote}</blockquote>
        <figcaption>{letter.quoteAuthor}</figcaption>
      </figure>

      <dl className="letter-facts">
        <div>
          <dt>{letter.factPostal}</dt>
          <dd>NZ-3200-ZUB</dd>
        </div>
        <div>
          <dt>{letter.factTower}</dt>
          <dd>442.8 kHz · B</dd>
        </div>
        <div>
          <dt>{letter.factTea}</dt>
          <dd>16:30 — 18:00</dd>
        </div>
      </dl>

      <div className="letter-ps">
        <p className="letter-ps__label">{letter.psLabel}</p>
        <p>{letter.psText}</p>
      </div>
    </div>
  )
}
