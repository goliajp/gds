// feature-card — feature showcase card with icon, title, description, and optional CTA
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type FeatureCardProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  glass?: boolean
  className?: string
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard(
    { icon, title, description, action, glass, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card gds-pad-x-lg gds-pad-y-lg flex flex-col border',
          glass === true
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          className
        )}
        data-component="feature-card"
      >
        {icon !== undefined && <div className="text-accent mb-3">{icon}</div>}
        <p className="text-fg font-semibold">{title}</p>
        {description !== undefined && (
          <p className="gds-text-body text-fg-muted mt-1">{description}</p>
        )}
        {action !== undefined && <div className="mt-auto pt-4">{action}</div>}
      </div>
    )
  }
)
