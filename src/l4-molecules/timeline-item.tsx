import type { ReactNode } from 'react'

import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type TimelineEntryVariant = 'danger' | 'default' | 'success' | 'warning'

type TimelineEntryProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  icon?: ReactNode
  last?: boolean
  variant?: TimelineEntryVariant
}

const dotColor: Record<TimelineEntryVariant, string> = {
  default: 'bg-fg-muted/40',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

export const TimelineEntry = forwardRef<HTMLDivElement, TimelineEntryProps>(
  function TimelineEntry({ children, className, icon, last = false, variant = 'default', ...props }, ref) {
    return (
      <div
        className={cx('relative flex gap-3', className)}
        data-component="timeline-entry"
        ref={ref}
        {...props}
      >
        <div className="flex flex-col items-center">
          {icon !== undefined ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
          ) : (
            <span className={cx('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', dotColor[variant])} />
          )}
          {!last && <span className="mt-1 w-px flex-1 bg-border" />}
        </div>
        <div className="flex-1 pb-4">{children}</div>
      </div>
    )
  },
)

export type { TimelineEntryProps, TimelineEntryVariant }
