// changelog — versioned changelog display
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const typeColors = {
  added: 'bg-success/15 text-success',
  changed: 'bg-accent/15 text-accent',
  fixed: 'bg-warning/15 text-warning',
  removed: 'bg-danger/15 text-danger',
} as const

type ChangeType = 'added' | 'changed' | 'fixed' | 'removed'

type ChangelogChange = {
  type: ChangeType
  text: string
}

type ChangelogEntry = {
  version: string
  date: string
  changes: ChangelogChange[]
}

type ChangelogProps = React.HTMLAttributes<HTMLDivElement> & {
  entries: ChangelogEntry[]
}

export const Changelog = forwardRef<HTMLDivElement, ChangelogProps>(
  function Changelog({ entries, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-6', className)}
        data-component="changelog"
        {...props}
      >
        {entries.map((entry) => (
          <div key={entry.version} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-fg gds-heading font-semibold">
                {entry.version}
              </span>
              <span className="text-fg-muted text-xs">{entry.date}</span>
            </div>
            <ul className="flex flex-col gap-1">
              {entry.changes.map((change, i) => (
                <li
                  key={`${change.type}-${i}`}
                  className="gds-text text-fg flex items-start gap-2"
                >
                  <span
                    className={cx(
                      'mt-0.5 shrink-0 rounded-full px-1.5 py-px text-[9px] leading-tight font-bold uppercase',
                      typeColors[change.type]
                    )}
                  >
                    {change.type}
                  </span>
                  <span>{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
)

export type { ChangelogChange, ChangelogEntry, ChangelogProps, ChangeType }
