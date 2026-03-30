// callout — prominent message box with icon, title, and variant colors
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type CalloutVariant = 'info' | 'tip' | 'warning' | 'danger'

const variantStyles: Record<CalloutVariant, string> = {
  info: 'border-l-accent bg-accent/5 text-accent',
  tip: 'border-l-success bg-success/5 text-success',
  warning: 'border-l-warning bg-warning/5 text-warning',
  danger: 'border-l-danger bg-danger/5 text-danger',
}

const defaultIcons: Record<CalloutVariant, ReactNode> = {
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 7h.01M10 9.5v4" />
    </svg>
  ),
  tip: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 15h5M8 17h4M10 2a5.5 5.5 0 0 0-2 10.65V14h4v-1.35A5.5 5.5 0 0 0 10 2z" />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M9.13 3l-7 12.5h14l-7-12.5z" />
      <path d="M9.63 8.5v3M9.63 13.5h.01" />
    </svg>
  ),
  danger: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M7 7l6 6M13 7l-6 6" />
    </svg>
  ),
}

export type CalloutProps = {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  icon?: ReactNode
  glass?: boolean
  className?: string
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout(
    { variant = 'info', title, children, icon, glass, className },
    ref
  ) {
    const resolvedIcon = icon ?? defaultIcons[variant]

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover gds-pad-x-lg gds-pad-y-lg gds-text-body flex items-start gap-3 border-l-[3px]',
          variantStyles[variant],
          glass === true && glassClass(glass),
          className
        )}
        data-component="callout"
        data-variant={variant}
      >
        <span className="mt-0.5 shrink-0">{resolvedIcon}</span>
        <div className="min-w-0 flex-1">
          {title !== undefined && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-inherit/80">{children}</div>
        </div>
      </div>
    )
  }
)
