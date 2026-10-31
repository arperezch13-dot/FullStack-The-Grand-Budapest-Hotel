/* Estado y lógica del formulario de check-in online */

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { bookings } from '../data/bookings'
import type { Booking } from '../data/bookings'
import { DEFAULT_TIME, MIN_DOC_LENGTH } from '../data/checkinOptions'
import type { DocKey, ModeKey } from '../data/checkinOptions'
import { sendLetter as sendData } from '../utils/dispatch'

/* Reserva encontrada */
export interface FoundBooking extends Booking {
  ref: string
}

/* Datos del check-in completado */
export interface CompletedCheckin {
  name: string
  suiteSlug: string
  date: string
  mode: ModeKey
  time: string
}

export function useCheckinForm(onCompleted: (info: CompletedCheckin) => void) {
  // Paso 1: reserva
  const [bookingRef, setBookingRef] = useState('')
  const [lastName, setLastName] = useState('')
  const [booking, setBooking] = useState<FoundBooking | null>(null)
  const [bookingError, setBookingError] = useState(false)

  // Paso 2: llegada
  const [mode, setMode] = useState<ModeKey>('funicular')
  const [date, setDate] = useState('')
  const [time, setTime] = useState(DEFAULT_TIME)

  // Paso 3: huéspedes y documentos
  const [docType, setDocType] = useState<DocKey>('passport')
  const [docNumber, setDocNumber] = useState('')
  const [requests, setRequests] = useState('')
  const [rules, setRules] = useState(true)

  // Errores y envío
  const [errors, setErrors] = useState({ date: false, time: false, doc: false, rules: false })
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)

  // Referencias para llevar el foco al primer campo con error
  const refs = {
    booking: useRef<HTMLInputElement>(null),
    date: useRef<HTMLInputElement>(null),
    time: useRef<HTMLInputElement>(null),
    doc: useRef<HTMLInputElement>(null),
    rules: useRef<HTMLInputElement>(null),
  }

  // Pasos del encabezado: completados y actual
  const done = [
    Boolean(booking),
    Boolean(booking && date && time),
    Boolean(booking && docNumber.trim().length >= MIN_DOC_LENGTH),
  ]
  const firstPending = done.indexOf(false)
  const currentStep = firstPending === -1 ? 2 : firstPending

  /* Paso 1: busca la reserva en los datos de ejemplo */
  const findBooking = () => {
    const key = bookingRef.trim().toUpperCase()
    const found = bookings[key]

    if (found && found.lastName === lastName.trim().toLowerCase()) {
      setBooking({ ...found, ref: key })
      // El día de llegada solo puede estar dentro de la estancia
      setDate(found.checkIn)
      setErrors((prev) => ({ ...prev, date: false }))
      setBookingError(false)
    } else {
      setBooking(null)
      setBookingError(true)
    }
  }

  /* Si se cambia la referencia o el apellido, la reserva anterior deja de valer */
  const invalidateBooking = () => {
    if (booking) {
      setBooking(null)
      setDate('')
    }
  }

  const changeBookingRef = (value: string) => {
    setBookingRef(value)
    invalidateBooking()
  }

  const changeLastName = (value: string) => {
    setLastName(value)
    invalidateBooking()
  }

  /* Quita el error de un campo cuando el usuario lo modifica */
  const clearError = (field: 'date' | 'time' | 'doc' | 'rules') => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev))
  }

  const resetForm = () => {
    setBookingRef('')
    setLastName('')
    setBooking(null)
    setBookingError(false)
    setMode('funicular')
    setDate('')
    setTime(DEFAULT_TIME)
    setDocType('passport')
    setDocNumber('')
    setRequests('')
    setRules(true)
    setErrors({ date: false, time: false, doc: false, rules: false })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validación
    const bad = {
      booking: !booking,
      date: !date,
      time: !time,
      doc: docNumber.trim().length < MIN_DOC_LENGTH,
      rules: !rules,
    }
    setBookingError(bad.booking)
    setErrors({ date: bad.date, time: bad.time, doc: bad.doc, rules: bad.rules })

    if (bad.booking) return refs.booking.current?.focus()
    if (bad.date) return refs.date.current?.focus()
    if (bad.time) return refs.time.current?.focus()
    if (bad.doc) return refs.doc.current?.focus()
    if (bad.rules) return refs.rules.current?.focus()
    if (!booking) return

    const completed: CompletedCheckin = {
      name: lastName.trim(),
      suiteSlug: booking.suiteSlug,
      date,
      mode,
      time,
    }

    // Se desactiva el botón para evitar doble envío
    setSending(true)
    setFailed(false)

    try {
      // Envío simulado: aquí se enviaría el check-in al servidor
      await sendData({ ref: booking.ref, ...completed, docType, docNumber: docNumber.trim(), requests: requests.trim() })
      onCompleted(completed)
      resetForm()
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return {
    // valores
    bookingRef,
    lastName,
    booking,
    bookingError,
    mode,
    date,
    time,
    docType,
    docNumber,
    requests,
    rules,
    errors,
    sending,
    failed,
    refs,
    steps: { done, current: currentStep },
    // acciones
    changeBookingRef,
    changeLastName,
    findBooking,
    setMode,
    setDate,
    setTime,
    setDocType,
    setDocNumber,
    setRequests,
    setRules,
    clearError,
    handleSubmit,
  }
}

/* Tipo del objeto que devuelve el hook */
export type CheckinFormState = ReturnType<typeof useCheckinForm>
