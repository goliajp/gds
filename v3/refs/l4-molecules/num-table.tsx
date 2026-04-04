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

function formatCell(
  value: unknown,
  format?: (v: null | number | undefined) => string
): string {
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
  function NumTable(
    {
      className,
      columns,
      emptyMessage,
      getRowHighlight,
      labelHeader,
      labelKey,
      rowKey,
      rows,
    },
    ref
  ) {
    const hasFooter = columns.some((col) => col.footer !== undefined)

    return (
      <table
        ref={ref}
        className={cx('gds-text w-full border-collapse', className)}
        data-component="num-table"
      >
        <thead>
          <tr className="border-border border-b">
            <th className="gds-pad-y text-fg-muted px-2 text-left text-xs font-medium">
              {labelHeader}
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="gds-pad-y text-fg-muted px-2 text-right text-xs font-medium"
                style={
                  col.width !== undefined ? { width: col.width } : undefined
                }
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && emptyMessage !== undefined && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="gds-pad-y text-fg-muted px-2 text-center"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row, i) => {
            const key = rowKey !== undefined ? String(row[rowKey]) : String(i)
            const highlight = getRowHighlight?.(row)
            return (
              <tr
                key={key}
                className={cx('border-border/50 border-b', highlight)}
              >
                <td className="gds-pad-y text-fg px-2 text-left">
                  {String(row[labelKey] ?? '')}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="gds-pad-y text-fg px-2 text-right tabular-nums"
                  >
                    {formatCell(row[col.key], col.format)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
        {hasFooter && (
          <tfoot>
            <tr className="border-border border-t font-medium">
              <td className="gds-pad-y px-2" />
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="gds-pad-y text-fg px-2 text-right tabular-nums"
                >
                  {col.footer ?? ''}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    )
  }
)
