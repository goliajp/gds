import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const dotVariants = cva('inline-block shrink-0 gds-radius-badge', {
  defaultVariants: {
    color: 'accent',
    size: 'default',
  },
  variants: {
    color: {
      accent: 'bg-accent',
      danger: 'bg-danger',
      muted: 'bg-fg-muted/30',
      success: 'bg-success',
      warning: 'bg-warning',
    },
    size: {
      default: 'h-2 w-2',
      lg: 'h-3 w-3',
      sm: 'h-1.5 w-1.5',
    },
  },
})

type DotProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof dotVariants> & {
    label?: string
    pulse?: boolean
  }

export const Dot = forwardRef<HTMLSpanElement, DotProps>(function Dot(
  { className, color, label, pulse = false, size, ...props },
  ref
) {
  return (
    <span
      className={cx(
        'relative inline-flex items-center',
        label !== undefined && 'gds-gap-sm',
        className
      )}
      data-component="dot"
      ref={ref}
      {...props}
    >
      <span className={dotVariants({ color, size })} />
      {pulse && (
        <span
          className={cx(
            'gds-radius-badge absolute inset-0 animate-ping opacity-40',
            dotVariants({ color, size })
          )}
        />
      )}
      {label !== undefined && (
        <span className="gds-text-label text-fg-muted">{label}</span>
      )}
    </span>
  )
})

export { dotVariants }
export type { DotProps }
