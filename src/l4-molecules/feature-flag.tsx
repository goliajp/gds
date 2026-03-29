// feature-flag — toggle-style status indicator for feature flags
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type FeatureFlagProps = {
  className?: string
  description?: string
  enabled: boolean
  name: string
}

export const FeatureFlag = forwardRef<HTMLDivElement, FeatureFlagProps>(
  function FeatureFlag({ className, description, enabled, name }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex items-center gds-gap gds-pad-x gds-pad-y', className)}
        data-component="feature-flag"
        data-state={enabled ? 'enabled' : 'disabled'}
      >
        <span
          className={cx(
            'inline-block h-2.5 w-2.5 shrink-0 rounded-full',
            enabled ? 'bg-success' : 'bg-fg-muted/40',
          )}
        />
        <div className="min-w-0 flex-1">
          <span className={cx('gds-text font-medium', enabled ? 'text-fg' : 'text-fg-muted')}>
            {name}
          </span>
          {description !== undefined && (
            <p className="mt-0.5 text-xs text-fg-muted">{description}</p>
          )}
        </div>
        <span className={cx('text-xs font-medium', enabled ? 'text-success' : 'text-fg-muted')}>
          {enabled ? 'ON' : 'OFF'}
        </span>
      </div>
    )
  },
)
