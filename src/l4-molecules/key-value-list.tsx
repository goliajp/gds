// key-value-list — compact list of label-value pairs in one or two columns
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type KeyValueItem = {
  key: string
  value: ReactNode
}

export type KeyValueListProps = {
  items: KeyValueItem[]
  columns?: 1 | 2
  className?: string
}

export const KeyValueList = forwardRef<HTMLDivElement, KeyValueListProps>(
  function KeyValueList({ items, columns = 1, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'grid gap-x-8 gap-y-2',
          columns === 2 ? 'grid-cols-2' : 'grid-cols-1',
          className
        )}
        data-component="key-value-list"
      >
        {items.map((item) => (
          <div
            className="flex items-baseline justify-between gap-4"
            key={item.key}
          >
            <span className="gds-text-body text-fg-muted shrink-0">
              {item.key}
            </span>
            <span className="gds-text-body text-fg text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
)
