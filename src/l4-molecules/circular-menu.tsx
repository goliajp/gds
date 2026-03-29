// circular-menu — radial popup menu around a trigger
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { useEscapeKey } from '../utils/hooks'

export type CircularMenuItem = {
  icon: ReactNode
  id: string
  label: string
}

export type CircularMenuProps = {
  className?: string
  items: CircularMenuItem[]
  radius?: number
  trigger: ReactNode
}

export const CircularMenu = forwardRef<HTMLDivElement, CircularMenuProps>(
  function CircularMenu({ className, items, radius = 80, trigger }, ref) {
    const [open, setOpen] = useState(false)

    const toggle = useCallback(() => setOpen((prev) => !prev), [])
    const close = useCallback(() => setOpen(false), [])

    useEscapeKey(open, close)

    return (
      <div ref={ref} className={cx('relative inline-block', className)} data-component="circular-menu">
        <div
          role="button"
          tabIndex={0}
          className={cx('relative z-10 cursor-pointer', focusCls)}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggle()
            }
          }}
        >
          {trigger}
        </div>
        {open && (
          <div className="absolute left-1/2 top-1/2">
            {items.map((item, i) => {
              const angle = (2 * Math.PI * i) / items.length - Math.PI / 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              return (
                <button
                  key={item.id}
                  type="button"
                  title={item.label}
                  className={cx(
                    'absolute flex items-center justify-center rounded-full bg-surface border border-border',
                    'h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-fg transition-all duration-200',
                    focusCls,
                  )}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {item.icon}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  },
)
