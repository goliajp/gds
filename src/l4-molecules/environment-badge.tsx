import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type EnvironmentType = 'development' | 'local' | 'production' | 'staging'

type EnvironmentBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  env: EnvironmentType
  showDot?: boolean
}

const envCls: Record<EnvironmentType, string> = {
  production: 'bg-success/15 text-success',
  staging: 'bg-warning/15 text-warning',
  development: 'bg-accent/15 text-accent',
  local: 'bg-bg-tertiary text-fg-muted',
}

const dotCls: Record<EnvironmentType, string> = {
  production: 'bg-success',
  staging: 'bg-warning',
  development: 'bg-accent',
  local: 'bg-fg-muted',
}

export const EnvironmentBadge = forwardRef<HTMLSpanElement, EnvironmentBadgeProps>(
  function EnvironmentBadge({ className, env, showDot = true, ...props }, ref) {
    return (
      <span
        className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', envCls[env], className)}
        data-component="environment-badge"
        ref={ref}
        {...props}
      >
        {showDot && <span className={cx('h-1.5 w-1.5 rounded-full', dotCls[env])} />}
        {env}
      </span>
    )
  },
)

export type { EnvironmentBadgeProps, EnvironmentType }
