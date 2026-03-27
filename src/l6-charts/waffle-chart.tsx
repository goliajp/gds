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
  'var(--gds-palette-6, #ec4899)',
  'var(--gds-palette-7, #14b8a6)',
  'var(--gds-palette-8, #f97316)',
  'var(--gds-palette-9, #3b82f6)',
]

type WaffleSegment = {
  label: string
  value: number
  color?: string
}

export type WaffleChartProps = {
  data: WaffleSegment[]
  size?: number
  glass?: boolean
  className?: string
}

export const WaffleChart = forwardRef<HTMLDivElement, WaffleChartProps>(
  function WaffleChart({ data, size = 200, glass, className, ...props }, ref) {
    // build cell color map (100 cells)
    const cells: string[] = []
    let cellIndex = 0
    for (let i = 0; i < data.length; i++) {
      const segment = data[i]
      const count = Math.round(segment.value)
      const color = segment.color ?? PALETTE[i % PALETTE.length]
      for (let j = 0; j < count && cellIndex < 100; j++) {
        cells[cellIndex] = color
        cellIndex++
      }
    }
    // fill remaining cells with transparent
    while (cellIndex < 100) {
      cells[cellIndex] = 'transparent'
      cellIndex++
    }

    const cellSize = size / 10
    const gap = Math.max(1, cellSize * 0.1)

    return (
      <div
        className={cx('inline-flex flex-col gds-radius-popover border border-white/[0.06]', glassClass(glass), className)}
        data-component="waffle-chart"
        ref={ref}
        {...props}
      >
        <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          {cells.map((color, i) => {
            const row = Math.floor(i / 10)
            const col = i % 10
            return (
              <rect
                key={i}
                x={col * cellSize + gap}
                y={row * cellSize + gap}
                width={cellSize - gap * 2}
                height={cellSize - gap * 2}
                rx={2}
                fill={color}
                data-cell={i}
              />
            )
          })}
        </svg>
        <div className="flex flex-wrap gap-3 px-2 pb-2 pt-1">
          {data.map((segment, i) => (
            <div key={segment.label} className="flex items-center gap-1.5 text-[10px] text-fg-muted">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: segment.color ?? PALETTE[i % PALETTE.length] }}
              />
              <span>{segment.label}</span>
              <span className="text-fg-muted/50">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
)
