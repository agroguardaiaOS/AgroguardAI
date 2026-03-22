import s from './SpeechOutput.module.css'

interface Props {
  isSpeaking: boolean
  onStop:     () => void
}

export function SpeechOutput({ isSpeaking, onStop }: Props) {
  if (!isSpeaking) return null

  return (
    <div className={s.bar}>

      {/* Animated waveform */}
      <div className={s.waves}>
        {[...Array(7)].map((_, i) => (
          <span
            key={i}
            className={s.wave}
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      <span className={s.label}>Speaking aloud...</span>

      {/* Stop button */}
      <button className={s.stop} onClick={onStop} aria-label="Stop speaking">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" rx="2"/>
        </svg>
      </button>
    </div>
  )
}
