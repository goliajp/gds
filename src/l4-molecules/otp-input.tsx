// otp-input — one-time password input with individual digit boxes
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  length?: number
  error?: boolean
  disabled?: boolean
  className?: string
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  function OtpInput(
    { value, onChange, onComplete, length = 6, error = false, disabled = false, className },
    ref,
  ) {
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const digits = Array.from({ length }, (_, i) => value[i] ?? '')

    const focusInput = useCallback((index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    }, [length])

    const updateValue = useCallback((newDigits: string[]) => {
      const next = newDigits.join('')
      onChange(next)
      if (next.length === length && newDigits.every((d) => d !== '')) {
        onComplete?.(next)
      }
    }, [length, onChange, onComplete])

    const handleInput = useCallback((index: number, char: string) => {
      if (disabled) return
      if (!/^\d$/.test(char)) return

      const newDigits = [...digits]
      newDigits[index] = char
      updateValue(newDigits)
      focusInput(index + 1)
    }, [digits, disabled, focusInput, updateValue])

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
      if (disabled) return

      if (e.key === 'Backspace') {
        e.preventDefault()
        const newDigits = [...digits]
        if (digits[index] !== '') {
          newDigits[index] = ''
          updateValue(newDigits)
        } else if (index > 0) {
          newDigits[index - 1] = ''
          updateValue(newDigits)
          focusInput(index - 1)
        }
      } else if (e.key === 'ArrowLeft') {
        focusInput(index - 1)
      } else if (e.key === 'ArrowRight') {
        focusInput(index + 1)
      }
    }, [digits, disabled, focusInput, updateValue])

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
      if (disabled) return
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      if (pasted.length === 0) return

      const newDigits = pasted.padEnd(length, '').split('').slice(0, length)
      // preserve empty slots for unfilled positions
      const result = newDigits.map((d, i) => (i < pasted.length ? d : digits[i] ?? ''))
      updateValue(result)
      focusInput(Math.min(pasted.length, length - 1))
    }, [digits, disabled, focusInput, length, updateValue])

    return (
      <div
        ref={ref}
        className={cx('inline-flex items-center gap-2', className)}
        data-component="otp-input"
        data-disabled={disabled ? '' : undefined}
        data-error={error ? '' : undefined}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${i + 1}`}
            className={cx(
              'h-10 w-10 rounded border bg-transparent text-center font-mono text-fg gds-radius-input gds-text-body',
              'focus:outline-none',
              focusedIndex === i && 'border-accent',
              error ? 'border-danger' : 'border-border',
              disabled && 'cursor-not-allowed opacity-40',
              focusCls,
            )}
            onChange={(e) => handleInput(i, e.target.value.slice(-1))}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(-1)}
          />
        ))}
      </div>
    )
  },
)
