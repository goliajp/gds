// noise-overlay — SVG feTurbulence noise filter overlay
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type NoiseOverlayProps = {
  animated?: boolean
  className?: string
  opacity?: number
}

export const NoiseOverlay = forwardRef<HTMLDivElement, NoiseOverlayProps>(
  function NoiseOverlay({ animated, className, opacity = 0.05 }, ref) {
    return (
      <div
        ref={ref}
        className={cx('pointer-events-none absolute inset-0 overflow-hidden', className)}
        style={{ opacity }}
        data-component="noise-overlay"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="gds-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            >
              {animated === true && (
                <animate
                  attributeName="seed"
                  from="0"
                  to="100"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
          </filter>
          <rect width="100%" height="100%" filter="url(#gds-noise)" />
        </svg>
      </div>
    )
  },
)
