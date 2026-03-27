// select — styled native select with chevron overlay
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

export const selectVariants = cva(
  cx(
    'w-full appearance-none gds-radius-popover border bg-transparent pr-8 text-fg transition-colors',
    'placeholder:text-fg-muted',
    focusCls,
  ),
  {
    compoundVariants: [
      {
        error: true,
        className: 'focus-visible:ring-danger',
      },
    ],
    variants: {
      error: {
        true: 'border-danger text-danger',
        false: 'border-border hover:border-fg-muted',
      },
      inputSize: {
        default: 'gds-h-lg gds-pad-x text-sm',
        sm: 'gds-h-sm gds-pad-x-sm gds-text-body',
      },
    },
    defaultVariants: {
      error: false,
      inputSize: 'default',
    },
  },
)

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> &
  VariantProps<typeof selectVariants> & {
    glass?: boolean
    className?: string
  }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ error, inputSize, glass, className, children, ...props }, ref) {
    return (
      <div className="relative" data-component="select">
        <select
          ref={ref}
          className={cx(selectVariants({ error, inputSize }), glassClass(glass), className)}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fg-muted">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </span>
      </div>
    )
  },
)
