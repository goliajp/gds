import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glowClass } from '../utils/glow'
import type { GlowColor } from '../utils/types'

type CheckboxProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> & {
  checked?: boolean
  checkIcon?: ReactNode
  /** Enable glow effect */
  glow?: boolean | GlowColor
  label?: string
  onChange?: (checked: boolean) => void
}

// default check SVG (no lucide dependency)
function DefaultCheck() {
  return (
    <svg
      className="text-accent-fg h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      checked = false,
      checkIcon,
      className,
      disabled = false,
      glow,
      label,
      onChange,
      ...props
    },
    ref
  ) {
    return (
      <button
        aria-checked={checked}
        className={cx(
          'gds-gap-sm inline-flex items-center select-none',
          disabled && 'cursor-not-allowed opacity-50',
          glowClass(glow),
          className
        )}
        data-component="checkbox"
        data-state={checked ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        ref={ref}
        role="checkbox"
        type="button"
        {...props}
      >
        <span
          className={cx(
            'gds-icon gds-radius-button inline-flex shrink-0 items-center justify-center border transition-colors',
            focusCls,
            checked
              ? 'border-accent bg-accent'
              : 'border-border bg-bg hover:border-accent/50'
          )}
        >
          <span
            className={cx(
              'transition-opacity',
              checked ? 'opacity-100' : 'opacity-0'
            )}
          >
            {checkIcon ?? <DefaultCheck />}
          </span>
        </span>
        {label !== undefined && (
          <span className="gds-text-body text-fg">{label}</span>
        )}
      </button>
    )
  }
)

const checkboxVariants = {
  state: {
    checked: 'border-accent bg-accent',
    unchecked: 'border-border bg-bg hover:border-accent/50',
  },
} as const

export { checkboxVariants }
export type { CheckboxProps }
