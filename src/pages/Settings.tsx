import { useState } from 'react'
import type { LanguageCode } from '../types'
import { LANGUAGES, LIVE_LANGUAGES, COMING_LANGUAGES } from '../lib/languages'
import { getSavedLang, saveLang, clearHistory, clearSessions, clearAll } from '../lib/storage'
import { Header } from '../components/layout/Header'
import { VoicePersonalityPicker } from '../components/voice/VoicePersonality'
import type { VoicePersonality } from '../components/voice/VoicePersonality'
import s from './Settings.module.css'

interface Props {
  lang:         LanguageCode
  onLangChange: (l: LanguageCode) => void
}

export default function Settings({ lang, onLangChange }: Props) {
  const [personality,  setPersonality]  = useState<VoicePersonality>('natural')
  const [confirmText,  setConfirmText]  = useState('')
  const [cleared,      setCleared]      = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)

  const handleClearAll = () => {
    if (confirmText.trim().toUpperCase() !== 'CONFIRM') return
    clearAll()
    setCleared(true)
    setConfirmText('')
    setShowConfirm(false)
    setTimeout(() => setCleared(false), 3000)
  }

  return (
    <div className={s.page}>
      <Header title="Settings" />

      {/* ── LANGUAGE ── */}
      <div className={s.section}>
        <div className={s.sectionTitle}>Language</div>
        <div className={s.langGrid}>
          {LIVE_LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`${s.langBtn} ${lang === l.code ? s.langActive : ''}`}
              onClick={() => onLangChange(l.code as LanguageCode)}
            >
              <span className={s.langFlag}>{l.flag}</span>
              <span className={s.langNative}>{l.native}</span>
              {lang === l.code && <span className={s.langCheck}>✓</span>}
            </button>
          ))}
        </div>
        {COMING_LANGUAGES.length > 0 && (
          <div className={s.comingRow}>
            {COMING_LANGUAGES.map(l => (
              <div key={l.code} className={s.comingChip}>
                {l.flag} {l.native} — Coming soon
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── VOICE PERSONALITY ── */}
      <div className={s.section}>
        <div className={s.sectionTitle}>Voice Personality</div>
        <VoicePersonalityPicker
          current={personality}
          onChange={setPersonality}
        />
      </div>

      {/* ── ABOUT ── */}
      <div className={s.section}>
        <div className={s.sectionTitle}>About</div>
        <div className={s.card}>
          <div className={s.row}>
            <span className={s.rowLabel}>Version</span>
            <span className={s.rowValue}>1.0.0</span>
          </div>
          <div className={s.row}>
            <span className={s.rowLabel}>License</span>
            <span className={s.rowValue}>MIT Open Source</span>
          </div>
          <div className={s.row}>
            <span className={s.rowLabel}>AI Model</span>
            <span className={s.rowValue}>Gemini 3.1 Pro</span>
          </div>
          <div className={s.row}>
            <span className={s.rowLabel}>AIC 2026</span>
            <span className={s.rowValueGreen}>Explorer Track ✓</span>
          </div>
          <div className={s.row}>
            <span className={s.rowLabel}>Open Source</span>
            <a
              href="https://github.com/agroguardaiaos/AgroGuardAI"
              target="_blank"
              rel="noopener noreferrer"
              className={s.rowLink}
            >
              github.com/agroguardaiaos →
            </a>
          </div>
        </div>
      </div>

      {/* ── DATA ── */}
      <div className={s.section}>
        <div className={s.sectionTitle}>Data</div>
        <div className={s.card}>

          {!showConfirm && !cleared && (
            <>
              <p className={s.dataNote}>
                This will permanently delete all your diagnosis history,
                chat sessions and saved settings. This cannot be undone.
              </p>
              <button
                className={s.dangerBtn}
                onClick={() => setShowConfirm(true)}
              >
                Clear All Data
              </button>
            </>
          )}

          {showConfirm && (
            <div className={s.confirmBox}>
              <p className={s.confirmNote}>
                Type <strong>CONFIRM</strong> below to delete all data permanently.
              </p>
              <input
                type="text"
                className={`${s.confirmInput} ${confirmText.toUpperCase() === 'CONFIRM' ? s.confirmReady : ''}`}
                placeholder="Type CONFIRM"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
              />
              <div className={s.confirmBtns}>
                <button
                  className={s.cancelBtn}
                  onClick={() => { setShowConfirm(false); setConfirmText('') }}
                >
                  Cancel
                </button>
                <button
                  className={`${s.dangerBtn} ${confirmText.toUpperCase() !== 'CONFIRM' ? s.dangerDisabled : ''}`}
                  onClick={handleClearAll}
                  disabled={confirmText.trim().toUpperCase() !== 'CONFIRM'}
                >
                  Delete Everything
                </button>
              </div>
            </div>
          )}

          {cleared && (
            <div className={s.clearedMsg}>
              ✓ All data cleared successfully.
            </div>
          )}

        </div>
      </div>

      {/* Tagline */}
      <div className={s.tagline}>
        "Built for the farmers who feed the continent but fight blind."
      </div>

    </div>
  )
