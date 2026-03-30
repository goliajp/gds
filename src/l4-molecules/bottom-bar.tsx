// bottom-bar — fixed bottom navigation bar
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type BottomBarProps = {
  children: ReactNode
  className?: string
}

export const BottomBar = forwardRef<HTMLDivElement, BottomBarProps>(
  function BottomBar({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'border-border bg-bg gds-pad-y fixed right-0 bottom-0 left-0 z-40 flex items-center justify-around border-t',
          className
        )}
        data-component="bottom-bar"
      >
        {children}
      </div>
    )
  }
)
