// stacked-progress — multi-segment horizontal progress bar with optional labels
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type StackedSegment = {
  label: string
  value: number
  color?: string
}

export type StackedProgressProps = {
  segments: StackedSegment[]
  showLabels?: boolean
  className?: string
}

const defaultColors = [
  'var(--color-accent)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-danger)',
  'var(--color-fg-muted)',
]

export const StackedProgress = forwardRef<HTMLDivElement, StackedProgressProps>(
  function StackedProgress({ segments, showLabels = true, className }, ref) {
    const total = segments.reduce((sum, s) => sum + s.value, 0)

    return (
      <div ref={ref} className={cx('select-none', className)} data-component="stacked-progress">
        <div className="flex h-3 overflow-hidden rounded-full bg-fg-muted/10">
          {segments.map((seg, i) => {
            const pct = total > 0 ? (seg.value / total) * 100 : 0
            if (pct <= 0) return null
            const color = seg.color ?? defaultColors[i % defaultColors.length]

            return (
              <div
                key={i}
                className="transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            )
          })}
        </div>
        {showLabels && (
          <div className="mt-2 flex flex-wrap gap-3">
            {segments.map((seg, i) => {
              const pct = total > 0 ? (seg.value / total) * 100 : 0
              const color = seg.color ?? defaultColors[i % defaultColors.length]

              return (
                <div key={i} className="flex items-center gap-1.5 gds-text-body text-fg-muted">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{seg.label}</span>
                  <span className="font-medium text-fg">{pct.toFixed(1)}%</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  },
)
