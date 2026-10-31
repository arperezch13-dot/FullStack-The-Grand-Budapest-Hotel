/*  Devuelve las habitaciones del hotel */

import { useEffect, useState } from 'react'

import { API_URL } from '../config'
import { rooms as localRooms } from '../data/rooms'
import type { Room } from '../data/rooms'

// Cache de las habitaciones obtenidas de la API. Se mantiene mientras dura la sesión (no se recarga al cambiar de página).
let cache: Room[] | null = null

// Función de tipo para comprobar si un valor es una habitación
function isRoom(value: unknown): value is Room {
  const room = value as Partial<Room> | null
  return (
    typeof room === 'object' &&
    room !== null &&
    typeof room.slug === 'string' &&
    typeof room.name === 'string' &&
    typeof room.category === 'string' &&
    typeof room.price === 'number' &&
    typeof room.description === 'string' &&
    Array.isArray(room.amenities)
  )
}

export function useRooms(): { rooms: Room[]; source: 'api' | 'local' } {
  const [rooms, setRooms] = useState<Room[]>(cache ?? localRooms)

  useEffect(() => {
    if (cache) return

    let cancelled = false

    fetch(`${API_URL}/api/rooms`)
      .then((response) => {
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return response.json() as Promise<unknown>
      })
      .then((data) => {
        const habitaciones = (data as { data?: unknown } | null)?.data
        const list = Array.isArray(habitaciones) ? habitaciones.filter(isRoom) : [] // Filtra los elementos que no son habitaciones
        if (!list.length) throw new Error('La API no devolvió habitaciones')
        cache = list
        if (!cancelled) setRooms(list)
      })
      .catch((error: unknown) => {
        console.warn('No se pudieron cargar las habitaciones de la API:', error)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { rooms, source: cache ? 'api' : 'local' }
}
