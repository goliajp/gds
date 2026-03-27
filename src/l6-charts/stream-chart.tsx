// stream-chart — stacked area chart with organic curves
import { forwardRef } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

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

export type StreamChartProps = {
  data: Record<string, unknown>[]
  keys: string[]
  xKey?: string
  height?: number
  glass?: boolean
  className?: string
}

export const StreamChart = forwardRef<HTMLDivElement, StreamChartProps>(
  function StreamChart({ data, keys, xKey = 'name', height = 300, glass, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'w-full gds-radius-popover border border-border',
          glass && 'backdrop-blur-md bg-white/5',
          className,
        )}
        data-component="stream-chart"
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <AreaChart data={data}>
            <XAxis dataKey={xKey} stroke="var(--gds-fg-muted, #6b7280)" tick={{ fontSize: 11 }} />
            <Tooltip />
            {keys.map((key, i) => (
              <Area
                key={key}
                dataKey={key}
                fill={PALETTE[i % PALETTE.length]}
                fillOpacity={0.6}
                stackId="1"
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={1.5}
                type="monotone"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  },
)
