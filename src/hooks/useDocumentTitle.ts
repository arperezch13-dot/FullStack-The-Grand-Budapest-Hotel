/* Cambia el título de la pestaña del navegador */

import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
