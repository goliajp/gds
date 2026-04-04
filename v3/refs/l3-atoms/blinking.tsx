import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const speedMap = {
  default: 'animate-pulse',
  fast: 'animate-pulse [animation-duration:0.5s]',
  slow: 'animate-pulse [animation-duration:3s]',
} as const

type BlinkingSpeed = 'slow' | 'default' | 'fast'

type BlinkingProps = React.HTMLAttributes<HTMLSpanElement> & {
  active?: boolean
  speed?: BlinkingSpeed
}

export const Blinking = forwardRef<HTMLSpanElement, BlinkingProps>(
  function Blinking(
    { active = true, children, className, speed = 'default', ...props },
    ref
  ) {
    return (
      <span
        className={cx(active && speedMap[speed], className)}
        data-component="blinking"
        ref={ref}
        {...props}
      >
        {children}
      </span>
    )
  }
)

export type { BlinkingProps, BlinkingSpeed }
