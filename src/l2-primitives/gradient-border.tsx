// gradient-border — container with a gradient border via background-clip trick
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type GradientBorderProps = {
  children: React.ReactNode
  gradient?: string
  width?: number
  radius?: number
  className?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'>

export const GradientBorder = forwardRef<HTMLDivElement, GradientBorderProps>(
  function GradientBorder(
    {
      children,
      gradient = 'linear-gradient(135deg, var(--gds-accent), var(--gds-success))',
      width = 1,
      radius = 12,
      className,
      style: styleProp,
      ...props
    },
    ref,
  ) {
    const innerRadius = Math.max(0, radius - width)

    return (
      <div
        {...props}
        ref={ref}
        data-component="gradient-border"
        className={cx(className)}
        style={{ ...styleProp, background: gradient, padding: width, borderRadius: radius }}
      >
        <div
          className="bg-bg"
          style={{ borderRadius: innerRadius }}
        >
          {children}
        </div>
      </div>
    )
  },
)
