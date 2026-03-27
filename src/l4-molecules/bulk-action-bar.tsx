// bulk-action-bar — bar that appears when items are selected
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type BulkActionBarProps = {
  actions: ReactNode
  className?: string
  count: number
  onClear?: () => void
}

const closeIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
)

export const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(
  function BulkActionBar({ actions, className, count, onClear }, ref) {
    if (count <= 0) return null

    return (
      <div
        ref={ref}
        className={cx(
          'fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gds-gap gds-pad-x-lg gds-pad-y',
          'animate-popup gds-radius-popover border border-border bg-surface gds-shadow-xl',
          className,
        )}
        data-component="bulk-action-bar"
      >
        <span className="gds-text-body select-none whitespace-nowrap font-medium text-fg">
          {count} selected
        </span>
        <div className="flex items-center gds-gap-sm">{actions}</div>
        {onClear !== undefined && (
          <button
            aria-label="Clear selection"
            className={cx('shrink-0 p-0.5 text-fg-muted hover:text-fg', focusCls)}
            onClick={onClear}
            type="button"
          >
            {closeIcon}
          </button>
        )}
      </div>
    )
  },
)

export type { BulkActionBarProps }
