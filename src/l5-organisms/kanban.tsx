// kanban — column-based board layout for items
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type KanbanItem = {
  id: string
  title: string
  description?: string
  tags?: string[]
}

export type KanbanColumn = {
  id: string
  title: string
  items: KanbanItem[]
}

export type KanbanProps = {
  columns: KanbanColumn[]
  onMoveItem?: (itemId: string, fromCol: string, toCol: string) => void
  renderItem?: (item: KanbanItem) => ReactNode
  className?: string
}

function KanbanTag({ label }: { label: string }) {
  return (
    <span className="gds-radius-badge bg-bg-tertiary gds-pad-x-sm gds-text-caption text-fg-muted inline-block py-0.5 font-medium">
      {label}
    </span>
  )
}

export type KanbanCardProps = {
  className?: string
  description?: string
  tags?: string[]
  title: string
}

export function KanbanCard({
  className,
  description,
  tags,
  title,
}: KanbanCardProps) {
  return (
    <div
      className={cx(
        'gds-radius-popover border-border bg-surface gds-pad-x gds-pad-y hover:border-fg-muted/30 border transition-colors',
        className
      )}
      data-component="kanban-card"
    >
      <div className="text-fg text-sm font-medium">{title}</div>
      {description !== undefined && (
        <p className="gds-text-body text-fg-muted mt-1">{description}</p>
      )}
      {tags !== undefined && tags.length > 0 && (
        <div className="gds-gap-xs mt-2 flex flex-wrap">
          {tags.map((tag) => (
            <KanbanTag key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  )
}

export type KanbanColumnComponentProps = {
  children?: ReactNode
  className?: string
  title: string
}

export function KanbanColumnComponent({
  children,
  className,
  title,
}: KanbanColumnComponentProps) {
  return (
    <div
      className={cx(
        'gds-radius-popover bg-bg-secondary/50 gds-pad-x-sm gds-pad-y flex w-72 shrink-0 flex-col',
        className
      )}
      data-component="kanban-column"
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="gds-text-body text-fg-muted font-semibold tracking-wider uppercase">
          {title}
        </h3>
      </div>
      <div className="gds-gap-sm flex flex-1 flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

// internal card used by data-driven Kanban
function KanbanCardInternal({ item }: { item: KanbanItem }) {
  return (
    <div className="gds-radius-popover border-border bg-surface gds-pad-x gds-pad-y hover:border-fg-muted/30 border transition-colors">
      <div className="text-fg text-sm font-medium">{item.title}</div>
      {item.description !== undefined && (
        <p className="gds-text-body text-fg-muted mt-1">{item.description}</p>
      )}
      {item.tags !== undefined && item.tags.length > 0 && (
        <div className="gds-gap-xs mt-2 flex flex-wrap">
          {item.tags.map((tag) => (
            <KanbanTag key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  )
}

function KanbanColumnView({
  column,
  renderItem,
}: {
  column: KanbanColumn
  renderItem?: (item: KanbanItem) => ReactNode
}) {
  return (
    <div className="gds-radius-popover bg-bg-secondary/50 gds-pad-x-sm gds-pad-y flex w-72 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="gds-text-body text-fg-muted font-semibold tracking-wider uppercase">
          {column.title}
        </h3>
        <span className="gds-text-body text-fg-muted/60">
          {column.items.length}
        </span>
      </div>
      <div className="gds-gap-sm flex flex-1 flex-col overflow-y-auto">
        {column.items.map((item) => (
          <div key={item.id}>
            {renderItem !== undefined ? (
              renderItem(item)
            ) : (
              <KanbanCardInternal item={item} />
            )}
          </div>
        ))}
        {column.items.length === 0 && (
          <div className="gds-text-body text-fg-muted/40 py-8 text-center">
            No items
          </div>
        )}
      </div>
    </div>
  )
}

export const Kanban = forwardRef<HTMLDivElement, KanbanProps>(function Kanban(
  { columns, renderItem, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx('gds-gap flex overflow-x-auto p-1', className)}
      data-component="kanban"
    >
      {columns.map((col) => (
        <KanbanColumnView key={col.id} column={col} renderItem={renderItem} />
      ))}
    </div>
  )
})
