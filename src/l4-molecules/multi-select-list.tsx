// multi-select-list — dropdown option list for multi-select (internal)
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type MultiSelectOption = {
  label: string
  value: string
}

type MultiSelectListProps = {
  filtered: MultiSelectOption[]
  glass?: boolean
  onSearchChange: (value: string) => void
  onToggle: (value: string) => void
  searchQuery: string
  searchRef: React.RefObject<HTMLInputElement | null>
  value: string[]
}

function CheckIcon() {
  return (
    <svg
      className="text-accent h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 16 16"
    >
      <path d="M3.5 8l3 3 6-6" />
    </svg>
  )
}

function MultiSelectList({
  filtered,
  glass,
  onSearchChange,
  onToggle,
  searchQuery,
  searchRef,
  value,
}: MultiSelectListProps) {
  return (
    <div
      className={cx(
        'animate-popup gds-radius-popover gds-shadow-lg absolute right-0 left-0 z-50 mt-1 border',
        glass
          ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
          : 'border-border bg-surface'
      )}
    >
      <div className="border-border border-b p-1.5">
        <input
          className="text-fg placeholder:text-fg-muted/50 w-full bg-transparent px-2 py-1 text-sm outline-none"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          ref={searchRef}
          type="text"
          value={searchQuery}
        />
      </div>
      <div className="max-h-60 overflow-y-auto py-1">
        {filtered.length === 0 && (
          <div className="gds-pad-x gds-pad-y-sm text-fg-muted text-sm">
            No results
          </div>
        )}
        {filtered.map((opt) => {
          const isSelected = value.includes(opt.value)
          return (
            <button
              className={cx(
                'gds-pad-x gds-pad-y-sm flex w-full items-center gap-2 text-left text-sm transition-colors',
                isSelected && 'text-accent',
                !isSelected && 'text-fg hover:bg-bg-tertiary'
              )}
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              type="button"
            >
              <span
                className={cx(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                  isSelected ? 'border-accent bg-accent/10' : 'border-border'
                )}
              >
                {isSelected && <CheckIcon />}
              </span>
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { MultiSelectList }
export type { MultiSelectListProps }
