// time-since — live relative time display that auto-updates
import { forwardRef, useEffect, useState } from 'react'

import { cx } from '../utils/cx'

type TimeSinceProps = {
  date: Date | string | number
  live?: boolean
  className?: string
}

function formatRelative(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

const TimeSince = forwardRef<HTMLSpanElement, TimeSinceProps>(
  function TimeSince({ date, live = true, className }, ref) {
    const timestamp = new Date(date).getTime()
    const [now, setNow] = useState(Date.now)

    useEffect(() => {
      if (live !== true) return
      const interval = setInterval(() => setNow(Date.now()), 60000)
      return () => clearInterval(interval)
    }, [live])

    const elapsed = Math.max(0, now - timestamp)

    return (
      <span ref={ref} className={cx('text-fg-muted gds-text-caption', className)} data-component="time-since">
        {formatRelative(elapsed)}
      </span>
    )
  },
)

export { TimeSince }
export type { TimeSinceProps }
