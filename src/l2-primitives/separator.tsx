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
    { className, label, orientation = 'horizontal', variant = 'solid', ...props },
    ref,
  ) {
    if (orientation === 'vertical') {
      return (
        <div
          aria-orientation="vertical"
          className={cx(
            'inline-block h-full border-l',
            separatorVariants({ variant }),
            className,
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
          className={cx('flex items-center gds-gap select-none', className)}
          data-component="separator"
          ref={ref}
          role="separator"
          {...props}
        >
          <div className={cx('flex-1 border-t', separatorVariants({ variant }))} />
          <span className="shrink-0 gds-text-caption font-semibold tracking-widest text-fg-muted/40 uppercase">
            {label}
          </span>
          <div className={cx('flex-1 border-t', separatorVariants({ variant }))} />
        </div>
      )
    }

    if (variant === 'solid') {
      return (
        <div
          className={cx('h-px w-full shrink-0 bg-border', className)}
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
  },
)

export { separatorVariants }
export type { SeparatorProps }
