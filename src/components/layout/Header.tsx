import type { ReactNode } from 'react'
import s from './Header.module.css'

interface Props {
  title?:       string
  back?:        () => void
  action?:      ReactNode
  onSettings?:  () => void
}

export function Header({ title, back, action, onSettings }: Props) {
  return (
    <header className={s.header}>

      {/* Left — back button or brand */}
      <div className={s.left}>
        {back ? (
          <button className={s.back} onClick={back} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        ) : (
          <div className={s.brand}>
            <div className={s.logoWrap}>
              <img
                src="/logo.png"
                alt="AgroGuardAI"
                className={s.logo}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className={s.logoFallback}>🌿</span>
            </div>
            <div className={s.brandText}>
              <span className={s.brandName}>AgroGuardAI</span>
              <span className={s.brandSub}>AI Crop Doctor</span>
            </div>
          </div>
        )}
      </div>

      {/* Center — page title */}
      {title && <h1 className={s.title}>{title}</h1>}

      {/* Right — custom action or settings button */}
      <div className={s.right}>
        {action ?? (
          <button
            className={s.settingsBtn}
            onClick={onSettings}
            aria-label="Settings"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        )}
      </div>

    </header>
  )
            }
