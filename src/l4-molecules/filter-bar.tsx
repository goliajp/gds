import { forwardRef } from 'react'

import { Chip } from '../l3-atoms/chip'
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type FilterItem = { id: string; label: string; active: boolean }

type FilterBarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  filters: FilterItem[]
  onChange: (id: string, active: boolean) => void
  onClear?: () => void
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  function FilterBar({ className, filters, onChange, onClear, ...props }, ref) {
    const hasActive = filters.some((f) => f.active)

    return (
      <div
        className={cx('gds-gap flex flex-wrap items-center', className)}
        data-component="filter-bar"
        ref={ref}
        {...props}
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={cx('cursor-pointer', focusCls)}
            onClick={() => onChange(filter.id, !filter.active)}
            type="button"
          >
            <Chip
              label={filter.label}
              variant={filter.active ? 'accent' : 'default'}
            />
          </button>
        ))}
        {hasActive && onClear !== undefined && (
          <button
            className={cx(
              'gds-text-caption text-fg-muted hover:text-fg',
              focusCls
            )}
            onClick={onClear}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>
    )
  }
)

export type { FilterBarProps, FilterItem }
