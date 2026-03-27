// time-picker-grid — hour/minute scrollable columns dropdown (internal)
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type TimePickerGridProps = {
  glass?: boolean
  hours: number[]
  minutes: number[]
  onHourClick: (hour: number) => void
  onMinuteClick: (minute: number) => void
  selectedHour: number | null
  selectedMinute: number | null
}

function pad(n: number): string {
  if (n < 10) return `0${n}`
  return `${n}`
}

function TimePickerGrid({
  glass,
  hours,
  minutes,
  onHourClick,
  onMinuteClick,
  selectedHour,
  selectedMinute,
}: TimePickerGridProps) {
  return (
    <div
      className={cx(
        'absolute left-0 right-0 z-50 mt-1 flex animate-popup gds-radius-popover border gds-shadow-lg',
        glass
          ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
          : 'border-border bg-surface',
      )}
    >
      <div className="flex-1 overflow-y-auto border-r border-border" style={{ maxHeight: 200 }}>
        <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-fg-muted/50">
          Hour
        </div>
        {hours.map((h) => (
          <button
            className={cx(
              'flex w-full items-center justify-center py-1.5 text-sm transition-colors',
              h === selectedHour
                ? 'bg-accent/10 font-medium text-accent'
                : 'text-fg hover:bg-bg-tertiary',
            )}
            key={h}
            onClick={() => onHourClick(h)}
            type="button"
          >
            {pad(h)}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: 200 }}>
        <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-fg-muted/50">
          Min
        </div>
        {minutes.map((m) => (
          <button
            className={cx(
              'flex w-full items-center justify-center py-1.5 text-sm transition-colors',
              m === selectedMinute
                ? 'bg-accent/10 font-medium text-accent'
                : 'text-fg hover:bg-bg-tertiary',
            )}
            key={m}
            onClick={() => onMinuteClick(m)}
            type="button"
          >
            {pad(m)}
          </button>
        ))}
      </div>
    </div>
  )
}

export { pad, TimePickerGrid }
export type { TimePickerGridProps }
