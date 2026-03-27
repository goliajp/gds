// barcode — simple barcode display using SVG (code 128 style appearance)
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type BarcodeProps = {
  value: string
  width?: number
  height?: number
  showValue?: boolean
  color?: string
  className?: string
}

// generate bar pattern from character codes
function generateBars(value: string): number[] {
  const bars: number[] = []

  // start pattern — thick bars
  bars.push(3, 1, 1, 1, 3, 1)

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)
    // alternate thick/thin based on char code bits
    bars.push(
      (code & 1) !== 0 ? 2 : 1,
      (code & 2) !== 0 ? 2 : 1,
      (code & 4) !== 0 ? 2 : 1,
      (code & 8) !== 0 ? 2 : 1,
      (code & 16) !== 0 ? 2 : 1,
      1,
    )
  }

  // stop pattern — thick bars
  bars.push(3, 1, 1, 1, 3)

  return bars
}

export const Barcode = forwardRef<SVGSVGElement, BarcodeProps>(
  function Barcode(
    { value, width = 200, height = 60, showValue = true, color = 'currentColor', className },
    ref,
  ) {
    const bars = useMemo(() => generateBars(value), [value])

    const totalUnits = bars.reduce((sum, b) => sum + b, 0)
    const barHeight = showValue ? height - 16 : height
    const unitWidth = width / totalUnits

    let x = 0
    const rects: Array<{ x: number; w: number }> = []
    for (let i = 0; i < bars.length; i++) {
      const w = bars[i] * unitWidth
      // even indices are bars, odd are spaces
      if (i % 2 === 0) {
        rects.push({ x, w })
      }
      x += w
    }

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cx('shrink-0', className)}
        data-component="barcode"
        data-testid="barcode-svg"
        role="img"
        aria-label={`Barcode: ${value}`}
      >
        {rects.map((r, i) => (
          <rect key={i} x={r.x} y={0} width={r.w} height={barHeight} fill={color} />
        ))}
        {showValue && (
          <text
            x={width / 2}
            y={height - 2}
            textAnchor="middle"
            fontSize={11}
            fill={color}
            fontFamily="monospace"
            data-testid="barcode-text"
          >
            {value}
          </text>
        )}
      </svg>
    )
  },
)
