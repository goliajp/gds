import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

const positionClasses: Record<string, string> = {
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
}

const arrowClasses: Record<string, string> = {
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-bg-tertiary border-x-transparent border-t-transparent border-4',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-bg-tertiary border-y-transparent border-r-transparent border-4',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-bg-tertiary border-y-transparent border-l-transparent border-4',
  top: 'top-full left-1/2 -translate-x-1/2 border-t-bg-tertiary border-x-transparent border-b-transparent border-4',
}

type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  content: ReactNode
  delay?: number
  glass?: boolean
  interactive?: boolean
  maxWidth?: number
  placement?: 'bottom' | 'left' | 'right' | 'top'
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      children,
      className,
      content,
      delay = 300,
      glass,
      interactive = false,
      maxWidth,
      placement = 'top',
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
      if (interactive) {
        leaveTimer.current = setTimeout(() => setOpen(false), 150)
      } else {
        setOpen(false)
      }
    }, [interactive])

    return (
      <div
        className={cx('relative inline-flex', className)}
        data-component="tooltip"
        data-state={open ? 'open' : 'closed'}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        ref={ref}
        {...props}
      >
        {children}
        {open && (
          <div
            className={cx(
              'animate-popup gds-radius-tooltip gds-pad-x-sm gds-pad-y-sm gds-text-label text-fg pointer-events-none absolute z-50 whitespace-nowrap',
              interactive && 'pointer-events-auto',
              glass === true ? glassClass(glass) : 'bg-bg-tertiary',
              glass === true && 'border border-white/10'
            )}
            onMouseEnter={interactive ? handleEnter : undefined}
            onMouseLeave={interactive ? handleLeave : undefined}
            style={
              maxWidth !== undefined
                ? { maxWidth, whiteSpace: 'normal' }
                : undefined
            }
          >
            <span className={cx('absolute', arrowClasses[placement])} />
            <span className={positionClasses[placement] ? '' : ''}>
              {content}
            </span>
          </div>
        )}
      </div>
    )
  }
)

export type { TooltipProps }
