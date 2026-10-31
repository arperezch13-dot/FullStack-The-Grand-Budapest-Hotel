/* Página "Book now" */

import { useRef, useState } from 'react'

import BookingBar, { guestsText } from '../components/booknow/BookingBar'
import BookingHero from '../components/booknow/BookingHero'
import BookingModal from '../components/booknow/BookingModal'
import type { ModalContent } from '../components/booknow/BookingModal'
import DatesSection from '../components/booknow/DatesSection'
import GuestsSection from '../components/booknow/GuestsSection'
import SuitePicker from '../components/booknow/SuitePicker'
import { useBooking } from '../hooks/useBooking'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLanguage } from '../hooks/useLanguage'
import { useReveal } from '../hooks/useReveal'
import { useRooms } from '../hooks/useRooms'
import { formatLongDate, formatPrice, pluralize } from '../utils/format'
import '../styles/booknow.css'

// Los bloques aparecen un poco antes que en otras páginas
const REVEAL_OPTIONS: IntersectionObserverInit = { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }

export default function BookNow() {
  const { t, lang } = useLanguage()
  const { rooms } = useRooms()
  const booking = useBooking(rooms)
  const pageRef = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState<ModalContent | null>(null)
  const { booknow } = t
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'

  useDocumentTitle(booknow.pageTitle)
  useReveal(pageRef, null, REVEAL_OPTIONS)

  // Botón "Hotel info"
  const openInfo = () =>
    setModal({
      eyebrow: booknow.infoEyebrow,
      title: booknow.infoTitle,
      lines: booknow.infoLines.map((text) => ({ text })),
      closeLabel: booknow.infoClose,
    })

  // Botón "Siguiente, Extras": resumen de la estancia 
  const openSummary = () => {
    const { checkIn, checkOut, suite, nights } = booking
    if (!checkIn || !checkOut || !suite) return

    setModal({
      eyebrow: booknow.doneEyebrow,
      title: booknow.doneTitle,
      lines: [
        { text: t.rooms[suite.slug]?.name ?? suite.name },
        { text: `${formatLongDate(checkIn, locale)} → ${formatLongDate(checkOut, locale)}` },
        {
          text: `${pluralize(nights, booknow.units.night, booknow.units.nights)} · ${guestsText(booking.guests, booknow.units)}`,
        },
        { text: formatPrice(booking.total, locale), total: true },
        { text: booknow.doneNote },
      ],
      closeLabel: booknow.doneClose,
    })
  }

  return (
    <div className="booking" ref={pageRef}>
      <BookingHero onOpenInfo={openInfo} />
      <DatesSection booking={booking} />
      <SuitePicker booking={booking} rooms={rooms} />
      <GuestsSection booking={booking} />
      <BookingBar booking={booking} onNext={openSummary} />
      <BookingModal content={modal} onClose={() => setModal(null)} />
    </div>
  )
}
