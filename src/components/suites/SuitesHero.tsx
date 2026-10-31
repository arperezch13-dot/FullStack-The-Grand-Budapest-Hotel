/* Cabecera de la página de suites: título, texto de presentación y placa con los precios */

import { useLanguage } from '../../hooks/useLanguage'
import PricePlaque from './PricePlaque'

interface SuitesHeroProps {
  minPrice: number
  maxPrice: number
}

export default function SuitesHero({ minPrice, maxPrice }: SuitesHeroProps) {
  const { t } = useLanguage()
  const { suites } = t

  return (
    <section className="suites-hero">
      <div className="suites-hero__inner">
        <div className="suites-hero__text reveal">
          <p className="suites-eyebrow suites-eyebrow--rose">{suites.heroEyebrow}</p>
          <h1 className="suites-hero__title">
            {suites.heroTitleLine1}
            <br />
            {suites.heroTitleLine2}
          </h1>
          <p className="suites-hero__lead">{suites.heroLead}</p>
          <a className="suites-btn" href="#rates">
            {suites.rateCardLink}
          </a>
        </div>

        <PricePlaque minPrice={minPrice} maxPrice={maxPrice} />
      </div>
    </section>
  )
}
