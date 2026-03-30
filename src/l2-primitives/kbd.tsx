import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type KbdProps = React.HTMLAttributes<HTMLElement> & {
  children: ReactNode
  glass?: boolean
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { children, className, glass, ...props },
  ref
) {
  return (
    <kbd
      className={cx(
        'gds-radius-button border-border/60 bg-bg-tertiary gds-pad-x-sm gds-pad-y-sm gds-text-label text-fg-muted inline-flex items-center border font-mono select-none',
        glassClass(glass),
        glass === true && 'bg-bg/60 border-white/10',
        className
      )}
      data-component="kbd"
      ref={ref}
      {...props}
    >
      {children}
    </kbd>
  )
})

export type { KbdProps }
