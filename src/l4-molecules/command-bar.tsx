// command-bar — horizontal action bar for selected items
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type CommandBarAction = {
  danger?: boolean
  icon?: ReactNode
  id: string
  label: string
}

export type CommandBarProps = {
  actions: CommandBarAction[]
  className?: string
  onAction: (id: string) => void
  onClear: () => void
  selectedCount: number
}

const closeIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
)

export const CommandBar = forwardRef<HTMLDivElement, CommandBarProps>(
  function CommandBar(
    { actions, className, onAction, onClear, selectedCount },
    ref
  ) {
    if (selectedCount <= 0) return null

    return (
      <div
        ref={ref}
        className={cx(
          'gds-gap gds-pad-x gds-pad-y border-border bg-surface gds-radius flex items-center border',
          className
        )}
        data-component="command-bar"
      >
        <span className="gds-text text-fg font-medium whitespace-nowrap select-none">
          {selectedCount} selected
        </span>
        <div className="gds-gap-sm flex items-center">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={cx(
                'gds-gap-sm gds-text flex items-center rounded px-2 py-1 transition-colors',
                action.danger === true
                  ? 'text-danger hover:bg-danger/10'
                  : 'text-fg hover:bg-bg-tertiary',
                focusCls
              )}
              onClick={() => onAction(action.id)}
            >
              {action.icon !== undefined && (
                <span className="shrink-0">{action.icon}</span>
              )}
              {action.label}
            </button>
          ))}
        </div>
        <button
          aria-label="Clear selection"
          className={cx(
            'text-fg-muted hover:text-fg ml-auto shrink-0 p-1',
            focusCls
          )}
          onClick={onClear}
          type="button"
        >
          {closeIcon}
        </button>
      </div>
    )
  }
)
