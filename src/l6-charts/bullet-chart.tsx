// bullet-chart — performance comparison (actual vs target with range bands)
import { useMemo } from 'react'

import { cx } from '../utils/cx'

type BulletChartProps = {
  actual: number
  className?: string
  label?: string
  max: number
  ranges?: [number, number, number]
  target: number
}

const WIDTH = 400
const BAR_HEIGHT = 28
const TOTAL_HEIGHT = 50

export function BulletChart({
  actual,
  className,
  label,
  max,
  ranges,
  target,
}: BulletChartProps) {
  const computed = useMemo(() => {
    const thresholds = ranges ?? [max * 0.33, max * 0.66, max]
    const scale = (v: number) => (v / max) * WIDTH
    return {
      actualWidth: scale(Math.min(actual, max)),
      rangeWidths: thresholds.map((t) => scale(Math.min(t, max))),
      targetX: scale(Math.min(target, max)),
    }
  }, [actual, max, target, ranges])

  const barY = (TOTAL_HEIGHT - BAR_HEIGHT) / 2

  return (
    <div className={cx('select-none', className)} data-component="bullet-chart">
      {label !== undefined && (
        <div className="mb-1 text-xs font-medium text-fg-muted">{label}</div>
      )}
      <svg height={TOTAL_HEIGHT} viewBox={`0 0 ${WIDTH} ${TOTAL_HEIGHT}`} width="100%">
        {computed.rangeWidths.map((w, i) => (
          <rect
            fill={`var(--gds-palette-${7 - i})`}
            height={BAR_HEIGHT}
            key={i}
            opacity={0.15 + i * 0.08}
            rx={4}
            width={w}
            x={0}
            y={barY}
          />
        ))}
        <rect
          fill="var(--gds-accent)"
          height={BAR_HEIGHT * 0.5}
          rx={3}
          width={computed.actualWidth}
          x={0}
          y={barY + BAR_HEIGHT * 0.25}
        />
        <line
          stroke="var(--gds-fg)"
          strokeWidth={2.5}
          x1={computed.targetX}
          x2={computed.targetX}
          y1={barY - 2}
          y2={barY + BAR_HEIGHT + 2}
        />
      </svg>
    </div>
  )
}

export type { BulletChartProps }
