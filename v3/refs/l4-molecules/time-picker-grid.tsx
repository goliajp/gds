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
        'animate-popup gds-radius-popover gds-shadow-lg absolute right-0 left-0 z-50 mt-1 flex border',
        glass
          ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
          : 'border-border bg-surface'
      )}
    >
      <div
        className="border-border flex-1 overflow-y-auto border-r"
        style={{ maxHeight: 200 }}
      >
        <div className="text-fg-muted/50 px-2 py-1 text-[10px] font-medium tracking-wider uppercase">
          Hour
        </div>
        {hours.map((h) => (
          <button
            className={cx(
              'flex w-full items-center justify-center py-1.5 text-sm transition-colors',
              h === selectedHour
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-fg hover:bg-bg-tertiary'
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
        <div className="text-fg-muted/50 px-2 py-1 text-[10px] font-medium tracking-wider uppercase">
          Min
        </div>
        {minutes.map((m) => (
          <button
            className={cx(
              'flex w-full items-center justify-center py-1.5 text-sm transition-colors',
              m === selectedMinute
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-fg hover:bg-bg-tertiary'
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
