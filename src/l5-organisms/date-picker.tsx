// date-picker — input with calendar dropdown
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useClickOutside, useEscapeKey } from '../utils/hooks'
import { Calendar } from './calendar'

export type DatePickerProps = {
  value?: Date
  onChange?: (date: Date) => void
  placeholder?: string
  min?: Date
  max?: Date
  glass?: boolean
  className?: string
}

function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker({ value, onChange, placeholder = 'Select date', min, max, glass, className }, ref) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const close = useCallback(() => setOpen(false), [])
    useClickOutside(containerRef, open, close)
    useEscapeKey(open, close)

    const handleSelect = (date: Date) => {
      if (onChange !== undefined) onChange(date)
      setOpen(false)
    }

    return (
      <div
        ref={ref}
        className={cx('relative inline-block', className)}
        data-component="date-picker"
        data-state={open ? 'open' : 'closed'}
      >
        <div ref={containerRef}>
          <button
            type="button"
            className={cx(
              'flex gds-h-lg items-center gds-gap-sm gds-radius-button border gds-pad-x text-sm transition-colors',
              focusCls,
              glass === true
                ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
                : 'border-border bg-surface',
              value !== undefined ? 'text-fg' : 'text-fg-muted',
            )}
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg className="h-4 w-4 text-fg-muted" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="11" rx="1.5" />
              <path d="M2 6.5H14M5 1.5V4M11 1.5V4" />
            </svg>
            {value !== undefined ? formatDate(value) : placeholder}
          </button>

          {open && (
            <div className="absolute left-0 top-full z-50 mt-1 animate-popup">
              <Calendar
                value={value}
                onChange={handleSelect}
                min={min}
                max={max}
              />
            </div>
          )}
        </div>
      </div>
    )
  },
)
