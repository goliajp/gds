// stacked-list — vertical list with header, footer, and selectable items
import type { ReactNode } from 'react'

import { ListItem } from '../l4-molecules/list-item'
import { cx } from '../utils/cx'

export type StackedListItem = {
  id: string
  title: string
  description?: string
  icon?: ReactNode
  trailing?: ReactNode
}

export type StackedListProps = {
  items: StackedListItem[]
  header?: ReactNode
  footer?: ReactNode
  onSelect?: (id: string) => void
  selectedId?: string
  dividers?: boolean
  glass?: boolean
  className?: string
}

export function StackedList({
  items,
  header,
  footer,
  onSelect,
  selectedId,
  dividers = true,
  glass,
  className,
}: StackedListProps) {
  return (
    <div
      data-component="stacked-list"
      className={cx(
        'gds-radius-card border-border overflow-hidden border',
        glass === true && 'bg-white/5 backdrop-blur-md',
        className
      )}
    >
      {header !== undefined && (
        <div className="border-border bg-bg-tertiary/30 border-b px-4 py-2.5">
          {header}
        </div>
      )}
      <div>
        {items.map((item, i) => (
          <ListItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            trailing={item.trailing}
            active={selectedId === item.id}
            onClick={
              onSelect !== undefined ? () => onSelect(item.id) : undefined
            }
            className={cx(
              dividers === true &&
                i < items.length - 1 &&
                'border-border/50 border-b'
            )}
          />
        ))}
      </div>
      {footer !== undefined && (
        <div className="border-border border-t px-4 py-2.5">{footer}</div>
      )}
    </div>
  )
}
