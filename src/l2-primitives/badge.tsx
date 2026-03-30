import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

const badgeVariants = cva(
  'inline-flex select-none items-center gds-gap-xs gds-radius-badge gds-pad-x-sm gds-pad-y-sm gds-text-caption font-medium',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        danger: 'bg-danger/10 text-danger',
        default: 'bg-fg-muted/10 text-fg-muted',
        info: 'bg-accent/10 text-accent',
        'palette-0': 'bg-palette-0/10 text-palette-0',
        'palette-1': 'bg-palette-1/10 text-palette-1',
        'palette-2': 'bg-palette-2/10 text-palette-2',
        'palette-3': 'bg-palette-3/10 text-palette-3',
        'palette-4': 'bg-palette-4/10 text-palette-4',
        'palette-5': 'bg-palette-5/10 text-palette-5',
        'palette-6': 'bg-palette-6/10 text-palette-6',
        'palette-7': 'bg-palette-7/10 text-palette-7',
        'palette-8': 'bg-palette-8/10 text-palette-8',
        'palette-9': 'bg-palette-9/10 text-palette-9',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
      },
    },
  }
)

const dotColors: Partial<Record<string, string>> = {
  danger: 'bg-danger',
  default: 'bg-fg-muted',
  info: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
}

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    count?: number
    countMax?: number
    dot?: boolean
    glass?: boolean
  }

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, className, count, countMax = 99, dot, glass, variant, ...props },
  ref
) {
  // count badge mode
  if (count !== undefined) {
    if (count <= 0) return null
    const display = count > countMax ? `${countMax}+` : String(count)
    return (
      <span
        className={cx(
          'gds-radius-badge gds-text-caption text-accent-fg inline-flex items-center justify-center font-bold select-none',
          'h-[18px] min-w-[18px] px-1',
          variant === 'danger' ? 'bg-danger animate-pulse' : 'bg-accent',
          glassClass(glass),
          glass === true && 'border border-white/10 bg-white/5',
          className
        )}
        data-component="badge"
        data-variant="count"
        ref={ref}
        {...props}
      >
        {display}
      </span>
    )
  }

  // standard badge
  return (
    <span
      className={cx(
        badgeVariants({ variant }),
        glassClass(glass),
        glass === true && 'border border-white/10 bg-white/5',
        className
      )}
      data-component="badge"
      data-variant={variant ?? 'default'}
      ref={ref}
      {...props}
    >
      {dot === true && (
        <span
          className={cx(
            'gds-radius-badge h-1.5 w-1.5',
            dotColors[variant ?? 'default'] ?? 'bg-fg-muted'
          )}
        />
      )}
      {children}
    </span>
  )
})

// map a numeric index to a palette variant
export function paletteVariant(index: number): BadgeVariant {
  return `palette-${index % 10}` as BadgeVariant
}

export { badgeVariants }
export type { BadgeProps, BadgeVariant }
