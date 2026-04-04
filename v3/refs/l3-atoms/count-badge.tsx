import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const variantMap = {
  accent: 'bg-accent text-accent-fg',
  danger: 'bg-danger text-white',
  success: 'bg-success text-white',
} as const

type CountBadgeVariant = 'accent' | 'danger' | 'success'

type CountBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  count: number
  max?: number
  variant?: CountBadgeVariant
}

export const CountBadge = forwardRef<HTMLSpanElement, CountBadgeProps>(
  function CountBadge(
    { className, count, max = 99, variant = 'danger', ...props },
    ref
  ) {
    const display = count > max ? `${max}+` : String(count)

    return (
      <span
        className={cx(
          'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] leading-none font-bold select-none',
          variantMap[variant],
          className
        )}
        data-component="count-badge"
        data-variant={variant}
        ref={ref}
        {...props}
      >
        {display}
      </span>
    )
  }
)

export type { CountBadgeProps, CountBadgeVariant }
