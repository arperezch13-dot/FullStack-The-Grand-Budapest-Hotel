/* Contadores de adultos, niños y suites. Los botones se desactivan al llegar al mínimo o al máximo de cada contador */

import { GUEST_LIMITS } from '../../data/bookingOptions'
import type { GuestType } from '../../data/bookingOptions'
import { useLanguage } from '../../hooks/useLanguage'
import type { BookingState } from '../../hooks/useBooking'

export default function GuestsSection({ booking }: { booking: BookingState }) {
  const { t } = useLanguage()
  const { booknow } = t

  // Cada fila: tipo, textos y etiquetas de los botones
  const rows: { type: GuestType; label: string; hint: string; less: string; more: string }[] = [
    { type: 'adults', label: booknow.adults, hint: booknow.adultsHint, less: booknow.fewerAdults, more: booknow.moreAdults },
    { type: 'children', label: booknow.children, hint: booknow.childrenHint, less: booknow.fewerChildren, more: booknow.moreChildren },
    { type: 'suites', label: booknow.suites, hint: booknow.suitesHint, less: booknow.fewerSuites, more: booknow.moreSuites },
  ]

  return (
    <section className="booking-block booking-block--last" id="guests">
      <div className="booking-block__inner reveal">
        <div className="booking-block__head">
          <span className="booking-num">03</span>
          <h2 className="booking-title">{booknow.guestsTitle}</h2>
        </div>

        <div className="guests">
          {rows.map((row) => {
            const value = booking.guests[row.type]
            const { min, max } = GUEST_LIMITS[row.type]

            return (
              <div className="guest" key={row.type}>
                <div className="guest__text">
                  <p className="guest__label">{row.label}</p>
                  <p className="guest__hint">{row.hint}</p>
                </div>
                <div className="guest__counter">
                  <button
                    className="guest__btn"
                    type="button"
                    aria-label={row.less}
                    disabled={value <= min}
                    onClick={() => booking.changeGuests(row.type, -1)}
                  >
                    &minus;
                  </button>
                  <output className="guest__value">{value}</output>
                  <button
                    className="guest__btn guest__btn--plus"
                    type="button"
                    aria-label={row.more}
                    disabled={value >= max}
                    onClick={() => booking.changeGuests(row.type, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
