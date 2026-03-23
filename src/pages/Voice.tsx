import { useState } from 'react'
import type { LanguageCode } from '../types'
import { useChat } from '../hooks/useChat'
import { useSpeech } from '../hooks/useSpeech'
import { Header } from '../components/layout/Header'
import { SpeechInput } from '../components/voice/SpeechInput'
import { SpeechOutput } from '../components/voice/SpeechOutput'
import { VoicePersonalityPicker } from '../components/voice/VoicePersonality'
import type { VoicePersonality } from '../components/voice/VoicePersonality'
import { PERSONALITIES } from '../components/voice/VoicePersonality'
import { LANGUAGES } from '../lib/languages'
import s from './Voice.module.css'

interface Props {
  lang:       LanguageCode
  onSettings: () => void
}

export default function Voice({ lang, onSettings }: Props) {
  const chat    = useChat(lang)
  const speech  = useSpeech(lang)
  const [personality, setPersonality] = useState<VoicePersonality>('natural')
  const [lastQ, setLastQ] = useState<string>('')
  const [lastA, setLastA] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const currentLang = LANGUAGES[lang]

  const handleListen = () => {
    if (speech.isListening) { speech.stopListening(); return }
    speech.listen(async (text) => {
      if (!text.trim()) return
      setLastQ(text)
      setLastA('')
      setLoading(true)

      // Get personality config
      const p = PERSONALITIES.find(x => x.id === personality)

      try {
        let answer = ''
        await import('../api').then(async ({ sendChat }) => {
          await sendChat(text, [], lang, (chunk) => {
            answer += chunk
            setLastA(answer)
          })
        })

        // Speak with personality settings
        const u = new SpeechSynthesisUtterance(
          answer.replace(/[*_`#]/g, '').replace(/\n+/g, '. ').trim()
        )
        u.lang   = currentLang.speechCode
        u.rate   = p?.rate   ?? 0.9
        u.pitch  = p?.pitch  ?? 1.0
        u.volume = p?.volume ?? 1.0
        const voices = window.speechSynthesis.getVoices()
        const match  = voices.find(v => v.lang.startsWith(lang))
        if (match) u.voice = match
        window.speechSynthesis.speak(u)

      } catch (e) {
        setLastA('Could not get a response. Please try again.')
      } finally {
        setLoading(false)
      }
    })
  }

  return (
    <div className={s.page}>
      <Header title="Voice Mode" onSettings={onSettings}/>

      {/* Language indicator */}
      <div className={s.langBar}>
        <span className={s.langFlag}>{currentLang.flag}</span>
        <span className={s.langName}>Speaking in {currentLang.native}</span>
      </div>

      {/* Mic button */}
      <div className={s.micWrap}>
        <SpeechInput
          isListening={speech.isListening}
          transcript={speech.transcript}
          onToggle={handleListen}
          supported={speech.supported}
          lang={currentLang.native}
        />
      </div>

      {/* Speaking output bar */}
      <SpeechOutput
        isSpeaking={speech.isSpeaking}
        onStop={speech.stopSpeaking}
      />

      {/* Loading */}
      {loading && (
        <div className={s.thinking}>
          <div className={s.thinkingDot}/>
          <div className={s.thinkingDot}/>
          <div className={s.thinkingDot}/>
        </div>
      )}

      {/* Last exchange */}
      {(lastQ || lastA) && !loading && (
        <div className={s.exchange}>
          {lastQ && (
            <div className={s.question}>
              <div className={s.exchangeLabel}>You asked</div>
              <p className={s.exchangeText}>{lastQ}</p>
            </div>
          )}
          {lastA && (
            <div className={s.answer}>
              <div className={s.exchangeLabel}>AI answered</div>
              <p className={s.exchangeText}>{lastA}</p>
              <button
                className={s.replayBtn}
                onClick={() => speech.speak(lastA)}
              >
                🔊 Replay
              </button>
            </div>
          )}
        </div>
      )}

      {/* Voice personality */}
      <div className={s.personalityWrap}>
        <VoicePersonalityPicker
          current={personality}
          onChange={setPersonality}
        />
      </div>

    </div>
  )
}
