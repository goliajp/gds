import type { ReactNode } from 'react'
import { forwardRef, useRef, useState } from 'react'

import { IconButton } from '../l2-primitives/icon-button'
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

type ActionMenuItem = {
  id: string
  label: string
  icon?: ReactNode
  danger?: boolean
}

type ActionMenuProps = {
  items: ActionMenuItem[]
  onSelect: (id: string) => void
  disabled?: boolean
  className?: string
}

const dotsIcon = (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
    <circle cx="8" cy="3" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
  </svg>
)

export const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(
  function ActionMenu({ className, disabled, items, onSelect }, ref) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    useClickOutside(containerRef, open, () => setOpen(false))
    useEscapeKey(open, () => setOpen(false))

    return (
      <div className={cx('relative inline-block', className)} data-component="action-menu" ref={ref}>
        <div ref={containerRef}>
          <IconButton
            disabled={disabled}
            icon={dotsIcon}
            onClick={() => setOpen((prev) => !prev)}
            tooltip="Actions"
            variant="default"
          />
          {open && (
            <div className="absolute right-0 z-50 mt-1 min-w-[140px] animate-popup rounded-lg border border-border bg-surface py-1 shadow-lg">
              {items.map((item) => (
                <button
                  key={item.id}
                  className={cx(
                    'flex w-full items-center gds-gap-sm px-3 py-1.5 gds-text-body transition-colors',
                    focusCls,
                    item.danger === true ? 'text-danger hover:bg-danger/10' : 'text-fg hover:bg-bg-tertiary',
                  )}
                  onClick={() => { onSelect(item.id); setOpen(false) }}
                  type="button"
                >
                  {item.icon !== undefined && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

export type { ActionMenuItem, ActionMenuProps }
