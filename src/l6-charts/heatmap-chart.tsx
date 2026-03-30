import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type HeatmapChartProps = {
  data: number[][]
  xLabels?: string[]
  yLabels?: string[]
  colorScale?: { min: string; max: string }
  className?: string
  cellSize?: number
  glass?: boolean
}

function interpolateColor(min: string, max: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace('#', '')
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ]
  }
  const [r1, g1, b1] = parse(min)
  const [r2, g2, b2] = parse(max)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r},${g},${b})`
}

export const HeatmapChart = forwardRef<HTMLDivElement, HeatmapChartProps>(
  function HeatmapChart(
    {
      data,
      xLabels,
      yLabels,
      colorScale = { min: '#1e293b', max: '#6366f1' },
      className,
      cellSize = 32,
      glass,
      ...props
    },
    ref
  ) {
    const { dataMin, dataMax } = useMemo(() => {
      const flat = data.flat()
      return { dataMin: Math.min(...flat), dataMax: Math.max(...flat) }
    }, [data])

    const normalize = (v: number) => {
      if (dataMax === dataMin) return 0.5
      return (v - dataMin) / (dataMax - dataMin)
    }

    return (
      <div
        className={cx(
          'inline-block',
          glass && 'gds-radius-popover bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="heatmap-chart"
        ref={ref}
        {...props}
      >
        <div className="flex flex-col gap-px">
          {xLabels !== undefined && (
            <div
              className="flex gap-px"
              style={{ paddingLeft: yLabels !== undefined ? cellSize + 4 : 0 }}
            >
              {xLabels.map((l) => (
                <div
                  className="gds-text-caption flex items-center justify-center text-[var(--gds-fg-muted,#6b7280)]"
                  key={l}
                  style={{ width: cellSize, height: 16 }}
                >
                  {l}
                </div>
              ))}
            </div>
          )}
          {data.map((row, ri) => (
            <div className="flex items-center gap-px" key={ri}>
              {yLabels !== undefined && yLabels[ri] !== undefined && (
                <div
                  className="gds-text-caption flex-shrink-0 pr-1 text-right text-[var(--gds-fg-muted,#6b7280)]"
                  style={{ width: cellSize }}
                >
                  {yLabels[ri]}
                </div>
              )}
              {row.map((val, ci) => (
                <div
                  className="rounded-sm"
                  key={ci}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: interpolateColor(
                      colorScale.min,
                      colorScale.max,
                      normalize(val)
                    ),
                  }}
                  title={String(val)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
