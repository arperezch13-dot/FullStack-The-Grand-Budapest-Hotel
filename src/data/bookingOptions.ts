/* Límites y datos de ejemplo de la página de reservas */

/* Tipos de huésped */

export type GuestType = 'adults' | 'children' | 'suites'

/* Mínimo y máximo de cada contador */
export const GUEST_LIMITS: Record<GuestType, { min: number; max: number }> = {
  adults: { min: 1, max: 6 },
  children: { min: 0, max: 4 },
  suites: { min: 1, max: 3 },
}

/* Valores iniciales de los contadores */
export const INITIAL_GUESTS: Record<GuestType, number> = { adults: 2, children: 0, suites: 1 }

/* DEMO: días sin disponibilidad, contados a partir de hoy (los días se muestran como "ocupados" en el calendario de reservas) */
export const UNAVAILABLE_OFFSETS = [3, 4, 10, 11, 12, 25, 26]

/* Duración (ms) del aviso de noches ocupadas */
export const ALERT_DURATION = 4500
