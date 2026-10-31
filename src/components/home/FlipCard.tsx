
import { useNavigate } from 'react-router-dom'

import { roomImages } from '../../data/roomImages'
import { useLanguage } from '../../hooks/useLanguage'
import type { Room } from '../../data/rooms'

interface FlipCardProps {
  room: Room
  // Posición en la lista: alterna el estilo "odd" / "even" de las tarjetas
  index: number
}

export default function FlipCard({ room, index }: FlipCardProps) {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const images = roomImages[room.slug]
  // Texto traducido (si no existe traducción se usa el de la propia habitación)
  const text = t.rooms[room.slug]
  const name = text?.name ?? room.name
  const category = text?.category ?? room.category
  const description = text?.description ?? room.description
  const amenities = text?.amenities ?? room.amenities

  const parity = index % 2 === 0 ? 'odd' : 'even'

  return (
    <div className="flip-card">
      <div className="card__front">
        <div className="hexagon">
          {images && <img className="room" src={images.front} alt={text?.alt ?? name} />}
        </div>
        <div className={`card__text ${parity}`}>
          <h3>{name}</h3>
          <p>
            <strong>{category}</strong>
          </p>
          <p>{description}</p>
        </div>
      </div>

      <div className="card__back">
        <div className="hexagon">
          {images && <img className="room" src={images.back} alt={text?.altBack ?? name} />}
        </div>
        <div className={`card__text ${parity}`}>
          <p>
            {t.home.priceLabel} {room.price}€
          </p>
          <p>
            {t.home.amenitiesLabel} {amenities.join(', ')}.
          </p>
          <button
            className="book-btn"
            type="button"
            onClick={() => navigate(`/book-now?suite=${room.slug}`)}
          >
            {t.home.bookNow}
          </button>
        </div>
      </div>
    </div>
  )
}
