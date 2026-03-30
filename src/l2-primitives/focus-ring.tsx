import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type FocusRingProps = {
  children: ReactNode
  color?: string
  width?: number
  offset?: number
  className?: string
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'>

const FocusRing = forwardRef<HTMLSpanElement, FocusRingProps>(function FocusRing(
  { children, color = 'var(--gds-accent)', width = 2, offset = 2, className, style: styleProp, ...props },
  ref,
) {
  const style: CSSProperties = {
    '--focus-ring-color': color,
    '--focus-ring-width': `${width}px`,
    '--focus-ring-offset': `${offset}px`,
  } as CSSProperties

  return (
    <span
      {...props}
      ref={ref}
      className={cx(
        'relative inline-flex [&:focus-within]:outline [&:focus-within]:outline-[length:var(--focus-ring-width)] [&:focus-within]:outline-[color:var(--focus-ring-color)] [&:focus-within]:outline-offset-[var(--focus-ring-offset)]',
        className,
      )}
      data-component="focus-ring"
      style={{ ...styleProp, ...style }}
    >
      {children}
    </span>
  )
})

export { FocusRing }
export type { FocusRingProps }
