/* Opciones del formulario de la carta. Son claves que no cambian con el idioma */

export const TITLE_KEYS = ['baroness', 'baron', 'madame', 'monsieur', 'countess', 'count'] as const
export const REASON_KEYS = ['panache', 'booking', 'keys', 'mendls', 'feedback'] as const

export type TitleKey = (typeof TITLE_KEYS)[number]
export type ReasonKey = (typeof REASON_KEYS)[number]

/* Longitud máxima del mensaje y mínima para considerarlo válido */
export const MAX_MESSAGE_LENGTH = 600
export const MIN_MESSAGE_LENGTH = 10
