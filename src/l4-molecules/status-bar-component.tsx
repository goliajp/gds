// status-bar-component — application status bar
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type StatusBarComponentProps = {
  items: ReactNode[]
  className?: string
}

export const StatusBarComponent = forwardRef<HTMLDivElement, StatusBarComponentProps>(
  function StatusBarComponent({ items, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex h-7 items-center border-t border-border bg-surface px-3 text-xs text-fg-muted select-none',
          className,
        )}
        data-component="status-bar"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && <span className="mx-2 h-3 w-px bg-border" />}
            <span>{item}</span>
          </div>
        ))}
      </div>
    )
  },
)
