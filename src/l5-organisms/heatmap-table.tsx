import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type HeatmapRow = {
  label: string
  values: number[]
}

type HeatmapTableProps = React.HTMLAttributes<HTMLTableElement> & {
  headers: string[]
  maxValue?: number
  rows: HeatmapRow[]
}

export const HeatmapTable = forwardRef<HTMLTableElement, HeatmapTableProps>(
  function HeatmapTable({ className, headers, maxValue, rows, ...props }, ref) {
    const resolvedMax = maxValue ?? Math.max(1, ...rows.flatMap((r) => r.values))

    return (
      <table
        className={cx('w-full border-collapse text-xs', className)}
        data-component="heatmap-table"
        ref={ref}
        {...props}
      >
        <thead>
          <tr>
            <th className="p-1.5 text-left font-medium text-fg-muted" />
            {headers.map((h) => (
              <th className="p-1.5 text-center font-medium text-fg-muted" key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="p-1.5 font-medium text-fg">{row.label}</td>
              {row.values.map((val, i) => {
                const intensity = Math.min(val / resolvedMax, 1)
                return (
                  <td
                    className="p-1.5 text-center tabular-nums text-fg"
                    key={i}
                    style={{ backgroundColor: `color-mix(in srgb, var(--color-accent) ${Math.round(intensity * 20)}%, transparent)` }}
                  >
                    {val}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
)

export type { HeatmapRow, HeatmapTableProps }
