import { forwardRef } from 'react'
import {
  Legend,
  RadialBar,
  RadialBarChart as RRadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

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

type RadialBarDatum = {
  name: string
  value: number
  fill?: string
}

export type RadialBarChartProps = {
  data: RadialBarDatum[]
  height?: number
  innerRadius?: string
  glass?: boolean
  className?: string
}

export const RadialBarChart = forwardRef<HTMLDivElement, RadialBarChartProps>(
  function RadialBarChart(
    { data, height = 300, innerRadius = '20%', glass, className, ...props },
    ref
  ) {
    // assign palette colors to items without explicit fill
    const coloredData = data.map((d, i) => ({
      ...d,
      fill: d.fill ?? PALETTE[i % PALETTE.length],
    }))

    return (
      <div
        className={cx(
          'gds-radius-popover w-full border border-white/[0.06]',
          glassClass(glass),
          className
        )}
        data-component="radial-bar-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RRadialBarChart
            cx="50%"
            cy="50%"
            data={coloredData}
            innerRadius={innerRadius}
            outerRadius="90%"
          >
            <RadialBar
              dataKey="value"
              background={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Tooltip contentStyle={{ background: 'var(--gds-bg-secondary, #1f2937)', border: '1px solid var(--gds-border, #374151)', borderRadius: 6, color: 'var(--gds-fg, #f9fafb)' }} labelStyle={{ color: 'var(--gds-fg-muted, #9ca3af)' }} />
            <Legend iconSize={8} />
          </RRadialBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
