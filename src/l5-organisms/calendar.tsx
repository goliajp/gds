// calendar — month grid with day selection, min/max constraints
import { forwardRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { getCalendarGrid, isDisabled, isSameDay, MONTHS, WEEKDAYS } from './calendar-utils'

export type CalendarProps = {
  value?: Date
  onChange?: (date: Date) => void
  min?: Date
  max?: Date
  className?: string
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar({ value, onChange, min, max, className }, ref) {
    const today = new Date()
    const initial = value ?? today
    const [viewYear, setViewYear] = useState(initial.getFullYear())
    const [viewMonth, setViewMonth] = useState(initial.getMonth())

    const grid = getCalendarGrid(viewYear, viewMonth)

    const prevMonth = () => {
      if (viewMonth === 0) {
        setViewYear((y) => y - 1)
        setViewMonth(11)
      } else {
        setViewMonth((m) => m - 1)
      }
    }

    const nextMonth = () => {
      if (viewMonth === 11) {
        setViewYear((y) => y + 1)
        setViewMonth(0)
      } else {
        setViewMonth((m) => m + 1)
      }
    }

    return (
      <div
        ref={ref}
        className={cx('w-64 gds-radius-popover border border-border bg-surface gds-pad-x gds-pad-y select-none', className)}
        data-component="calendar"
      >
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            className={cx('rounded p-1 text-fg-muted hover:bg-bg-secondary hover:text-fg', focusCls)}
            onClick={prevMonth}
            aria-label="Previous month"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 4L6 8L10 12" />
            </svg>
          </button>
          <span className="text-sm font-medium text-fg">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            className={cx('rounded p-1 text-fg-muted hover:bg-bg-secondary hover:text-fg', focusCls)}
            onClick={nextMonth}
            aria-label="Next month"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4L10 8L6 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gds-gap-xs text-center gds-text-body text-fg-muted">
          {WEEKDAYS.map((d) => (
            <div key={d} className="gds-pad-y-sm font-medium">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gds-gap-xs text-center gds-text-body">
          {grid.map((day, i) => {
            if (day === null) {
              return <div key={`e-${i}`} className="gds-pad-y-sm" />
            }
            const disabled = isDisabled(day, min, max)
            const selected = value !== undefined && isSameDay(day, value)
            const isToday = isSameDay(day, today)
            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={disabled}
                className={cx(
                  'gds-radius-badge gds-pad-y-sm transition-colors',
                  focusCls,
                  disabled && 'cursor-not-allowed opacity-30',
                  !disabled && !selected && 'hover:bg-bg-secondary',
                  selected && 'bg-accent text-accent-fg',
                  !selected && isToday && 'ring-1 ring-accent',
                  !disabled && 'text-fg',
                )}
                onClick={() => {
                  if (!disabled && onChange !== undefined) onChange(day)
                }}
              >
                {day.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  },
)
