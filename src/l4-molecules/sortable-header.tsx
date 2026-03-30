// sortable-header — table column header with sort direction indicator
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type SortDirection = 'asc' | 'desc' | null

export type SortableHeaderProps = {
  label: string
  direction: SortDirection
  onSort: () => void
  className?: string
}

export const SortableHeader = forwardRef<
  HTMLTableCellElement,
  SortableHeaderProps
>(function SortableHeader({ label, direction, onSort, className }, ref) {
  const active = direction !== null

  return (
    <th
      ref={ref}
      className={cx(
        'px-3 py-2 text-left text-xs font-medium transition-colors select-none',
        focusCls,
        active ? 'text-accent' : 'text-fg-muted',
        'hover:text-accent cursor-pointer',
        className
      )}
      data-component="sortable-header"
      data-state={direction ?? 'none'}
      onClick={onSort}
      role="columnheader"
      tabIndex={0}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {direction === 'asc' && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 12V4M4.5 7.5L8 4l3.5 3.5" />
          </svg>
        )}
        {direction === 'desc' && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 4v8M4.5 8.5L8 12l3.5-3.5" />
          </svg>
        )}
      </span>
    </th>
  )
})

export type { SortDirection }
