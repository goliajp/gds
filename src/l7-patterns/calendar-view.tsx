import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type CalendarEvent = {
  color?: string
  date: number
  label: string
}

type CalendarViewProps = React.HTMLAttributes<HTMLDivElement> & {
  events?: CalendarEvent[]
  month: number
  onDateClick?: (date: number) => void
  year: number
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const CalendarView = forwardRef<HTMLDivElement, CalendarViewProps>(
  function CalendarView(
    { className, events = [], month, onDateClick, year, ...props },
    ref
  ) {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const cells: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)

    const eventsByDate = new Map<number, CalendarEvent[]>()
    for (const ev of events) {
      const existing = eventsByDate.get(ev.date) ?? []
      eventsByDate.set(ev.date, [...existing, ev])
    }

    return (
      <div
        className={cx('flex flex-col gap-1', className)}
        data-component="calendar-view"
        ref={ref}
        {...props}
      >
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <div
              className="text-fg-muted py-1 text-center text-xs font-medium"
              key={d}
            >
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const dayEvents = day !== null ? (eventsByDate.get(day) ?? []) : []
            return (
              <div
                className={cx(
                  'flex min-h-[36px] flex-col items-center rounded p-1 text-xs',
                  day !== null && 'text-fg hover:bg-accent/10 cursor-pointer',
                  day === null && 'pointer-events-none'
                )}
                key={i}
                onClick={() => {
                  if (day !== null && onDateClick !== undefined)
                    onDateClick(day)
                }}
              >
                {day !== null && <span>{day}</span>}
                {dayEvents.length > 0 && (
                  <div className="mt-0.5 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((ev, j) => (
                      <span
                        className="h-1 w-1 rounded-full"
                        key={j}
                        style={{
                          backgroundColor: ev.color ?? 'var(--color-accent)',
                        }}
                        title={ev.label}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

export type { CalendarEvent, CalendarViewProps }
