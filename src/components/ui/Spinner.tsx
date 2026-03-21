import s from './Spinner.module.css'

interface Props {
  size?:  'sm' | 'md' | 'lg'
  label?: string
  color?: 'green' | 'white' | 'mute'
}

export function Spinner({
  size  = 'md',
  label,
  color = 'green',
}: Props) {
  return (
    <div className={s.wrap}>
      <div className={`${s.ring} ${s[size]} ${s[color]}`}>
        <div /><div /><div /><div />
      </div>
      {label && <p className={s.label}>{label}</p>}
    </div>
  )
        }
