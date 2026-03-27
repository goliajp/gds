// collapsible — simple trigger + content toggle
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

type CollapsibleProps = {
  trigger: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  function Collapsible(
    { trigger, children, defaultOpen = false, open: controlledOpen, onOpenChange, className },
    ref,
  ) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : internalOpen

    function handleToggle() {
      const next = !isOpen
      if (!isControlled) {
        setInternalOpen(next)
      }
      if (onOpenChange !== undefined) {
        onOpenChange(next)
      }
    }

    return (
      <div ref={ref} className={cx('w-full', className)} data-component="collapsible">
        <button
          aria-expanded={isOpen}
          className="w-full cursor-pointer select-none text-left"
          onClick={handleToggle}
          type="button"
        >
          {trigger}
        </button>
        <div
          className={cx(
            'overflow-hidden transition-[max-height] duration-200',
            isOpen ? 'max-h-[2000px]' : 'max-h-0',
          )}
          data-state={isOpen ? 'open' : 'closed'}
        >
          {isOpen ? children : null}
        </div>
      </div>
    )
  },
)

export { Collapsible }
export type { CollapsibleProps }
