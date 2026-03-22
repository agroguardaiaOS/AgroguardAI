import type { LanguageCode } from '../types'
import { useChat } from '../hooks/useChat'
import { useSpeech } from '../hooks/useSpeech'
import { Header } from '../components/layout/Header'
import { ChatWindow } from '../components/chat/ChatWindow'
import { ChatInput } from '../components/chat/ChatInput'
import { SpeechOutput } from '../components/voice/SpeechOutput'
import { Button } from '../components/ui/Button'
import s from './Chat.module.css'

interface Props {
  lang:       LanguageCode
  onSettings: () => void
}

export default function Chat({ lang, onSettings }: Props) {
  const chat   = useChat(lang)
  const speech = useSpeech(lang)

  const handleMic = () => {
    if (speech.isListening) {
      speech.stopListening()
      return
    }
    speech.listen((text) => {
      if (text.trim()) chat.send(text)
    })
  }

  const handleSpeak = (text: string) => {
    if (speech.isSpeaking) {
      speech.stopSpeaking()
      return
    }
    speech.speak(text)
  }

  return (
    <div className={s.page}>

      <Header
        title="AI Chat"
        onSettings={onSettings}
        action={
          chat.messages.length > 0
            ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={chat.clear}
              >
                Clear
              </Button>
            )
            : undefined
        }
      />

      {/* Messages */}
      <div className={s.body}>
        <ChatWindow
          messages={chat.messages}
          loading={chat.loading}
          onSpeak={handleSpeak}
        />
      </div>

      {/* Speaking indicator */}
      <SpeechOutput
        isSpeaking={speech.isSpeaking}
        onStop={speech.stopSpeaking}
      />

      {/* Input */}
      <ChatInput
        onSend={chat.send}
        onMic={handleMic}
        isListening={speech.isListening}
        isSpeaking={speech.isSpeaking}
        disabled={chat.loading}
      />

    </div>
  )
}
