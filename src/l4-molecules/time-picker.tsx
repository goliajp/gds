// time-picker — hour:minute selector with scrollable columns
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

import { pad, TimePickerGrid } from './time-picker-grid'

type TimePickerProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  glass?: boolean
  minuteStep?: number
  onChange: (value: string | null) => void
  placeholder?: string
  value: string | null
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cx('h-3 w-3 text-fg-muted transition-transform', open && 'rotate-180')}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 12 12"
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  )
}

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  function TimePicker(
    {
      className,
      disabled = false,
      error = false,
      glass,
      minuteStep = 15,
      onChange,
      placeholder = 'Select time',
      value,
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const mergedRef = (ref ?? containerRef) as React.RefObject<HTMLDivElement>

    const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), [])
    const minutes = useMemo(() => {
      const step = Math.max(1, Math.min(60, minuteStep))
      const result: number[] = []
      let m = 0
      while (m < 60) {
        result.push(m)
        m += step
      }
      return result
    }, [minuteStep])

    const selectedHour = useMemo(() => {
      if (value === null) return null
      const parts = value.split(':')
      return parseInt(parts[0], 10)
    }, [value])

    const selectedMinute = useMemo(() => {
      if (value === null) return null
      const parts = value.split(':')
      return parseInt(parts[1], 10)
    }, [value])

    const handleOpen = useCallback(() => {
      if (disabled) return
      setOpen(true)
    }, [disabled])

    const handleClose = useCallback(() => {
      setOpen(false)
    }, [])

    const handleHourClick = useCallback(
      (hour: number) => {
        const minute = selectedMinute ?? 0
        onChange(`${pad(hour)}:${pad(minute)}`)
      },
      [selectedMinute, onChange],
    )

    const handleMinuteClick = useCallback(
      (minute: number) => {
        const hour = selectedHour ?? 0
        onChange(`${pad(hour)}:${pad(minute)}`)
      },
      [selectedHour, onChange],
    )

    useClickOutside(mergedRef, open, handleClose)
    useEscapeKey(open, handleClose)

    return (
      <div
        ref={mergedRef}
        className={cx('relative', className)}
        data-component="time-picker"
        data-state={open ? 'open' : 'closed'}
      >
        <button
          className={cx(
            'flex w-full items-center justify-between gds-h gds-radius-popover gds-pad-x border bg-transparent text-left text-sm text-fg transition-colors',
            focusCls,
            !error && 'border-border hover:border-fg-muted',
            error && 'border-danger',
            error && 'focus-visible:ring-danger',
            disabled && 'cursor-not-allowed opacity-50',
            glassClass(glass),
            glass === true && 'border-white/10 bg-bg/60',
          )}
          disabled={disabled}
          onClick={handleOpen}
          type="button"
        >
          <span className={cx(value !== null ? 'text-fg' : 'text-fg-muted')}>
            {value ?? placeholder}
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <TimePickerGrid
            glass={glass}
            hours={hours}
            minutes={minutes}
            onHourClick={handleHourClick}
            onMinuteClick={handleMinuteClick}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
          />
        )}
      </div>
    )
  },
)

export type { TimePickerProps }
