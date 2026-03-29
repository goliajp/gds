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
    <span className="inline-block gds-radius-badge bg-bg-tertiary gds-pad-x-sm py-0.5 gds-text-caption font-medium text-fg-muted">
      {label}
    </span>
  )
}

export type KanbanCardProps = { className?: string; description?: string; tags?: string[]; title: string }

export function KanbanCard({ className, description, tags, title }: KanbanCardProps) {
  return (
    <div className={cx('gds-radius-popover border border-border bg-surface gds-pad-x gds-pad-y transition-colors hover:border-fg-muted/30', className)} data-component="kanban-card">
      <div className="text-sm font-medium text-fg">{title}</div>
      {description !== undefined && <p className="mt-1 gds-text-body text-fg-muted">{description}</p>}
      {tags !== undefined && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gds-gap-xs">
          {tags.map((tag) => <KanbanTag key={tag} label={tag} />)}
        </div>
      )}
    </div>
  )
}

export type KanbanColumnComponentProps = { children?: ReactNode; className?: string; title: string }

export function KanbanColumnComponent({ children, className, title }: KanbanColumnComponentProps) {
  return (
    <div className={cx('flex w-72 shrink-0 flex-col gds-radius-popover bg-bg-secondary/50 gds-pad-x-sm gds-pad-y', className)} data-component="kanban-column">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="gds-text-body font-semibold uppercase tracking-wider text-fg-muted">{title}</h3>
      </div>
      <div className="flex flex-1 flex-col gds-gap-sm overflow-y-auto">{children}</div>
    </div>
  )
}

// internal card used by data-driven Kanban
function KanbanCardInternal({ item }: { item: KanbanItem }) {
  return (
    <div className="gds-radius-popover border border-border bg-surface gds-pad-x gds-pad-y transition-colors hover:border-fg-muted/30">
      <div className="text-sm font-medium text-fg">{item.title}</div>
      {item.description !== undefined && (
        <p className="mt-1 gds-text-body text-fg-muted">{item.description}</p>
      )}
      {item.tags !== undefined && item.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gds-gap-xs">
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
    <div className="flex w-72 shrink-0 flex-col gds-radius-popover bg-bg-secondary/50 gds-pad-x-sm gds-pad-y">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="gds-text-body font-semibold uppercase tracking-wider text-fg-muted">
          {column.title}
        </h3>
        <span className="gds-text-body text-fg-muted/60">{column.items.length}</span>
      </div>
      <div className="flex flex-1 flex-col gds-gap-sm overflow-y-auto">
        {column.items.map((item) => (
          <div key={item.id}>
            {renderItem !== undefined ? renderItem(item) : <KanbanCardInternal item={item} />}
          </div>
        ))}
        {column.items.length === 0 && (
          <div className="py-8 text-center gds-text-body text-fg-muted/40">
            No items
          </div>
        )}
      </div>
    </div>
  )
}

export const Kanban = forwardRef<HTMLDivElement, KanbanProps>(
  function Kanban({ columns, renderItem, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex gds-gap overflow-x-auto p-1', className)}
        data-component="kanban"
      >
        {columns.map((col) => (
          <KanbanColumnView
            key={col.id}
            column={col}
            renderItem={renderItem}
          />
        ))}
      </div>
    )
  },
)
