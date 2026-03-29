// num-table — numeric data table with right-aligned values and optional footer
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type NumColumn = {
  footer?: React.ReactNode
  format?: (value: null | number | undefined) => string
  key: string
  label: string
  width?: string
}

export type NumTableProps = {
  className?: string
  columns: NumColumn[]
  emptyMessage?: string
  getRowHighlight?: (row: Record<string, unknown>) => string | undefined
  labelHeader: string
  labelKey: string
  rowKey?: string
  rows: Record<string, unknown>[]
}

function formatCell(value: unknown, format?: (v: null | number | undefined) => string): string {
  if (value === null || value === undefined) {
    if (format !== undefined) return format(null)
    return '\u2014'
  }
  if (typeof value === 'number') {
    if (format !== undefined) return format(value)
    return String(value)
  }
  return String(value)
}

export const NumTable = forwardRef<HTMLTableElement, NumTableProps>(
  function NumTable({ className, columns, emptyMessage, getRowHighlight, labelHeader, labelKey, rowKey, rows }, ref) {
    const hasFooter = columns.some((col) => col.footer !== undefined)

    return (
      <table
        ref={ref}
        className={cx('w-full border-collapse gds-text', className)}
        data-component="num-table"
      >
        <thead>
          <tr className="border-b border-border">
            <th className="gds-pad-y px-2 text-left text-xs font-medium text-fg-muted">{labelHeader}</th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="gds-pad-y px-2 text-right text-xs font-medium text-fg-muted"
                style={col.width !== undefined ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && emptyMessage !== undefined && (
            <tr>
              <td colSpan={columns.length + 1} className="gds-pad-y px-2 text-center text-fg-muted">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row, i) => {
            const key = rowKey !== undefined ? String(row[rowKey]) : String(i)
            const highlight = getRowHighlight?.(row)
            return (
              <tr key={key} className={cx('border-b border-border/50', highlight)}>
                <td className="gds-pad-y px-2 text-left text-fg">{String(row[labelKey] ?? '')}</td>
                {columns.map((col) => (
                  <td key={col.key} className="gds-pad-y px-2 text-right tabular-nums text-fg">
                    {formatCell(row[col.key], col.format)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
        {hasFooter && (
          <tfoot>
            <tr className="border-t border-border font-medium">
              <td className="gds-pad-y px-2" />
              {columns.map((col) => (
                <td key={col.key} className="gds-pad-y px-2 text-right tabular-nums text-fg">
                  {col.footer ?? ''}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    )
  },
)
