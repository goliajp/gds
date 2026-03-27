import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider({ className, icon, orientation = 'horizontal', ...props }, ref) {
    if (orientation === 'vertical') {
      return (
        <div
          className={cx('inline-flex h-full flex-col items-center', icon !== undefined && 'gds-gap-sm', className)}
          data-component="divider"
          ref={ref}
          {...props}
        >
          {icon !== undefined ? (
            <>
              <div className="flex-1 border-l border-border" />
              <span className="shrink-0 text-fg-muted/50 gds-icon-child-sm">{icon}</span>
              <div className="flex-1 border-l border-border" />
            </>
          ) : (
            <div className="h-full border-l border-border" />
          )}
        </div>
      )
    }

    if (icon !== undefined) {
      return (
        <div
          className={cx('flex items-center gds-gap-sm', className)}
          data-component="divider"
          ref={ref}
          {...props}
        >
          <div className="flex-1 border-t border-border" />
          <span className="shrink-0 text-fg-muted/50 gds-icon-child-sm">{icon}</span>
          <div className="flex-1 border-t border-border" />
        </div>
      )
    }

    return (
      <div
        className={cx('h-px w-full bg-border/50', className)}
        data-component="divider"
        ref={ref}
        {...props}
      />
    )
  },
)

export type { DividerProps }
