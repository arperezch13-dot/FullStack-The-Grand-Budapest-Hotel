/* Tarjeta de un pastel de la carta. El enlace "Pedir para mi suite" preselecciona el pastel en el formulario */

import type { CSSProperties } from 'react'

import { useLanguage } from '../../hooks/useLanguage'
import type { Pastry } from '../../data/pastries'

interface PastryCardProps {
  pastry: Pastry
  /* Posición en la lista: alterna el estilo "odd" / "even" de las tarjetas */
  index: number
  /* Función que se llama al hacer clic en "Pedir para mi suite", para preseleccionar el pastel en el formulario */
  onOrder: (slug: string) => void
}

export default function PastryCard({ pastry, index, onOrder }: PastryCardProps) {
  const { t } = useLanguage()
  const text = t.mendls.pastries[pastry.slug]
  if (!text) return null

  return (
    <article className="pastry reveal" style={{ '--i': index % 3 } as CSSProperties}>
      <span className="pastry__tag">{text.tag}</span>
      <div className="pastry__photo">
        <img src={pastry.image} alt={text.alt} />
        <span className="pastry__price">
          {pastry.priceEur} € / {pastry.priceUsd} $
        </span>
      </div>
      <h3 className="pastry__title">{text.name}</h3>
      <p className="pastry__sub">{text.sub}</p>
      <span className="pastry__rule" aria-hidden="true"></span>
      <p className="pastry__text">{text.text}</p>
      <ul className="pastry__chips">
        {text.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
      <span className="pastry__rule pastry__rule--end" aria-hidden="true"></span>
      <a className="pastry__order" href="#orden" onClick={() => onOrder(pastry.slug)}>
        <i className="ri-shopping-bag-3-line"></i> {t.mendls.orderLink}
      </a>
      <a className="pastry__pack" href="#empaque">
        {t.mendls.packLink}
      </a>
    </article>
  )
}
