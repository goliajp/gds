// currency-input — formatted number input with currency symbol
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type CurrencyInputProps = {
  value: number | null
  onChange: (value: number | null) => void
  currency?: string
  locale?: string
  min?: number
  max?: number
  disabled?: boolean
  error?: boolean
  placeholder?: string
  className?: string
}

function formatNumber(num: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(num)
}

function clampValue(val: number, min?: number, max?: number): number {
  let result = val
  if (min !== undefined && result < min) result = min
  if (max !== undefined && result > max) result = max
  return result
}

export const CurrencyInput = forwardRef<HTMLDivElement, CurrencyInputProps>(
  function CurrencyInput(
    {
      value,
      onChange,
      currency = '\u00a5',
      locale = 'ja-JP',
      min,
      max,
      disabled = false,
      error = false,
      placeholder = '0',
      className,
    },
    ref,
  ) {
    const [editing, setEditing] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const displayValue = value !== null ? formatNumber(value, locale) : ''

    const handleFocus = useCallback(() => {
      setEditing(true)
      setInputValue(value !== null ? String(value) : '')
    }, [value])

    const handleBlur = useCallback(() => {
      setEditing(false)
      const stripped = inputValue.replace(/[^\d.-]/g, '')
      if (stripped === '' || stripped === '-') {
        onChange(null)
        return
      }
      const parsed = Number(stripped)
      if (Number.isNaN(parsed)) {
        onChange(null)
        return
      }
      onChange(clampValue(parsed, min, max))
    }, [inputValue, max, min, onChange])

    const handleChange = useCallback((raw: string) => {
      // allow digits, minus, and dot during editing
      const cleaned = raw.replace(/[^\d.-]/g, '')
      setInputValue(cleaned)
    }, [])

    return (
      <div
        ref={ref}
        className={cx(
          'inline-flex items-center gds-h gds-radius-input border',
          error ? 'border-danger' : 'border-border',
          disabled && 'cursor-not-allowed opacity-40',
          className,
        )}
        data-component="currency-input"
        data-disabled={disabled ? '' : undefined}
        data-error={error ? '' : undefined}
      >
        <span className="select-none pl-3 text-fg-muted gds-text-body">{currency}</span>
        <input
          type="text"
          inputMode="numeric"
          value={editing ? inputValue : displayValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={cx(
            'flex-1 bg-transparent px-2 text-right text-fg gds-text-body focus:outline-none',
            focusCls,
          )}
          aria-label="Currency amount"
        />
      </div>
    )
  },
)
