// alert — contextual feedback banner with variant colors and optional close
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

const alertVariants = cva(
  'flex items-start gds-gap gds-radius-popover border gds-pad-x gds-pad-y gds-text-body',
  {
    variants: {
      variant: {
        default: 'border-border bg-bg-secondary text-fg',
        info: 'border-accent/30 bg-accent/10 text-accent',
        success: 'border-success/30 bg-success/10 text-success',
        warning: 'border-warning/30 bg-warning/10 text-warning',
        danger: 'border-danger/30 bg-danger/10 text-danger',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const variantIcons: Record<string, React.ReactNode> = {
  default: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5.5v3M8 10.5h.01" />
    </svg>
  ),
  info: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5.5h.01M8 7.5v3" />
    </svg>
  ),
  success: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.5 8l2 2 3-3.5" />
    </svg>
  ),
  warning: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M7.13 2.5l-5.5 10h11l-5.5-10z" />
      <path d="M7.63 6.5v2.5M7.63 11h.01" />
    </svg>
  ),
  danger: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
    </svg>
  ),
}

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: string
    onClose?: () => void
    glass?: boolean
  }

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { children, title, variant = 'default', onClose, glass, className, ...props },
  ref
) {
  const v = variant ?? 'default'

  return (
    <div
      ref={ref}
      className={cx(
        alertVariants({ variant }),
        glass === true && glassClass(glass),
        className
      )}
      data-component="alert"
      data-variant={v}
      role="alert"
      {...props}
    >
      <span className="mt-px shrink-0">{variantIcons[v]}</span>
      <div className="min-w-0 flex-1">
        {title !== undefined && <p className="mb-0.5 font-medium">{title}</p>}
        <div className="text-inherit/80">{children}</div>
      </div>
      {onClose !== undefined && (
        <button
          type="button"
          onClick={onClose}
          className={cx(
            'gds-radius-button shrink-0 p-0.5 opacity-60 hover:opacity-100',
            focusCls
          )}
          aria-label="Dismiss"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      )}
    </div>
  )
})

export { alertVariants }
