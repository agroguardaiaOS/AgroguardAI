import s from './CameraControls.module.css'

interface Props {
  onCapture:   () => void
  onFlip:      () => void
  onClose:     () => void
  isAnalysing: boolean
  isActive:    boolean
}

export function CameraControls({
  onCapture,
  onFlip,
  onClose,
  isAnalysing,
  isActive,
}: Props) {
  return (
    <div className={s.bar}>

      {/* Close */}
      <button
        className={s.side}
        onClick={onClose}
        aria-label="Close camera"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6"  y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Capture — the hero button */}
      <button
        className={`${s.capture} ${isAnalysing ? s.analysing : ''}`}
        onClick={onCapture}
        disabled={!isActive || isAnalysing}
        aria-label="Capture and diagnose"
      >
        <span className={s.captureRing} />
        <span className={s.captureRing2} />
        {isAnalysing
          ? <span className={s.ring} />
          : <span className={s.captureInner} />
        }
      </button>

      {/* Flip camera */}
      <button
        className={s.side}
        onClick={onFlip}
        aria-label="Flip camera"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4v6h6"/>
          <path d="M23 20v-6h-6"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
      </button>

    </div>
  )
}
