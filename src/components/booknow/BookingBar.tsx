/* Barra de resumen fija en la parte inferior: suite, fechas, huéspedes, total y botón "siguiente" */

import { useLanguage } from '../../hooks/useLanguage'
import type { BookingState } from '../../hooks/useBooking'
import { formatPrice, formatShortDate, pluralize } from '../../utils/format'

/** Texto de huéspedes: "2 adults · 1 child · 2 suites". */
export function guestsText(
  guests: BookingState['guests'],
  units: Record<'adult' | 'adults' | 'child' | 'children' | 'suite' | 'suites', string>,
): string {
  const parts = [pluralize(guests.adults, units.adult, units.adults)]
  if (guests.children > 0) parts.push(pluralize(guests.children, units.child, units.children))
  if (guests.suites > 1) parts.push(`${guests.suites} ${units.suites}`)
  return parts.join(' · ')
}

interface BookingBarProps {
  booking: BookingState
  onNext: () => void
}

export default function BookingBar({ booking, onNext }: BookingBarProps) {
  const { t, lang } = useLanguage()
  const { booknow } = t
  const { units } = booknow
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const { checkIn, checkOut, suite, nights } = booking

  // Línea de fechas
  let dates = booknow.barPickArrival
  if (checkIn && checkOut) {
    dates = `${formatShortDate(checkIn, locale)} – ${formatShortDate(checkOut, locale)} · ${pluralize(nights, units.night, units.nights)}`
  } else if (checkIn) {
    dates = booknow.barPickDeparture.replace('{from}', formatShortDate(checkIn, locale))
  }

  // Total: muestra el precio por noche
  let totalLabel = booknow.total
  let totalValue = '—'
  if (nights > 0 && suite) {
    totalValue = formatPrice(booking.total, locale)
  } else if (suite) {
    totalLabel = booknow.perNightLabel
    totalValue = formatPrice(suite.price, locale)
  }

  return (
    <div className="booking-bar-wrap">
      <div className="booking-bar" aria-live="polite">
        <div className="booking-bar__info">
          <p className="booking-bar__suite">{suite ? (t.rooms[suite.slug]?.name ?? suite.name) : booknow.barChooseSuite}</p>
          <p>{dates}</p>
          <p>{guestsText(booking.guests, units)}</p>
        </div>
        <div className="booking-bar__buy">
          <p className="booking-bar__total">
            <span>{totalLabel}</span>
            <strong>{totalValue}</strong>
          </p>
          <button className="booking-bar__next" type="button" disabled={!booking.canContinue} onClick={onNext}>
            {booknow.next}
          </button>
        </div>
      </div>
    </div>
  )
}
