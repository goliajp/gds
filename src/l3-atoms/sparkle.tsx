// sparkle — animated sparkle/star particles around a child element
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type SparkleProps = {
  children: React.ReactNode
  active?: boolean
  count?: number
  color?: string
  className?: string
}

const STAR_PATH = 'M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z'

function starStyle(i: number, count: number): React.CSSProperties {
  const angle = (360 / count) * i
  const rad = (angle * Math.PI) / 180
  const dist = 70 + (i % 3) * 15
  const x = Math.cos(rad) * dist
  const y = Math.sin(rad) * dist
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 10,
    height: 10,
    transform: `translate(${x}%, ${y}%)`,
    animation: `gds-sparkle 1.4s ease-in-out ${i * 0.2}s infinite`,
    opacity: 0,
  }
}

export const Sparkle = forwardRef<HTMLSpanElement, SparkleProps>(
  function Sparkle(
    { children, active = true, count = 3, color = 'var(--gds-accent)', className },
    ref,
  ) {
    const particles = Array.from({ length: count }, (_, i) => i)

    return (
      <span ref={ref} className={cx('relative inline-block', className)} data-component="sparkle">
        {children}
        {active &&
          particles.map((i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              fill={color}
              style={starStyle(i, count)}
              aria-hidden="true"
            >
              <path d={STAR_PATH} />
            </svg>
          ))}
        {active && (
          <style>{`
            @keyframes gds-sparkle {
              0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
              50% { opacity: 1; transform: scale(1) rotate(180deg); }
            }
          `}</style>
        )}
      </span>
    )
  },
)
