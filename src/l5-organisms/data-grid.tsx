// data-grid — simple table grid with typed columns, optional striping and compact mode
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type DataGridColumn = {
  key: string
  label: string
  align?: 'center' | 'left' | 'right'
  width?: string
}

export type DataGridProps = {
  columns: DataGridColumn[]
  rows: Record<string, ReactNode>[]
  compact?: boolean
  striped?: boolean
  glass?: boolean
  className?: string
}

const alignClasses: Record<string, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
}

export const DataGrid = forwardRef<HTMLTableElement, DataGridProps>(
  function DataGrid({ columns, rows, compact = false, striped = false, glass, className }, ref) {
    const cellPadding = compact ? 'px-3 py-1' : 'px-3 py-2'

    return (
      <div
        className={cx(
          'w-full overflow-auto',
          glass === true && glassClass(glass),
          className,
        )}
        data-component="data-grid"
      >
        <table className="w-full text-sm" ref={ref}>
          <thead>
            <tr className="border-b border-border/40">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cx(
                    'font-medium text-fg-muted select-none',
                    cellPadding,
                    alignClasses[col.align ?? 'left'],
                  )}
                  style={col.width !== undefined ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="px-3 py-8 text-center text-fg-muted" colSpan={columns.length}>
                  No data
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr
                key={i}
                className={cx(
                  'border-b border-border/20',
                  striped && i % 2 === 1 && 'bg-bg-secondary/30',
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cx('text-fg', cellPadding, alignClasses[col.align ?? 'left'])}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
)
