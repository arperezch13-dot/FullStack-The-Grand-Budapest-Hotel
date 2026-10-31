import { useLanguage } from '../../hooks/useLanguage'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer>
      <div className="footer-background flex-column">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/Media/BL_2_.webp" alt={t.footer.logoAlt} />
          </div>

          <div className="footer-header">
            <div className="footer-tittle">
              <h2>{t.footer.title}</h2>
              <p className="footer-place">{t.footer.place}</p>
            </div>
          </div>

          {/* Datos de contacto */}
          <div className="main-contact flex-row">
            <div className="contact-item">
              <p>{t.footer.address}</p>
            </div>
            <span className="contact-sep" aria-hidden="true"></span>
            <div className="contact-item">
              <a href="mailto:reservations@grandbudapest.com">reservations@grandbudapest.com</a>
            </div>
            <span className="contact-sep" aria-hidden="true"></span>
            <div className="contact-item">
              <p>+00 123 456 789</p>
            </div>
          </div>

          <div className="footer-nav">
            {/* Redes sociales */}
            <ul className="footer-nav__social flex-row">
              <li className="nav-item">
                <a href="#facebook">
                  Facebook<i className="ri-facebook-fill"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="#instagram">
                  Instagram<i className="ri-instagram-line"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="#pinterest">
                  Pinterest<i className="ri-pinterest-line"></i>
                </a>
              </li>
            </ul>

            {/* Enlaces */}
            <ul className="footer-nav__links flex-row">
              <li className="nav-text">
                <a className="footer-pill" href="#privacy">
                  {t.footer.privacy}
                </a>
              </li>
              <li className="nav-text">
                <a className="footer-pill footer-pill--ghost" href="#written">
                  {t.footer.complaints}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-signature italic">
          <p>
            {t.footer.managedBefore}
            <span>{t.footer.managedSociety}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
