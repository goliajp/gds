// truncate — text truncation with ellipsis, single or multi-line clamp
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

export type TruncateProps = {
  children: ReactNode
  lines?: number
  expandable?: boolean
  className?: string
}

export const Truncate = forwardRef<HTMLDivElement, TruncateProps>(
  function Truncate(
    { children, lines = 1, expandable = false, className },
    ref,
  ) {
    const [expanded, setExpanded] = useState(false)

    const shouldClamp = !expanded
    const isSingleLine = lines === 1

    const clampStyle = !isSingleLine && shouldClamp
      ? {
          display: '-webkit-box' as const,
          WebkitLineClamp: lines,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden' as const,
        }
      : undefined

    const handleClick = expandable
      ? () => setExpanded((prev) => !prev)
      : undefined

    return (
      <div
        ref={ref}
        className={cx(
          isSingleLine && shouldClamp && 'truncate',
          expandable && 'cursor-pointer',
          className,
        )}
        style={clampStyle}
        onClick={handleClick}
        data-component="truncate"
        data-expanded={expanded ? 'true' : undefined}
        role={expandable ? 'button' : undefined}
        tabIndex={expandable ? 0 : undefined}
      >
        {children}
      </div>
    )
  },
)
