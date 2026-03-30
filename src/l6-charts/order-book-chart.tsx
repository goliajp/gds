import { forwardRef, useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

type OrderEntry = {
  price: number
  depth: number
}

export type OrderBookChartProps = {
  bids: OrderEntry[]
  asks: OrderEntry[]
  height?: number
  bidColor?: string
  askColor?: string
  glass?: boolean
  className?: string
}

export const OrderBookChart = forwardRef<HTMLDivElement, OrderBookChartProps>(
  function OrderBookChart(
    {
      bids,
      asks,
      height = 300,
      bidColor = 'var(--gds-success, #22c55e)',
      askColor = 'var(--gds-danger, #ef4444)',
      glass,
      className,
      ...props
    },
    ref
  ) {
    const combined = useMemo(() => {
      const bidPoints = bids.map((b) => ({
        price: b.price,
        bidDepth: b.depth,
        askDepth: undefined,
      }))
      const askPoints = asks.map((a) => ({
        price: a.price,
        bidDepth: undefined,
        askDepth: a.depth,
      }))
      return [...bidPoints, ...askPoints].sort((a, b) => a.price - b.price)
    }, [bids, asks])

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border w-full border',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="order-book-chart"
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <AreaChart data={combined}>
            <CartesianGrid
              stroke="var(--gds-border, #e5e7eb)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="price"
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
              type="number"
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <Tooltip />
            <Area
              dataKey="bidDepth"
              fill={bidColor}
              fillOpacity={0.3}
              stroke={bidColor}
              strokeWidth={2}
              type="stepAfter"
              connectNulls={false}
            />
            <Area
              dataKey="askDepth"
              fill={askColor}
              fillOpacity={0.3}
              stroke={askColor}
              strokeWidth={2}
              type="stepBefore"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
