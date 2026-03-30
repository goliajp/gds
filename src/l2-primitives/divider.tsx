import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const dividerVariants = cva('', {
  variants: {
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  defaultVariants: { variant: 'solid' },
})

type DividerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dividerVariants> & {
    icon?: ReactNode
    label?: string
    orientation?: 'horizontal' | 'vertical'
  }

const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    className,
    icon,
    label,
    orientation = 'horizontal',
    variant = 'solid',
    ...props
  },
  ref
) {
  const variantCls = dividerVariants({ variant })

  if (orientation === 'vertical') {
    return (
      <div
        className={cx(
          'inline-flex h-full flex-col items-center',
          (icon !== undefined || label !== undefined) && 'gds-gap-sm',
          className
        )}
        data-component="divider"
        ref={ref}
        {...props}
      >
        {icon !== undefined || label !== undefined ? (
          <>
            <div className={cx('border-border flex-1 border-l', variantCls)} />
            {icon !== undefined && (
              <span className="text-fg-muted/50 gds-icon-child-sm shrink-0">
                {icon}
              </span>
            )}
            {label !== undefined && (
              <span className="text-fg-muted/50 gds-text-caption shrink-0">
                {label}
              </span>
            )}
            <div className={cx('border-border flex-1 border-l', variantCls)} />
          </>
        ) : (
          <div className={cx('border-border h-full border-l', variantCls)} />
        )}
      </div>
    )
  }

  if (icon !== undefined || label !== undefined) {
    return (
      <div
        className={cx('gds-gap-sm flex items-center', className)}
        data-component="divider"
        ref={ref}
        {...props}
      >
        <div className={cx('border-border flex-1 border-t', variantCls)} />
        {icon !== undefined && (
          <span className="text-fg-muted/50 gds-icon-child-sm shrink-0">
            {icon}
          </span>
        )}
        {label !== undefined && (
          <span className="text-fg-muted/50 gds-text-caption shrink-0 select-none">
            {label}
          </span>
        )}
        <div className={cx('border-border flex-1 border-t', variantCls)} />
      </div>
    )
  }

  return (
    <div
      className={cx(
        'h-px w-full',
        variant === 'solid'
          ? 'bg-border/50'
          : cx('border-border border-t', variantCls),
        className
      )}
      data-component="divider"
      ref={ref}
      {...props}
    />
  )
})

export { Divider, dividerVariants }
export type { DividerProps }
