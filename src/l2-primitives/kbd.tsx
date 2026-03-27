import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type KbdProps = React.HTMLAttributes<HTMLElement> & {
  children: ReactNode
  glass?: boolean
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  function Kbd({ children, className, glass, ...props }, ref) {
    return (
      <kbd
        className={cx(
          'inline-flex select-none items-center gds-radius-button border border-border/60 bg-bg-tertiary gds-pad-x-sm gds-pad-y-sm font-mono gds-text-label text-fg-muted',
          glassClass(glass),
          glass === true && 'border-white/10 bg-bg/60',
          className,
        )}
        data-component="kbd"
        ref={ref}
        {...props}
      >
        {children}
      </kbd>
    )
  },
)

export type { KbdProps }
