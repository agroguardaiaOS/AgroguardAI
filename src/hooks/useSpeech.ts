import { useState, useCallback, useRef, useEffect } from 'react'
import type { VoiceState, LanguageCode } from '../types'
import { LANGUAGES } from '../lib/languages'

const INIT: VoiceState = {
  status:     'idle',
  transcript: '',
  error:      null,
  supported:  typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
}

export function useSpeech(lang: LanguageCode) {
  const [voice, setVoice] = useState<VoiceState>(INIT)
  const recogRef          = useRef<any>(null)
  const code              = LANGUAGES[lang]?.speechCode ?? 'en-NG'

  // ── Speech to Text ────────────────────
  const listen = useCallback((onResult: (t: string) => void) => {
    if (!INIT.supported) {
      setVoice(p => ({ ...p, error: 'Voice input not supported on this browser.' }))
      return
    }

    window.speechSynthesis?.cancel()

    const SR = (window as any).SpeechRecognition
             || (window as any).webkitSpeechRecognition
    const r  = new SR()

    r.lang            = code
    r.continuous      = false
    r.interimResults  = true
    r.maxAlternatives = 1

    r.onstart = () =>
      setVoice(p => ({ ...p, status: 'listening', transcript: '', error: null }))

    r.onresult = (e: any) => {
      const t = Array.from(e.results as any[])
        .map((x: any) => x[0].transcript)
        .join('')
      setVoice(p => ({ ...p, transcript: t }))
      if (e.results[e.results.length - 1].isFinal) onResult(t)
    }

    r.onerror = (e: any) => {
      const error =
        e.error === 'not-allowed' ? 'Microphone permission denied.' :
        e.error === 'no-speech'   ? 'No speech detected. Please try again.' :
        e.error === 'network'     ? 'Network error during voice recognition.' :
        'Voice input error. Please try again.'
      setVoice(p => ({ ...p, status: 'error', error }))
    }

    r.onend = () =>
      setVoice(p => ({
        ...p,
        status: p.status === 'listening' ? 'idle' : p.status,
      }))

    recogRef.current = r
    r.start()
  }, [code])

  const stopListening = useCallback(() => {
    recogRef.current?.stop()
    setVoice(p => ({ ...p, status: 'idle' }))
  }, [])

  // ── Text to Speech ────────────────────
  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    // Clean markdown symbols before speaking
    const clean = text
      .replace(/[*_`#]/g, '')
      .replace(/\n+/g, '. ')
      .trim()

    const u     = new SpeechSynthesisUtterance(clean)
    u.lang      = code
    u.rate      = 0.88
    u.pitch     = 1.0
    u.volume    = 1.0

    // Try to match a voice for the language
    const voices = window.speechSynthesis.getVoices()
    const match  = voices.find(v =>
      v.lang.startsWith(code.split('-')[0])
    )
    if (match) u.voice = match

    u.onstart = () =>
      setVoice(p => ({ ...p, status: 'speaking', error: null }))
    u.onend   = () => {
      setVoice(p => ({ ...p, status: 'idle' }))
      onEnd?.()
    }
    u.onerror = () =>
      setVoice(p => ({ ...p, status: 'idle' }))

    window.speechSynthesis.speak(u)
  }, [code])

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel()
    setVoice(p => ({ ...p, status: 'idle' }))
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recogRef.current?.stop()
      window.speechSynthesis?.cancel()
    }
  }, [])

  return {
    status:      voice.status,
    transcript:  voice.transcript,
    error:       voice.error,
    supported:   voice.supported,
    isListening: voice.status === 'listening',
    isSpeaking:  voice.status === 'speaking',
    listen,
    stopListening,
    speak,
    stopSpeaking,
  }
}
