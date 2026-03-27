// violin-plot — distribution shape visualization using pure SVG
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #8b5cf6)',
  'var(--gds-palette-2, #06b6d4)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #f59e0b)',
]

export type ViolinPlotProps = {
  data: { label: string; values: number[] }[]
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

function computeDensity(values: number[], bins: number, min: number, max: number): number[] {
  const range = max - min
  if (range === 0) return Array(bins).fill(1 / bins) as number[]

  const density = Array(bins).fill(0) as number[]
  const binWidth = range / bins

  for (const v of values) {
    const idx = Math.min(Math.floor((v - min) / binWidth), bins - 1)
    density[idx]++
  }

  const maxDensity = Math.max(...density)
  if (maxDensity === 0) return density
  return density.map((d) => d / maxDensity)
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 !== 0) return sorted[mid]
  return (sorted[mid - 1] + sorted[mid]) / 2
}

export const ViolinPlot = forwardRef<HTMLDivElement, ViolinPlotProps>(
  function ViolinPlot({ data, width = 400, height = 300, glass, className }, ref) {
    const padding = { top: 20, right: 20, bottom: 40, left: 50 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom
    const bins = 20

    const allValues = data.flatMap((g) => g.values)
    const globalMin = allValues.length > 0 ? Math.min(...allValues) : 0
    const globalMax = allValues.length > 0 ? Math.max(...allValues) : 1
    const range = globalMax - globalMin
    const yMin = globalMin - range * 0.1
    const yMax = globalMax + range * 0.1
    const yScale = (v: number) => padding.top + chartH * (1 - (v - yMin) / (yMax - yMin))

    const groupW = data.length > 0 ? chartW / data.length : chartW
    const violinMaxW = Math.min(groupW * 0.7, 80) / 2

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border border-border',
          glass && 'backdrop-blur-md bg-white/5',
          className,
        )}
        data-component="violin-plot"
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
            const centerX = padding.left + groupW * (i + 0.5)
            const color = PALETTE[i % PALETTE.length]
            const density = computeDensity(group.values, bins, globalMin, globalMax)
            const binHeight = (yMax - yMin) / bins
            const med = median(group.values)

            // build violin path (right side then left side mirrored)
            const rightPoints = density.map((d, bi) => {
              const y = yScale(yMin + binHeight * (bi + 0.5))
              const x = centerX + d * violinMaxW
              return `${x},${y}`
            })
            const leftPoints = [...density].reverse().map((d, bi) => {
              const y = yScale(yMin + binHeight * (bins - 1 - bi + 0.5))
              const x = centerX - d * violinMaxW
              return `${x},${y}`
            })

            const pathD = `M ${rightPoints[0]} ${rightPoints.map((p) => `L ${p}`).join(' ')} ${leftPoints.map((p) => `L ${p}`).join(' ')} Z`

            return (
              <g key={group.label} data-violin={group.label}>
                <path
                  d={pathD}
                  fill={color}
                  fillOpacity={0.25}
                  stroke={color}
                  strokeWidth={1.5}
                />
                {/* median dot */}
                <circle
                  cx={centerX}
                  cy={yScale(med)}
                  r={3}
                  fill={color}
                />
                {/* label */}
                <text
                  x={centerX}
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
