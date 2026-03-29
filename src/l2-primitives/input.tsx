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
    /** Height and text scale preset (named inputSize to avoid HTML conflict) */
    inputSize?: 'default' | 'sm'
    /** Show red border for validation error state */
    error?: boolean
    /** Show clear button when input has value */
    clearable?: boolean
    /** Enable frosted glass translucency effect */
    glass?: boolean
    /** Icon element rendered on the left side */
    icon?: ReactNode
    /** Show spinner on the right side */
    loading?: boolean
    /** Callback when clear button is clicked */
    onClear?: () => void
    /** Icon element rendered on the right side */
    rightIcon?: ReactNode
  }

// inline spinner SVG (no lucide dependency at L2)
function InlineSpinner() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin text-fg-muted" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
    </svg>
  )
}

// inline X SVG for clear button
function InlineClear() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, clearable, error, glass, icon, inputSize, loading, onClear, rightIcon, value, ...props },
    ref,
  ) {
    const hasLeft = icon !== undefined
    const showClear = clearable === true && value !== undefined && value !== ''
    const showLoading = loading === true
    const hasRight = rightIcon !== undefined || showClear || showLoading

    // rightmost element: loading > clear > rightIcon
    const rightElement = showLoading
      ? <InlineSpinner />
      : showClear
        ? (
          <button
            aria-label="Clear"
            className="text-fg-muted/50 hover:text-fg-muted transition-colors"
            onClick={onClear}
            tabIndex={-1}
            type="button"
          >
            <InlineClear />
          </button>
        )
        : rightIcon

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
          value={value}
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
          value={value}
          {...props}
        />
        {hasRight && (
          <span className="absolute top-1/2 right-2.5 -translate-y-1/2 text-fg-muted/50 gds-icon-child-sm">
            {rightElement}
          </span>
        )}
      </div>
    )
  },
)

export { inputVariants }
export type { InputProps }
