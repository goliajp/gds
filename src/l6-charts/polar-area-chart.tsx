// polar-area-chart — radial area chart with proportional sectors
import { useMemo } from 'react'

import { cx } from '../utils/cx'

type PolarData = { color?: string; label: string; value: number }
type PolarAreaChartProps = {
  className?: string
  data: PolarData[]
  size?: number
}

const PALETTE = [
  'var(--gds-palette-0)',
  'var(--gds-palette-1)',
  'var(--gds-palette-2)',
  'var(--gds-palette-3)',
  'var(--gds-palette-4)',
  'var(--gds-palette-5)',
  'var(--gds-palette-6)',
  'var(--gds-palette-7)',
]

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = {
    x: cx + radius * Math.cos(startAngle),
    y: cy + radius * Math.sin(startAngle),
  }
  const end = {
    x: cx + radius * Math.cos(endAngle),
    y: cy + radius * Math.sin(endAngle),
  }
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

export function PolarAreaChart({
  className,
  data,
  size = 300,
}: PolarAreaChartProps) {
  const center = size / 2
  const maxRadius = size * 0.4

  const segments = useMemo(() => {
    if (data.length === 0) return []
    const maxValue = Math.max(...data.map((d) => d.value))
    const angleStep = (2 * Math.PI) / data.length
    return data.map((d, i) => {
      const radius = maxValue > 0 ? (d.value / maxValue) * maxRadius : 0
      const startAngle = i * angleStep - Math.PI / 2
      const endAngle = (i + 1) * angleStep - Math.PI / 2
      const midAngle = (startAngle + endAngle) / 2
      const labelRadius = maxRadius + 16
      return {
        color: d.color ?? PALETTE[i % PALETTE.length],
        label: d.label,
        labelX: center + labelRadius * Math.cos(midAngle),
        labelY: center + labelRadius * Math.sin(midAngle),
        path: describeArc(center, center, radius, startAngle, endAngle),
      }
    })
  }, [data, center, maxRadius])

  return (
    <div
      className={cx('inline-block', className)}
      data-component="polar-area-chart"
    >
      <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        {segments.map((seg, i) => (
          <path
            d={seg.path}
            fill={seg.color}
            fillOpacity={0.7}
            key={i}
            stroke={seg.color}
            strokeWidth={1}
          />
        ))}
        {segments.map((seg, i) => (
          <text
            dominantBaseline="middle"
            fill="var(--gds-fg-muted)"
            fontSize={11}
            key={i}
            textAnchor="middle"
            x={seg.labelX}
            y={seg.labelY}
          >
            {seg.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

export type { PolarAreaChartProps, PolarData }
