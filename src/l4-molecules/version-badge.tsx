import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type VersionBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  latest?: string
  version: string
}

const VersionBadge = forwardRef<HTMLSpanElement, VersionBadgeProps>(
  function VersionBadge({ className, latest, version, ...props }, ref) {
    const hasUpdate = latest !== undefined && latest !== version

    return (
      <span
        className={cx(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums',
          hasUpdate ? 'bg-warning/15 text-warning' : 'bg-surface text-fg-muted',
          className
        )}
        data-component="version-badge"
        data-has-update={hasUpdate}
        ref={ref}
        {...props}
      >
        v{version}
        {hasUpdate && (
          <svg
            className="shrink-0"
            fill="currentColor"
            height={12}
            viewBox="0 0 24 24"
            width={12}
          >
            <path
              d="M12 2L12 16M12 16L7 11M12 16L17 11M5 20H19"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        )}
      </span>
    )
  }
)

export { VersionBadge }
export type { VersionBadgeProps }
