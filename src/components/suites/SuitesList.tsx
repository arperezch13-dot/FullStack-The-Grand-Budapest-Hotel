/* Listado de las habitaciones */

import { useLanguage } from '../../hooks/useLanguage'
import type { Room } from '../../data/rooms'
import SuiteRow from './SuiteRow'

interface SuitesListProps {
  rooms: Room[]
}

export default function SuitesList({ rooms }: SuitesListProps) {
  const { t } = useLanguage()

  return (
    <section className="suites-list" id="suites">
      <div className="suites-list__head reveal">
        <p className="suites-eyebrow">{t.suites.listEyebrow}</p>
        <h2 className="suites-title">{t.suites.listTitle}</h2>
      </div>

      <div className="suites-list__rows">
        {rooms.map((room, index) => (
          <SuiteRow key={room.slug} room={room} index={index} />
        ))}
      </div>
    </section>
  )
}
