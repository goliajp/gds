// command-bar-float — floating action button with expandable actions
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { useEscapeKey } from '../utils/hooks'

export type FabAction = {
  icon: ReactNode
  id: string
  label: string
  onClick: () => void
}

export type CommandBarFloatProps = {
  actions: FabAction[]
  className?: string
}

export const CommandBarFloat = forwardRef<HTMLDivElement, CommandBarFloatProps>(
  function CommandBarFloat({ actions, className }, ref) {
    const [open, setOpen] = useState(false)

    const toggle = useCallback(() => setOpen((prev) => !prev), [])
    const close = useCallback(() => setOpen(false), [])

    useEscapeKey(open, close)

    return (
      <div
        ref={ref}
        className={cx(
          'fixed right-6 bottom-6 z-40 flex flex-col-reverse items-end gap-3',
          className
        )}
        data-component="command-bar-float"
      >
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={cx(
            'bg-accent text-on-accent flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200',
            focusCls
          )}
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          onClick={toggle}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        {open && (
          <div className="flex flex-col-reverse items-end gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={cx(
                  'gds-gap-sm bg-surface border-border text-fg hover:bg-bg-tertiary flex items-center rounded-full border px-4 py-2 shadow-md transition-colors',
                  focusCls
                )}
                onClick={() => {
                  action.onClick()
                  close()
                }}
              >
                <span className="shrink-0">{action.icon}</span>
                <span className="gds-text whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
