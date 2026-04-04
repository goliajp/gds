// qr-code — decorative data matrix visualization using SVG
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type QRCodeProps = {
  value: string
  size?: number
  color?: string
  bgColor?: string
  className?: string
}

// simple hash from string to seed deterministic pattern
function hashStr(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

// seeded pseudo-random
function seededRand(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

const GRID = 21
const MODULE = 1

// draw a finder pattern (7x7) at position
function finderPattern(
  ox: number,
  oy: number
): Array<{ x: number; y: number }> {
  const cells: Array<{ x: number; y: number }> = []
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const isOuter = r === 0 || r === 6 || c === 0 || c === 6
      const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4
      if (isOuter || isInner) {
        cells.push({ x: ox + c, y: oy + r })
      }
    }
  }
  return cells
}

export const QRCode = forwardRef<SVGSVGElement, QRCodeProps>(function QRCode(
  {
    value,
    size = 128,
    color = 'currentColor',
    bgColor = 'transparent',
    className,
  },
  ref
) {
  const cells = useMemo(() => {
    const result: Array<{ x: number; y: number }> = []

    // finder patterns
    result.push(...finderPattern(0, 0))
    result.push(...finderPattern(GRID - 7, 0))
    result.push(...finderPattern(0, GRID - 7))

    // data area — hash-based fill
    const rand = seededRand(hashStr(value))
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        const inFinder =
          (r < 8 && c < 8) ||
          (r < 8 && c >= GRID - 8) ||
          (r >= GRID - 8 && c < 8)
        if (inFinder) continue
        if (rand() > 0.55) {
          result.push({ x: c, y: r })
        }
      }
    }
    return result
  }, [value])

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${GRID} ${GRID}`}
      className={cx('shrink-0', className)}
      data-component="qr-code"
      data-testid="qr-code-svg"
      role="img"
      aria-label={`QR code for: ${value}`}
    >
      <rect width={GRID} height={GRID} fill={bgColor} />
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width={MODULE}
          height={MODULE}
          fill={color}
        />
      ))}
    </svg>
  )
})
