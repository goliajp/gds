// relative-time — live-updating relative time display
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

type RelativeTimeProps = React.HTMLAttributes<HTMLTimeElement> & {
  date: Date | number | string
  prefix?: string
}

function formatRelativeTime(date: Date | number | string): string {
  const d = date instanceof Date ? date : new Date(date)
  const now = Date.now()
  const diffMs = now - d.getTime()
  const seconds = Math.floor(diffMs / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function formatDateTime(date: Date): string {
  return date.toLocaleString()
}

export const RelativeTime = forwardRef<HTMLTimeElement, RelativeTimeProps>(
  function RelativeTime({ className, date, prefix, ...props }, ref) {
    const [text, setText] = useState(() => formatRelativeTime(date))
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
      setText(formatRelativeTime(date))
      intervalRef.current = setInterval(() => {
        setText(formatRelativeTime(date))
      }, 30_000)
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current)
        }
      }
    }, [date])

    const d = date instanceof Date ? date : new Date(date)
    const fullDateTime = formatDateTime(d)

    return (
      <time
        className={cx('text-fg-muted font-mono', className)}
        data-component="relative-time"
        dateTime={d.toISOString()}
        ref={ref}
        title={fullDateTime}
        {...props}
      >
        {prefix !== undefined ? `${prefix} ${text}` : text}
      </time>
    )
  }
)

export type { RelativeTimeProps }
