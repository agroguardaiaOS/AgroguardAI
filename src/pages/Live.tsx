import { useState } from 'react'
import type { AppPage, DiagnosisResult, LanguageCode } from '../types'
import { useCamera } from '../hooks/useCamera'
import { useSpeech } from '../hooks/useSpeech'
import { diagnoseCrop, friendlyError } from '../api'
import { addHistory } from '../lib/storage'
import { CameraFeed } from '../components/camera/CameraFeed'
import { CameraControls } from '../components/camera/CameraControls'
import { Badge } from '../components/ui/Badge'
import { Spinner } from '../components/ui/Spinner'
import { severity as sevColors } from '../styles/theme'
import s from './Live.module.css'

let _id = 0
const uid = () => `${Date.now()}-${++_id}`

interface Props {
  lang:       LanguageCode
  onNavigate: (p: AppPage) => void
}

export default function Live({ lang, onNavigate }: Props) {
  const cam    = useCamera()
  const speech = useSpeech(lang)

  const [analysing, setAnalysing] = useState(false)
  const [result,    setResult]    = useState<DiagnosisResult | null>(null)
  const [error,     setError]     = useState<string | null>(null)

  const handleCapture = async () => {
    const frame = cam.capture()
    if (!frame) return

    setAnalysing(true)
    setError(null)
    setResult(null)

    try {
      const r = await diagnoseCrop('', frame, lang)
      setResult(r)

      addHistory({
        id:       uid(),
        date:     new Date().toISOString(),
        disease:  r.disease,
        severity: r.severity,
        lang,
        text:     '',
        imageUrl: `data:${frame.mimeType};base64,${frame.base64}`,
      })

      speech.speak(`${r.disease}. ${r.cause}. ${r.treatment[0] ?? ''}`)

    } catch (e) {
      setError(friendlyError(e))
    } finally {
      setAnalysing(false)
    }
  }

  const dismiss = () => { setResult(null); setError(null) }

  const sevColor = result ? sevColors[result.severity] : 'var(--green)'

  return (
    <div className={s.page}>

      {/* Camera */}
      <div className={s.cameraWrap}>
        <CameraFeed
          videoRef={cam.videoRef}
          isActive={cam.isActive}
          isLoading={cam.isLoading}
          error={cam.error}
          start={cam.start}
        />

        {/* Top bar */}
        <div className={s.topBar}>
          <button
            className={s.backBtn}
            onClick={() => { cam.stop(); onNavigate('home') }}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <Badge label="AI VISION" color="green" dot pulse/>

          <div style={{ width: 36 }} />
        </div>
      </div>

      {/* Camera controls */}
      <CameraControls
        onCapture={handleCapture}
        onFlip={cam.flip}
        onClose={() => { cam.stop(); onNavigate('home') }}
        isAnalysing={analysing}
        isActive={cam.isActive}
      />

      {/* Hint */}
      {!result && !error && !analysing && cam.isActive && (
        <p className={s.hint}>
          Point camera at the affected crop and tap capture
        </p>
      )}

      {/* Analysing */}
      {analysing && (
        <div className={s.analysingWrap}>
          <Spinner size="sm"/>
          <span className={s.analysingText}>Analysing crop...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className={s.errorCard}>
          <span className={s.errorIcon}>⚠️</span>
          <div className={s.errorBody}>
            <p className={s.errorTitle}>Diagnosis failed</p>
            <p className={s.errorMsg}>{error}</p>
          </div>
          <button className={s.dismissBtn} onClick={dismiss}>✕</button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className={s.resultCard}
          style={{ borderTopColor: sevColor }}
        >
          <div className={s.resultHeader}>
            <div className={s.resultLeft}>
              <div className={s.diseaseName}>{result.disease}</div>
              <div className={s.resultMeta}>
                <span className={s.confidence}>
                  Confidence: {result.confidence}
                </span>
                <span
                  className={s.severity}
                  style={{ color: sevColor }}
                >
                  ● {result.severity.toUpperCase()}
                </span>
              </div>
            </div>
            <button className={s.dismissBtn} onClick={dismiss}>✕</button>
          </div>

          <p className={s.cause}>{result.cause}</p>

          <div className={s.stepsLabel}>Treatment</div>
          <div className={s.steps}>
            {result.treatment.slice(0, 3).map((t, i) => (
              <div key={i} className={s.step}>
                <span
                  className={s.stepNum}
                  style={{ borderColor: sevColor + '44', color: sevColor }}
                >
                  {i + 1}
                </span>
                <span className={s.stepText}>{t}</span>
              </div>
            ))}
          </div>

          <div className={s.resultActions}>
            <button
              className={s.speakBtn}
              onClick={() => speech.speak(
                `${result.disease}. ${result.cause}. ${result.treatment.join('. ')}`
              )}
            >
              🔊 Read Aloud
            </button>
            <button
              className={s.chatBtn}
              onClick={() => onNavigate('chat')}
            >
              💬 Ask More
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
