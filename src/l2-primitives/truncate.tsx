// truncate — text truncation with ellipsis, single or multi-line clamp
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type TruncateProps = {
  children: ReactNode
  lines?: number
  expanded?: boolean
  onToggle?: () => void
  className?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'onClick' | 'role' | 'tabIndex'>

export const Truncate = forwardRef<HTMLDivElement, TruncateProps>(
  function Truncate(
    { children, lines = 1, expanded = false, onToggle, className, style: styleProp, ...props },
    ref,
  ) {
    const shouldClamp = !expanded
    const isSingleLine = lines === 1
    const isInteractive = onToggle !== undefined

    const clampStyle = !isSingleLine && shouldClamp
      ? {
          display: '-webkit-box' as const,
          WebkitLineClamp: lines,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden' as const,
        }
      : undefined

    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          isSingleLine && shouldClamp && 'truncate',
          isInteractive && 'cursor-pointer',
          className,
        )}
        style={{ ...styleProp, ...clampStyle }}
        onClick={isInteractive ? onToggle : undefined}
        data-component="truncate"
        data-expanded={expanded ? 'true' : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
      >
        {children}
      </div>
    )
  },
)
