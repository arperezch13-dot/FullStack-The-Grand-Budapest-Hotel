/* Página "Suites y tarifas" */

import { useRef } from 'react'

import RatesSection from '../components/suites/RatesSection'
import SuitesHero from '../components/suites/SuitesHero'
import SuitesList from '../components/suites/SuitesList'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLanguage } from '../hooks/useLanguage'
import { useReveal } from '../hooks/useReveal'
import { useRooms } from '../hooks/useRooms'
import '../styles/suites.css'

export default function Suites() {
  const { t } = useLanguage()
  const { rooms } = useRooms()
  const pageRef = useRef<HTMLDivElement>(null)

  useDocumentTitle(t.suites.pageTitle)
  useReveal(pageRef, rooms.length)

  // Tabla de precios para la placa del hero
  const prices = rooms.map((room) => room.price)
  const minPrice = prices.length ? Math.min(...prices) : 0
  const maxPrice = prices.length ? Math.max(...prices) : 0

  return (
    <div className="suites" ref={pageRef}>
      <SuitesHero minPrice={minPrice} maxPrice={maxPrice} />
      <SuitesList rooms={rooms} />
      <RatesSection rooms={rooms} />
    </div>
  )
}
