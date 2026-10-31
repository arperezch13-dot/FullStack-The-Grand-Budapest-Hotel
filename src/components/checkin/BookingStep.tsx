/* Buscar la reserva (referencia + apellido). Al pulsar Enter en cualquiera de los dos campos también busca la reserva */

import type { ChangeEvent, KeyboardEvent } from 'react'

import { useLanguage } from '../../hooks/useLanguage'
import type { CheckinFormState } from '../../hooks/useCheckinForm'
import { formatShortDate } from '../../utils/format'

export default function BookingStep({ form }: { form: CheckinFormState }) {
  const { t, lang } = useLanguage()
  const { checkin } = t
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'

  // Enter busca la reserva en vez de enviar el formulario
  const searchOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      form.findBooking()
    }
  }

  // Mensaje "Reserva encontrada: Suite · 14 Nov – 17 Nov"
  const foundMessage = form.booking
    ? checkin.bookingFound
        .replace('{suite}', t.rooms[form.booking.suiteSlug]?.name ?? form.booking.suiteSlug)
        .replace('{from}', formatShortDate(form.booking.checkIn, locale))
        .replace('{to}', formatShortDate(form.booking.checkOut, locale))
    : ''

  return (
    <div className="step reveal">
      <div className="step__rail">
        <span className="step__num">1</span>
        <span className="step__line" aria-hidden="true"></span>
      </div>
      <div className="step__card">
        <h2 className="step__title">{checkin.bookingTitle}</h2>
        <div className="step__grid">
          <div className="field">
            <label className="field__label" htmlFor="bookingRef">
              {checkin.bookingRef}
            </label>
            <input
              className="field__input field__input--typed"
              id="bookingRef"
              name="ref"
              type="text"
              placeholder="GBH-1932-48"
              autoComplete="off"
              ref={form.refs.booking}
              value={form.bookingRef}
              onChange={(event: ChangeEvent<HTMLInputElement>) => form.changeBookingRef(event.target.value)}
              onKeyDown={searchOnEnter}
              required
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="lastName">
              {checkin.lastName}
            </label>
            <input
              className="field__input"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Moustafa"
              autoComplete="family-name"
              value={form.lastName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => form.changeLastName(event.target.value)}
              onKeyDown={searchOnEnter}
              required
            />
          </div>
        </div>
        <p className="field__error" id="bookingError" hidden={!form.bookingError}>
          {checkin.bookingError}
        </p>
        <p className="booking-found" id="bookingFound" hidden={!form.booking}>
          {foundMessage}
        </p>
        <button className="step__btn" type="button" onClick={form.findBooking}>
          {checkin.findBooking}
        </button>
        {/* Reserva de ejemplo: quitar esta línea cuando haya una consulta real */}
        <p className="step__demo">{checkin.demo}</p>
      </div>
    </div>
  )
}
