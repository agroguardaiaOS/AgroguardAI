import s from './Badge.module.css'

interface Props {
  label:   string
  color?:  'green' | 'amber' | 'red' | 'blue' | 'mute' | 'white'
  dot?:    boolean
  pulse?:  boolean
  size?:   'sm' | 'md'
}

export function Badge({
  label,
  color = 'green',
  dot   = false,
  pulse = false,
  size  = 'md',
}: Props) {
  return (
    <span className={`${s.badge} ${s[color]} ${s[size]}`}>
      {dot && (
        <span className={`${s.dot} ${pulse ? s.pulse : ''}`} />
      )}
      {label}
    </span>
  )
      }
