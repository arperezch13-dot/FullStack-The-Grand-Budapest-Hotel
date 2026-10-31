/* Ventana de confirmación. Se abre cuando "open" es true y se cierra con el botón, con Escape o pulsando fuera de la tarjeta */

import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'

import { useLanguage } from '../../hooks/useLanguage'

interface LetterModalProps {
  open: boolean
  dispatchNumber: string
  /* Mensaje de agradecimiento */
  message: string
  onClose: () => void
}

export default function LetterModal({ open, dispatchNumber, message, onClose }: LetterModalProps) {
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
      className="letter-modal"
      ref={dialogRef}
      aria-labelledby="letterModalTitle"
      onClose={onClose}
      onClick={(event: MouseEvent<HTMLDialogElement>) => {
        // Cierra al pulsar fuera de la tarjeta
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="letter-modal__box">
        <div className="letter-modal__seal" aria-hidden="true">
          G
        </div>
        <p className="letter-typed">
          {t.letter.modalDispatch} <span>{dispatchNumber}</span>
        </p>
        <h2 className="letter-modal__title" id="letterModalTitle">
          {t.letter.modalTitle}
        </h2>
        <p className="letter-modal__text">{message}</p>
        <button className="letter-modal__close" type="button" onClick={onClose}>
          {t.letter.modalClose}
        </button>
      </div>
    </dialog>
  )
}
