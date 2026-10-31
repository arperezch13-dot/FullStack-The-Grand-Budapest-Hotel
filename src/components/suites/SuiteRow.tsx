/* Fila de una suite: dos fotos (habitación y zona de estar), categoría, nombre, descripción, servicios, precio y botón de reserva */

import { Link } from 'react-router-dom'

import { roomImages } from '../../data/roomImages'
import { useLanguage } from '../../hooks/useLanguage'
import type { Room } from '../../data/rooms'
import { formatAmenities, toRoman } from '../../utils/format'

interface SuiteRowProps {
  room: Room
  // Posición en la lista: se usa para numerar las suites (I, II, III...) y alternar el estilo "odd" / "even" de la fila 
  index: number
}

export default function SuiteRow({ room, index }: SuiteRowProps) {
  const { t } = useLanguage()

  const images = roomImages[room.slug]
  // Texto traducido (si no hay traducción se usa el de la propia habitación)
  const text = t.rooms[room.slug]
  const name = text?.name ?? room.name
  const category = text?.category ?? room.category
  const description = text?.description ?? room.description
  const amenities = text?.amenities ?? room.amenities

  return (
    <article className="suite-row reveal">
      <div className="suite-row__photos">
        <figure className="suite-photo suite-photo--room">
          <div className="suite-photo__frame">
            {images && <img src={images.front} alt={text?.alt ?? name} loading="lazy" />}
          </div>
          <figcaption>{t.suites.photoRoom}</figcaption>
        </figure>
        <figure className="suite-photo suite-photo--living">
          <div className="suite-photo__frame">
            {images && <img src={images.back} alt={text?.altBack ?? name} loading="lazy" />}
          </div>
          <figcaption>{t.suites.photoLiving}</figcaption>
        </figure>
      </div>

      <div className="suite-row__info">
        <p className="suite-row__cat">
          {t.suites.numberPrefix} {toRoman(index + 1)} · {category}
        </p>
        <h3 className="suite-row__name">{name}</h3>
        <p className="suite-row__desc">{description}</p>
        <p className="suite-row__amen">{formatAmenities(amenities)}</p>
        <div className="suite-row__buy">
          <p className="suite-row__price">
            {room.price} € <span>{t.suites.perNight}</span>
          </p>
          <Link className="suites-btn" to={`/book-now?suite=${room.slug}`}>
            {t.suites.bookNow}
          </Link>
        </div>
      </div>
    </article>
  )
}
