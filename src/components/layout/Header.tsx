import type { ReactNode } from 'react'
import s from './Header.module.css'

interface Props {
  title?:  string
  back?:   () => void
  action?: ReactNode
}

export function Header({ title, back, action }: Props) {
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

      {/* Center — title */}
      {title && (
        <h1 className={s.title}>{title}</h1>
      )}

      {/* Right — action slot */}
      <div className={s.right}>
        {action ?? <div className={s.placeholder} />}
      </div>

    </header>
  )
    }
