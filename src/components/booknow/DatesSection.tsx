/* Calendario de dos meses, guía de pasos, leyenda y tarjetas de llegada,salida y total */

import { useLanguage } from '../../hooks/useLanguage'
import type { BookingState } from '../../hooks/useBooking'
import { shiftMonth } from '../../utils/bookingDates'
import { formatLongDate, formatPrice, pluralize } from '../../utils/format'
import CalendarMonth from './CalendarMonth'

export default function DatesSection({ booking }: { booking: BookingState }) {
  const { t, lang } = useLanguage()
  const { booknow } = t
  const { units } = booknow
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const { checkIn, checkOut, suite, nights, guests } = booking

  const next = shiftMonth(booking.view.year, booking.view.month, 1)

  // Total de la tarjeta dorada
  let totalText = '—'
  let totalNote = booknow.chooseDatesAndSuite

  if (nights > 0 && suite) {
    totalText = formatPrice(booking.total, locale)
    totalNote =
      `${formatPrice(suite.price, locale)} × ${pluralize(nights, units.night, units.nights)}` +
      (guests.suites > 1 ? ` × ${pluralize(guests.suites, units.suite, units.suites)}` : '')
  } else if (suite) {
    totalText = `${formatPrice(suite.price, locale)} / ${units.night}`
    totalNote = booknow.pickDatesForTotal
  } else if (nights > 0) {
    totalNote = booknow.chooseSuiteForPrice
  }

  return (
    <section className="booking-block" id="dates">
      <div className="booking-block__inner reveal">
        <div className="booking-block__head">
          <span className="booking-num">01</span>
          <h2 className="booking-title">{booknow.datesTitle}</h2>
        </div>

        {/* Guía de dos pasos: marca cuál toca ahora */}
        <ol className="booking-guide" aria-live="polite">
          <li className={`booking-guide__step${checkIn ? ' is-done' : ' is-active'}`}>
            <span>1</span>
            {booknow.guideIn}
          </li>
          <li className={`booking-guide__step${checkOut ? ' is-done' : checkIn ? ' is-active' : ''}`}>
            <span>2</span>
            {booknow.guideOut}
          </li>
        </ol>
        <p className="booking-hint">{booknow.hint}</p>

        <p className="booking-alert" role="status" hidden={!booking.rangeAlert}>
          {booknow.rangeAlert}
        </p>

        <div className="cal">
          <div className="cal__months" onMouseLeave={() => booking.setHoverKey(null)}>
            <CalendarMonth booking={booking} year={booking.view.year} month={booking.view.month} position={0} />
            <CalendarMonth booking={booking} year={next.year} month={next.month} position={1} />
          </div>
          <ul className="cal__legend">
            <li>
              <span className="cal__dot cal__dot--end"></span>
              {booknow.legendEnd}
            </li>
            <li>
              <span className="cal__dot cal__dot--range"></span>
              {booknow.legendRange}
            </li>
            <li>
              <span className="cal__dot cal__dot--off">12</span>
              {booknow.legendOff}
            </li>
          </ul>
        </div>

        <div className="stay">
          <div className={`stay__cell${checkIn ? '' : ' is-next'}`}>
            <p className="stay__label">{booknow.arrival}</p>
            <p className="stay__value">{checkIn ? formatLongDate(checkIn, locale) : booknow.chooseDate}</p>
          </div>
          <div className={`stay__cell${checkIn && !checkOut ? ' is-next' : ''}`}>
            <p className="stay__label">{booknow.departure}</p>
            <p className="stay__value">
              {checkOut ? formatLongDate(checkOut, locale) : checkIn ? booknow.pickDeparture : booknow.chooseDate}
            </p>
          </div>
          <div className="stay__cell stay__cell--total">
            <p className="stay__label">
              {booknow.total} · {nights} {nights === 1 ? units.night : units.nights}
            </p>
            <p className="stay__value">{totalText}</p>
            <p className="stay__note">{totalNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
