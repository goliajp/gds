// data-list — key-value list display for structured data
import type { ReactNode } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type DataListItem = {
  label: string
  value: ReactNode
}

export type DataListProps = {
  items: DataListItem[]
  layout?: 'vertical' | 'horizontal'
  striped?: boolean
  glass?: boolean
  className?: string
}

export function DataList({
  items,
  layout = 'vertical',
  striped = false,
  glass,
  className,
}: DataListProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <div
      className={cx(
        'gds-radius-popover border border-border overflow-hidden',
        glass !== undefined && glass !== false
          ? cx('border-white/10 bg-bg/60', glassClass(glass))
          : '',
        className,
      )}
      data-component="data-list"
      data-variant={layout}
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cx(
            'gds-pad-x gds-pad-y-sm',
            i < items.length - 1 ? 'border-b border-border' : '',
            isHorizontal ? 'flex items-center justify-between gap-4' : '',
            striped && i % 2 === 1 ? 'bg-bg-tertiary/20' : '',
          )}
        >
          <div className="gds-text-body font-medium text-fg-muted">{item.label}</div>
          <div className={cx('text-fg gds-text-body', isHorizontal ? '' : 'mt-1')}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
