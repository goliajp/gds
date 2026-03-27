// cron-schedule — human-readable display of a cron expression
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

type CronScheduleProps = React.HTMLAttributes<HTMLDivElement> & {
  expression: string
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function parseCron(expr: string): string {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) return `Cron: ${expr}`

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts

  const time = hour !== '*' && minute !== '*'
    ? `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
    : null

  if (dayOfWeek !== '*' && dayOfWeek !== '?') {
    const dayNum = parseInt(dayOfWeek, 10)
    const dayName = !isNaN(dayNum) ? DAYS[dayNum % 7] ?? dayOfWeek : dayOfWeek
    return time !== null ? `Every ${dayName} at ${time}` : `Every ${dayName}`
  }

  if (dayOfMonth !== '*' && dayOfMonth !== '?') {
    return time !== null ? `Day ${dayOfMonth} of every month at ${time}` : `Day ${dayOfMonth} of every month`
  }

  if (hour === '*' && minute === '*') return 'Every minute'
  if (hour === '*') return `Every hour at minute ${minute}`
  if (minute === '0' && hour === '0') return 'Every day at midnight'

  return time !== null ? `Every day at ${time}` : `Cron: ${expr}`
}

const CronSchedule = forwardRef<HTMLDivElement, CronScheduleProps>(
  function CronSchedule({ expression, className, ...props }, ref) {
    const description = useMemo(() => parseCron(expression), [expression])

    return (
      <div ref={ref} className={cx('flex items-center gap-3', className)} data-component="cron-schedule" {...props}>
        <code className="rounded bg-bg-secondary px-2 py-1 text-xs text-fg-muted font-mono">{expression}</code>
        <span className="gds-text-body text-fg">{description}</span>
      </div>
    )
  },
)

export { CronSchedule }
export type { CronScheduleProps }
