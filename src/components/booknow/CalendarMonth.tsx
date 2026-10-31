/* Un mes del calendario. El primer mes lleva el botón "anterior" y el segundo el "siguiente"*/

import { useLanguage } from '../../hooks/useLanguage'
import type { BookingState } from '../../hooks/useBooking'
import { daysInMonth, makeKey, startOffset } from '../../utils/bookingDates'
import { formatFullDate, formatMonthName } from '../../utils/format'

interface CalendarMonthProps {
  booking: BookingState
  year: number
  month: number
  position: 0 | 1
}

export default function CalendarMonth({ booking, year, month, position }: CalendarMonthProps) {
  const { t, lang } = useLanguage()
  const { booknow } = t
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const { checkIn, checkOut } = booking

  // Un botón vacío por cada hueco antes del día 1
  const blanks = Array.from({ length: startOffset(year, month) }, (_, index) => index)
  const days = Array.from({ length: daysInMonth(year, month) }, (_, index) => index + 1)

  return (
    <div className="cal__month">
      <div className="cal__head">
        {position === 0 ? (
          <button
            className="cal__nav"
            type="button"
            aria-label={booknow.prevMonth}
            disabled={booking.isCurrentMonth}
            onClick={() => booking.changeMonth(-1)}
          >
            ‹
          </button>
        ) : (
          <span className="cal__spacer"></span>
        )}

        <h3 className="cal__name">{formatMonthName(year, month, locale)}</h3>

        {position === 1 ? (
          <button className="cal__nav" type="button" aria-label={booknow.nextMonth} onClick={() => booking.changeMonth(1)}>
            ›
          </button>
        ) : (
          <span className="cal__spacer"></span>
        )}
      </div>

      <div className="cal__weekdays" aria-hidden="true">
        {booknow.weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="cal__grid">
        {blanks.map((index) => (
          <button
            key={`blank-${index}`}
            className="cal__day cal__day--empty"
            type="button"
            disabled
            tabIndex={-1}
            aria-hidden="true"
          ></button>
        ))}

        {days.map((day) => {
          const key = makeKey(year, month, day)
          const past = booking.isPast(key)
          const off = !past && booking.isUnavailable(key)
          const isStart = key === checkIn
          const isEnd = key === checkOut

          const classes = [
            'cal__day',
            past ? 'cal__day--past' : '',
            off ? 'cal__day--off' : '',
            key === booking.today ? 'cal__day--today' : '',
            isStart ? 'cal__day--start' : '',
            isEnd ? 'cal__day--end' : '',
            checkIn && checkOut && key > checkIn && key < checkOut ? 'cal__day--range' : '',
            booking.isPreview(key) ? 'cal__day--preview' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={key}
              className={classes}
              type="button"
              disabled={past || off}
              aria-label={formatFullDate(key, locale)}
              aria-pressed={isStart || isEnd ? true : undefined}
              onClick={() => booking.selectDate(key)}
              onMouseEnter={() => booking.setHoverKey(key)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
