// banner — full-width contextual feedback strip with variant colors and optional dismiss
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type BannerVariant = 'danger' | 'info' | 'success' | 'warning'

const variantStyles: Record<BannerVariant, string> = {
  danger: 'bg-danger/10 text-danger',
  info: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
}

const variantIcons: Record<BannerVariant, ReactNode> = {
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
}

export type BannerProps = {
  message: ReactNode
  variant?: BannerVariant
  dismissible?: boolean
  onDismiss?: () => void
  glass?: boolean
  className?: string
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    message,
    variant = 'info',
    dismissible = false,
    onDismiss,
    glass,
    className,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        'gds-gap gds-pad-x gds-pad-y gds-text-body flex w-full items-center',
        variantStyles[variant],
        glass === true && glassClass(glass),
        className
      )}
      data-component="banner"
      data-variant={variant}
      role="status"
    >
      <span className="shrink-0">{variantIcons[variant]}</span>
      <span className="flex-1">{message}</span>
      {dismissible && onDismiss !== undefined && (
        <button
          type="button"
          onClick={onDismiss}
          className={cx(
            'gds-radius-button shrink-0 p-0.5 transition-opacity hover:opacity-70',
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

export type { BannerVariant }
