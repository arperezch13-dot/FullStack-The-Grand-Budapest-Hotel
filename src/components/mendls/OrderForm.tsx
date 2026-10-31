/* Formulario de pedido de pastelería. Todos los campos están controlados con estado de React. Al enviar no hay servidor detrás, solo se muestra un mensaje de confirmación */

import { useState } from 'react'
import type { ChangeEvent, FormEvent, RefObject } from 'react'

import { pastries } from '../../data/pastries'
import { useLanguage } from '../../hooks/useLanguage'

const DEFAULT_TIME = '16:30'

interface OrderFormProps {
  /* Pastel seleccionado (slug) */
  selectedPastry: string
  onSelectPastry: (slug: string) => void
  /* Referencia al input del nombre del invitado, para poder ponerle el foco desde fuera */
  guestInputRef: RefObject<HTMLInputElement | null>
}

/* Datos del último pedido enviado (con ellos se construye el mensaje). */
interface SentOrder {
  guest: string
  pastry: string
  time: string
}

export default function OrderForm({ selectedPastry, onSelectPastry, guestInputRef }: OrderFormProps) {
  const { t } = useLanguage()
  const { form } = t.mendls

  const [guest, setGuest] = useState('')
  const [suite, setSuite] = useState('')
  const [time, setTime] = useState(DEFAULT_TIME)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState<SentOrder | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSent({ guest: guest.trim(), pastry: selectedPastry, time })

    // Vacía el formulario (el pastel elegido se mantiene)
    setGuest('')
    setSuite('')
    setTime(DEFAULT_TIME)
    setNote('')
  }

  // Mensaje de confirmación en el idioma activo
  const statusMessage = sent
    ? form.status
        .replace('{guest}', sent.guest || form.defaultGuest)
        .replace('{pastry}', t.mendls.pastries[sent.pastry]?.name ?? sent.pastry)
        .replace('{time}', sent.time)
    : ''

  return (
    <form className="order reveal" id="orden" onSubmit={handleSubmit}>
      <p className="mendls-eyebrow">{form.eyebrow}</p>
      <h2 className="order__title">{form.title}</h2>
      <p className="order__lead">{form.lead}</p>

      <div className="order__grid">
        <p className="order__field">
          <label htmlFor="guest">{form.guest}</label>
          <input
            type="text"
            id="guest"
            name="guest"
            ref={guestInputRef}
            placeholder={form.guestPlaceholder}
            value={guest}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setGuest(event.target.value)}
            required
          />
        </p>
        <p className="order__field">
          <label htmlFor="suite">{form.suite}</label>
          <input
            type="text"
            id="suite"
            name="suite"
            placeholder={form.suitePlaceholder}
            value={suite}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSuite(event.target.value)}
            required
          />
        </p>
        <p className="order__field">
          <label htmlFor="pastry">{form.selection}</label>
          <select
            id="pastry"
            name="pastry"
            value={selectedPastry}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => onSelectPastry(event.target.value)}
          >
            {pastries.map((pastry) => (
              <option key={pastry.slug} value={pastry.slug}>
                {t.mendls.pastries[pastry.slug]?.name ?? pastry.slug}
              </option>
            ))}
          </select>
        </p>
        <p className="order__field">
          <label htmlFor="time">{form.time}</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTime(event.target.value)}
          />
        </p>
        <p className="order__field order__field--wide">
          <label htmlFor="note">{form.note}</label>
          <textarea
            id="note"
            name="note"
            rows={3}
            placeholder={form.notePlaceholder}
            value={note}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNote(event.target.value)}
          />
        </p>
      </div>

      <button className="mendls-btn mendls-btn--purple order__submit" type="submit">
        <i className="ri-send-plane-2-line"></i> {form.submit}
      </button>
      <p className="order__status" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </form>
  )
}
