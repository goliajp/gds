// glow-effect — container that adds a colored glow/aura behind its content
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type GlowIntensity = 'sm' | 'default' | 'lg'

const intensityCls: Record<GlowIntensity, string> = {
  sm: 'blur-lg opacity-20',
  default: 'blur-xl opacity-30',
  lg: 'blur-2xl opacity-40',
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
    return (
      <div ref={ref} data-component="glow-effect" className={cx('relative', className)}>
        <div
          className={cx('absolute inset-0 -z-1 rounded-inherit', intensityCls[intensity])}
          style={{ backgroundColor: color }}
          aria-hidden
        />
        {children}
      </div>
    )
  },
)
