import s from './VoicePersonality.module.css'

export type VoicePersonality = 'natural' | 'warm' | 'firm' | 'soft' | 'energetic'

export interface PersonalityConfig {
  id:          VoicePersonality
  label:       string
  emoji:       string
  description: string
  rate:        number
  pitch:       number
  volume:      number
}

export const PERSONALITIES: PersonalityConfig[] = [
  {
    id:          'natural',
    label:       'Natural',
    emoji:       '🗣️',
    description: 'Clear and balanced',
    rate:        0.90,
    pitch:       1.00,
    volume:      1.0,
  },
  {
    id:          'warm',
    label:       'Warm',
    emoji:       '🌸',
    description: 'Gentle and friendly',
    rate:        0.82,
    pitch:       1.15,
    volume:      1.0,
  },
  {
    id:          'firm',
    label:       'Firm',
    emoji:       '💪',
    description: 'Strong and direct',
    rate:        0.88,
    pitch:       0.85,
    volume:      1.0,
  },
  {
    id:          'soft',
    label:       'Soft',
    emoji:       '🕊️',
    description: 'Calm and soothing',
    rate:        0.75,
    pitch:       1.10,
    volume:      0.9,
  },
  {
    id:          'energetic',
    label:       'Energetic',
    emoji:       '⚡',
    description: 'Fast and lively',
    rate:        1.05,
    pitch:       1.05,
    volume:      1.0,
  },
]

interface Props {
  current:   VoicePersonality
  onChange:  (p: VoicePersonality) => void
}

export function VoicePersonalityPicker({ current, onChange }: Props) {
  return (
    <div className={s.wrap}>
      <div className={s.label}>Voice Personality</div>
      <div className={s.grid}>
        {PERSONALITIES.map(p => (
          <button
            key={p.id}
            className={`${s.card} ${current === p.id ? s.active : ''}`}
            onClick={() => onChange(p.id)}
            aria-label={p.label}
          >
            <span className={s.emoji}>{p.emoji}</span>
            <span className={s.name}>{p.label}</span>
            <span className={s.desc}>{p.description}</span>
            {current === p.id && <span className={s.check}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
