import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useState } from 'react'

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
    /** v2: static prefix text (e.g. "https://") */
    prefix?: string
    /** v2: static suffix text (e.g. ".example.com") */
    suffix?: string
    /** v2: show copy button that copies value to clipboard */
    copyable?: boolean
    /** v2: custom action element rendered inside input (right side) */
    action?: ReactNode
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

// inline copy icon
function InlineCopy({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg className="h-3.5 w-3.5 text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, clearable, copyable, error, glass, icon, inputSize, loading, onClear, rightIcon, value, prefix, suffix, action, ...props },
    ref,
  ) {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(() => {
      if (value === undefined) return
      navigator.clipboard.writeText(String(value)).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {
        // clipboard not available
      })
    }, [value])

    const hasLeft = icon !== undefined
    const hasPrefix = prefix !== undefined
    const hasSuffix = suffix !== undefined
    const showClear = clearable === true && value !== undefined && value !== ''
    const showCopy = copyable === true
    const showLoading = loading === true
    const hasRight = rightIcon !== undefined || showClear || showLoading || showCopy || action !== undefined

    // rightmost elements stack: action > copy > loading > clear > rightIcon
    const rightElements: ReactNode[] = []
    if (action !== undefined) rightElements.push(action)
    if (showCopy) {
      rightElements.push(
        <button
          key="copy"
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          className="text-fg-muted/50 hover:text-fg-muted transition-colors"
          onClick={handleCopy}
          tabIndex={-1}
          type="button"
        >
          <InlineCopy copied={copied} />
        </button>,
      )
    }
    if (showLoading) rightElements.push(<InlineSpinner key="spin" />)
    if (showClear) {
      rightElements.push(
        <button
          key="clear"
          aria-label="Clear"
          className="text-fg-muted/50 hover:text-fg-muted transition-colors"
          onClick={onClear}
          tabIndex={-1}
          type="button"
        >
          <InlineClear />
        </button>,
      )
    }
    if (rightIcon !== undefined && !showClear && !showLoading) rightElements.push(rightIcon)

    const needsWrapper = hasLeft || hasRight || hasPrefix || hasSuffix
    const glsCls = glassClass(glass)
    const glsExtra = glass === true ? 'border-white/10 bg-bg/60' : ''

    if (!needsWrapper) {
      return (
        <input
          className={cx(
            inputVariants({ error, inputSize }),
            'gds-pad-x',
            glsCls,
            glsExtra,
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
      <div
        className={cx(
          'relative flex items-center',
          (hasPrefix || hasSuffix) && 'gds-radius-input border border-border overflow-hidden bg-bg',
          (hasPrefix || hasSuffix) && error === true && 'border-danger',
          (hasPrefix || hasSuffix) && glsCls,
          (hasPrefix || hasSuffix) && glsExtra,
        )}
        data-component="input"
      >
        {hasPrefix && (
          <span className="shrink-0 bg-bg-secondary gds-pad-x gds-text-body text-fg-muted select-none border-r border-border flex items-center self-stretch">
            {prefix}
          </span>
        )}
        {hasLeft && !hasPrefix && (
          <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-fg-muted/50 gds-icon-child-sm">
            {icon}
          </span>
        )}
        <input
          className={cx(
            (hasPrefix || hasSuffix)
              ? 'flex-1 min-w-0 bg-transparent text-fg gds-text-body outline-none gds-pad-x disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-fg-muted/50 ' + (inputSize === 'sm' ? 'gds-h-sm gds-text-label' : 'gds-h')
              : inputVariants({ error, inputSize }),
            !hasPrefix && hasLeft ? 'pl-8' : !hasPrefix ? 'gds-pad-x' : '',
            hasRight ? 'pr-8' : !hasSuffix ? 'gds-pad-x' : '',
            !hasPrefix && !hasSuffix && glsCls,
            !hasPrefix && !hasSuffix && glsExtra,
            !hasPrefix && !hasSuffix && className,
          )}
          ref={ref}
          value={value}
          {...props}
        />
        {hasSuffix && (
          <span className="shrink-0 bg-bg-secondary gds-pad-x gds-text-body text-fg-muted select-none border-l border-border flex items-center self-stretch">
            {suffix}
          </span>
        )}
        {hasRight && !hasSuffix && (
          <span className="absolute top-1/2 right-2.5 -translate-y-1/2 flex items-center gap-1.5 text-fg-muted/50 gds-icon-child-sm">
            {rightElements}
          </span>
        )}
        {hasRight && hasSuffix && (
          <span className="shrink-0 flex items-center gap-1.5 pr-2.5 text-fg-muted/50 gds-icon-child-sm">
            {rightElements}
          </span>
        )}
      </div>
    )
  },
)

export { inputVariants }
export type { InputProps }
