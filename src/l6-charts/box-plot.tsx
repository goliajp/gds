// box-plot — box and whisker plot using pure SVG
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { computeStats } from './box-plot-stats'

type BoxPlotGroup = {
  label: string
  values: number[]
}

export type BoxPlotProps = {
  data: BoxPlotGroup[]
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

const PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #8b5cf6)',
  'var(--gds-palette-2, #06b6d4)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #f59e0b)',
]

export const BoxPlot = forwardRef<HTMLDivElement, BoxPlotProps>(
  function BoxPlot({ data, width = 400, height = 300, glass, className }, ref) {
    const padding = { top: 20, right: 20, bottom: 40, left: 50 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    const allValues = data.flatMap((g) => g.values)
    const globalMin = allValues.length > 0 ? Math.min(...allValues) : 0
    const globalMax = allValues.length > 0 ? Math.max(...allValues) : 1
    const range = globalMax - globalMin
    const yMin = globalMin - range * 0.1
    const yMax = globalMax + range * 0.1
    const yScale = (v: number) => padding.top + chartH * (1 - (v - yMin) / (yMax - yMin))

    const groupW = data.length > 0 ? chartW / data.length : chartW
    const boxW = Math.min(groupW * 0.6, 60)

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border border-border',
          glass && 'backdrop-blur-md bg-white/5',
          className,
        )}
        data-component="box-plot"
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* y-axis */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartH}
            stroke="var(--gds-border, #374151)"
            strokeWidth={1}
          />
          {/* x-axis */}
          <line
            x1={padding.left}
            y1={padding.top + chartH}
            x2={padding.left + chartW}
            y2={padding.top + chartH}
            stroke="var(--gds-border, #374151)"
            strokeWidth={1}
          />

          {data.map((group, i) => {
            if (group.values.length === 0) return null
            const stats = computeStats(group.values)
            const cx = padding.left + groupW * (i + 0.5)
            const color = PALETTE[i % PALETTE.length]

            return (
              <g key={group.label} data-box={group.label}>
                {/* whisker line */}
                <line
                  x1={cx}
                  y1={yScale(stats.whiskerMax)}
                  x2={cx}
                  y2={yScale(stats.whiskerMin)}
                  stroke={color}
                  strokeWidth={1.5}
                />
                {/* whisker caps */}
                <line x1={cx - boxW * 0.3} y1={yScale(stats.whiskerMin)} x2={cx + boxW * 0.3} y2={yScale(stats.whiskerMin)} stroke={color} strokeWidth={1.5} />
                <line x1={cx - boxW * 0.3} y1={yScale(stats.whiskerMax)} x2={cx + boxW * 0.3} y2={yScale(stats.whiskerMax)} stroke={color} strokeWidth={1.5} />
                {/* box */}
                <rect
                  x={cx - boxW / 2}
                  y={yScale(stats.q3)}
                  width={boxW}
                  height={yScale(stats.q1) - yScale(stats.q3)}
                  fill={color}
                  fillOpacity={0.2}
                  stroke={color}
                  strokeWidth={1.5}
                />
                {/* median line */}
                <line
                  x1={cx - boxW / 2}
                  y1={yScale(stats.median)}
                  x2={cx + boxW / 2}
                  y2={yScale(stats.median)}
                  stroke={color}
                  strokeWidth={2}
                />
                {/* label */}
                <text
                  x={cx}
                  y={padding.top + chartH + 20}
                  textAnchor="middle"
                  fill="var(--gds-fg-muted, #9ca3af)"
                  fontSize={10}
                >
                  {group.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  },
)

export { computeStats } from './box-plot-stats'
export type { BoxPlotGroup }
