import { useState } from 'react'

import { focusCls } from '../../utils/a11y'
import { cx } from '../../utils/cx'
import type { BatchAction, DataColumn } from './data-table-types'
import { getLabel } from './data-table-utils'

type DataTableToolbarProps<T> = {
  // global filter
  globalFilter?: boolean
  globalFilterValue?: string
  globalFilterPlaceholder?: string
  onGlobalFilterChange?: (value: string) => void
  // column toggle
  columnToggle?: boolean
  columns?: DataColumn<T>[]
  hiddenColumns?: Set<string>
  onToggleColumn?: (key: string) => void
  // export
  exportCsv?: boolean
  onExport?: () => void
  // batch actions
  batchActions?: BatchAction[]
  selectedKeys?: Set<string>
  // caption
  caption?: React.ReactNode
  title?: string
  subtitle?: string
  toolbarActions?: React.ReactNode
}

export function DataTableToolbar<T>({
  globalFilter,
  globalFilterValue,
  globalFilterPlaceholder = 'Search...',
  onGlobalFilterChange,
  columnToggle,
  columns,
  hiddenColumns,
  onToggleColumn,
  exportCsv,
  onExport,
  batchActions,
  selectedKeys,
  caption,
  title,
  subtitle,
  toolbarActions,
}: DataTableToolbarProps<T>) {
  const [showColumnMenu, setShowColumnMenu] = useState(false)
  const someSelected = selectedKeys !== undefined && selectedKeys.size > 0

  const hasContent =
    globalFilter === true ||
    columnToggle === true ||
    exportCsv === true ||
    caption !== undefined ||
    title !== undefined ||
    toolbarActions !== undefined ||
    someSelected

  if (!hasContent) return null

  return (
    <div className="border-border flex items-center gap-2 border-b px-3 py-2">
      {caption !== undefined && (
        <span className="text-fg text-xs font-semibold">{caption}</span>
      )}
      {caption === undefined && title !== undefined && (
        <div className="flex items-baseline gap-2">
          <span className="text-fg text-xs font-semibold">{title}</span>
          {subtitle !== undefined && (
            <span className="text-fg-muted text-[11px]">{subtitle}</span>
          )}
        </div>
      )}
      {toolbarActions !== undefined && (
        <div className="flex items-center gap-1">{toolbarActions}</div>
      )}

      {someSelected && batchActions !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-fg-muted text-[11px]">
            {selectedKeys.size} selected
          </span>
          {batchActions.map((action) => (
            <button
              key={action.label}
              className={cx(
                'rounded px-2 py-0.5 text-[11px] font-medium transition-colors',
                focusCls,
                action.variant === 'danger'
                  ? 'text-danger hover:bg-danger/10'
                  : 'text-fg hover:bg-bg-tertiary'
              )}
              onClick={() => action.onClick(selectedKeys)}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {globalFilter === true && (
          <input
            className={cx(
              'border-border bg-bg text-fg placeholder:text-fg-muted/50 w-48 rounded border px-2.5 py-1 text-[11px] outline-none',
              focusCls
            )}
            placeholder={globalFilterPlaceholder}
            value={globalFilterValue ?? ''}
            onChange={(e) => onGlobalFilterChange?.(e.target.value)}
          />
        )}

        {columnToggle === true && columns !== undefined && (
          <div className="relative">
            <button
              className={cx(
                'text-fg-muted hover:bg-bg-tertiary hover:text-fg rounded p-1 transition-colors',
                focusCls
              )}
              onClick={() => setShowColumnMenu((v) => !v)}
              title="Toggle columns"
              type="button"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v18M3 12h18" strokeLinecap="round" />
              </svg>
            </button>
            {showColumnMenu && (
              <div className="border-border bg-bg absolute top-full right-0 z-50 mt-1 min-w-40 rounded border p-1 shadow-lg">
                {columns.map((col) => (
                  <label
                    key={col.key}
                    className="text-fg hover:bg-bg-tertiary flex items-center gap-2 rounded px-2 py-1 text-[11px]"
                  >
                    <input
                      type="checkbox"
                      checked={
                        hiddenColumns === undefined ||
                        !hiddenColumns.has(col.key)
                      }
                      onChange={() => onToggleColumn?.(col.key)}
                      className="accent-accent"
                    />
                    {getLabel(col)}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {exportCsv === true && (
          <button
            className={cx(
              'text-fg-muted hover:bg-bg-tertiary hover:text-fg rounded p-1 transition-colors',
              focusCls
            )}
            onClick={onExport}
            title="Export CSV"
            type="button"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
