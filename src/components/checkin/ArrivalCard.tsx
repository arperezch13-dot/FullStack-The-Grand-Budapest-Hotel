/* Tarjeta de llegada: resumen que se actualiza al escribir (reserva, suite, estancia, llegada, huéspedes) y botón de completar*/

import { useLanguage } from '../../hooks/useLanguage'
import type { CheckinFormState } from '../../hooks/useCheckinForm'
import { formatShortDate, nightsBetween, pluralize } from '../../utils/format'

const EMPTY = '—'

export default function ArrivalCard({ form }: { form: CheckinFormState }) {
  const { t, lang } = useLanguage()
  const { checkin } = t
  const { units } = checkin
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const booking = form.booking

  // Datos de la reserva 
  let suite = EMPTY
  let stay = EMPTY
  let guests = EMPTY

  if (booking) {
    const nights = nightsBetween(booking.checkIn, booking.checkOut)
    suite = t.rooms[booking.suiteSlug]?.name ?? booking.suiteSlug
    stay = `${formatShortDate(booking.checkIn, locale)} – ${formatShortDate(booking.checkOut, locale)} · ${pluralize(nights, units.night, units.nights)}`
    guests =
      pluralize(booking.adults, units.adult, units.adults) +
      (booking.children ? `, ${pluralize(booking.children, units.child, units.children)}` : '')
  }

  const modeLabel = checkin.modes[form.mode].title
  const arrival = form.time ? `${modeLabel} · ${form.time}` : modeLabel

  return (
    <aside className="arrival-card reveal" aria-live="polite">
      <div className="arrival-card__head">
        <span className="arrival-card__crest" aria-hidden="true">
          1932
        </span>
        <div>
          <p className="arrival-card__label">{checkin.cardLabel}</p>
          <p className="arrival-card__ref">{booking ? booking.ref : EMPTY}</p>
        </div>
      </div>
      <dl className="arrival-card__list">
        <div>
          <dt>{checkin.cardSuite}</dt>
          <dd>{suite}</dd>
        </div>
        <div>
          <dt>{checkin.cardStay}</dt>
          <dd>{stay}</dd>
        </div>
        <div>
          <dt>{checkin.cardArrival}</dt>
          <dd>{arrival}</dd>
        </div>
        <div>
          <dt>{checkin.cardGuests}</dt>
          <dd>{guests}</dd>
        </div>
      </dl>
      <p className="arrival-card__note">{checkin.cardNote}</p>
      <button className="arrival-card__btn" type="submit" disabled={form.sending}>
        {form.sending ? checkin.completing : checkin.complete}
      </button>
      {form.failed && (
        <p className="field__error" role="alert">
          {checkin.telegraphDown}
        </p>
      )}
    </aside>
  )
}
