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
          'fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-bg flex items-center justify-around gds-pad-y',
          className,
        )}
        data-component="bottom-bar"
      >
        {children}
      </div>
    )
  },
)
