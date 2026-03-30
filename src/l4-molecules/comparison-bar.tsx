// comparison-bar — SVG horizontal stacked bar chart
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type Segment = {
  color: string
  label: string
  value: number
}

export type ComparisonBarProps = {
  className?: string
  height?: number
  segments: Segment[]
  showLabels?: boolean
}

export const ComparisonBar = forwardRef<HTMLDivElement, ComparisonBarProps>(
  function ComparisonBar(
    { className, height = 24, segments, showLabels },
    ref
  ) {
    const total = useMemo(
      () => segments.reduce((sum, s) => sum + s.value, 0),
      [segments]
    )

    if (total <= 0) return null

    let offset = 0

    return (
      <div
        ref={ref}
        className={cx('w-full', className)}
        data-component="comparison-bar"
      >
        <svg width="100%" height={height} className="overflow-visible rounded">
          {segments.map((seg) => {
            const widthPct = (seg.value / total) * 100
            const x = offset
            offset += widthPct
            return (
              <rect
                key={seg.label}
                x={`${x}%`}
                y={0}
                width={`${widthPct}%`}
                height={height}
                fill={seg.color}
                rx={0}
              />
            )
          })}
        </svg>
        {showLabels === true && (
          <div className="gds-gap-sm mt-2 flex flex-wrap">
            {segments.map((seg) => (
              <div
                key={seg.label}
                className="gds-gap-sm text-fg-muted flex items-center text-xs"
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: seg.color }}
                />
                <span>{seg.label}</span>
                <span className="text-fg font-medium">
                  {Math.round((seg.value / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
