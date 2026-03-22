import type { AppPage } from '../types'
import { Header } from '../components/layout/Header'
import s from './Home.module.css'

interface Props {
  onNavigate: (p: AppPage) => void
  onSettings: () => void
}

export default function Home({ onNavigate, onSettings }: Props) {
  return (
    <div className={s.page}>
      <Header onSettings={onSettings} />

      {/* Glow */}
      <div className={s.glow} />

      {/* Hero */}
      <div className={s.hero}>
        <div className={s.heroTag}>
          <span className={s.heroDot} />
          AI Crop Doctor · Voice First · Free
        </div>

        <h1 className={s.heroTitle}>
          Diagnose Any<br/>
          Crop Disease<br/>
          <span className={s.accent}>Instantly.</span>
        </h1>

        <p className={s.heroSub}>
          Point your camera at a sick crop.<br/>
          Speak in your language.<br/>
          Get expert advice in seconds.
        </p>

        <button
          className={s.heroCta}
          onClick={() => onNavigate('live')}
        >
          📸 Start Diagnosis
        </button>
      </div>

      {/* Stats */}
      <div className={s.stats}>
        <div className={s.stat}>
          <span className={s.statNum}>90%</span>
          <span className={s.statLbl}>Accuracy</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>5+</span>
          <span className={s.statLbl}>Languages</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>20+</span>
          <span className={s.statLbl}>Crops</span>
        </div>
      </div>

      {/* How it works */}
      <div className={s.section}>
        <div className={s.sectionLabel}>How It Works</div>
        <div className={s.steps}>
          <div className={s.step}>
            <div className={s.stepNum}>1</div>
            <div>
              <div className={s.stepTitle}>Point Your Camera</div>
              <div className={s.stepDesc}>Aim at the affected leaves, stem or fruit</div>
            </div>
          </div>
          <div className={s.stepLine} />
          <div className={s.step}>
            <div className={s.stepNum}>2</div>
            <div>
              <div className={s.stepTitle}>Speak or Type</div>
              <div className={s.stepDesc}>Describe what you see in your own language</div>
            </div>
          </div>
          <div className={s.stepLine} />
          <div className={s.step}>
            <div className={s.stepNum}>3</div>
            <div>
              <div className={s.stepTitle}>Get Diagnosis</div>
              <div className={s.stepDesc}>AI identifies the disease and tells you exactly what to do</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className={s.section}>
        <div className={s.sectionLabel}>Quick Actions</div>
        <div className={s.actions}>

          <button className={s.actionCard} onClick={() => onNavigate('live')}>
            <span className={s.actionIcon}>📸</span>
            <div>
              <div className={s.actionTitle}>Live Camera</div>
              <div className={s.actionDesc}>Diagnose from a photo</div>
            </div>
            <span className={s.actionArrow}>→</span>
          </button>

          <button className={s.actionCard} onClick={() => onNavigate('chat')}>
            <span className={s.actionIcon}>💬</span>
            <div>
              <div className={s.actionTitle}>Ask a Question</div>
              <div className={s.actionDesc}>Chat with the AI agronomist</div>
            </div>
            <span className={s.actionArrow}>→</span>
          </button>

          <button className={s.actionCard} onClick={() => onNavigate('voice')}>
            <span className={s.actionIcon}>🎤</span>
            <div>
              <div className={s.actionTitle}>Voice Mode</div>
              <div className={s.actionDesc}>Speak and listen in your language</div>
            </div>
            <span className={s.actionArrow}>→</span>
          </button>

        </div>
      </div>

      {/* Languages */}
      <div className={s.section}>
        <div className={s.sectionLabel}>Speak In Your Language</div>
        <div className={s.langs}>
          <div className={s.langChip}><span>🇳🇬</span><span>Hausa</span></div>
          <div className={s.langChip}><span>🇳🇬</span><span>Igbo</span></div>
          <div className={s.langChip}><span>🇳🇬</span><span>Yorùbá</span></div>
          <div className={s.langChip}><span>🇹🇿</span><span>Kiswahili</span></div>
          <div className={s.langChip}><span>🌍</span><span>English</span></div>
        </div>
      </div>

      {/* AIC Badge */}
      <div className={s.section}>
        <div className={s.aicCard}>
          <span className={s.aicIcon}>🏆</span>
          <div>
            <div className={s.aicTitle}>
              African Impact Challenge 2026
            </div>
            <div className={s.aicSub}>
              Explorer Track Cohort — accepted and currently ongoing.
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className={s.tagline}>
        "Built for the farmers who feed the continent but fight blind."
      </div>

    </div>
  )
  }
