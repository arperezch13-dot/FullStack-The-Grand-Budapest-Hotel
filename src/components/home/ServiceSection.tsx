/* título y tarjetas giratorias de las habitaciones */

import { useLanguage } from '../../hooks/useLanguage'
import type { Room } from '../../data/rooms'
import FlipCard from './FlipCard'

interface ServiceSectionProps {
  rooms: Room[]
}

export default function ServiceSection({ rooms }: ServiceSectionProps) {
  const { t } = useLanguage()
  const { service } = t.home

  return (
    <section className="service">
      <div className="service__tittle">
        <h2 className="text-lg">
          {service.line1} <br />
          <strong>{service.line2Strong}</strong>
          <span className="italic">{service.line2Italic}</span> <br />
          {service.line3}
          <strong className="burn-word">{service.line3Burn}</strong>
        </h2>
      </div>

      <div className="service__content">
        <div className="service__card">
          {rooms.map((room, index) => (
            <FlipCard key={room.slug} room={room} index={index} />
          ))}
        </div>

        {/* Wave */}
        <div className="wave__container">
          <div className="white__wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 288">
              <path
                fill="#fdf6ee"
                fillOpacity="1"
                d="M0,160L30,160C60,160,120,160,180,144C240,128,300,96,360,112C420,128,480,192,540,186.7C600,181,660,107,720,106.7C780,107,840,181,900,213.3C960,245,1020,235,1080,202.7C1140,171,1200,117,1260,112C1320,107,1380,149,1410,170.7L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
