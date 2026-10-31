/* Documento de viaje, peticiones especiales y aceptación de las normas de la casa */

import type { ChangeEvent } from 'react'

import { DOC_KEYS } from '../../data/checkinOptions'
import type { DocKey } from '../../data/checkinOptions'
import { useLanguage } from '../../hooks/useLanguage'
import type { CheckinFormState } from '../../hooks/useCheckinForm'

export default function GuestsStep({ form }: { form: CheckinFormState }) {
  const { t } = useLanguage()
  const { checkin } = t

  return (
    <div className="step reveal">
      <div className="step__rail">
        <span className="step__num">3</span>
      </div>
      <div className="step__card">
        <h2 className="step__title">{checkin.guestsTitle}</h2>
        <div className="step__grid">
          <div className="field">
            <label className="field__label" htmlFor="docType">
              {checkin.docType}
            </label>
            <select
              className="field__input"
              id="docType"
              name="docType"
              value={form.docType}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => form.setDocType(event.target.value as DocKey)}
            >
              {DOC_KEYS.map((key) => (
                <option key={key} value={key}>
                  {checkin.docTypes[key]}
                </option>
              ))}
            </select>
          </div>

          <div className={`field${form.errors.doc ? ' is-invalid' : ''}`}>
            <label className="field__label" htmlFor="docNumber">
              {checkin.docNumber}
            </label>
            <input
              className="field__input"
              id="docNumber"
              name="docNumber"
              type="text"
              placeholder="XX 000000"
              autoComplete="off"
              ref={form.refs.doc}
              value={form.docNumber}
              aria-invalid={form.errors.doc}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                form.setDocNumber(event.target.value)
                form.clearError('doc')
              }}
              required
            />
            <p className="field__error" id="docNumberError" hidden={!form.errors.doc}>
              {checkin.docNumberError}
            </p>
          </div>

          <div className="field field--wide">
            <label className="field__label" htmlFor="requests">
              {checkin.requests}
            </label>
            <input
              className="field__input"
              id="requests"
              name="requests"
              type="text"
              maxLength={160}
              placeholder={checkin.requestsPlaceholder}
              value={form.requests}
              onChange={(event: ChangeEvent<HTMLInputElement>) => form.setRequests(event.target.value)}
            />
          </div>
        </div>

        <label className="checkin-check">
          <input
            type="checkbox"
            id="rules"
            name="rules"
            ref={form.refs.rules}
            checked={form.rules}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              form.setRules(event.target.checked)
              form.clearError('rules')
            }}
          />
          <span>{checkin.rules}</span>
        </label>
        <p className="field__error" id="rulesError" hidden={!form.errors.rules}>
          {checkin.rulesError}
        </p>
      </div>
    </div>
  )
}
