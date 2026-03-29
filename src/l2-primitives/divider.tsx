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

type DividerProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof dividerVariants> & {
  icon?: ReactNode
  label?: string
  orientation?: 'horizontal' | 'vertical'
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider({ className, icon, label, orientation = 'horizontal', variant = 'solid', ...props }, ref) {
    const variantCls = dividerVariants({ variant })

    if (orientation === 'vertical') {
      return (
        <div
          className={cx('inline-flex h-full flex-col items-center', (icon !== undefined || label !== undefined) && 'gds-gap-sm', className)}
          data-component="divider"
          ref={ref}
          {...props}
        >
          {icon !== undefined || label !== undefined ? (
            <>
              <div className={cx('flex-1 border-l border-border', variantCls)} />
              {icon !== undefined && <span className="shrink-0 text-fg-muted/50 gds-icon-child-sm">{icon}</span>}
              {label !== undefined && <span className="shrink-0 text-fg-muted/50 gds-text-caption">{label}</span>}
              <div className={cx('flex-1 border-l border-border', variantCls)} />
            </>
          ) : (
            <div className={cx('h-full border-l border-border', variantCls)} />
          )}
        </div>
      )
    }

    if (icon !== undefined || label !== undefined) {
      return (
        <div
          className={cx('flex items-center gds-gap-sm', className)}
          data-component="divider"
          ref={ref}
          {...props}
        >
          <div className={cx('flex-1 border-t border-border', variantCls)} />
          {icon !== undefined && <span className="shrink-0 text-fg-muted/50 gds-icon-child-sm">{icon}</span>}
          {label !== undefined && <span className="shrink-0 text-fg-muted/50 gds-text-caption select-none">{label}</span>}
          <div className={cx('flex-1 border-t border-border', variantCls)} />
        </div>
      )
    }

    return (
      <div
        className={cx('h-px w-full', variant === 'solid' ? 'bg-border/50' : cx('border-t border-border', variantCls), className)}
        data-component="divider"
        ref={ref}
        {...props}
      />
    )
  },
)

export { Divider, dividerVariants }
export type { DividerProps }
