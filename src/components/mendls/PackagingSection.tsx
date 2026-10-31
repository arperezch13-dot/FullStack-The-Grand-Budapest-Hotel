/* "El arte del embalaje": tres pasos y una cita */

import type { CSSProperties, ReactNode } from 'react'

import { useLanguage } from '../../hooks/useLanguage'

interface PackagingSectionProps {
  /* Formulario de pedido que se muestra al final de la sección. */
  children: ReactNode
}

export default function PackagingSection({ children }: PackagingSectionProps) {
  const { t } = useLanguage()
  const { mendls } = t

  return (
    <section className="mendls-wrap" id="empaque">
      <div className="mendls-wrap__head reveal">
        <h2 className="mendls-title">{mendls.packTitle}</h2>
      </div>

      <ol className="wrap-steps">
        {mendls.packSteps.map((step, index) => (
          <li key={step.title} className="wrap-step reveal" style={{ '--i': index } as CSSProperties}>
            <span className="wrap-step__num">{index + 1}</span>
            <h3 className="wrap-step__title">{step.title}</h3>
            <p className="wrap-step__text">{step.text}</p>
          </li>
        ))}
      </ol>

      {/* Cita de M. Gustave */}
      <blockquote className="mendls-quote reveal">
        <p>{mendls.quote}</p>
        <cite>{mendls.quoteAuthor}</cite>
      </blockquote>

      {children}
    </section>
  )
}
