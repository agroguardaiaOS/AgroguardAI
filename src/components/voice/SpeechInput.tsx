import s from './SpeechInput.module.css'

interface Props {
  isListening: boolean
  transcript:  string
  onToggle:    () => void
  supported:   boolean
  lang:        string
}

export function SpeechInput({
  isListening,
  transcript,
  onToggle,
  supported,
  lang,
}: Props) {
  if (!supported) return (
    <div className={s.unsupported}>
      🎤 Voice input not supported on this browser.
      Try Chrome on Android for best results.
    </div>
  )

  return (
    <div className={s.wrap}>

      {/* Big mic button */}
      <button
        className={`${s.btn} ${isListening ? s.active : ''}`}
        onClick={onToggle}
        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {/* Pulse rings when listening */}
        {isListening && (
          <>
            <span className={`${s.ring} ${s.ring1}`} />
            <span className={`${s.ring} ${s.ring2}`} />
            <span className={`${s.ring} ${s.ring3}`} />
          </>
        )}

        {/* Mic icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8"  y1="23" x2="16" y2="23"/>
        </svg>

        <span className={s.btnLabel}>
          {isListening ? 'Tap to stop' : 'Tap to speak'}
        </span>
      </button>

      {/* Language indicator */}
      <div className={s.langPill}>
        🌍 Speaking: <strong>{lang}</strong>
      </div>

      {/* Live transcript */}
      {transcript && (
        <div className={s.transcript}>
          <span className={s.transcriptDot} />
          <p>{transcript}</p>
        </div>
      )}
    </div>
  )
}
