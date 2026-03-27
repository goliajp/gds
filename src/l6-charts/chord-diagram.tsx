// chord-diagram — chord diagram showing relationships between entities
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { arcPath, chordPath, CHORD_PALETTE, computeArcs, computeChords, polarToCartesian } from './chord-math'

export type ChordDiagramProps = {
  matrix: number[][]
  labels: string[]
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

export const ChordDiagram = forwardRef<HTMLDivElement, ChordDiagramProps>(
  function ChordDiagram({ matrix, labels, width = 300, height = 300, glass, className }, ref) {
    const n = labels.length
    const centerX = width / 2
    const centerY = height / 2
    const outerR = Math.min(width, height) / 2 - 30
    const innerR = outerR - 12
    const gap = 0.04

    // compute totals per entity
    const totals = matrix.map((row) => row.reduce((sum, v) => sum + v, 0))
    const grandTotal = totals.reduce((sum, v) => sum + v, 0)

    if (grandTotal === 0 || n === 0) {
      return (
        <div
          ref={ref}
          className={cx(
            'gds-radius-popover border border-border',
            glass && 'backdrop-blur-md bg-white/5',
            className,
          )}
          data-component="chord-diagram"
        >
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} />
        </div>
      )
    }

    const arcs = computeArcs(totals, grandTotal, n, gap)
    const chords = computeChords(matrix, arcs, grandTotal, n, gap)

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border border-border',
          glass && 'backdrop-blur-md bg-white/5',
          className,
        )}
        data-component="chord-diagram"
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {arcs.map((arc, i) => (
            <path
              key={`arc-${labels[i]}`}
              d={arcPath(centerX, centerY, outerR, arc.start, arc.end)}
              data-arc={labels[i]}
              fill="none"
              stroke={CHORD_PALETTE[i % CHORD_PALETTE.length]}
              strokeWidth={12}
              strokeLinecap="round"
            />
          ))}

          {chords.map((chord, i) => (
            <path
              key={`chord-${i}`}
              d={chordPath(chord, centerX, centerY, innerR)}
              fill={CHORD_PALETTE[chord.source % CHORD_PALETTE.length]}
              fillOpacity={0.25}
              stroke={CHORD_PALETTE[chord.source % CHORD_PALETTE.length]}
              strokeOpacity={0.4}
              strokeWidth={0.5}
            />
          ))}

          {arcs.map((arc, i) => {
            const midAngle = (arc.start + arc.end) / 2
            const labelR = outerR + 16
            const pos = polarToCartesian(centerX, centerY, labelR, midAngle)
            const anchor = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? 'end' : 'start'

            return (
              <text
                key={`label-${labels[i]}`}
                x={pos.x}
                y={pos.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fill="var(--gds-fg-muted, #9ca3af)"
                fontSize={10}
              >
                {labels[i]}
              </text>
            )
          })}
        </svg>
      </div>
    )
  },
)
