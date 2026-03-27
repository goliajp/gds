// combobox-list — dropdown option list for combobox (internal)
import { useCallback } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type ComboboxOption = {
  label: string
  value: string
}

type ComboboxListProps = {
  filtered: ComboboxOption[]
  glass?: boolean
  highlightedIndex: number
  onSearchChange: (value: string) => void
  onSelect: (value: string) => void
  query: string
  searchPlaceholder: string
  searchRef: React.RefObject<HTMLInputElement | null>
  setHighlightedIndex: (index: number) => void
  value: string | null
}

function ComboboxList({
  filtered,
  glass,
  highlightedIndex,
  onSearchChange,
  onSelect,
  query,
  searchPlaceholder,
  searchRef,
  setHighlightedIndex,
  value,
}: ComboboxListProps) {
  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex(
          highlightedIndex >= filtered.length - 1 ? 0 : highlightedIndex + 1,
        )
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex(
          highlightedIndex <= 0 ? filtered.length - 1 : highlightedIndex - 1,
        )
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const target = filtered[highlightedIndex]
        if (target !== undefined) {
          onSelect(target.value)
        }
      }
    },
    [filtered, highlightedIndex, onSelect, setHighlightedIndex],
  )

  return (
    <div
      className={cx(
        'absolute left-0 right-0 z-50 mt-1 animate-popup gds-radius-popover border gds-shadow-lg',
        glass
          ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
          : 'border-border bg-surface',
      )}
    >
      <div className="border-b border-border p-1.5">
        <input
          className="w-full bg-transparent px-2 py-1 text-sm text-fg outline-none placeholder:text-fg-muted/50"
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder={searchPlaceholder}
          ref={searchRef}
          type="text"
          value={query}
        />
      </div>
      <div className="max-h-60 overflow-y-auto py-1">
        {filtered.length === 0 && (
          <div className="gds-pad-x gds-pad-y-sm text-sm text-fg-muted">
            No results
          </div>
        )}
        {filtered.map((opt, index) => {
          const isActive = opt.value === value
          const isHighlighted = index === highlightedIndex
          return (
            <button
              className={cx(
                'flex w-full items-center gds-pad-x gds-pad-y-sm text-left text-sm transition-colors',
                isActive && 'bg-accent/10 text-accent',
                !isActive && 'text-fg',
                isHighlighted && !isActive && 'bg-bg-tertiary',
                !isHighlighted && !isActive && 'hover:bg-bg-tertiary',
              )}
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
              type="button"
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { ComboboxList }
export type { ComboboxListProps, ComboboxOption }
