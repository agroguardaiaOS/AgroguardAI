import { type ButtonHTMLAttributes, forwardRef } from 'react'
import s from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   'primary' | 'ghost' | 'danger' | 'glass' | 'green-outline'
  size?:      'sm' | 'md' | 'lg' | 'xl'
  loading?:   boolean
  icon?:      string
  iconRight?: string
  fullWidth?: boolean
  pulse?:     boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant   = 'primary',
      size      = 'md',
      loading   = false,
      icon,
      iconRight,
      fullWidth = false,
      pulse     = false,
      children,
      className,
      disabled,
      onClick,
      ...rest
    },
    ref
  ) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn    = e.currentTarget
      const circle = document.createElement('span')
      const rect   = btn.getBoundingClientRect()
      const size   = Math.max(rect.width, rect.height)
      const x      = e.clientX - rect.left - size / 2
      const y      = e.clientY - rect.top  - size / 2
      circle.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        left:${x}px;top:${y}px;border-radius:50%;
        background:rgba(255,255,255,0.18);transform:scale(0);
        animation:ripple 0.55s linear;pointer-events:none;
      `
      btn.appendChild(circle)
      setTimeout(() => circle.remove(), 600)
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        className={[
          s.btn,
          s[variant],
          s[size],
          fullWidth ? s.full  : '',
          loading   ? s.busy  : '',
          pulse     ? s.pulse : '',
          className ?? '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || loading}
        onClick={handleClick}
        {...rest}
      >
        <span className={s.shine} />
        {loading ? (
          <span className={s.spinnerWrap}>
            <span className={s.spinner} />
            <span className={s.spinnerLabel}>Loading...</span>
          </span>
        ) : (
          <>
            {icon      && <span className={s.iconLeft}>{icon}</span>}
            {children  && <span className={s.label}>{children}</span>}
            {iconRight && <span className={s.iconRight}>{iconRight}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
