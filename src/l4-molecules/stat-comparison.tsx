import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type StatSide = { label: string; value: number | string }

type StatComparisonProps = React.HTMLAttributes<HTMLDivElement> & {
  highlight?: 'left' | 'none' | 'right'
  left: StatSide
  right: StatSide
}

export const StatComparison = forwardRef<HTMLDivElement, StatComparisonProps>(
  function StatComparison({ className, highlight = 'none', left, right, ...props }, ref) {
    const sideCls = (side: 'left' | 'right') =>
      cx(
        'flex flex-1 flex-col items-center rounded-lg border border-border p-3',
        highlight === side && 'border-accent bg-accent/5',
      )

    return (
      <div
        className={cx('flex items-center gds-gap', className)}
        data-component="stat-comparison"
        ref={ref}
        {...props}
      >
        <div className={sideCls('left')}>
          <span className="gds-text-label text-fg-muted">{left.label}</span>
          <span className="text-lg font-semibold text-fg">{left.value}</span>
        </div>
        <span className="shrink-0 text-xs font-medium text-fg-muted">vs</span>
        <div className={sideCls('right')}>
          <span className="gds-text-label text-fg-muted">{right.label}</span>
          <span className="text-lg font-semibold text-fg">{right.value}</span>
        </div>
      </div>
    )
  },
)

export type { StatComparisonProps }
