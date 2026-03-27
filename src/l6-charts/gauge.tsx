import { forwardRef } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { cx } from '../utils/cx'

export type GaugeProps = {
  value: number
  max?: number
  className?: string
  height?: number
  color?: string
  trackColor?: string
  label?: string
  glass?: boolean
}

export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  function Gauge(
    {
      value,
      max = 100,
      className,
      height = 200,
      color = 'var(--gds-accent)',
      trackColor = 'var(--gds-border, #e5e7eb)',
      label,
      glass,
      ...props
    },
    ref,
  ) {
    const clamped = Math.min(Math.max(value, 0), max)
    const remaining = max - clamped
    const data = [
      { name: 'value', value: clamped },
      { name: 'remaining', value: remaining },
    ]

    return (
      <div
        className={cx('relative w-full', glass && 'gds-radius-popover backdrop-blur-md bg-white/5', className)}
        data-component="gauge"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="70%"
              data={data}
              dataKey="value"
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              startAngle={180}
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={trackColor} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '20%' }}>
          <span className="text-2xl font-semibold" style={{ color }}>
            {clamped}
          </span>
          {label !== undefined && <span className="gds-text-body text-[var(--gds-fg-muted,#6b7280)]">{label}</span>}
        </div>
      </div>
    )
  },
)
