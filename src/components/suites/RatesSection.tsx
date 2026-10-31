/* Wave tabla de tarifas y llamada final a reservar */

import { Link } from 'react-router-dom'

import { useLanguage } from '../../hooks/useLanguage'
import type { Room } from '../../data/rooms'
import { formatAmenities } from '../../utils/format'

interface RatesSectionProps {
  rooms: Room[]
}

export default function RatesSection({ rooms }: RatesSectionProps) {
  const { t } = useLanguage()
  const { suites } = t

  return (
    <>
      {/* Wave */}
      <div className="suites-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#fdf6ee"
            d="M0,32L30,48C60,64,120,96,180,122.7C240,149,300,171,360,181.3C420,192,480,192,540,160C600,128,660,64,720,69.3C780,75,840,149,900,197.3C960,245,1020,267,1080,245.3C1140,224,1200,160,1260,128C1320,96,1380,96,1410,96L1440,96L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Tabla de tarifas */}
      <section className="rates" id="rates">
        <div className="rates__inner">
          <div className="rates__head reveal">
            <p className="suites-eyebrow suites-eyebrow--gold">{suites.ratesEyebrow}</p>
            <h2 className="suites-title">{suites.ratesTitle}</h2>
          </div>

          <table className="rates__table reveal">
            <thead>
              <tr>
                <th scope="col">{suites.thSuite}</th>
                <th scope="col">{suites.thAmenities}</th>
                <th scope="col">{suites.thPerNight}</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                const text = t.rooms[room.slug]
                return (
                  <tr key={room.slug}>
                    <td>
                      <span className="rates__name">{text?.name ?? room.name}</span>
                      <span className="rates__cat">{text?.category ?? room.category}</span>
                    </td>
                    <td className="rates__amen">{formatAmenities(text?.amenities ?? room.amenities)}</td>
                    <td className="rates__price">{room.price} €</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Llamada a la acción */}
          <div className="rates__cta reveal">
            <p>{suites.ctaText}</p>
            <Link className="suites-btn" to="/book-now">
              {suites.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
