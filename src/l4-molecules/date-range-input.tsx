import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type DateRangeInputProps = {
  className?: string
  disabled?: boolean
  endDate: string | null
  error?: boolean
  onChange: (start: string | null, end: string | null) => void
  placeholder?: { end?: string; start?: string }
  startDate: string | null
}

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  function DateRangeInput(
    { className, disabled = false, endDate, error = false, onChange, placeholder, startDate },
    ref,
  ) {
    const borderCls = error ? 'border-danger' : 'border-border hover:border-border-strong'

    return (
      <div
        className={cx(
          'flex items-center gds-radius-input border bg-bg transition-colors',
          borderCls,
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        data-component="date-range-input"
        data-error={error ? '' : undefined}
        ref={ref}
      >
        <input
          aria-label={placeholder?.start ?? 'Start date'}
          className="gds-h flex-1 bg-transparent gds-text-body text-fg outline-none gds-pad-x disabled:cursor-not-allowed"
          disabled={disabled}
          onChange={(e) => {
            const val = e.target.value === '' ? null : e.target.value
            onChange(val, endDate)
          }}
          placeholder={placeholder?.start}
          type="date"
          value={startDate ?? ''}
        />
        <span className="shrink-0 text-fg-muted/40 select-none gds-text-label">&rarr;</span>
        <input
          aria-label={placeholder?.end ?? 'End date'}
          className="gds-h flex-1 border-l border-inherit bg-transparent gds-text-body text-fg outline-none gds-pad-x disabled:cursor-not-allowed"
          disabled={disabled}
          min={startDate ?? undefined}
          onChange={(e) => {
            const val = e.target.value === '' ? null : e.target.value
            onChange(startDate, val)
          }}
          placeholder={placeholder?.end}
          type="date"
          value={endDate ?? ''}
        />
      </div>
    )
  },
)

export type { DateRangeInputProps }
