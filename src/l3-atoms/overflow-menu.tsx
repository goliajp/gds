// overflow-menu — "..." button that reveals hidden action items
import { forwardRef, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

type OverflowMenuItem = {
  id: string
  label: string
}

type OverflowMenuProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  items: OverflowMenuItem[]
  onSelect: (id: string) => void
}

const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  function OverflowMenu({ items, onSelect, className, ...props }, ref) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    useClickOutside(containerRef, open, () => setOpen(false))
    useEscapeKey(open, () => setOpen(false))

    return (
      <div ref={mergeRefs(ref, containerRef)} className={cx('relative inline-flex', className)} data-component="overflow-menu" data-state={open ? 'open' : 'closed'} {...props}>
        <button type="button" onClick={() => setOpen((p) => !p)} aria-label="More options" className={cx('select-none rounded px-2 py-1 text-sm text-fg-muted hover:bg-bg-tertiary transition-colors', focusCls)}>
          ...
        </button>
        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] animate-popup gds-radius-popover border border-border bg-surface py-1 gds-shadow-lg">
            {items.map((item) => (
              <button key={item.id} type="button" onClick={() => { onSelect(item.id); setOpen(false) }} className={cx('flex w-full items-center gds-pad-x gds-pad-y-sm gds-text-body text-fg hover:bg-bg-tertiary transition-colors', focusCls)}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  },
)

export { OverflowMenu }
export type { OverflowMenuItem, OverflowMenuProps }
