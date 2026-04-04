// pagination — page navigation with numbered buttons and ellipsis
import { forwardRef, useMemo } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type PaginationProps = React.HTMLAttributes<HTMLElement> & {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblings?: number
}

function range(start: number, end: number): number[] {
  const result: number[] = []
  for (let i = start; i <= end; i++) result.push(i)
  return result
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    { page, totalPages, onPageChange, siblings = 1, className, ...props },
    ref
  ) {
    const pages = useMemo(() => {
      const total = totalPages
      const boundary = siblings + 3 // siblings + first + last + current
      if (total <= boundary + 2) return range(1, total)

      const left = Math.max(page - siblings, 2)
      const right = Math.min(page + siblings, total - 1)
      const showLeftDots = left > 2
      const showRightDots = right < total - 1

      const mid = range(left, right)
      const items: (number | 'dots-l' | 'dots-r')[] = [1]
      if (showLeftDots) items.push('dots-l')
      items.push(...mid)
      if (showRightDots) items.push('dots-r')
      items.push(total)
      return items
    }, [page, totalPages, siblings])

    const chevron = (dir: 'left' | 'right') => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dir === 'left' ? 'M9 3L5 7l4 4' : 'M5 3l4 4-4 4'} />
      </svg>
    )

    const btnBase = cx(
      'inline-flex gds-sq items-center justify-center gds-radius-button gds-text-body select-none',
      focusCls
    )

    return (
      <nav
        ref={ref}
        className={cx('gds-gap-xs flex items-center', className)}
        data-component="pagination"
        aria-label="Pagination"
        {...props}
      >
        <button
          type="button"
          className={cx(
            btnBase,
            'text-fg-muted',
            page <= 1
              ? 'pointer-events-none opacity-40'
              : 'hover:bg-bg-secondary'
          )}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          {chevron('left')}
        </button>

        {pages.map((item) => {
          if (item === 'dots-l' || item === 'dots-r') {
            return (
              <span
                key={item}
                className="gds-sq gds-text-body text-fg-muted inline-flex items-center justify-center select-none"
              >
                &hellip;
              </span>
            )
          }
          const active = item === page
          return (
            <button
              key={item}
              type="button"
              className={cx(
                btnBase,
                active
                  ? 'bg-accent text-accent-fg font-medium'
                  : 'text-fg-muted hover:bg-bg-secondary hover:text-fg'
              )}
              aria-current={active ? 'page' : undefined}
              onClick={() => onPageChange(item as number)}
            >
              {item}
            </button>
          )
        })}

        <button
          type="button"
          className={cx(
            btnBase,
            'text-fg-muted',
            page >= totalPages
              ? 'pointer-events-none opacity-40'
              : 'hover:bg-bg-secondary'
          )}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          {chevron('right')}
        </button>
      </nav>
    )
  }
)
