import type { ReactNode } from 'react'

import { cx } from '../../utils/cx'

import type { DataColumn, Density } from './data-table-types'
import { computeAggregate, getCellValue, getDensity, getLabel, resolveRowKey } from './data-table-utils'

// skeleton loading rows
function SkeletonRows<T>({
  columns,
  count,
  density,
  hasSelection,
  rowNumbers,
  hasActions,
  bordered,
}: {
  columns: DataColumn<T>[]
  count: number
  density?: Density
  hasSelection?: boolean
  rowNumbers?: boolean
  hasActions?: boolean
  bordered?: boolean
}) {
  const d = getDensity(density)
  const borderCls = bordered === true ? 'border border-border' : ''
  const totalCols = columns.length + (hasSelection ? 1 : 0) + (rowNumbers ? 1 : 0) + (hasActions ? 1 : 0)
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <tr key={i} className="border-b border-border">
          {Array.from({ length: totalCols }, (_, j) => (
            <td key={j} className={cx(d.td, borderCls)}>
              <div className="h-4 animate-pulse rounded bg-bg-tertiary" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

// empty state
function EmptyState({
  colSpan,
  message,
  icon,
}: {
  colSpan: number
  message: string
  icon?: ReactNode
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center text-sm text-fg-muted">
        {icon !== undefined && <div className="mb-2 flex justify-center text-fg-muted/30">{icon}</div>}
        {message}
      </td>
    </tr>
  )
}

// error state
function ErrorState({ colSpan, error }: { colSpan: number; error: ReactNode }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-8 text-center text-sm text-danger">
        {error}
      </td>
    </tr>
  )
}

// render cell content
function renderCell<T>(col: DataColumn<T>, row: T, index: number, highlightQuery?: string): ReactNode {
  const value = getCellValue(row, col.key)

  // render has full control — support both (value, row, index) and legacy (row) signatures
  if (col.render !== undefined) {
    if (col.render.length <= 1) {
      return (col.render as (row: T) => ReactNode)(row)
    }
    return (col.render as (value: unknown, row: T, index: number) => ReactNode)(value, row, index)
  }

  // format returns ReactNode
  if (col.format !== undefined) return col.format(value, row)

  const str = String(value ?? '')

  // highlight matches
  if (highlightQuery !== undefined && highlightQuery !== '' && str !== '') {
    const lowerStr = str.toLowerCase()
    const lowerQuery = highlightQuery.toLowerCase()
    const idx = lowerStr.indexOf(lowerQuery)
    if (idx >= 0) {
      return (
        <>
          {str.slice(0, idx)}
          <mark className="bg-warning/30 text-fg">{str.slice(idx, idx + highlightQuery.length)}</mark>
          {str.slice(idx + highlightQuery.length)}
        </>
      )
    }
  }

  return str
}

type DataTableBodyProps<T> = {
  columns: DataColumn<T>[]
  rows: T[]
  density?: Density
  loading?: boolean
  loadingRows?: number
  error?: ReactNode
  emptyMessage?: string
  emptyIcon?: ReactNode
  striped?: boolean
  bordered?: boolean
  highlightOnHover?: boolean
  rowNumbers?: boolean
  rowKey?: string | ((row: T, index: number) => string)
  getRowClassName?: (row: T, index: number) => string | undefined
  onRowClick?: (row: T) => void
  // selection
  hasSelection?: boolean
  selectedKeys?: Set<string>
  onToggleSelect?: (key: string, row: T) => void
  // expand
  expandedKeys?: Set<string>
  onToggleExpand?: (key: string) => void
  renderExpanded?: (row: T) => ReactNode
  // actions
  actions?: (row: T) => ReactNode
  // highlight
  highlightQuery?: string
  // page offset for row numbers
  pageOffset?: number
}

export function DataTableBody<T>({
  columns,
  rows,
  density,
  loading,
  loadingRows = 5,
  error,
  emptyMessage = 'No data',
  emptyIcon,
  striped,
  bordered,
  highlightOnHover = true,
  rowNumbers,
  rowKey,
  getRowClassName,
  onRowClick,
  hasSelection,
  selectedKeys,
  onToggleSelect,
  expandedKeys,
  onToggleExpand,
  renderExpanded,
  actions,
  highlightQuery,
  pageOffset = 0,
}: DataTableBodyProps<T>) {
  const d = getDensity(density)
  const borderCls = bordered === true ? 'border border-border' : ''
  const totalCols = columns.length + (hasSelection ? 1 : 0) + (rowNumbers ? 1 : 0) + (actions !== undefined ? 1 : 0)
  const hasAggregate = columns.some((c) => c.aggregate !== undefined)

  return (
    <tbody>
      {loading === true && (
        <SkeletonRows
          columns={columns}
          count={loadingRows}
          density={density}
          hasSelection={hasSelection}
          rowNumbers={rowNumbers}
          hasActions={actions !== undefined}
          bordered={bordered}
        />
      )}
      {loading !== true && error !== undefined && (
        <ErrorState colSpan={totalCols} error={error} />
      )}
      {loading !== true && error === undefined && rows.length === 0 && (
        <EmptyState colSpan={totalCols} message={emptyMessage} icon={emptyIcon} />
      )}
      {loading !== true && error === undefined && rows.map((row, i) => {
        const key = resolveRowKey(row, rowKey, pageOffset + i)
        const isSelected = selectedKeys !== undefined && selectedKeys.has(key)
        const isExpanded = expandedKeys !== undefined && expandedKeys.has(key)
        const customCls = getRowClassName !== undefined ? getRowClassName(row, pageOffset + i) : undefined

        return (
          <RowFragment key={key}>
            <tr
              className={cx(
                'border-b border-border transition-colors',
                striped === true && i % 2 === 1 && 'bg-bg-secondary/30',
                highlightOnHover && 'hover:bg-bg-secondary/60',
                isSelected && 'bg-accent/5',
                onRowClick !== undefined && 'cursor-pointer',
                customCls,
              )}
              onClick={onRowClick !== undefined ? () => onRowClick(row) : undefined}
            >
              {hasSelection && (
                <td className={cx(d.td, borderCls, 'w-8 text-center')}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation()
                      onToggleSelect?.(key, row)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="accent-accent"
                  />
                </td>
              )}
              {rowNumbers === true && (
                <td className={cx(d.td, borderCls, 'w-8 text-center text-fg-muted/50 tabular-nums')}>
                  {pageOffset + i + 1}
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cx(
                    d.td,
                    borderCls,
                    'text-fg',
                    col.align === 'right' && 'text-right tabular-nums',
                    col.align === 'center' && 'text-center',
                    col.muted === true && 'text-fg-muted',
                  )}
                >
                  {renderCell(col, row, pageOffset + i, highlightQuery)}
                </td>
              ))}
              {actions !== undefined && (
                <td className={cx(d.td, borderCls, 'w-12 text-center')} onClick={(e) => e.stopPropagation()}>
                  {actions(row)}
                </td>
              )}
            </tr>
            {isExpanded && renderExpanded !== undefined && (
              <tr className="border-b border-border bg-bg-secondary/20">
                <td colSpan={totalCols} className="px-4 py-3">
                  {renderExpanded(row)}
                </td>
              </tr>
            )}
          </RowFragment>
        )
      })}
      {loading !== true && error === undefined && hasAggregate && rows.length > 0 && (
        <tr className="border-t-2 border-border bg-bg-secondary/50 font-semibold">
          {hasSelection && <td className={cx(d.td, borderCls)} />}
          {rowNumbers === true && <td className={cx(d.td, borderCls)} />}
          {columns.map((col) => (
            <td
              key={col.key}
              className={cx(
                d.td,
                borderCls,
                'text-fg',
                col.align === 'right' && 'text-right tabular-nums',
              )}
            >
              {col.aggregate !== undefined
                ? (computeAggregate(rows, col.key, col.aggregate)?.toLocaleString() ?? '')
                : (col.key === columns[0]?.key ? `Total (${rows.length})` : '')}
            </td>
          ))}
          {actions !== undefined && <td className={cx(d.td, borderCls)} />}
        </tr>
      )}
    </tbody>
  )
}

// fragment wrapper for expand rows (two <tr> per row)
function RowFragment({ children }: { children: ReactNode }) {
  return <>{children}</>
}
