import { useEffect } from 'react'
import type { useCamera } from '../../hooks/useCamera'
import s from './CameraFeed.module.css'

type CamHook = ReturnType<typeof useCamera>

interface Props extends Pick<CamHook,
  'videoRef' | 'isActive' | 'isLoading' | 'error' | 'start'
> {}

export function CameraFeed({ videoRef, isActive, isLoading, error, start }: Props) {

  // Auto-start back camera on mount
  useEffect(() => { start('environment') }, []) // eslint-disable-line

  if (error) return (
    <div className={s.state}>
      <div className={s.stateIcon}>📷</div>
      <p className={s.stateTitle}>Camera unavailable</p>
      <p className={s.stateMsg}>{error}</p>
      <button className={s.retryBtn} onClick={() => start('environment')}>
        Try Again
      </button>
    </div>
  )

  if (isLoading) return (
    <div className={s.state}>
      <div className={s.loadRing} />
      <p className={s.stateMsg}>Starting camera...</p>
    </div>
  )

  return (
    <div className={s.wrap}>
      <video
        ref={videoRef}
        className={s.video}
        playsInline
        muted
        autoPlay
      />

      {/* Scanning overlay */}
      {isActive && (
        <div className={s.overlay}>

          {/* Dark vignette corners */}
          <div className={s.vignette} />

          {/* Scan frame */}
          <div className={s.frame}>
            {/* Corner brackets */}
            <span className={`${s.corner} ${s.tl}`} />
            <span className={`${s.corner} ${s.tr}`} />
            <span className={`${s.corner} ${s.bl}`} />
            <span className={`${s.corner} ${s.br}`} />

            {/* Animated scan line */}
            <div className={s.scanLine} />
          </div>

          {/* Live indicator */}
          <div className={s.liveBadge}>
            <span className={s.liveDot} />
            LIVE
          </div>

        </div>
      )}
    </div>
  )
}
