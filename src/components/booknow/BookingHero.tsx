/* Cabecera de la página: título, los tres pasos de la reserva y botón "hotel info" */

import { useLanguage } from '../../hooks/useLanguage'

export default function BookingHero({ onOpenInfo }: { onOpenInfo: () => void }) {
  const { t } = useLanguage()
  const { booknow } = t

  return (
    <>
      <section className="booking-hero">
        <div className="booking-hero__inner">
          <p className="booking-eyebrow booking-eyebrow--rose">{booknow.eyebrow}</p>
          <h1 className="booking-hero__title">{booknow.title}</h1>

          <ol className="booking-steps" aria-label={booknow.stepsLabel}>
            <li className="booking-steps__item is-current" aria-current="step">
              <span>1</span>
              {booknow.stepStay}
            </li>
            <li className="booking-steps__line" aria-hidden="true"></li>
            <li className="booking-steps__item">
              <span>2</span>
              {booknow.stepExtras}
            </li>
            <li className="booking-steps__line" aria-hidden="true"></li>
            <li className="booking-steps__item">
              <span>3</span>
              {booknow.stepBooking}
            </li>
          </ol>

          <button className="booking-info-btn" type="button" onClick={onOpenInfo}>
            {booknow.hotelInfo}
          </button>
        </div>
      </section>

      {/* Wave */}
      <div className="booking-wave" aria-hidden="true"></div>
    </>
  )
}
