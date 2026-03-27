import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

import { arcPath, collectArcs } from './sunburst-math'

const PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #22d3ee)',
  'var(--gds-palette-2, #f59e0b)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #ef4444)',
  'var(--gds-palette-5, #8b5cf6)',
  'var(--gds-palette-6, #ec4899)',
  'var(--gds-palette-7, #14b8a6)',
  'var(--gds-palette-8, #f97316)',
  'var(--gds-palette-9, #3b82f6)',
]

export type SunburstNode = {
  name: string
  value?: number
  children?: SunburstNode[]
}

export type SunburstChartProps = {
  data: SunburstNode
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

export const SunburstChart = forwardRef<HTMLDivElement, SunburstChartProps>(
  function SunburstChart({ data, width = 300, height = 300, glass, className, ...props }, ref) {
    const cxVal = width / 2
    const cyVal = height / 2
    const maxRadius = Math.min(cxVal, cyVal) - 10
    const arcs = collectArcs(data, 0, -Math.PI / 2, 1.5 * Math.PI, 0)

    // find max depth for ring sizing
    const maxDepth = arcs.reduce((m, a) => Math.max(m, a.depth), 0)
    const centerR = maxRadius * 0.25
    const ringWidth = (maxRadius - centerR) / (maxDepth + 1)

    return (
      <div
        className={cx(
          'inline-flex gds-radius-popover border border-white/[0.06]',
          glassClass(glass),
          className,
        )}
        data-component="sunburst-chart"
        ref={ref}
        {...props}
      >
        <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          {arcs.map((arc, i) => {
            const innerR = centerR + arc.depth * ringWidth
            const outerR = innerR + ringWidth - 1
            const color = PALETTE[(arc.index + arc.depth) % PALETTE.length]
            return (
              <path
                key={i}
                d={arcPath(cxVal, cyVal, innerR, outerR, arc.startAngle, arc.endAngle)}
                fill={color}
                opacity={1 - arc.depth * 0.15}
                stroke="var(--gds-bg, #000)"
                strokeWidth={1}
                data-arc
              />
            )
          })}
          <text
            x={cxVal}
            y={cyVal}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--gds-fg, #fff)"
            fontSize={12}
            fontWeight={600}
            data-center-label
          >
            {data.name}
          </text>
        </svg>
      </div>
    )
  },
)
