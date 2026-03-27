// empty-search — placeholder shown when a search returns no results
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type EmptySearchProps = {
  query: string
  suggestions?: string[]
  className?: string
}

export const EmptySearch = forwardRef<HTMLDivElement, EmptySearchProps>(
  function EmptySearch({ query, suggestions, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col items-center justify-center py-12 text-center select-none',
          className,
        )}
        data-component="empty-search"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-tertiary/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <h3 className="mt-3 text-sm font-medium text-fg">
          No results for &apos;{query}&apos;
        </h3>
        {suggestions !== undefined && suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <span
                key={suggestion}
                className="rounded-full bg-bg-tertiary/50 px-3 py-1 text-[11px] text-fg-muted"
              >
                {suggestion}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
)
