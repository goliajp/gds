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
  function FeatureCard({ icon, title, description, action, glass, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card border gds-pad-x-lg gds-pad-y-lg flex flex-col',
          glass === true
            ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
            : 'border-border bg-surface',
          className,
        )}
        data-component="feature-card"
      >
        {icon !== undefined && (
          <div className="mb-3 text-accent">{icon}</div>
        )}
        <p className="font-semibold text-fg">{title}</p>
        {description !== undefined && (
          <p className="mt-1 gds-text-body text-fg-muted">{description}</p>
        )}
        {action !== undefined && (
          <div className="mt-auto pt-4">{action}</div>
        )}
      </div>
    )
  },
)
