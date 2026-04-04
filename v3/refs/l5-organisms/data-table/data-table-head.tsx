import { cx } from '../../utils/cx'
import type { DataColumn, Density, SortDir } from './data-table-types'
import { getDensity, getLabel } from './data-table-utils'

function SortIcon({ dir }: { dir?: SortDir | null }) {
  if (dir === undefined || dir === null) {
    return (
      <svg
        className="text-fg-muted/40 ml-1 inline h-3 w-3"
        fill="currentColor"
        viewBox="0 0 12 12"
      >
        <path d="M6 2L9 5H3L6 2Z" />
        <path d="M6 10L3 7H9L6 10Z" />
      </svg>
    )
  }
  return (
    <svg
      className="text-fg-muted ml-1 inline h-3 w-3"
      fill="currentColor"
      viewBox="0 0 12 12"
    >
      {dir === 'asc' ? (
        <path d="M6 2L9 5H3L6 2Z" />
      ) : (
        <path d="M6 10L3 7H9L6 10Z" />
      )}
    </svg>
  )
}

type DataTableHeadProps<T> = {
  columns: DataColumn<T>[]
  density?: Density
  sortKey?: string | null
  sortDir?: SortDir | null
  onSort?: (key: string) => void
  stickyHeader?: boolean
  rowNumbers?: boolean
  hasSelection?: boolean
  allSelected?: boolean
  someSelected?: boolean
  onToggleSelectAll?: () => void
  hasActions?: boolean
  hasExpand?: boolean
  bordered?: boolean
  // column filters
  columnFilters?: Record<string, string>
  onColumnFilterChange?: (key: string, value: string) => void
}

export function DataTableHead<T>({
  columns,
  density,
  sortKey,
  sortDir,
  onSort,
  stickyHeader,
  rowNumbers,
  hasSelection,
  allSelected,
  someSelected,
  onToggleSelectAll,
  hasActions,
  hasExpand,
  bordered,
  columnFilters,
  onColumnFilterChange,
}: DataTableHeadProps<T>) {
  const d = getDensity(density)
  const borderCls =
    bordered === true ? 'border border-border' : 'border-b border-border'
  const hasFilters =
    columns.some((c) => c.filterable === true) &&
    onColumnFilterChange !== undefined

  return (
    <thead>
      <tr
        className={cx(
          'bg-bg-secondary/50',
          stickyHeader === true && 'sticky top-0 z-10'
        )}
      >
        {hasExpand === true && <th className={cx(d.th, borderCls, 'w-8')} />}
        {hasSelection && (
          <th className={cx(d.th, borderCls, 'w-8 text-center')}>
            <input
              type="checkbox"
              checked={allSelected === true}
              ref={(el) => {
                if (el !== null)
                  el.indeterminate =
                    someSelected === true && allSelected !== true
              }}
              onChange={() => onToggleSelectAll?.()}
              className="accent-accent"
            />
          </th>
        )}
        {rowNumbers === true && (
          <th
            className={cx(
              d.th,
              borderCls,
              'text-fg-muted w-8 text-center font-medium select-none'
            )}
          >
            #
          </th>
        )}
        {columns.map((col) => (
          <th
            key={col.key}
            className={cx(
              d.th,
              borderCls,
              'text-fg-muted font-semibold tracking-wide whitespace-nowrap select-none',
              col.align === 'right' && 'text-right',
              col.align === 'center' && 'text-center',
              col.sortable === true &&
                onSort !== undefined &&
                'hover:text-fg cursor-pointer'
            )}
            style={{
              width: col.width,
              minWidth: col.minWidth,
            }}
            onClick={() => {
              if (col.sortable === true && onSort !== undefined) {
                onSort(col.key)
              }
            }}
          >
            {getLabel(col)}
            {col.sortable === true && (
              <SortIcon dir={sortKey === col.key ? sortDir : undefined} />
            )}
          </th>
        ))}
        {hasActions && <th className={cx(d.th, borderCls, 'w-12')} />}
      </tr>
      {hasFilters && (
        <tr className="bg-bg-secondary/30">
          {hasExpand === true && <th className={cx(d.th, borderCls)} />}
          {hasSelection && <th className={cx(d.th, borderCls)} />}
          {rowNumbers === true && <th className={cx(d.th, borderCls)} />}
          {columns.map((col) => (
            <th key={col.key} className={cx('px-1 py-1', borderCls)}>
              {col.filterable === true ? (
                col.filterOptions !== undefined ? (
                  <select
                    className="border-border bg-bg text-fg w-full rounded border px-1.5 py-0.5 text-[11px] outline-none"
                    value={columnFilters?.[col.key] ?? ''}
                    onChange={(e) =>
                      onColumnFilterChange?.(col.key, e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {col.filterOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="border-border bg-bg text-fg placeholder:text-fg-muted/50 w-full rounded border px-1.5 py-0.5 text-[11px] outline-none"
                    placeholder="Filter..."
                    value={columnFilters?.[col.key] ?? ''}
                    onChange={(e) =>
                      onColumnFilterChange?.(col.key, e.target.value)
                    }
                  />
                )
              ) : null}
            </th>
          ))}
          {hasActions && <th className={cx(d.th, borderCls)} />}
        </tr>
      )}
    </thead>
  )
}
