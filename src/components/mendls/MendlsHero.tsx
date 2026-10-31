/* Cabecera de la pastelería y pieza destacada (la famosa caja hexagonal rosa) */

import { useLanguage } from '../../hooks/useLanguage'

export default function MendlsHero() {
  const { t } = useLanguage()
  const { mendls } = t

  return (
    <section className="mendls-hero">
      <div className="mendls-hero__head reveal">
        <h1 className="mendls-hero__title">{mendls.heroTitle}</h1>
        <p className="mendls-hero__lead">{mendls.heroLead}</p>
      </div>

      <article className="feature reveal">
        <div className="feature__photo">
          <img src="/Media/Mendls/mendls box.webp" alt={mendls.featureAlt} />
        </div>
        <div className="feature__body">
          <span className="mendls-badge">{mendls.featureBadge}</span>
          <h2 className="feature__title">
            {mendls.featureTitleBefore}
            <em>{mendls.featureTitleEm}</em>
            {mendls.featureTitleAfter}
          </h2>
          <p className="feature__text">{mendls.featureText}</p>
          <a className="mendls-btn mendls-btn--gold" href="#carta">
            {mendls.featureButton}
          </a>
        </div>
      </article>
    </section>
  )
}
