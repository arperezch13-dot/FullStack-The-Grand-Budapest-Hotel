/* Cabecera de la página con los tres pasos de progreso */

import { Fragment } from 'react'

import { useLanguage } from '../../hooks/useLanguage'

interface CheckinHeroProps {
  done: boolean[] 
  current: number
}

export default function CheckinHero({ done, current }: CheckinHeroProps) {
  const { t } = useLanguage()
  const { checkin } = t
  const labels = [checkin.stepBooking, checkin.stepArrival, checkin.stepGuests]

  return (
    <>
      <section className="checkin-hero">
        <div className="checkin-hero__inner">
          <p className="checkin-eyebrow">{checkin.eyebrow}</p>
          <h1 className="checkin-hero__title">{checkin.title}</h1>
          <p className="checkin-hero__text">{checkin.lead}</p>

          <ol className="checkin-steps" id="checkinSteps" aria-label={checkin.progressLabel}>
            {labels.map((label, index) => {
              const isCurrent = index === current && !done[index]
              const classes = [
                'checkin-steps__item',
                done[index] ? 'is-done' : '',
                isCurrent ? 'is-current' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <Fragment key={label}>
                  {index > 0 && <li className="checkin-steps__line" aria-hidden="true"></li>}
                  <li className={classes} aria-current={isCurrent ? 'step' : undefined}>
                    <span>{index + 1}</span>
                    {label}
                  </li>
                </Fragment>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Wave */}
      <div className="checkin-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,32L30,48C60,64,120,96,180,122.7C240,149,300,171,360,181.3C420,192,480,192,540,160C600,128,660,64,720,69.3C780,75,840,149,900,197.3C960,245,1020,267,1080,245.3C1140,224,1200,160,1260,128C1320,96,1380,96,1410,96L1440,96L1440,0L0,0Z"></path>
        </svg>
      </div>
    </>
  )
}
