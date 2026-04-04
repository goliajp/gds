import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

const PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #22d3ee)',
  'var(--gds-palette-2, #f59e0b)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #ef4444)',
  'var(--gds-palette-5, #8b5cf6)',
]

export type TimelineEvent = {
  date: string | Date
  label: string
  color?: string
}

export type TimelineChartProps = {
  events: TimelineEvent[]
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

export const TimelineChart = forwardRef<HTMLDivElement, TimelineChartProps>(
  function TimelineChart(
    { events, width = 600, height = 120, glass, className, ...props },
    ref
  ) {
    if (events.length === 0) {
      return (
        <div
          className={cx(
            'gds-radius-popover inline-flex border border-white/[0.06]',
            glassClass(glass),
            className
          )}
          data-component="timeline-chart"
          ref={ref}
          {...props}
        >
          <svg height={height} width={width} />
        </div>
      )
    }

    const padX = 40
    const lineY = height / 2
    const timestamps = events.map((e) => new Date(e.date).getTime())
    const minT = Math.min(...timestamps)
    const maxT = Math.max(...timestamps)
    const range = maxT - minT

    function xPos(t: number): number {
      if (range === 0) return width / 2
      return padX + ((t - minT) / range) * (width - padX * 2)
    }

    return (
      <div
        className={cx(
          'gds-radius-popover inline-flex border border-white/[0.06]',
          glassClass(glass),
          className
        )}
        data-component="timeline-chart"
        ref={ref}
        {...props}
      >
        <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          {/* axis line */}
          <line
            x1={padX}
            y1={lineY}
            x2={width - padX}
            y2={lineY}
            stroke="var(--gds-border, #e5e7eb)"
            strokeWidth={2}
          />
          {events.map((event, i) => {
            const t = timestamps[i]
            const x = xPos(t)
            const above = i % 2 === 0
            const labelY = above ? lineY - 24 : lineY + 32
            const dotColor = event.color ?? PALETTE[i % PALETTE.length]
            const dateStr = new Date(event.date).toLocaleDateString()

            return (
              <g key={i} data-event>
                <circle cx={x} cy={lineY} r={5} fill={dotColor} />
                <line
                  x1={x}
                  y1={lineY + (above ? -6 : 6)}
                  x2={x}
                  y2={labelY + (above ? 10 : -10)}
                  stroke="var(--gds-border, #e5e7eb)"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={labelY}
                  textAnchor="middle"
                  fill="var(--gds-fg, #fff)"
                  fontSize={10}
                  fontWeight={500}
                  data-label={above ? 'above' : 'below'}
                >
                  {event.label}
                </text>
                <text
                  x={x}
                  y={labelY + (above ? -10 : 12)}
                  textAnchor="middle"
                  fill="var(--gds-fg-muted, #6b7280)"
                  fontSize={8}
                >
                  {dateStr}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
)
