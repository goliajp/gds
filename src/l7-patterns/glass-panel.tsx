// glass-panel — translucent container with depth-aware glass material
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type GlassPanelBlur = 'default' | 'lg' | 'sm'
type GlassPanelPadding = 'default' | 'lg' | 'none' | 'sm'

const paddingMap: Record<GlassPanelPadding, string> = {
  none: '',
  sm: 'gds-pad-x gds-pad-y',
  default: 'gds-pad-x-lg gds-pad-y-lg',
  lg: 'p-6',
}

const blurToGlass: Record<GlassPanelBlur, Parameters<typeof glassClass>[0]> = {
  sm: 'sm',
  default: true,
  lg: 'lg',
}

export type GlassPanelProps = {
  children: ReactNode
  blur?: GlassPanelBlur
  padding?: GlassPanelPadding
  className?: string
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel({ children, blur = 'default', padding = 'default', className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card border border-white/10',
          glassClass(blurToGlass[blur]),
          paddingMap[padding],
          className,
        )}
        data-component="glass-panel"
      >
        {children}
      </div>
    )
  },
)
