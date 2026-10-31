/* Filas seleccionables con cada suite. Los datos salen de useRooms (precio) y de las traducciones (nombre y categoría) */

import { roomImages } from '../../data/roomImages'
import { useLanguage } from '../../hooks/useLanguage'
import type { BookingState } from '../../hooks/useBooking'
import { formatPrice } from '../../utils/format'
import type { Room } from '../../data/rooms'

interface SuitePickerProps {
  booking: BookingState
  rooms: Room[]
}

export default function SuitePicker({ booking, rooms }: SuitePickerProps) {
  const { t, lang } = useLanguage()
  const { booknow } = t
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'

  return (
    <section className="booking-block" id="suite">
      <div className="booking-block__inner reveal">
        <div className="booking-block__head">
          <span className="booking-num">02</span>
          <h2 className="booking-title">{booknow.suiteTitle}</h2>
        </div>
        <p className="booking-hint">{booknow.suiteHint}</p>

        <fieldset className="picks">
          <legend className="sr-only">{booknow.suiteLegend}</legend>

          {rooms.map((room) => {
            const text = t.rooms[room.slug]
            const selected = booking.suite?.slug === room.slug

            return (
              <label className={`pick${selected ? ' is-selected' : ''}`} htmlFor={`suite-${room.slug}`} key={room.slug}>
                <input
                  className="pick__input"
                  type="radio"
                  name="suite"
                  id={`suite-${room.slug}`}
                  value={room.slug}
                  checked={selected}
                  onChange={() => booking.selectSuite(room.slug)}
                />
                <span className="pick__photo">
                  <img src={roomImages[room.slug]?.front} alt="" loading="lazy" />
                </span>
                <span className="pick__body">
                  <span className="pick__cat">{text?.category ?? room.category}</span>
                  <span className="pick__name">{text?.name ?? room.name}</span>
                </span>
                <span className="pick__price">
                  <strong>{formatPrice(room.price, locale)}</strong>
                  <small>{booknow.perNight}</small>
                </span>
                <span className="pick__mark" aria-hidden="true"></span>
              </label>
            )
          })}
        </fieldset>
      </div>
    </section>
  )
}
