/* Guarda el idioma activo (EN/ES) para toda la web. Recuerda la elección en localStorage. Actualiza el atributo <html lang> para accesibilidad */

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { translations } from '../languages'
import type { Language } from '../languages'
import { LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'gbh-lang'

/* Lee el idioma guardado */
function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* sin localStorage: se usa el valor por defecto */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)

  // Mantiene <html lang="..."> sincronizado con el idioma activo
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* sin localStorage: no se guarda */
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
