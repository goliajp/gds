// glow-effect — container that adds a colored glow/aura behind its content via box-shadow
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type GlowIntensity = 'sm' | 'default' | 'lg'

type IntensityConfig = {
  blur: number
  opacity: number
  spread: number
}

const intensityMap: Record<GlowIntensity, IntensityConfig> = {
  sm: { blur: 20, opacity: 15, spread: 4 },
  default: { blur: 32, opacity: 18, spread: 8 },
  lg: { blur: 48, opacity: 25, spread: 12 },
}

function buildShadow(color: string, config: IntensityConfig): string {
  const outer = `0 0 ${config.blur}px ${config.spread}px color-mix(in srgb, ${color} ${config.opacity}%, transparent)`
  const innerBlur = Math.round(config.blur * 0.4)
  const innerSpread = Math.round(config.spread * 0.5)
  const innerOpacity = Math.round(config.opacity * 1.5)
  const inner = `0 0 ${innerBlur}px ${innerSpread}px color-mix(in srgb, ${color} ${innerOpacity}%, transparent)`
  return `${outer}, ${inner}`
}

export type GlowEffectProps = {
  children: React.ReactNode
  className?: string
  color?: string
  intensity?: GlowIntensity
  radius?: number
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'>

export const GlowEffect = forwardRef<HTMLDivElement, GlowEffectProps>(
  function GlowEffect(
    { children, className, color = 'var(--gds-accent)', intensity = 'default', radius, style: styleProp, ...props },
    ref,
  ) {
    const config = intensityMap[intensity]
    return (
      <div
        {...props}
        ref={ref}
        data-component="glow-effect"
        className={cx('relative', className)}
        style={{
          ...styleProp,
          borderRadius: radius !== undefined ? `${radius}px` : undefined,
          boxShadow: buildShadow(color, config),
        }}
      >
        {children}
      </div>
    )
  },
)
