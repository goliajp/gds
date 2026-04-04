// donut-gauge — multi-ring concentric gauge for KPI comparison
import { cx } from '../utils/cx'

type DonutRing = {
  color?: string
  label: string
  max: number
  value: number
}

type DonutGaugeProps = {
  className?: string
  rings: DonutRing[]
  size?: number
}

const defaultColors = [
  'var(--gds-accent)',
  'var(--gds-success)',
  'var(--gds-warning)',
  'var(--gds-danger)',
]

export function DonutGauge({ className, rings, size = 160 }: DonutGaugeProps) {
  const center = size / 2
  const ringWidth = 12
  const ringGap = 6

  return (
    <div className={cx('select-none', className)} data-component="donut-gauge">
      <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        {rings.map((ring, i) => {
          const r = center - ringWidth / 2 - i * (ringWidth + ringGap)
          if (r <= 0) return null
          const circumference = 2 * Math.PI * r
          const ratio = ring.max > 0 ? Math.min(ring.value / ring.max, 1) : 0
          const dashLen = circumference * ratio
          const color = ring.color ?? defaultColors[i % defaultColors.length]
          return (
            <g key={i}>
              <circle
                className="text-fg-muted/10"
                cx={center}
                cy={center}
                fill="none"
                r={r}
                stroke="currentColor"
                strokeWidth={ringWidth}
              />
              <circle
                className="transition-all duration-500"
                cx={center}
                cy={center}
                fill="none"
                r={r}
                stroke={color}
                strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                strokeDashoffset={circumference / 4}
                strokeLinecap="round"
                strokeWidth={ringWidth}
              />
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-3">
        {rings.map((ring, i) => (
          <div
            className="text-fg-muted flex items-center gap-1.5 text-xs"
            key={i}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  ring.color ?? defaultColors[i % defaultColors.length],
              }}
            />
            <span>{ring.label}</span>
            <span className="text-fg font-medium tabular-nums">
              {ring.value}/{ring.max}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export type { DonutGaugeProps, DonutRing }
