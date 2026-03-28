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
  sm: { blur: 28, opacity: 0.12, spread: 12 },
  default: { blur: 40, opacity: 0.15, spread: 20 },
  lg: { blur: 60, opacity: 0.25, spread: 30 },
}

export type GlowEffectProps = {
  children: React.ReactNode
  color?: string
  intensity?: GlowIntensity
  className?: string
}

export const GlowEffect = forwardRef<HTMLDivElement, GlowEffectProps>(
  function GlowEffect(
    { children, color = 'var(--gds-accent)', intensity = 'default', className },
    ref,
  ) {
    const config = intensityMap[intensity]
    return (
      <div ref={ref} data-component="glow-effect" className={cx('relative', className)}>
        <div
          aria-hidden
          style={{
            backgroundColor: color,
            borderRadius: 'inherit',
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
