/* Página "Carta a M. Gustave". Muestra el formulario de la carta y, al enviarla, la ventana de confirmación */

import { useRef, useState } from 'react'

import LetterForm from '../components/letter/LetterForm'
import type { SentLetter } from '../components/letter/LetterForm'
import LetterModal from '../components/letter/LetterModal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLanguage } from '../hooks/useLanguage'
import { useReveal } from '../hooks/useReveal'
import { makeDispatchNumber } from '../utils/dispatch'
import '../styles/letter.css'

// El formulario es alto: aparece en cuanto se ve un 5 %
const REVEAL_OPTIONS: IntersectionObserverInit = { threshold: 0.05 }

export default function Letter() {
  const { t } = useLanguage()
  const pageRef = useRef<HTMLDivElement>(null)

  const [sent, setSent] = useState<SentLetter | null>(null)
  const [dispatchNumber, setDispatchNumber] = useState('1932-GH')
  const [modalOpen, setModalOpen] = useState(false)

  useDocumentTitle(t.letter.pageTitle)
  useReveal(pageRef, null, REVEAL_OPTIONS)

  // Carta enviada: guarda los datos, genera el nº de despacho y abre la ventana
  const handleSent = (letter: SentLetter) => {
    setSent(letter)
    setDispatchNumber(makeDispatchNumber())
    setModalOpen(true)
  }

  // Texto de agradecimiento en el idioma activo
  const modalMessage = sent
    ? (sent.sealedCopy ? t.letter.modalTextCopy : t.letter.modalTextNoCopy)
        .replace('{title}', t.letter.titles[sent.title])
        .replace('{name}', sent.name)
        .replace('{suite}', sent.suite)
    : ''

  return (
    <div className="letter" ref={pageRef}>
      <LetterForm onSent={handleSent} />
      <LetterModal
        open={modalOpen}
        dispatchNumber={dispatchNumber}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
