// morphing-shape — SVG shape that transitions between variants
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type MorphingShapeProps = {
  className?: string
  color?: string
  size?: number
  variant: 'blob' | 'circle' | 'square' | 'star'
}

const paths: Record<MorphingShapeProps['variant'], string> = {
  circle: 'M50 10 A40 40 0 1 1 49.99 10 Z',
  square: 'M15 15 H85 V85 H15 Z',
  star: 'M50 5 L61 35 L95 35 L68 57 L79 90 L50 70 L21 90 L32 57 L5 35 L39 35 Z',
  blob: 'M50 10 C75 5 95 25 90 50 C95 75 75 95 50 90 C25 95 5 75 10 50 C5 25 25 5 50 10 Z',
}

export const MorphingShape = forwardRef<SVGSVGElement, MorphingShapeProps>(
  function MorphingShape({ className, color = 'currentColor', size = 100, variant }, ref) {
    const d = useMemo(() => paths[variant], [variant])

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={cx('text-fg', className)}
        data-component="morphing-shape"
        data-variant={variant}
      >
        <path d={d} fill={color} style={{ transition: 'd 0.4s ease' }} />
      </svg>
    )
  },
)
