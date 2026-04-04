// hover-card — rich content card shown on hover with delay
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'

const positionClasses: Record<string, string> = {
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
}

export type HoverCardProps = React.HTMLAttributes<HTMLDivElement> & {
  trigger: ReactNode
  delay?: number
  placement?: 'bottom' | 'left' | 'right' | 'top'
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  function HoverCard(
    {
      trigger,
      children,
      delay = 300,
      placement = 'bottom',
      className,
      ...props
    },
    ref
  ) {
    const [open, setOpen] = useState(false)
    const enterTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    const handleEnter = useCallback(() => {
      clearTimeout(leaveTimer.current)
      enterTimer.current = setTimeout(() => setOpen(true), delay)
    }, [delay])

    const handleLeave = useCallback(() => {
      clearTimeout(enterTimer.current)
      leaveTimer.current = setTimeout(() => setOpen(false), 150)
    }, [])

    return (
      <div
        ref={ref}
        className={cx('relative inline-flex', className)}
        data-component="hover-card"
        data-state={open ? 'open' : 'closed'}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        {trigger}
        {open && (
          <div
            className={cx(
              'animate-popup gds-radius-popover border-border bg-surface gds-pad-x gds-pad-y gds-shadow-lg absolute z-50 border',
              positionClasses[placement]
            )}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)
