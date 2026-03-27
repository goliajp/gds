// data-table — sortable, striped table with loading and empty states
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassSurface } from '../utils/glass'

export type Column<T> = {
  key: string
  header: string
  render?: (row: T) => ReactNode
  sortable?: boolean
  width?: string
}

export type DataTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[]
  data: T[]
  className?: string
  onRowClick?: (row: T) => void
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  emptyText?: string
  loading?: boolean
  glass?: boolean
}

function SortChevron({ dir }: { dir?: 'asc' | 'desc' }) {
  if (dir === undefined) {
    return (
      <svg className="ml-1 inline h-3 w-3 text-fg-muted/40" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 2L9 5H3L6 2Z" />
        <path d="M6 10L3 7H9L6 10Z" />
      </svg>
    )
  }
  return (
    <svg className="ml-1 inline h-3 w-3 text-fg-muted" viewBox="0 0 12 12" fill="currentColor">
      {dir === 'asc'
        ? <path d="M6 2L9 5H3L6 2Z" />
        : <path d="M6 10L3 7H9L6 10Z" />
      }
    </svg>
  )
}

function SkeletonRows<T extends Record<string, unknown>>({ columns }: { columns: Column<T>[] }) {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <tr key={i} className="border-b border-border">
          {columns.map((col) => (
            <td key={col.key} className="gds-pad-x gds-pad-y">
              <div className="h-4 animate-pulse rounded bg-bg-tertiary" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

function EmptyState({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="gds-pad-x py-12 text-center text-sm text-fg-muted">
        {text}
      </td>
    </tr>
  )
}

function DataTableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    className,
    onRowClick,
    sortKey,
    sortDir,
    onSort,
    emptyText = 'No data',
    loading,
    glass,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleHeaderClick = (col: Column<T>) => {
    if (col.sortable !== true || onSort === undefined) return
    onSort(col.key)
  }

  return (
    <div
      ref={ref}
      className={cx(
        'overflow-auto gds-radius-popover border',
        glass === true
          ? cx(glassSurface(glass), 'bg-bg/60')
          : 'border-border bg-surface',
        className,
      )}
      data-component="data-table"
      data-state={loading === true ? 'loading' : undefined}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-secondary/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cx(
                  'gds-pad-x gds-pad-y text-left gds-text-body font-medium uppercase tracking-wider text-fg-muted select-none',
                  col.sortable === true && 'cursor-pointer hover:text-fg',
                )}
                style={col.width !== undefined ? { width: col.width } : undefined}
                onClick={() => handleHeaderClick(col)}
              >
                {col.header}
                {col.sortable === true && (
                  <SortChevron dir={sortKey === col.key ? sortDir : undefined} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading === true && <SkeletonRows columns={columns} />}
          {loading !== true && data.length === 0 && (
            <EmptyState colSpan={columns.length} text={emptyText} />
          )}
          {loading !== true && data.map((row, i) => (
            <tr
              key={i}
              className={cx(
                'border-b border-border transition-colors',
                i % 2 === 1 && 'bg-bg-secondary/30',
                onRowClick !== undefined && 'cursor-pointer hover:bg-bg-secondary/60',
              )}
              onClick={onRowClick !== undefined ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className="gds-pad-x gds-pad-y text-fg">
                  {col.render !== undefined
                    ? col.render(row)
                    : String(row[col.key] ?? '')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const DataTable = forwardRef(DataTableInner) as <T extends Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => ReactNode
