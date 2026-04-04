// countdown-badge — badge showing a count with max overflow
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const countdownBadgeVariants = cva(
  'inline-flex select-none items-center justify-center rounded-full text-[10px] font-bold text-accent-fg min-w-[18px] h-[18px] px-1',
  {
    defaultVariants: { variant: 'default' },
    variants: {
      variant: {
        danger: 'bg-danger animate-pulse',
        default: 'bg-accent',
      },
    },
  }
)

type CountdownBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof countdownBadgeVariants> & {
    count: number
    max?: number
  }

export const CountdownBadge = forwardRef<HTMLSpanElement, CountdownBadgeProps>(
  function CountdownBadge(
    { className, count, max = 99, variant, ...props },
    ref
  ) {
    if (count <= 0) return null

    const display = count > max ? `${max}+` : String(count)

    return (
      <span
        className={cx(countdownBadgeVariants({ variant }), className)}
        data-component="countdown-badge"
        ref={ref}
        {...props}
      >
        {display}
      </span>
    )
  }
)

export { countdownBadgeVariants }
export type { CountdownBadgeProps }
