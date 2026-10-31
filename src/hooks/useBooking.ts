/* Estado y lógica de la página de reservas.Calendario: mes visible, llegada, salida, vista previa y aviso de noches ocupadas. suite elegida, contadores de huéspedes, datos calculados: noches y total */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ALERT_DURATION, GUEST_LIMITS, INITIAL_GUESTS, UNAVAILABLE_OFFSETS } from '../data/bookingOptions'
import type { GuestType } from '../data/bookingOptions'
import { addDays, shiftMonth, todayKey } from '../utils/bookingDates'
import { nightsBetween } from '../utils/format'
import type { Room } from '../data/rooms'

export function useBooking(rooms: Room[]) {
  // "Hoy" se calcula una sola vez al abrir la página
  const [today] = useState(todayKey)

  // Días sin disponibilidad 
  const unavailable = useMemo(() => new Set(UNAVAILABLE_OFFSETS.map((offset) => addDays(today, offset))), [today])

  // Mes visible (el calendario muestra este mes y el siguiente)
  const [view, setView] = useState(() => {
    const [year, month] = today.split('-').map(Number)
    return { year, month: month - 1 }
  })

  // Selección de fechas
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [hoverKey, setHoverKey] = useState<string | null>(null)
  const [rangeAlert, setRangeAlert] = useState(false)
  const alertTimer = useRef<number>(0)

  // Suite elegida: si llegas desde Suites & Tariffs ya viene marcada
  const [searchParams] = useSearchParams()
  const [suiteSlug, setSuiteSlug] = useState<string | null>(() => {
    const requested = searchParams.get('suite')
    return requested && rooms.some((room) => room.slug === requested) ? requested : null
  })

  // Huéspedes
  const [guests, setGuests] = useState(INITIAL_GUESTS)

  // Al salir de la página se limpia el temporizador del aviso
  useEffect(() => () => window.clearTimeout(alertTimer.current), [])

  const isUnavailable = (key: string) => unavailable.has(key)
  const isPast = (key: string) => key < today

  // Comprueba si hay noches ocupadas entre dos fechas (no incluye la llegada ni la salida)
  const hasUnavailableNight = (from: string, to: string) => {
    for (let current = addDays(from, 1); current < to; current = addDays(current, 1)) {
      if (isUnavailable(current)) return true
    }
    return false
  }

  const showRangeAlert = () => {
    setRangeAlert(true)
    window.clearTimeout(alertTimer.current)
    alertTimer.current = window.setTimeout(() => setRangeAlert(false), ALERT_DURATION)
  }

  // Selección de fechas: llegada, salida y vista previa. Se llama al hacer click en un día del calendario
  const selectDate = (key: string) => {
    setRangeAlert(false)
    setHoverKey(null)

    if (!checkIn || checkOut) {
      // Empieza una selección nueva
      setCheckIn(key)
      setCheckOut(null)
    } else if (key <= checkIn) {
      // Fecha anterior: se toma como nueva llegada
      setCheckIn(key)
    } else if (hasUnavailableNight(checkIn, key)) {
      // Noches ocupadas en medio: se avisa y se empieza desde esta fecha
      setCheckIn(key)
      showRangeAlert()
    } else {
      setCheckOut(key)
    }
  }

  // Mueve el calendario un mes hacia delante o atrás
  const changeMonth = (direction: number) => setView((prev) => shiftMonth(prev.year, prev.month, direction))

  // Cambia un contador respetando sus límites
  const changeGuests = (type: GuestType, step: number) => {
    const { min, max } = GUEST_LIMITS[type]
    setGuests((prev) => ({ ...prev, [type]: Math.min(max, Math.max(min, prev[type] + step)) }))
  }

  // Datos calculados
  const suite = rooms.find((room) => room.slug === suiteSlug) ?? null
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0
  const total = suite ? nights * suite.price * guests.suites : 0
  const isCurrentMonth = view.year === Number(today.slice(0, 4)) && view.month === Number(today.slice(5, 7)) - 1

  // Noches de la vista previa: entre la llegada y el día sobre el que está el ratón
  const isPreview = (key: string) =>
    Boolean(
      checkIn &&
        !checkOut &&
        hoverKey &&
        hoverKey > checkIn &&
        key > checkIn &&
        key < hoverKey &&
        !hasUnavailableNight(checkIn, hoverKey),
    )

  return {
    today,
    view,
    isCurrentMonth,
    checkIn,
    checkOut,
    rangeAlert,
    suite,
    guests,
    nights,
    total,
    canContinue: Boolean(checkIn && checkOut && suite),
    isUnavailable,
    isPast,
    isPreview,
    setHoverKey,
    selectDate,
    changeMonth,
    selectSuite: setSuiteSlug,
    changeGuests,
  }
}

// Tipo del objeto que devuelve el hook (lo reciben los componentes de la página)
export type BookingState = ReturnType<typeof useBooking>
