import type { AppPage } from '../../types'
import s from './BottomNav.module.css'

// ─────────────────────────────────────────
// Live → Chat → Voice → Home (dashboard)
// Settings is in the Header top right
// ─────────────────────────────────────────

const TABS: { id: AppPage; icon: string; label: string }[] = [
  { id: 'live',  icon: '📸', label: 'Live'  },
  { id: 'chat',  icon: '💬', label: 'Chat'  },
  { id: 'voice', icon: '🎤', label: 'Voice' },
  { id: 'home',  icon: '🏠', label: 'Home'  },
]

interface Props {
  current:  AppPage
  onChange: (p: AppPage) => void
}

export function BottomNav({ current, onChange }: Props) {
  return (
    <nav className={s.nav}>
      <div className={s.topGlow} />
      {TABS.map(tab => {
        const active = current === tab.id
        return (
          <button
            key={tab.id}
            className={`${s.tab} ${active ? s.active : ''}`}
            onClick={() => onChange(tab.id)}
            aria-label={tab.label}
            aria-current={active ? 'page' : undefined}
          >
            {active && <span className={s.pill} />}
            <span className={s.icon}>{tab.icon}</span>
            <span className={s.label}>{tab.label}</span>
            {active && <span className={s.activeDot} />}
          </button>
        )
      })}
    </nav>
  )
  }
