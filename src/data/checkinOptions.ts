/* Opciones del formulario de check-in. Son claves que no cambian con el idioma */

export const MODE_KEYS = ['funicular', 'car', 'foot'] as const
export const DOC_KEYS = ['passport', 'id'] as const

export type ModeKey = (typeof MODE_KEYS)[number]
export type DocKey = (typeof DOC_KEYS)[number]

/* Hora de llegada por defecto y longitud mínima del número de documento */
export const DEFAULT_TIME = '14:20'
export const MIN_DOC_LENGTH = 5
