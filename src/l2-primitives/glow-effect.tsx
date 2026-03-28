// glow-effect — container that adds a colored glow/aura behind its content
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type GlowIntensity = 'sm' | 'default' | 'lg'

type IntensityConfig = {
  blur: number
  opacity: number
  spread: number
}

const intensityMap: Record<GlowIntensity, IntensityConfig> = {
  sm: { blur: 28, opacity: 0.15, spread: 12 },
  default: { blur: 40, opacity: 0.2, spread: 20 },
  lg: { blur: 56, opacity: 0.3, spread: 28 },
}

export type GlowEffectProps = {
  children: React.ReactNode
  className?: string
  color?: string
  intensity?: GlowIntensity
  radius?: number
}

export const GlowEffect = forwardRef<HTMLDivElement, GlowEffectProps>(
  function GlowEffect(
    { children, className, color = 'var(--gds-accent)', intensity = 'default', radius = 16 },
    ref,
  ) {
    const config = intensityMap[intensity]
    return (
      <div ref={ref} data-component="glow-effect" className={cx('relative', className)}>
        <div
          aria-hidden
          style={{
            backgroundColor: color,
            borderRadius: `${radius}px`,
            filter: `blur(${config.blur}px)`,
            inset: `-${config.spread}px`,
            opacity: config.opacity,
            position: 'absolute',
          }}
        />
        <div className="relative">{children}</div>
      </div>
    )
  },
)
