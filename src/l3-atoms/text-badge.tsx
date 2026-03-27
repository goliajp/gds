import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const variantMap = {
  accent: 'bg-accent/15 text-accent',
  danger: 'bg-danger/15 text-danger',
  muted: 'bg-fg-muted/10 text-fg-muted',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
} as const

const sizeMap = {
  default: 'px-1.5 py-0.5 text-[10px]',
  sm: 'px-1 py-px text-[9px]',
} as const

type TextBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  label: string
  size?: 'default' | 'sm'
  variant?: 'accent' | 'danger' | 'muted' | 'success' | 'warning'
}

export const TextBadge = forwardRef<HTMLSpanElement, TextBadgeProps>(
  function TextBadge({ className, label, size = 'default', variant = 'accent', ...props }, ref) {
    return (
      <span
        className={cx(
          'inline-flex select-none items-center rounded-full font-bold uppercase leading-none tracking-wider',
          variantMap[variant],
          sizeMap[size],
          className,
        )}
        data-component="text-badge"
        data-variant={variant}
        ref={ref}
        {...props}
      >
        {label}
      </span>
    )
  },
)

export type { TextBadgeProps }
