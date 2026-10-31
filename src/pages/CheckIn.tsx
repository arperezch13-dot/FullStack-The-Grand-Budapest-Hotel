/* "Check-in online" */

import { useRef, useState } from 'react'

import ArrivalCard from '../components/checkin/ArrivalCard'
import ArrivalStep from '../components/checkin/ArrivalStep'
import BookingStep from '../components/checkin/BookingStep'
import CheckinHero from '../components/checkin/CheckinHero'
import CheckinModal from '../components/checkin/CheckinModal'
import GuestsStep from '../components/checkin/GuestsStep'
import { useCheckinForm } from '../hooks/useCheckinForm'
import type { CompletedCheckin } from '../hooks/useCheckinForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLanguage } from '../hooks/useLanguage'
import { useReveal } from '../hooks/useReveal'
import { makeCheckinCode } from '../utils/dispatch'
import { formatShortDate } from '../utils/format'
import '../styles/checkin.css'

// El formulario es alto: aparece en cuanto se ve un 5 %
const REVEAL_OPTIONS: IntersectionObserverInit = { threshold: 0.05 }

export default function CheckIn() {
  const { t, lang } = useLanguage()
  const pageRef = useRef<HTMLDivElement>(null)

  const [completed, setCompleted] = useState<CompletedCheckin | null>(null)
  const [code, setCode] = useState('GBH-0000')
  const [modalOpen, setModalOpen] = useState(false)

  useDocumentTitle(t.checkin.pageTitle)
  useReveal(pageRef, null, REVEAL_OPTIONS)

  // Check-in completado: guarda los datos, genera el código y abre la ventana
  const form = useCheckinForm((info) => {
    setCompleted(info)
    setCode(makeCheckinCode())
    setModalOpen(true)
  })

  // Mensaje de bienvenida en el idioma activo
  const modalMessage = completed
    ? t.checkin.modalText
        .replace('{name}', completed.name)
        .replace('{suite}', t.rooms[completed.suiteSlug]?.name ?? completed.suiteSlug)
        .replace('{date}', formatShortDate(completed.date, lang === 'es' ? 'es-ES' : 'en-GB'))
        .replace('{mode}', t.checkin.modes[completed.mode].title.toLowerCase())
        .replace('{time}', completed.time)
    : ''

  return (
    <div className="checkin" ref={pageRef}>
      <CheckinHero done={form.steps.done} current={form.steps.current} />

      <section className="checkin-body">
        <form className="checkin-layout" id="checkinForm" noValidate onSubmit={form.handleSubmit}>
          <div className="checkin-steps-col">
            <BookingStep form={form} />
            <ArrivalStep form={form} />
            <GuestsStep form={form} />
          </div>
          <ArrivalCard form={form} />
        </form>
      </section>

      <CheckinModal open={modalOpen} code={code} message={modalMessage} onClose={() => setModalOpen(false)} />
    </div>
  )
}
