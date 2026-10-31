/* Ventana para la información del hotel y la confirmación de la estancia */

import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'

/* "total" la resalta (importe) */
export interface ModalLine {
  text: string
  total?: boolean
}

export interface ModalContent {
  eyebrow: string
  title: string
  lines: ModalLine[]
  closeLabel: string
}

interface BookingModalProps {
  content: ModalContent | null
  onClose: () => void
}

export default function BookingModal({ content, onClose }: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = content !== null

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
      className="booking-modal"
      ref={dialogRef}
      aria-labelledby="bookingModalTitle"
      onClose={onClose}
      onClick={(event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="booking-modal__box">
        <p className="booking-eyebrow">{content?.eyebrow}</p>
        <h2 className="booking-modal__title" id="bookingModalTitle">
          {content?.title}
        </h2>
        <div className="booking-modal__text">
          {content?.lines.map((line) => (
            <p key={line.text} className={line.total ? 'booking-modal__total' : undefined}>
              {line.text}
            </p>
          ))}
        </div>
        <button className="booking-modal__close" type="button" onClick={onClose}>
          {content?.closeLabel}
        </button>
      </div>
    </dialog>
  )
}
