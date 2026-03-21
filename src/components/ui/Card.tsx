import type { HTMLAttributes } from 'react'
import s from './Card.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?:   'default' | 'glass' | 'green' | 'danger' | 'elevated'
  padding?:   'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  glow?:      boolean
}

export function Card({
  variant   = 'default',
  padding   = 'md',
  hoverable = false,
  glow      = false,
  children,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={[
        s.card,
        s[variant],
        s[`p_${padding}`],
        hoverable ? s.hover : '',
        glow      ? s.glow  : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* Subtle top edge highlight */}
      <span className={s.edge} />
      {children}
    </div>
  )
}
