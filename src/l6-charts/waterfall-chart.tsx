// waterfall-chart — cumulative bridge chart for financial analysis
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

type WaterfallItem = { label: string; value: number }

type WaterfallChartProps = {
  className?: string
  data: WaterfallItem[]
  height?: number
}

export const WaterfallChart = forwardRef<HTMLDivElement, WaterfallChartProps>(
  function WaterfallChart({ className, data, height = 300 }, ref) {
    const width = 500
    const padding = { bottom: 40, left: 12, right: 12, top: 20 }

    const computed = useMemo(() => {
      if (data.length === 0)
        return {
          bars: [] as {
            end: number
            label: string
            start: number
            type: 'negative' | 'positive' | 'total'
            value: number
          }[],
          maxY: 0,
          minY: 0,
        }

      const bars: {
        end: number
        label: string
        start: number
        type: 'negative' | 'positive' | 'total'
        value: number
      }[] = []
      let running = 0
      for (const item of data) {
        const start = running
        running = running + item.value
        bars.push({
          end: running,
          label: item.label,
          start,
          type: item.value >= 0 ? 'positive' : 'negative',
          value: item.value,
        })
      }
      bars.push({
        end: running,
        label: 'Total',
        start: 0,
        type: 'total',
        value: running,
      })

      const allValues = bars.flatMap((b) => [b.start, b.end])
      return {
        bars,
        maxY: Math.max(0, ...allValues),
        minY: Math.min(0, ...allValues),
      }
    }, [data])

    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom
    const yRange = computed.maxY - computed.minY || 1
    const barCount = computed.bars.length
    const barWidth = Math.min(40, (chartW / barCount) * 0.6)
    const gap = chartW / barCount

    const yToPixel = (v: number) =>
      padding.top + (1 - (v - computed.minY) / yRange) * chartH

    const fillColor = (type: 'negative' | 'positive' | 'total') => {
      if (type === 'positive') return 'var(--gds-success)'
      if (type === 'negative') return 'var(--gds-danger)'
      return 'var(--gds-accent)'
    }

    return (
      <div
        className={cx('inline-block', className)}
        data-component="waterfall-chart"
        ref={ref}
      >
        <svg height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
          {computed.bars.map((bar, i) => {
            const x = padding.left + i * gap + (gap - barWidth) / 2
            const top = yToPixel(Math.max(bar.start, bar.end))
            const bottom = yToPixel(Math.min(bar.start, bar.end))
            const barH = Math.max(1, bottom - top)
            return (
              <g key={i}>
                <rect
                  fill={fillColor(bar.type)}
                  fillOpacity={0.8}
                  height={barH}
                  rx={2}
                  width={barWidth}
                  x={x}
                  y={top}
                />
                {bar.type !== 'total' && i < computed.bars.length - 1 && (
                  <line
                    stroke="var(--gds-border)"
                    strokeDasharray="3,3"
                    strokeWidth={1}
                    x1={x + barWidth}
                    x2={padding.left + (i + 1) * gap + (gap - barWidth) / 2}
                    y1={yToPixel(bar.end)}
                    y2={yToPixel(bar.end)}
                  />
                )}
                <text
                  dominantBaseline="middle"
                  fill="var(--gds-fg)"
                  fontSize={10}
                  fontWeight="600"
                  textAnchor="middle"
                  x={x + barWidth / 2}
                  y={top - 8}
                >
                  {bar.value >= 0 ? `+${bar.value}` : bar.value}
                </text>
                <text
                  dominantBaseline="hanging"
                  fill="var(--gds-fg-muted)"
                  fontSize={10}
                  textAnchor="middle"
                  x={x + barWidth / 2}
                  y={height - padding.bottom + 8}
                >
                  {bar.label}
                </text>
              </g>
            )
          })}
          <line
            stroke="var(--gds-border)"
            strokeWidth={1}
            x1={padding.left}
            x2={width - padding.right}
            y1={yToPixel(0)}
            y2={yToPixel(0)}
          />
        </svg>
      </div>
    )
  }
)

export type { WaterfallChartProps, WaterfallItem }
