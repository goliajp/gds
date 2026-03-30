// glow-dot — colored dot with glow effect (LED indicator)
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type GlowDotColor = 'accent' | 'danger' | 'success' | 'warning'
type GlowDotSize = 'default' | 'lg' | 'sm'

type GlowDotProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: GlowDotColor
  /** Enable pulse animation for attention states */
  pulse?: boolean
  size?: GlowDotSize
}

const colorMap: Record<GlowDotColor, string> = {
  accent: 'bg-accent shadow-[0_0_6px_var(--color-accent)]',
  success: 'bg-success shadow-[0_0_6px_var(--color-success)]',
  warning: 'bg-warning shadow-[0_0_6px_var(--color-warning)]',
  danger: 'bg-danger shadow-[0_0_6px_var(--color-danger)]',
}

const sizeMap: Record<GlowDotSize, string> = {
  sm: 'h-1.5 w-1.5',
  default: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
}

export const GlowDot = forwardRef<HTMLSpanElement, GlowDotProps>(
  function GlowDot(
    { color = 'accent', pulse, size = 'default', className, ...props },
    ref
  ) {
    return (
      <span
        ref={ref}
        className={cx(
          'inline-block rounded-full',
          colorMap[color],
          sizeMap[size],
          pulse === true && 'animate-pulse',
          className
        )}
        data-component="glow-dot"
        data-variant={color}
        {...props}
      />
    )
  }
)

export type { GlowDotColor, GlowDotProps, GlowDotSize }
