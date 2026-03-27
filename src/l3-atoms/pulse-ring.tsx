// pulse-ring — concentric pulsing ring animation
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PulseRingProps = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean
  color?: string
  count?: number
  size?: number
}

export const PulseRing = forwardRef<HTMLDivElement, PulseRingProps>(
  function PulseRing({ active = true, className, color, count = 3, size = 80, ...props }, ref) {
    if (!active) {
      return (
        <div
          className={cx('relative inline-flex', className)}
          data-component="pulse-ring"
          ref={ref}
          {...props}
        />
      )
    }

    const rings = Array.from({ length: count }, (_, i) => i)

    return (
      <div
        className={cx(
          'relative inline-flex items-center justify-center',
          className,
        )}
        data-component="pulse-ring"
        ref={ref}
        style={{ height: size, width: size }}
        {...props}
      >
        {rings.map((i) => (
          <span
            className="absolute inset-0 rounded-full border-2 opacity-0"
            key={i}
            style={{
              animation: `gds-pulse-ring ${1.5 + count * 0.2}s ease-out ${i * (1.5 / count)}s infinite`,
              borderColor: color ?? 'var(--color-accent)',
            }}
          />
        ))}
        <style>{`
          @keyframes gds-pulse-ring {
            0% { transform: scale(0.3); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0; }
          }
        `}</style>
      </div>
    )
  },
)

export type { PulseRingProps }
