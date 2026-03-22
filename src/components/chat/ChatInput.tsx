import { useState, useRef } from 'react'
import s from './ChatInput.module.css'

interface Props {
  onSend:      (text: string) => void
  onMic:       () => void
  onImage?:    (file: File) => void
  isListening: boolean
  isSpeaking:  boolean
  disabled?:   boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  onMic,
  onImage,
  isListening,
  isSpeaking,
  disabled,
  placeholder = 'Ask about your crops...',
}: Props) {
  const [text, setText] = useState('')
  const fileRef         = useRef<HTMLInputElement>(null)
  const textareaRef     = useRef<HTMLTextAreaElement>(null)

  const canSend = text.trim().length > 0 && !disabled

  const submit = () => {
    if (!canSend) return
    onSend(text.trim())
    setText('')
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    // Auto grow textarea
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  return (
    <div className={s.wrap}>

      {/* Status bars */}
      {isListening && (
        <div className={s.statusBar}>
          <span className={s.statusDot} />
          <span>Listening — speak in your language</span>
        </div>
      )}
      {isSpeaking && (
        <div className={`${s.statusBar} ${s.speakingBar}`}>
          <span className={s.speakingWave}>🔊</span>
          <span>Speaking response aloud...</span>
        </div>
      )}

      {/* Input bar */}
      <div className={`${s.bar} ${isListening ? s.barListening : ''}`}>

        {/* Image attach */}
        {onImage && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0]
                if (f) { onImage(f); e.target.value = '' }
              }}
            />
            <button
              className={s.action}
              onClick={() => fileRef.current?.click()}
              aria-label="Attach photo"
              type="button"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
          </>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className={s.input}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
        />

        {/* Mic button */}
        <button
          className={`${s.mic} ${isListening ? s.micActive : ''} ${isSpeaking ? s.micSpeaking : ''}`}
          onClick={onMic}
          type="button"
          aria-label={isListening ? 'Stop listening' : 'Voice input'}
        >
          {isListening
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
              </svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8"  y1="23" x2="16" y2="23"/>
              </svg>
          }
        </button>

        {/* Send button */}
        <button
          className={`${s.send} ${canSend ? s.sendActive : ''}`}
          onClick={submit}
          disabled={!canSend}
          type="button"
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
