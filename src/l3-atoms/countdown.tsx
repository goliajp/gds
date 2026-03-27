// countdown — countdown timer to a target date
import { forwardRef, useEffect, useState } from 'react'

import { cx } from '../utils/cx'

export type CountdownProps = {
  targetDate: Date | string | number
  onComplete?: () => void
  showDays?: boolean
  showSeconds?: boolean
  className?: string
}

type TimeRemaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

function calcRemaining(target: number): TimeRemaining {
  const total = Math.max(0, target - Date.now())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / 1000 / 60 / 60) % 24)
  const days = Math.floor(total / 1000 / 60 / 60 / 24)
  return { days, hours, minutes, seconds, total }
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

export const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  function Countdown(
    {
      targetDate,
      onComplete,
      showDays = true,
      showSeconds = true,
      className,
    },
    ref,
  ) {
    const target = new Date(targetDate).getTime()
    const [remaining, setRemaining] = useState<TimeRemaining>(() => calcRemaining(target))

    useEffect(() => {
      if (remaining.total <= 0) return

      const interval = setInterval(() => {
        const next = calcRemaining(target)
        setRemaining(next)
        if (next.total <= 0) {
          clearInterval(interval)
          if (onComplete !== undefined) onComplete()
        }
      }, 1000)

      return () => clearInterval(interval)
    }, [target, onComplete, remaining.total])

    const segments: Array<{ label: string; value: string }> = []

    if (showDays) {
      segments.push({ label: 'D', value: pad(remaining.days) })
    }
    segments.push({ label: 'H', value: pad(remaining.hours) })
    segments.push({ label: 'M', value: pad(remaining.minutes) })
    if (showSeconds) {
      segments.push({ label: 'S', value: pad(remaining.seconds) })
    }

    return (
      <div
        ref={ref}
        className={cx('inline-flex items-center gap-1', className)}
        data-component="countdown"
      >
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-fg-muted gds-text-body" data-testid="separator">:</span>
            )}
            <span
              className="inline-flex items-center justify-center rounded bg-bg-tertiary px-1.5 py-0.5 tabular-nums gds-radius-button gds-text-body text-fg"
              data-testid={`segment-${seg.label}`}
            >
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    )
  },
)
