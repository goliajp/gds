import { forwardRef } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

const PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #8b5cf6)',
  'var(--gds-palette-2, #06b6d4)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #f59e0b)',
  'var(--gds-palette-5, #ef4444)',
  'var(--gds-palette-6, #ec4899)',
  'var(--gds-palette-7, #14b8a6)',
  'var(--gds-palette-8, #f97316)',
  'var(--gds-palette-9, #a855f7)',
]

export type BumpChartProps = {
  data: Record<string, unknown>[]
  series: string[]
  xKey?: string
  height?: number
  glass?: boolean
  className?: string
}

export const BumpChart = forwardRef<HTMLDivElement, BumpChartProps>(
  function BumpChart(
    { data, series, xKey = 'name', height = 300, glass, className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border w-full border',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="bump-chart"
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="var(--gds-border, #e5e7eb)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey={xKey}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <YAxis
              reversed
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <Tooltip contentStyle={{ background: 'var(--gds-bg-secondary, #1f2937)', border: '1px solid var(--gds-border, #374151)', borderRadius: 6, color: 'var(--gds-fg, #f9fafb)' }} labelStyle={{ color: 'var(--gds-fg-muted, #9ca3af)' }} />
            {series.map((key, i) => (
              <Line
                key={key}
                dataKey={key}
                dot={{ r: 4, fill: PALETTE[i % PALETTE.length] }}
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={2}
                type="monotone"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
