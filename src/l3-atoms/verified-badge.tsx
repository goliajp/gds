import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type VerifiedBadgeVariant = 'default' | 'gold' | 'official'

type VerifiedBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: 'default' | 'sm'
  variant?: VerifiedBadgeVariant
}

const variantColors: Record<VerifiedBadgeVariant, string> = {
  default: 'text-accent',
  gold: 'text-warning',
  official: 'text-success',
}

const sizeMap = { default: 16, sm: 12 } as const

export const VerifiedBadge = forwardRef<HTMLSpanElement, VerifiedBadgeProps>(
  function VerifiedBadge({ className, size = 'default', variant = 'default', ...props }, ref) {
    const s = sizeMap[size]
    return (
      <span
        className={cx('inline-flex shrink-0 items-center', variantColors[variant], className)}
        data-component="verified-badge"
        data-variant={variant}
        ref={ref}
        {...props}
      >
        <svg fill="currentColor" height={s} viewBox="0 0 24 24" width={s}>
          <path d="M12 1l3.09 2.26L19 3.27l.01 3.91L22 10.18 19.82 13l.18 3.91-3.91 1.01L13.09 21 12 23l-3.09-2.26L5 21.73l-.01-3.91L2 14.82 4.18 12l-.18-3.91 3.91-1.01L10.91 4 12 1zm-1.5 12.5l5-5-1.41-1.41L10.5 10.67 8.41 8.59 7 10l3.5 3.5z" />
        </svg>
      </span>
    )
  },
)

export type { VerifiedBadgeProps, VerifiedBadgeVariant }
