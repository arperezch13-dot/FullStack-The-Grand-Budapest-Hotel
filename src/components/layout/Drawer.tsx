/* Menú lateral desplegable:insignia de la Sociedad, selector de idioma, enlaces principales, botón de reserva y nota telegrafiada */

import { Link, NavLink } from 'react-router-dom'

import { navItems } from '../../data/navigation'
import { useLanguage } from '../../hooks/useLanguage'

interface DrawerProps {
  open: boolean
  onClose: () => void
}

export default function Drawer({ open, onClose }: DrawerProps) {
  const { t, lang, setLang } = useLanguage()

  return (
    <aside className="drawer-panel" id="drawerPanel" aria-hidden={!open}>
      {/* Cabecera con el logo de las llaves cruzadas */}
      <div className="drawer-header">
        <div className="society-badge">
          <div className="badge-icon">
            <img src="/Media/BL_2_.webp" alt={t.drawer.logoAlt} />
          </div>
          <div className="badge-info">
            <p className="badge-tag">{t.drawer.badgeTag}</p>
            <h3>{t.drawer.badgeTitle}</h3>
            <p className="badge-sub">{t.drawer.badgeSub}</p>
          </div>
        </div>
        <button className="drawer-close-btn" type="button" aria-label={t.common.closeMenu} onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>
      </div>

      {/* Barra de idiomas dentro del drawer */}
      <div className="drawer-lang-bar">
        <span className="lang-label">{t.drawer.language}</span>
        <div className="lang-pills-group">
          <button
            type="button"
            className={`pill${lang === 'es' ? ' active' : ''}`}
            onClick={() => setLang('es')}
          >
            {t.drawer.langEs}
          </button>
          <button
            type="button"
            className={`pill${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
          >
            {t.drawer.langEn}
          </button>
        </div>
      </div>

      {/* Lista de navegación principal */}
      <nav>
        <ul id="primary-navigation" className="drawer-menu">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink className="link nav-card" to={item.to} onClick={onClose}>
                <div className="card-left">
                  <span className="card-icon">
                    <i className={item.icon}></i>
                  </span>
                  <div className="card-text">
                    <span className="card-title">{t.drawer.items[item.key].title}</span>
                    <span className="card-desc">{t.drawer.items[item.key].desc}</span>
                  </div>
                </div>
                <i className="ri-arrow-right-line arrow-icon"></i>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Filigrana decorativa */}
      <div className="drawer-flourish" aria-hidden="true">
        <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden="true">
          <path
            d="M1 5q7-7 14 0t14 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>

      {/* Pie del drawer */}
      <div className="drawer-footer">
        <Link className="book-now-btn" to="/book-now" onClick={onClose}>
          <i className="ri-calendar-event-line"></i>
          <span> {t.drawer.bookNow}</span>
        </Link>
        <div className="telegraph-box">
          <div className="freq-line">
            <span className="pulse-dot"></span>
            <span>{t.drawer.telegram}</span>
          </div>
          <p className="quote">{t.drawer.quote}</p>
          <div className="stamp-line">
            <span>{t.drawer.stamp}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
