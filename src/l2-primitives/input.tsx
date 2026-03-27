import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

const inputVariants = cva(
  'w-full gds-radius-input border bg-bg text-fg transition-colors placeholder:text-fg-muted/50 outline-none disabled:cursor-not-allowed disabled:opacity-50 ' +
    focusCls,
  {
    compoundVariants: [
      {
        error: true,
        className: 'focus-visible:ring-danger',
      },
    ],
    defaultVariants: {
      error: false,
      inputSize: 'default',
    },
    variants: {
      error: {
        false: 'border-border hover:border-border-strong',
        true: 'border-danger',
      },
      inputSize: {
        default: 'gds-h gds-text-body',
        sm: 'gds-h-sm gds-text-label',
      },
    },
  },
)

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    glass?: boolean
    icon?: ReactNode
    rightIcon?: ReactNode
  }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, error, glass, icon, inputSize, rightIcon, ...props },
    ref,
  ) {
    const hasLeft = icon !== undefined
    const hasRight = rightIcon !== undefined

    if (!hasLeft && !hasRight) {
      return (
        <input
          className={cx(
            inputVariants({ error, inputSize }),
            'gds-pad-x',
            glassClass(glass),
            glass === true && 'border-white/10 bg-bg/60',
            className,
          )}
          data-component="input"
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <div className="relative" data-component="input">
        {hasLeft && (
          <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-fg-muted/50 gds-icon-child-sm">
            {icon}
          </span>
        )}
        <input
          className={cx(
            inputVariants({ error, inputSize }),
            hasLeft ? 'pl-8' : 'gds-pad-x',
            hasRight ? 'pr-8' : 'gds-pad-x',
            glassClass(glass),
            glass === true && 'border-white/10 bg-bg/60',
            className,
          )}
          ref={ref}
          {...props}
        />
        {hasRight && (
          <span className="absolute top-1/2 right-2.5 -translate-y-1/2 text-fg-muted/50 gds-icon-child-sm">
            {rightIcon}
          </span>
        )}
      </div>
    )
  },
)

export { inputVariants }
export type { InputProps }
