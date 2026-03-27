// description-list — semantic dt/dd pairs with layout options
import type { ReactNode } from 'react'

import { cx } from '../utils/cx'

export type DescriptionListItem = {
  term: string
  description: ReactNode
}

export type DescriptionListProps = {
  items: DescriptionListItem[]
  layout?: 'stacked' | 'horizontal'
  dividers?: boolean
  className?: string
}

export function DescriptionList({
  items,
  layout = 'stacked',
  dividers = true,
  className,
}: DescriptionListProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <dl
      className={cx('gds-text-body', className)}
      data-component="description-list"
      data-variant={layout}
    >
      {items.map((item, i) => (
        <div
          key={item.term}
          className={cx(
            'gds-pad-x gds-pad-y-sm',
            isHorizontal && 'grid grid-cols-[1fr_2fr] gap-4',
            dividers && i < items.length - 1 && 'border-b border-border',
          )}
        >
          <dt className="font-medium text-fg-muted">{item.term}</dt>
          <dd className={cx('text-fg', isHorizontal ? '' : 'mt-1')}>{item.description}</dd>
        </div>
      ))}
    </dl>
  )
}
