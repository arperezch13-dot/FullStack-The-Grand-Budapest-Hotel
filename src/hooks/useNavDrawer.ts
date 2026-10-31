/* Lógica del menú lateral (drawer) */

import { useCallback, useEffect, useRef, useState } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function useNavDrawer() {
  const [open, setOpenState] = useState(false)
  const restoreFocus = useRef(false)

  // Al abrir el drawer, se guarda si el foco estaba dentro del drawer para restaurarlo al cerrarlo
  const setOpen = useCallback((next: boolean) => {
    if (!next) {
      const drawer = document.getElementById('drawerPanel')
      restoreFocus.current = !!drawer?.contains(document.activeElement)
    }
    setOpenState(next)
  }, [])

  const toggle = useCallback(() => setOpenState((prev) => !prev), [])
  const close = useCallback(() => setOpen(false), [setOpen])

  // Clase en body y foco en el botón de cerrar o en el toggle al abrir/cerrar
  useEffect(() => {
    document.body.classList.toggle('nav-open', open)

    if (open) {
      document.querySelector<HTMLElement>('.drawer-close-btn')?.focus({ preventScroll: true })
    } else if (restoreFocus.current) {
      document.querySelector<HTMLElement>('.nav-toggle')?.focus({ preventScroll: true })
      restoreFocus.current = false
    }

    return () => document.body.classList.remove('nav-open')
  }, [open])

  // Cerrar con Escape y mantener el foco dentro del drawer
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key === 'Tab') {
        const drawer = document.getElementById('drawerPanel')
        if (!drawer) return
        const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (!items.length) return

        const first = items[0]
        const last = items[items.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  return { open, toggle, close }
}
