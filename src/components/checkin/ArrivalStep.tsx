/* Medio de llegada, fecha y hora. La fecha solo puede elegirse dentro de la estancia de la reserva encontrada */

import type { ChangeEvent } from 'react'

import { MODE_KEYS } from '../../data/checkinOptions'
import type { ModeKey } from '../../data/checkinOptions'
import { useLanguage } from '../../hooks/useLanguage'
import type { CheckinFormState } from '../../hooks/useCheckinForm'

export default function ArrivalStep({ form }: { form: CheckinFormState }) {
  const { t } = useLanguage()
  const { checkin } = t

  return (
    <div className="step reveal">
      <div className="step__rail">
        <span className="step__num">2</span>
        <span className="step__line" aria-hidden="true"></span>
      </div>
      <div className="step__card">
        <h2 className="step__title">{checkin.arrivalTitle}</h2>

        <fieldset className="modes">
          <legend className="sr-only">{checkin.arrivalLegend}</legend>
          {MODE_KEYS.map((key: ModeKey) => (
            <label className="mode" key={key}>
              <input
                className="mode__input"
                type="radio"
                name="mode"
                value={key}
                checked={form.mode === key}
                onChange={() => form.setMode(key)}
              />
              <span className="mode__card">
                <span className="mode__title">{checkin.modes[key].title}</span>
                <span className="mode__hint">{checkin.modes[key].hint}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="step__grid step__grid--top">
          <div className={`field${form.errors.date ? ' is-invalid' : ''}`}>
            <label className="field__label" htmlFor="arrivalDate">
              {checkin.arrivalDate}
            </label>
            <input
              className="field__input"
              id="arrivalDate"
              name="date"
              type="date"
              ref={form.refs.date}
              value={form.date}
              min={form.booking?.checkIn}
              max={form.booking?.checkOut}
              aria-invalid={form.errors.date}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                form.setDate(event.target.value)
                form.clearError('date')
              }}
              required
            />
            <p className="field__error" id="arrivalDateError" hidden={!form.errors.date}>
              {checkin.arrivalDateError}
            </p>
          </div>
          <div className={`field${form.errors.time ? ' is-invalid' : ''}`}>
            <label className="field__label" htmlFor="arrivalTime">
              {checkin.arrivalTime}
            </label>
            <input
              className="field__input"
              id="arrivalTime"
              name="time"
              type="time"
              ref={form.refs.time}
              value={form.time}
              aria-invalid={form.errors.time}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                form.setTime(event.target.value)
                form.clearError('time')
              }}
              required
            />
            <p className="field__error" id="arrivalTimeError" hidden={!form.errors.time}>
              {checkin.arrivalTimeError}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
