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
  function SortableTable(
    { columns, data, defaultSort, className, ...props },
    ref
  ) {
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
      <div
        ref={ref}
        className={cx(
          'border-border overflow-hidden rounded-lg border',
          className
        )}
        data-component="sortable-table"
        {...props}
      >
        <table className="gds-text w-full text-left">
          <thead>
            <tr className="border-border bg-bg-tertiary/50 border-b">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cx(
                    'text-fg-muted px-3 py-1.5 font-medium',
                    col.sortable !== false &&
                      'hover:text-fg cursor-pointer select-none'
                  )}
                  onClick={
                    col.sortable !== false
                      ? () => toggleSort(col.key)
                      : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {sort?.key === col.key && (
                      <span className="text-[10px]">
                        {sort.dir === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={`${String(row[columns[0]?.key ?? ''] ?? '')}-${i}`}
                className="border-border hover:bg-bg-tertiary/30 border-b transition-colors last:border-0"
              >
                {columns.map((col) => (
                  <td key={col.key} className="text-fg px-3 py-1.5">
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

export type { SortableColumn, SortableTableProps, SortState }
