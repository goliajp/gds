import { forwardRef } from 'react'
import {
  Cell,
  Funnel,
  FunnelChart as RFunnelChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { cx } from '../utils/cx'

type ChartData = Record<string, unknown>

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

export type FunnelChartProps = {
  data: ChartData[]
  dataKey: string
  className?: string
  height?: number
  colors?: string[]
  glass?: boolean
}

export const FunnelChart = forwardRef<HTMLDivElement, FunnelChartProps>(
  function FunnelChart(
    {
      data,
      dataKey,
      className,
      height = 300,
      colors = PALETTE,
      glass,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'w-full',
          glass && 'gds-radius-popover bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="funnel-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RFunnelChart>
            <Tooltip />
            <Funnel dataKey={dataKey} data={data} isAnimationActive={false}>
              {data.map((_, i) => (
                <Cell fill={colors[i % colors.length]} key={i} />
              ))}
            </Funnel>
          </RFunnelChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
