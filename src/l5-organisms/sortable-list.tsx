import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

type SortableItem = {
  id: string
  content: ReactNode
}

type SortableListProps = React.HTMLAttributes<HTMLDivElement> & {
  items: SortableItem[]
  onReorder: (items: SortableItem[]) => void
  disabled?: boolean
  itemClassName?: string
}

// grip icon inline svg
function GripIcon() {
  return (
    <svg
      className="text-fg-muted/50 h-4 w-4"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <circle cx="5" cy="3" r="1.2" />
      <circle cx="11" cy="3" r="1.2" />
      <circle cx="5" cy="8" r="1.2" />
      <circle cx="11" cy="8" r="1.2" />
      <circle cx="5" cy="13" r="1.2" />
      <circle cx="11" cy="13" r="1.2" />
    </svg>
  )
}

export const SortableList = forwardRef<HTMLDivElement, SortableListProps>(
  function SortableList(
    { className, disabled, itemClassName, items, onReorder, ...props },
    ref
  ) {
    const [dragIndex, setDragIndex] = useState<number | null>(null)
    const [dropIndex, setDropIndex] = useState<number | null>(null)

    function handleDragStart(index: number) {
      if (disabled) return
      setDragIndex(index)
    }

    function handleDragOver(e: React.DragEvent, index: number) {
      e.preventDefault()
      setDropIndex(index)
    }

    function handleDragLeave() {
      setDropIndex(null)
    }

    function handleDrop(e: React.DragEvent, targetIndex: number) {
      e.preventDefault()
      if (dragIndex === null || dragIndex === targetIndex) {
        setDragIndex(null)
        setDropIndex(null)
        return
      }

      const reordered = [...items]
      const [moved] = reordered.splice(dragIndex, 1)
      if (moved !== undefined) {
        reordered.splice(targetIndex, 0, moved)
      }
      onReorder(reordered)
      setDragIndex(null)
      setDropIndex(null)
    }

    function handleDragEnd() {
      setDragIndex(null)
      setDropIndex(null)
    }

    return (
      <div
        className={cx('flex flex-col', className)}
        data-component="sortable-list"
        ref={ref}
        {...props}
      >
        {items.map((item, index) => (
          <div
            className={cx(
              'gds-gap border-border flex items-center border-b px-2 py-2 transition-opacity',
              dragIndex === index && 'opacity-50',
              dropIndex === index && 'border-t-accent border-t-2',
              disabled !== true && 'cursor-grab active:cursor-grabbing',
              disabled === true && 'pointer-events-none opacity-60',
              itemClassName
            )}
            data-item-id={item.id}
            draggable={disabled !== true}
            key={item.id}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragStart={() => handleDragStart(index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            {disabled !== true && (
              <span className="flex-shrink-0 select-none">
                <GripIcon />
              </span>
            )}
            <div className="flex-1">{item.content}</div>
          </div>
        ))}
      </div>
    )
  }
)

export type { SortableItem, SortableListProps }
