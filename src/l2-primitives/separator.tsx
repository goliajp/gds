import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const separatorVariants = cva('border-border', {
  defaultVariants: { variant: 'solid' },
  variants: {
    variant: {
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      solid: 'border-solid',
    },
  },
})

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof separatorVariants> & {
    label?: string
    orientation?: 'horizontal' | 'vertical'
  }

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    {
      className,
      label,
      orientation = 'horizontal',
      variant = 'solid',
      ...props
    },
    ref
  ) {
    if (orientation === 'vertical') {
      return (
        <div
          aria-orientation="vertical"
          className={cx(
            'inline-block h-full border-l',
            separatorVariants({ variant }),
            className
          )}
          data-component="separator"
          ref={ref}
          role="separator"
          {...props}
        />
      )
    }

    if (label !== undefined) {
      return (
        <div
          className={cx('gds-gap flex items-center select-none', className)}
          data-component="separator"
          ref={ref}
          role="separator"
          {...props}
        >
          <div
            className={cx('flex-1 border-t', separatorVariants({ variant }))}
          />
          <span className="gds-text-caption text-fg-muted/40 shrink-0 font-semibold tracking-widest uppercase">
            {label}
          </span>
          <div
            className={cx('flex-1 border-t', separatorVariants({ variant }))}
          />
        </div>
      )
    }

    if (variant === 'solid') {
      return (
        <div
          className={cx('bg-border h-px w-full shrink-0', className)}
          data-component="separator"
          ref={ref}
          role="separator"
          {...props}
        />
      )
    }

    return (
      <div
        aria-orientation="horizontal"
        className={cx('border-t', separatorVariants({ variant }), className)}
        data-component="separator"
        ref={ref}
        role="separator"
        {...props}
      />
    )
  }
)

export { separatorVariants }
export type { SeparatorProps }
