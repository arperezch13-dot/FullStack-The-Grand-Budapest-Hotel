import { Link } from 'react-router-dom'

import { useHeaderScroll } from '../../hooks/useHeaderScroll'
import { useLanguage } from '../../hooks/useLanguage'

interface HeaderProps {
  navOpen: boolean
  onToggleNav: () => void
}

export default function Header({ navOpen, onToggleNav }: HeaderProps) {
  const { t, lang, setLang } = useLanguage()
  const scrolled = useHeaderScroll()

  return (
    <header className={`flex-row${scrolled ? ' is-scrolled' : ''}`}>
      {/* Botón del menú: círculo rosa */}
      <button
        className="nav-toggle"
        type="button"
        aria-label={navOpen ? t.common.closeMenu : t.common.openMenu}
        aria-controls="drawerPanel"
        aria-expanded={navOpen}
        onClick={onToggleNav}
      >
        <span className="nav-toggle__lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="nav-toggle__label">{t.common.menu}</span>
      </button>

      {/* Logo central */}
      <Link className="logo-link" to="/" aria-label={t.common.logoAria}>
        <span className="logo-dot" aria-hidden="true"></span>
        <span className="logo-name">The Grand Budapest Hotel</span>
        <span className="logo-dot" aria-hidden="true"></span>
      </Link>

      {/* Selector de idioma (EN/ES) */}
      <div className="lang-switch">
        <button
          type="button"
          className={`lang-pill${lang === 'en' ? ' active' : ''}`}
          aria-pressed={lang === 'en'}
          onClick={() => setLang('en')}
        >
          {t.common.langEn}
        </button>
        <button
          type="button"
          className={`lang-pill${lang === 'es' ? ' active' : ''}`}
          aria-pressed={lang === 'es'}
          onClick={() => setLang('es')}
        >
          {t.common.langEs}
        </button>
      </div>
    </header>
  )
}
