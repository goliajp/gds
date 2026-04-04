import type { ReactNode } from 'react'
import { forwardRef, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { isActivationKey } from '../utils/dom'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

const placementClasses: Record<string, Record<string, string>> = {
  bottom: {
    center: 'top-full left-1/2 -translate-x-1/2 mt-2',
    end: 'top-full right-0 mt-2',
    start: 'top-full left-0 mt-2',
  },
  left: {
    center: 'right-full top-1/2 -translate-y-1/2 mr-2',
    end: 'right-full bottom-0 mr-2',
    start: 'right-full top-0 mr-2',
  },
  right: {
    center: 'left-full top-1/2 -translate-y-1/2 ml-2',
    end: 'left-full bottom-0 ml-2',
    start: 'left-full top-0 ml-2',
  },
  top: {
    center: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    end: 'bottom-full right-0 mb-2',
    start: 'bottom-full left-0 mb-2',
  },
}

type PopoverProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> & {
  align?: 'center' | 'end' | 'start'
  content: ReactNode
  placement?: 'bottom' | 'left' | 'right' | 'top'
  trigger: ReactNode
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      align = 'start',
      className,
      content,
      placement = 'bottom',
      trigger,
      ...props
    },
    ref
  ) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useClickOutside(containerRef, open, () => setOpen(false))
    useEscapeKey(open, () => setOpen(false))

    return (
      <div
        className={cx('relative inline-flex', className)}
        data-component="popover"
        data-state={open ? 'open' : 'closed'}
        ref={(node) => {
          ;(
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref !== null && ref !== undefined) {
            ;(ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node
          }
        }}
        {...props}
      >
        <span
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (isActivationKey(e)) {
              e.preventDefault()
              setOpen((v) => !v)
            }
          }}
          role="button"
          tabIndex={0}
        >
          {trigger}
        </span>
        {open && (
          <div
            className={cx(
              'animate-popup gds-radius-popover border-border bg-surface gds-pad-x gds-pad-y gds-shadow-lg absolute z-50 border',
              placementClasses[placement]?.[align]
            )}
          >
            {content}
          </div>
        )}
      </div>
    )
  }
)

export type { PopoverProps }
