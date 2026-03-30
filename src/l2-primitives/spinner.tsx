import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const spinnerVariants = cva('animate-spin text-accent', {
  defaultVariants: { size: 'default' },
  variants: {
    size: {
      default: 'gds-icon',
      lg: 'gds-icon-lg',
      sm: 'gds-icon-sm',
    },
  },
})

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { className, size },
  ref
) {
  return (
    <svg
      className={cx(spinnerVariants({ size }), className)}
      data-component="spinner"
      fill="none"
      ref={ref}
      role="status"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        fill="currentColor"
      />
    </svg>
  )
})

export { spinnerVariants }
export type { SpinnerProps }
