/* Acceso al idioma activo y a los textos traducidos */

import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  }
  return context
}
