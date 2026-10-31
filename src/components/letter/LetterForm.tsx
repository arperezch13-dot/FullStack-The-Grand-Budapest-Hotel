/* Hoja doble de la carta: página izquierda (datos), página derecha (formulario con validación y envío simulado) */

import { useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import {
  MAX_MESSAGE_LENGTH,
  MIN_MESSAGE_LENGTH,
  REASON_KEYS,
  TITLE_KEYS,
} from '../../data/letterOptions'
import type { ReasonKey, TitleKey } from '../../data/letterOptions'
import { useLanguage } from '../../hooks/useLanguage'
import { sendLetter } from '../../utils/dispatch'
import LetterLeftPage from './LetterLeftPage'

/* Datos de una carta enviada */
export interface SentLetter {
  title: TitleKey
  name: string
  suite: string
  sealedCopy: boolean
}

interface LetterFormProps {
  /* Se llama cuando la carta se ha "enviado" correctamente */
  onSent: (letter: SentLetter) => void
}

export default function LetterForm({ onSent }: LetterFormProps) {
  const { t, lang } = useLanguage()
  const { letter } = t

  // Campos del formulario
  const [title, setTitle] = useState<TitleKey>('baroness')
  const [name, setName] = useState('')
  const [suite, setSuite] = useState('')
  const [reason, setReason] = useState<ReasonKey>('panache')
  const [message, setMessage] = useState('')
  const [sealedCopy, setSealedCopy] = useState(true)

  // Estado de la validación y del envío
  const [errors, setErrors] = useState({ name: false, suite: false, message: false })
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const suiteRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  // Fecha del encabezado en el idioma activo 
  const dateText = useMemo(() => {
    const locale = lang === 'es' ? 'es-ES' : 'en-GB'
    const formatted = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
    return `${letter.place}, ${formatted}`
  }, [lang, letter.place])

  // Quita el error de un campo cuando el usuario escribe en él
  const clearError = (field: 'name' | 'suite' | 'message') => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validación: nombre y residencia deben tener al menos 2 caracteres, mensaje al menos 10
    const found = {
      name: name.trim().length < 2,
      suite: suite.trim().length < 2,
      message: message.trim().length < MIN_MESSAGE_LENGTH,
    }
    setErrors(found)

    if (found.name) return nameRef.current?.focus()
    if (found.suite) return suiteRef.current?.focus()
    if (found.message) return messageRef.current?.focus()

    const data: SentLetter = { title, name: name.trim(), suite: suite.trim(), sealedCopy }

    setSending(true)
    setFailed(false)

    try {
      await sendLetter(data)
      onSent(data)

      // Se vacía la carta para poder escribir otra
      setTitle('baroness')
      setName('')
      setSuite('')
      setReason('panache')
      setMessage('')
      setSealedCopy(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  const sendLabel = sending ? letter.sealing : failed ? letter.tryAgain : letter.send

  return (
    <form className="letter-sheet reveal" id="letterForm" noValidate onSubmit={handleSubmit}>
      {/* PÁGINA IZQUIERDA */}
      <LetterLeftPage />

      {/* Pliegue central */}
      <div className="letter-fold" aria-hidden="true"></div>

      {/*  PÁGINA DERECHA */}
      <div className="letter-page letter-page--right">
        <div className="letter-stamp" aria-hidden="true">
          <span>{letter.stampTop}</span>
          <strong>25 km</strong>
        </div>

        <p className="letter-typed">{dateText}</p>
        <p className="letter-salute">{letter.salute}</p>

        <div className="letter-fields">
          <div className="field">
            <label className="field__label" htmlFor="guestTitle">
              {letter.fieldTitle}
            </label>
            <select
              className="field__input"
              id="guestTitle"
              name="title"
              value={title}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setTitle(event.target.value as TitleKey)}
            >
              {TITLE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {letter.titles[key]}
                </option>
              ))}
            </select>
          </div>

          <div className={`field${errors.name ? ' is-invalid' : ''}`}>
            <label className="field__label" htmlFor="guestName">
              {letter.fieldName}
            </label>
            <input
              className="field__input"
              id="guestName"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={letter.namePlaceholder}
              ref={nameRef}
              value={name}
              aria-invalid={errors.name}
              aria-describedby={errors.name ? 'guestNameError' : undefined}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value)
                clearError('name')
              }}
              required
            />
            <p className="field__error" id="guestNameError" hidden={!errors.name}>
              {letter.nameError}
            </p>
          </div>

          <div className={`field field--wide${errors.suite ? ' is-invalid' : ''}`}>
            <label className="field__label" htmlFor="guestSuite">
              {letter.fieldSuite}
            </label>
            <input
              className="field__input"
              id="guestSuite"
              name="suite"
              type="text"
              placeholder={letter.suitePlaceholder}
              ref={suiteRef}
              value={suite}
              aria-invalid={errors.suite}
              aria-describedby={errors.suite ? 'guestSuiteError' : undefined}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSuite(event.target.value)
                clearError('suite')
              }}
              required
            />
            <p className="field__error" id="guestSuiteError" hidden={!errors.suite}>
              {letter.suiteError}
            </p>
          </div>
        </div>

        <fieldset className="letter-reasons">
          <legend className="field__label">{letter.reasonLegend}</legend>
          <div className="letter-reasons__list">
            {REASON_KEYS.map((key) => (
              <label className="reason" key={key}>
                <input
                  className="reason__input"
                  type="radio"
                  name="reason"
                  value={key}
                  checked={reason === key}
                  onChange={() => setReason(key)}
                />
                <span className="reason__chip">{letter.reasons[key]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={`field letter-body${errors.message ? ' is-invalid' : ''}`}>
          <label className="field__label" htmlFor="guestMessage">
            {letter.fieldMessage}
          </label>
          <textarea
            className="letter-lines"
            id="guestMessage"
            name="message"
            rows={6}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder={letter.messagePlaceholder}
            ref={messageRef}
            value={message}
            aria-invalid={errors.message}
            aria-describedby={errors.message ? 'guestMessageError' : undefined}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setMessage(event.target.value)
              clearError('message')
            }}
            required
          />
          <div className="letter-body__foot">
            <p className="field__error" id="guestMessageError" hidden={!errors.message}>
              {letter.messageError}
            </p>
            <p className="letter-count">
              <span>{message.length}</span> / {MAX_MESSAGE_LENGTH}
            </p>
          </div>
        </div>

        <label className="letter-check">
          <input
            type="checkbox"
            name="copy"
            checked={sealedCopy}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSealedCopy(event.target.checked)}
          />
          <span>
            {letter.copyBefore}
            <strong>{letter.copyStrong}</strong>
          </span>
        </label>

        <div className="letter-send">
          <p className="letter-send__note">{letter.discretion}</p>
          <button className={`wax${sending ? ' is-sealing' : ''}`} type="submit" disabled={sending}>
            <span className="wax__seal" aria-hidden="true">
              G
            </span>
            <span className="wax__label">{sendLabel}</span>
          </button>
        </div>
        {failed && (
          <p className="field__error" role="alert">
            {letter.telegraphDown}
          </p>
        )}
      </div>
    </form>
  )
}
