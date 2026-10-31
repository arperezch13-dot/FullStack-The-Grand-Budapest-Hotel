/* Placa con el precio mínimo y máximo por noche. Los números suben desde 0 hasta su valor (hooks/useCountUp.ts) */

import { useCountUp } from '../../hooks/useCountUp'
import { useLanguage } from '../../hooks/useLanguage'

interface PricePlaqueProps {
  minPrice: number
  maxPrice: number
}

export default function PricePlaque({ minPrice, maxPrice }: PricePlaqueProps) {
  const { t } = useLanguage()
  const min = useCountUp(minPrice)
  const max = useCountUp(maxPrice)

  return (
    <div className="price-plaque reveal">
      <p className="price-plaque__label">{t.suites.plaqueFrom}</p>
      <p className="price-plaque__value">{min} €</p>
      <div className="suites-ornament" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="price-plaque__label">{t.suites.plaqueUpTo}</p>
      <p className="price-plaque__value">{max} €</p>
    </div>
  )
}
