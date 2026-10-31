/* Contexto de idioma (solo el objeto y su tipo). El proveedor está en LanguageProvider.tsx y el acceso en hooks/useLanguage.ts */

import { createContext } from 'react'
import type { Language, Translations } from '../languages/types'

export interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
