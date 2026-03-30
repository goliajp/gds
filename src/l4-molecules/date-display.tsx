// date-display — formatted date with relative time support
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

type DateDisplayProps = {
  date: string | Date
  format?: 'relative' | 'absolute' | 'auto'
  className?: string
}

function formatRelative(ms: number): string {
  const sec = Math.floor(ms / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hrs = Math.floor(min / 60)
  if (hrs < 24) return `${hrs}h ago`
  if (hrs < 48) return 'yesterday'
  return `${Math.floor(hrs / 24)} days ago`
}

function formatAbsolute(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

const DateDisplay = forwardRef<HTMLSpanElement, DateDisplayProps>(
  function DateDisplay({ date, format = 'auto', className }, ref) {
    const text = useMemo(() => {
      const d = date instanceof Date ? date : new Date(date)
      const elapsed = Date.now() - d.getTime()

      if (format === 'relative') return formatRelative(elapsed)
      if (format === 'absolute') return formatAbsolute(d)

      // auto: relative if < 7 days
      return elapsed < SEVEN_DAYS ? formatRelative(elapsed) : formatAbsolute(d)
    }, [date, format])

    const d = date instanceof Date ? date : new Date(date)

    return (
      <span
        ref={ref}
        className={cx('text-fg-muted gds-text', className)}
        data-component="date-display"
        title={d.toISOString()}
      >
        {text}
      </span>
    )
  }
)

export { DateDisplay }
export type { DateDisplayProps }
