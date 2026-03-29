// reveal — slide-in reveal animation wrapper
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type RevealProps = {
  active: boolean
  children: ReactNode
  className?: string
  direction?: 'bottom' | 'left' | 'right' | 'top'
}

const translateMap: Record<NonNullable<RevealProps['direction']>, string> = {
  top: 'translate-y-[-20px]',
  bottom: 'translate-y-[20px]',
  left: 'translate-x-[-20px]',
  right: 'translate-x-[20px]',
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  function Reveal({ active, children, className, direction = 'bottom' }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'transition-all duration-300 ease-out',
          active ? 'opacity-100 translate-x-0 translate-y-0' : cx('opacity-0', translateMap[direction]),
          className,
        )}
        data-component="reveal"
        data-state={active ? 'visible' : 'hidden'}
      >
        {children}
      </div>
    )
  },
)
