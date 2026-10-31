/* Tarjetas del personal */

import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../hooks/useLanguage'
import { useStaffReveal } from '../../hooks/useStaffReveal'

export default function StaffCards() {
  const { t } = useLanguage()
  const { concierge, brigade, bakery } = t.home.staff
  const containerRef = useRef<HTMLDivElement>(null)

  useStaffReveal(containerRef)

  return (
    <div className="staff-cards" ref={containerRef}>
      <div className="staff-cards__grid">
        <article className="staff-card">
          <div className="staff-card__photo">
            <img src="/Media/gustave.jpg" alt={concierge.alt} loading="lazy" />
            <span className="staff-card__caption">{concierge.caption}</span>
          </div>
          <h3 className="staff-card__title">{concierge.title}</h3>
          <p className="staff-card__text">{concierge.text}</p>
        </article>

        <article className="staff-card staff-card--featured">
          <span className="staff-card__badge">{brigade.badge}</span>
          <div className="staff-card__photo">
            <img src="/Media/kid.jpg" alt={brigade.alt} loading="lazy" />
            <span className="staff-card__caption">{brigade.caption}</span>
          </div>
          <h3 className="staff-card__title">{brigade.title}</h3>
          <p className="staff-card__text">{brigade.text}</p>
        </article>

        <article className="staff-card">
          <div className="staff-card__photo">
            <img src="/Media/bakery.webp" alt={bakery.alt} loading="lazy" />
            <span className="staff-card__caption">{bakery.caption}</span>
          </div>
          <h3 className="staff-card__title">
            <Link className="staff-card__link" to="/mendls">
              {bakery.title}
            </Link>
          </h3>
          <p className="staff-card__text">{bakery.text}</p>
        </article>
      </div>
    </div>
  )
}
