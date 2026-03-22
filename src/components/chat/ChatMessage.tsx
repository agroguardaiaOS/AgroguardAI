import type { Message } from '../../types'
import { severity } from '../../styles/theme'
import s from './ChatMessage.module.css'

interface Props {
  msg:      Message
  onSpeak?: (text: string) => void
}

export function ChatMessage({ msg, onSpeak }: Props) {
  const isUser = msg.role === 'user'

  // Detect severity in diagnosis responses
  const sevMatch = msg.content.match(/severity:\s*(low|medium|high)/i)
  const sev      = sevMatch?.[1]?.toLowerCase() as keyof typeof severity | undefined

  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour:   '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`${s.row} ${isUser ? s.user : s.assistant}`}>

      {/* AI Avatar */}
      {!isUser && (
        <div className={s.avatar}>
          <img
            src="/logo.png"
            alt="AgroGuardAI"
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <span className={s.avatarFallback}>🌿</span>
        </div>
      )}

      {/* Message bubble */}
      <div className={s.bubble}>

        {/* Severity bar for diagnosis results */}
        {sev && (
          <div
            className={s.severityBar}
            style={{ background: severity[sev] }}
          />
        )}

        {/* Crop image if attached */}
        {msg.hasImage && msg.imageUrl && (
          <div className={s.imageWrap}>
            <img src={msg.imageUrl} alt="Crop" className={s.cropImg} />
          </div>
        )}

        {/* Message text */}
        <p className={s.text}>{msg.content}</p>

        {/* Footer — time + speak button */}
        <div className={s.footer}>
          <span className={s.time}>{time}</span>
          {!isUser && onSpeak && msg.content.trim() && (
            <button
              className={s.speakBtn}
              onClick={() => onSpeak(msg.content)}
              title="Read aloud"
              aria-label="Read message aloud"
            >
              🔊
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
