import { useState, useRef, useCallback, useEffect } from 'react'
import type { CameraState, CapturedFrame, CameraFacing } from '../types'

const INIT: CameraState = {
  isActive:  false,
  isLoading: false,
  error:     null,
  facing:    'environment',
  stream:    null,
}

export function useCamera() {
  const [cam, setCam] = useState<CameraState>(INIT)
  const videoRef      = useRef<HTMLVideoElement>(null)

  const start = useCallback(async (facing: CameraFacing = 'environment') => {
    setCam(p => ({ ...p, isLoading: true, error: null }))

    // Stop existing stream first
    cam.stream?.getTracks().forEach(t => t.stop())

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width:      { ideal: 1280 },
          height:     { ideal: 720 },
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setCam({ isActive: true, isLoading: false, error: null, facing, stream })

    } catch (e: any) {
      const error =
        e.name === 'NotAllowedError'  ? 'Camera permission denied. Please allow access.' :
        e.name === 'NotFoundError'    ? 'No camera found on this device.' :
        e.name === 'NotReadableError' ? 'Camera is in use by another app.' :
        'Could not start camera. Please try again.'

      setCam({ isActive: false, isLoading: false, error, facing, stream: null })
    }
  }, [cam.stream])

  const stop = useCallback(() => {
    cam.stream?.getTracks().forEach(t => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setCam(INIT)
  }, [cam.stream])

  const flip = useCallback(() => {
    start(cam.facing === 'environment' ? 'user' : 'environment')
  }, [cam.facing, start])

  const capture = useCallback((): CapturedFrame | null => {
    if (!videoRef.current || !cam.isActive) return null

    const v      = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width  = v.videoWidth
    canvas.height = v.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(v, 0, 0)

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)

    return {
      base64:    dataUrl.split(',')[1],
      mimeType:  'image/jpeg',
      width:     canvas.width,
      height:    canvas.height,
      timestamp: Date.now(),
    }
  }, [cam.isActive])

  // Cleanup on unmount
  useEffect(() => {
    return () => { cam.stream?.getTracks().forEach(t => t.stop()) }
  }, [cam.stream])

  return {
    videoRef,
    isActive:  cam.isActive,
    isLoading: cam.isLoading,
    error:     cam.error,
    facing:    cam.facing,
    start,
    stop,
    flip,
    capture,
  }
}
