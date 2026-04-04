// glitch-text — text with pseudo-element glitch animation
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type GlitchTextProps = {
  active?: boolean
  className?: string
  intensity?: 'default' | 'lg' | 'sm'
  text: string
}

const intensityMap = {
  sm: 'gds-glitch-sm',
  default: 'gds-glitch',
  lg: 'gds-glitch-lg',
} as const

export const GlitchText = forwardRef<HTMLSpanElement, GlitchTextProps>(
  function GlitchText(
    { active = true, className, intensity = 'default', text },
    ref
  ) {
    return (
      <span
        ref={ref}
        className={cx(
          'text-fg relative inline-block font-bold select-none',
          active && intensityMap[intensity],
          className
        )}
        data-component="glitch-text"
        data-text={text}
        aria-label={text}
      >
        {text}
      </span>
    )
  }
)
