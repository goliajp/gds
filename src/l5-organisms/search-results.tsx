// search-results — list of search results with query highlighting and category badges
import { forwardRef } from 'react'

import { Badge } from '../l2-primitives/badge'
import { Highlight } from '../l2-primitives/highlight'
import { cx } from '../utils/cx'

type SearchResult = {
  id: string
  title: string
  description?: string
  category?: string
  url?: string
}

type SearchResultsProps = {
  results: SearchResult[]
  query: string
  total?: number
  onSelect?: (id: string) => void
  className?: string
}

const SearchResults = forwardRef<HTMLDivElement, SearchResultsProps>(
  function SearchResults({ results, query, total, onSelect, className }, ref) {
    return (
      <div ref={ref} className={cx('flex flex-col', className)} data-component="search-results">
        {total !== undefined && (
          <div className="gds-pad-x py-2 text-xs text-fg-muted">
            {total} result{total !== 1 ? 's' : ''} found
          </div>
        )}
        {results.map((result) => (
          <div
            key={result.id}
            role={onSelect !== undefined ? 'button' : undefined}
            tabIndex={onSelect !== undefined ? 0 : undefined}
            onClick={onSelect !== undefined ? () => onSelect(result.id) : undefined}
            onKeyDown={onSelect !== undefined ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(result.id) }
            } : undefined}
            className={cx(
              'gds-pad-x gds-pad-y border-b border-border last:border-b-0',
              onSelect !== undefined && 'cursor-pointer hover:bg-bg-tertiary transition-colors',
            )}
          >
            <div className="flex items-center gap-2">
              <Highlight text={result.title} query={query} className="font-medium text-fg gds-text-body" />
              {result.category !== undefined && <Badge>{result.category}</Badge>}
            </div>
            {result.description !== undefined && (
              <Highlight text={result.description} query={query} className="mt-0.5 text-fg-muted gds-text-caption line-clamp-2" />
            )}
          </div>
        ))}
      </div>
    )
  },
)

export { SearchResults }
export type { SearchResult, SearchResultsProps }
