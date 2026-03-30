// calendar-heatmap — GitHub-style contribution heatmap
import { forwardRef, useMemo, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { computeHeatmapGrid, DAY_LABELS } from './heatmap-utils'

type HeatmapDatum = { date: string; value: number }

export type CalendarHeatmapProps = {
  data: HeatmapDatum[]
  startDate?: string
  endDate?: string
  colorScale?: string[]
  cellSize?: number
  glass?: boolean
  className?: string
}

export const CalendarHeatmap = forwardRef<SVGSVGElement, CalendarHeatmapProps>(
  function CalendarHeatmap(
    {
      data,
      startDate,
      endDate,
      colorScale = [
        'var(--gds-bg-tertiary)',
        'var(--gds-accent-dim, rgba(99,179,163,0.3))',
        'var(--gds-accent-muted, rgba(99,179,163,0.55))',
        'var(--gds-accent-soft, rgba(99,179,163,0.75))',
        'var(--gds-accent)',
      ],
      cellSize = 12,
      glass,
      className,
    },
    ref
  ) {
    const [tooltip, setTooltip] = useState<{
      x: number
      y: number
      text: string
    } | null>(null)
    const gap = 2
    const step = cellSize + gap

    const { cells, monthLabels, weeks } = useMemo(
      () => computeHeatmapGrid(data, startDate, endDate, step),
      [data, startDate, endDate, step]
    )

    const labelWidth = 28
    const headerHeight = 14
    const svgWidth = labelWidth + weeks * step
    const svgHeight = headerHeight + 7 * step

    return (
      <div
        className={cx(
          'relative inline-block',
          glass === true &&
            cx(glassClass(glass), 'rounded-lg border border-white/10 p-3'),
          className
        )}
        data-component="calendar-heatmap"
      >
        <svg ref={ref} height={svgHeight} width={svgWidth}>
          {monthLabels.map((m) => (
            <text
              key={`${m.label}-${m.x}`}
              fill="var(--gds-fg-muted, #888)"
              fontSize={9}
              x={labelWidth + m.x}
              y={10}
            >
              {m.label}
            </text>
          ))}
          {DAY_LABELS.map((label, i) =>
            label !== '' ? (
              <text
                key={label}
                fill="var(--gds-fg-muted, #888)"
                fontSize={9}
                textAnchor="end"
                x={labelWidth - 4}
                y={headerHeight + i * step + cellSize - 2}
              >
                {label}
              </text>
            ) : null
          )}
          {cells.map((c) => (
            <rect
              key={c.date}
              fill={colorScale[c.level] ?? colorScale[colorScale.length - 1]}
              height={cellSize}
              rx={2}
              ry={2}
              width={cellSize}
              x={labelWidth + c.x}
              y={headerHeight + c.y}
              onMouseEnter={(e) => {
                const rect = (
                  e.target as SVGRectElement
                ).getBoundingClientRect()
                setTooltip({
                  x: rect.x,
                  y: rect.y,
                  text: `${c.date}: ${c.value}`,
                })
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </svg>
        {tooltip !== null && (
          <div
            className="bg-surface text-fg border-border pointer-events-none fixed z-50 rounded border px-2 py-1 text-[10px] shadow-md"
            style={{ left: tooltip.x, top: tooltip.y - 28 }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    )
  }
)
