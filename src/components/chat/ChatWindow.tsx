import { useEffect, useRef } from 'react'
import type { Message } from '../../types'
import { ChatMessage } from './ChatMessage'
import s from './ChatWindow.module.css'

interface Props {
  messages: Message[]
  loading:  boolean
  onSpeak:  (text: string) => void
}

const SUGGESTIONS = [
  'Why are my maize leaves turning yellow?',
  'How do I treat Fall Armyworm?',
  'What fertiliser is best for tomatoes in Nigeria?',
  'My cassava leaves have brown spots — what is wrong?',
]

export function ChatWindow({ messages, loading, onSpeak }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Empty state
  if (messages.length === 0) return (
    <div className={s.empty}>
      <div className={s.emptyGlow} />
      <div className={s.emptyIcon}>🌿</div>
      <p className={s.emptyTitle}>Ask me anything about your crops</p>
      <p className={s.emptySub}>
        Type a question, tap the mic to speak,<br/>
        or try one of these:
      </p>
      <div className={s.suggestions}>
        {SUGGESTIONS.map(q => (
          <div key={q} className={s.suggestion}>
            <span className={s.suggestionArrow}>→</span>
            <span>{q}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={s.window}>
      <div className={s.list}>
        {messages.map(m => (
          <ChatMessage key={m.id} msg={m} onSpeak={onSpeak} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className={s.typing}>
            <div className={s.typingAvatar}>🌿</div>
            <div className={s.typingBubble}>
              <span className={s.dot} />
              <span className={s.dot} />
              <span className={s.dot} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
