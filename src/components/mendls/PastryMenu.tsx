/* La carta, wave, título y grid con todos los pasteles */

import { pastries } from '../../data/pastries'
import { useLanguage } from '../../hooks/useLanguage'
import PastryCard from './PastryCard'

interface PastryMenuProps {
  onOrder: (slug: string) => void
}

export default function PastryMenu({ onOrder }: PastryMenuProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Wave */}
      <div className="mendls-wave mendls-wave--cream" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#55115a"
            d="M0,160L30,160C60,160,120,160,180,144C240,128,300,96,360,112C420,128,480,192,540,186.7C600,181,660,107,720,106.7C780,107,840,181,900,213.3C960,245,1020,235,1080,202.7C1140,171,1200,117,1260,112C1320,107,1380,149,1410,170.7L1440,192L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <section className="mendls-menu" id="carta">
        <div className="mendls-menu__head reveal">
          <h2 className="mendls-title">{t.mendls.menuTitle}</h2>
          <div className="mendls-ornament" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="mendls-text">{t.mendls.menuText}</p>
        </div>

        <div className="mendls-menu__grid">
          {pastries.map((pastry, index) => (
            <PastryCard key={pastry.slug} pastry={pastry} index={index} onOrder={onOrder} />
          ))}
        </div>
      </section>

      {/* Wave */}
      <div className="mendls-wave mendls-wave--pink" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#fdf6ee"
            d="M0,32L30,48C60,64,120,96,180,122.7C240,149,300,171,360,181.3C420,192,480,192,540,160C600,128,660,64,720,69.3C780,75,840,149,900,197.3C960,245,1020,267,1080,245.3C1140,224,1200,160,1260,128C1320,96,1380,96,1410,96L1440,96L1440,0L0,0Z"
          ></path>
        </svg>
      </div>
    </>
  )
}
