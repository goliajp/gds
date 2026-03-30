// dropdown — trigger + floating menu with items
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

export type DropdownItem = {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  danger?: boolean
  disabled?: boolean
  separator?: boolean
}

type DropdownAlign = 'end' | 'start'

export type DropdownProps = {
  items: DropdownItem[]
  onSelect: (id: string) => void
  trigger: ReactNode
  align?: DropdownAlign
  glass?: boolean
  className?: string
}

export function Dropdown({ items, onSelect, trigger, align = 'start', glass, className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, open, () => setOpen(false))
  useEscapeKey(open, () => setOpen(false))

  return (
    <div ref={ref} className={cx('relative inline-block', className)} data-component="dropdown" data-state={open ? 'open' : 'closed'}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((prev) => !prev)} className={focusCls}>
        {trigger}
      </button>

      {open && (
        <div
          className={cx(
            'absolute z-50 mt-1 min-w-[160px] animate-popup gds-radius-popover border py-1 gds-shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
            glass ? cx(glassClass(glass), 'border-white/10 bg-bg/60') : 'border-border bg-surface',
          )}
        >
          {items.map((item) => {
            if (item.separator) {
              return <div key={item.id} className="my-1 h-px bg-border" />
            }
            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  onSelect(item.id)
                  setOpen(false)
                }}
                className={cx(
                  'flex w-full items-center gds-gap-sm gds-pad-x gds-pad-y-sm gds-text-body transition-colors',
                  focusCls,
                  item.danger
                    ? 'text-danger hover:bg-danger/10'
                    : 'text-fg hover:bg-bg-tertiary',
                  item.disabled === true && 'pointer-events-none opacity-40',
                )}
              >
                {item.icon !== undefined && <span className="shrink-0">{item.icon}</span>}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut !== undefined && (
                  <span className="ml-4 gds-text-caption text-fg-muted">{item.shortcut}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
