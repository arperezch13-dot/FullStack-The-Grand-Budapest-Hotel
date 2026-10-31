/* Página "Mendl's Bakery" */

import { useEffect, useRef, useState } from 'react'

import MendlsHero from '../components/mendls/MendlsHero'
import OrderForm from '../components/mendls/OrderForm'
import PackagingSection from '../components/mendls/PackagingSection'
import PastryMenu from '../components/mendls/PastryMenu'
import { pastries } from '../data/pastries'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLanguage } from '../hooks/useLanguage'
import { useReveal } from '../hooks/useReveal'
import '../styles/mendls.css'

export default function Mendls() {
  const { t } = useLanguage()
  const pageRef = useRef<HTMLDivElement>(null)
  const guestInputRef = useRef<HTMLInputElement>(null)
  const focusTimer = useRef<number>(0)
  const [selectedPastry, setSelectedPastry] = useState(pastries[0].slug)

  useDocumentTitle(t.mendls.pageTitle)
  useReveal(pageRef)

  // Al salir de la página se cancela el temporizador pendiente
  useEffect(() => () => window.clearTimeout(focusTimer.current), [])

  // "Pedir para mi suite": preselecciona el pastel y, tras el scroll suave, enfoca el nombre
  const handleOrder = (slug: string) => {
    setSelectedPastry(slug)
    window.clearTimeout(focusTimer.current)
    focusTimer.current = window.setTimeout(() => {
      guestInputRef.current?.focus({ preventScroll: true })
    }, 650)
  }

  return (
    <div className="mendls" ref={pageRef}>
      <MendlsHero />
      <PastryMenu onOrder={handleOrder} />
      <PackagingSection>
        <OrderForm
          selectedPastry={selectedPastry}
          onSelectPastry={setSelectedPastry}
          guestInputRef={guestInputRef}
        />
      </PackagingSection>
    </div>
  )
}
