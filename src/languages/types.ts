/* Tipos del sistema de idiomas */

import type { en } from './en'

export type Language = 'en' | 'es'

/* Texto traducido de una habitación */
export interface RoomText {
  name: string
  category: string
  description: string
  amenities: string[]
  alt: string
  altBack: string
}

/* Texto traducido de un pastel de la carta */
export interface PastryText {
  tag: string
  name: string
  alt: string
  sub: string
  text: string
  chips: string[]
}

type EnglishMendls = (typeof en)['mendls']

export type Translations = Omit<typeof en, 'rooms' | 'mendls'> & {
  rooms: Record<string, RoomText>
  mendls: Omit<EnglishMendls, 'pastries'> & { pastries: Record<string, PastryText> }
}
