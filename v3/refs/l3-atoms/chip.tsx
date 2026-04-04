import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

const chipVariants = cva(
  'inline-flex select-none items-center gds-gap-xs gds-radius-badge gds-pad-x-sm gds-pad-y-sm gds-text-label font-medium',
  {
    defaultVariants: { variant: 'default' },
    variants: {
      variant: {
        accent: 'bg-accent/10 text-accent',
        danger: 'bg-danger/10 text-danger',
        default: 'bg-fg-muted/10 text-fg-muted',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
      },
    },
  }
)

type ChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof chipVariants> & {
    glass?: boolean
    icon?: ReactNode
    label: string
    onRemove?: () => void
    removeIcon?: ReactNode
  }

// default X SVG
function DefaultRemoveIcon() {
  return (
    <svg
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { className, glass, icon, label, onRemove, removeIcon, variant, ...props },
  ref
) {
  return (
    <span
      className={cx(
        chipVariants({ variant }),
        glassClass(glass),
        glass === true && 'border border-white/10 bg-white/5',
        className
      )}
      data-component="chip"
      data-variant={variant ?? 'default'}
      ref={ref}
      {...props}
    >
      {icon !== undefined && <span className="gds-icon-child-sm">{icon}</span>}
      {label}
      {onRemove !== undefined && (
        <button
          className={cx(
            'gds-radius-badge ml-0.5 p-0.5 transition-colors hover:bg-current/10',
            focusCls
          )}
          onClick={onRemove}
          tabIndex={-1}
          type="button"
        >
          {removeIcon ?? <DefaultRemoveIcon />}
        </button>
      )}
    </span>
  )
})

export { chipVariants }
export type { ChipProps }
