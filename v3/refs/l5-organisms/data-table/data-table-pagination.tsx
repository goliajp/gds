import { focusCls } from '../../utils/a11y'
import { cx } from '../../utils/cx'

type DataTablePaginationProps = {
  currentPage: number
  totalPages: number
  totalRows: number
  pageSize: number
  pageSizeOptions?: number[]
  visibleRowCount: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function DataTablePagination({
  currentPage,
  totalPages,
  totalRows,
  pageSize,
  pageSizeOptions,
  visibleRowCount,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalRows)

  return (
    <div className="border-border flex items-center justify-between border-t px-3 py-2">
      <div className="text-fg-muted flex items-center gap-2 text-[11px]">
        <span>
          {visibleRowCount === 0 ? '0 rows' : `${start}–${end} of ${totalRows}`}
        </span>
        {pageSizeOptions !== undefined && onPageSizeChange !== undefined && (
          <select
            className="border-border bg-bg text-fg rounded border px-1.5 py-0.5 text-[11px] outline-none"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-1">
        <PageButton
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          label="Previous"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PageButton>
        <span className="text-fg-muted px-2 text-[11px] tabular-nums">
          {currentPage} / {totalPages}
        </span>
        <PageButton
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          label="Next"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PageButton>
      </div>
    </div>
  )
}

function PageButton({
  children,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode
  disabled: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      aria-label={label}
      className={cx(
        'text-fg-muted rounded p-1 transition-colors',
        focusCls,
        disabled
          ? 'cursor-not-allowed opacity-30'
          : 'hover:bg-bg-tertiary hover:text-fg'
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
