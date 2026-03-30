// cta-banner — call-to-action banner with prominent message and action buttons
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type CTABannerVariant = 'default' | 'accent' | 'gradient'

export type CTABannerProps = {
  title: string
  description?: string
  actions: ReactNode
  variant?: CTABannerVariant
  glass?: boolean
  className?: string
}

export const CTABanner = forwardRef<HTMLDivElement, CTABannerProps>(
  function CTABanner(
    { title, description, actions, variant = 'default', glass, className },
    ref
  ) {
    const variantClass =
      variant === 'accent'
        ? 'bg-accent text-accent-fg'
        : variant === 'gradient'
          ? 'bg-gradient-to-r from-accent to-success text-accent-fg'
          : glass === true
            ? cx(glassClass(glass), 'border border-white/10 bg-bg/60')
            : 'border border-border bg-surface'

    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card gds-pad-x-lg gds-pad-y-lg w-full text-center',
          variantClass,
          className
        )}
        data-component="cta-banner"
        data-variant={variant}
      >
        <h2
          className={cx(
            'text-xl font-bold',
            variant === 'default' && 'text-fg'
          )}
        >
          {title}
        </h2>
        {description !== undefined && (
          <p
            className={cx(
              'gds-text-body mt-2',
              variant === 'default' ? 'text-fg-muted' : 'opacity-80'
            )}
          >
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-center gap-3">
          {actions}
        </div>
      </div>
    )
  }
)
