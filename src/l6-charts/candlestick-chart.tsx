import { forwardRef, useMemo } from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

type CandleData = {
  date: string
  open: number
  high: number
  low: number
  close: number
}

export type CandlestickChartProps = {
  data: CandleData[]
  height?: number
  upColor?: string
  downColor?: string
  glass?: boolean
  className?: string
}

export type PreparedCandle = {
  date: string
  bodyBottom: number
  bodyHeight: number
  fill: string
  high: number
  low: number
}

export type CandleShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: PreparedCandle
}

// exported for testing
export function CandleShape(shapeProps: CandleShapeProps) {
  const { x = 0, y = 0, width = 0, height: h = 0, payload } = shapeProps
  if (payload === undefined) return null
  if (h === 0 && payload.bodyHeight === 0) return null
  const centerX = x + width / 2
  // wick: from high to low in chart coordinates
  // y corresponds to bodyBottom + bodyHeight (top of body), we need to compute wick positions
  const bodyTop = y
  const bodyBottom = y + h
  return (
    <g>
      <line
        stroke={payload.fill}
        strokeWidth={1}
        x1={centerX}
        x2={centerX}
        y1={bodyTop - 2}
        y2={bodyBottom + 2}
      />
      <rect
        fill={payload.fill}
        height={Math.max(h, 1)}
        rx={1}
        width={Math.max(width - 2, 2)}
        x={x + 1}
        y={y}
      />
    </g>
  )
}

export const CandlestickChart = forwardRef<
  HTMLDivElement,
  CandlestickChartProps
>(function CandlestickChart(
  {
    data,
    height = 300,
    upColor = 'var(--gds-success, #22c55e)',
    downColor = 'var(--gds-danger, #ef4444)',
    glass,
    className,
    ...props
  },
  ref
) {
  const prepared = useMemo(
    () =>
      data.map((d) => ({
        date: d.date,
        bodyBottom: Math.min(d.open, d.close),
        bodyHeight: Math.abs(d.close - d.open),
        fill: d.close >= d.open ? upColor : downColor,
        high: d.high,
        low: d.low,
      })),
    [data, upColor, downColor]
  )

  const domain = useMemo(() => {
    const lows = data.map((d) => d.low)
    const highs = data.map((d) => d.high)
    return [Math.min(...lows), Math.max(...highs)]
  }, [data])

  return (
    <div
      className={cx(
        'gds-radius-popover w-full border border-[var(--gds-border,#e5e7eb)]',
        glass && 'bg-white/5 backdrop-blur-md',
        className
      )}
      data-component="candlestick-chart"
      ref={ref}
      {...props}
    >
      <ResponsiveContainer height={height} width="100%">
        <ComposedChart data={prepared}>
          <CartesianGrid
            stroke="var(--gds-border, #e5e7eb)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="date"
            stroke="var(--gds-fg-muted, #6b7280)"
            tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
          />
          <YAxis
            domain={domain}
            stroke="var(--gds-fg-muted, #6b7280)"
            tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
          />
          <Tooltip />
          <Bar dataKey="bodyHeight" shape={<CandleShape />} stackId="candle" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
})
