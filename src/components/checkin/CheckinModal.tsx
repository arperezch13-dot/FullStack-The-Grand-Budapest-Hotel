/* Ventana de confirmación del check-in. Se cierra con el botón, con Escape o pulsando fuera de la tarjeta */

import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'

import { useLanguage } from '../../hooks/useLanguage'

interface CheckinModalProps {
  open: boolean
  code: string
  message: string
  onClose: () => void
}

export default function CheckinModal({ open, code, message, onClose }: CheckinModalProps) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Sincroniza el estado de React con el <dialog> del navegador
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      className="checkin-modal"
      ref={dialogRef}
      aria-labelledby="checkinModalTitle"
      onClose={onClose}
      onClick={(event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="checkin-modal__box">
        <p className="checkin-eyebrow">{t.checkin.modalCode}</p>
        <p className="checkin-modal__code">{code}</p>
        <h2 className="checkin-modal__title" id="checkinModalTitle">
          {t.checkin.modalTitle}
        </h2>
        <p className="checkin-modal__text">{message}</p>
        <button className="checkin-modal__close" type="button" onClick={onClose}>
          {t.checkin.modalClose}
        </button>
      </div>
    </dialog>
  )
}
