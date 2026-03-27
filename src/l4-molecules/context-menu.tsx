// context-menu — right-click triggered floating menu
import type { ReactNode } from 'react'
import { useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

export type ContextMenuItem = {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  danger?: boolean
  disabled?: boolean
  separator?: boolean
}

export type ContextMenuProps = {
  trigger: ReactNode
  items: ContextMenuItem[]
  onSelect: (id: string) => void
  className?: string
}

export function ContextMenu({ trigger, items, onSelect, className }: ContextMenuProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  useClickOutside(menuRef, open, close)
  useEscapeKey(open, close)

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
    setOpen(true)
  }, [])

  const handleSelect = useCallback((id: string) => {
    setOpen(false)
    onSelect(id)
  }, [onSelect])

  return (
    <div
      className={className}
      data-component="context-menu"
      data-state={open ? 'open' : 'closed'}
      onContextMenu={handleContextMenu}
    >
      {trigger}
      {open && (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-[160px] animate-popup gds-radius-popover border border-border bg-surface py-1 gds-shadow-lg"
          style={{ left: pos.x, top: pos.y }}
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
                className={cx(
                  'flex w-full items-center gds-gap-sm gds-pad-x gds-pad-y-sm text-left gds-text-body',
                  focusCls,
                  item.danger ? 'text-danger hover:bg-danger/10' : 'text-fg hover:bg-bg-secondary',
                  item.disabled === true && 'pointer-events-none opacity-40',
                )}
                onClick={() => handleSelect(item.id)}
              >
                {item.icon !== undefined && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.shortcut !== undefined && <span className="ml-4 gds-text-caption text-fg-muted">{item.shortcut}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
