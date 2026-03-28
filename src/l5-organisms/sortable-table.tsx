// sortable-table — table with client-side column sorting
import { forwardRef, useMemo, useState } from 'react'

import { cx } from '../utils/cx'

type SortableColumn = {
  key: string
  header: string
  sortable?: boolean
}

type SortState = {
  key: string
  dir: 'asc' | 'desc'
}

type SortableTableProps = React.HTMLAttributes<HTMLDivElement> & {
  columns: SortableColumn[]
  data: Record<string, unknown>[]
  defaultSort?: SortState
}

export const SortableTable = forwardRef<HTMLDivElement, SortableTableProps>(
  function SortableTable({ columns, data, defaultSort, className, ...props }, ref) {
    const [sort, setSort] = useState<SortState | undefined>(defaultSort)

    const sorted = useMemo(() => {
      if (sort === undefined) return data
      return [...data].sort((a, b) => {
        const av = String(a[sort.key] ?? '')
        const bv = String(b[sort.key] ?? '')
        const cmp = av.localeCompare(bv, undefined, { numeric: true })
        return sort.dir === 'asc' ? cmp : -cmp
      })
    }, [data, sort])

    function toggleSort(key: string) {
      if (sort?.key === key) {
        setSort({ key, dir: sort.dir === 'asc' ? 'desc' : 'asc' })
      } else {
        setSort({ key, dir: 'asc' })
      }
    }

    return (
      <div ref={ref} className={cx('overflow-hidden rounded-lg border border-border', className)} data-component="sortable-table" {...props}>
        <table className="w-full text-left gds-text">
          <thead>
            <tr className="border-b border-border bg-bg-tertiary/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cx(
                    'px-3 py-1.5 font-medium text-fg-muted',
                    col.sortable !== false && 'cursor-pointer select-none hover:text-fg',
                  )}
                  onClick={col.sortable !== false ? () => toggleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {sort?.key === col.key && (
                      <span className="text-[10px]">{sort.dir === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={`${String(row[columns[0]?.key ?? ''] ?? '')}-${i}`} className="border-b border-border last:border-0 transition-colors hover:bg-bg-tertiary/30">
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-1.5 text-fg">
                    {String(row[col.key] ?? '')}
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

export type { SortableColumn, SortableTableProps, SortState }
