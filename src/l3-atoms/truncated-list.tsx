import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type TruncatedListProps = React.HTMLAttributes<HTMLDivElement> & {
  items: ReactNode[]
  max?: number
  moreLabel?: (count: number) => string
}

export const TruncatedList = forwardRef<HTMLDivElement, TruncatedListProps>(
  function TruncatedList({ className, items, max = 3, moreLabel, ...props }, ref) {
    const visible = items.slice(0, max)
    const remaining = items.length - max

    return (
      <div
        className={cx('inline-flex flex-wrap items-center gds-gap-sm', className)}
        data-component="truncated-list"
        ref={ref}
        {...props}
      >
        {visible.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
        {remaining > 0 && (
          <span className="gds-text-label text-fg-muted">
            {moreLabel !== undefined ? moreLabel(remaining) : `+${remaining} more`}
          </span>
        )}
      </div>
    )
  },
)

export type { TruncatedListProps }
