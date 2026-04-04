// glass-card — frosted glass container with blur intensity variants
import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const glassCardVariants = cva('gds-ctx gds-radius border bg-bg/60', {
  variants: {
    blur: {
      sm: 'gds-glass-sm border-border/25',
      default: 'gds-glass border-border/20',
      lg: 'gds-glass-lg border-border/15',
    },
  },
  defaultVariants: { blur: 'default' },
})

export type GlassCardProps = VariantProps<typeof glassCardVariants> & {
  children: ReactNode
  className?: string
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard({ blur, children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(glassCardVariants({ blur }), className)}
        data-component="glass-card"
      >
        {children}
      </div>
    )
  }
)

export { glassCardVariants }
