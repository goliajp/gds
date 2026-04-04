// otp-input — one-time password digit input
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type OtpInputProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  length?: number
  onComplete: (code: string) => void
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  function OtpInput(
    { className, disabled, error, length = 6, onComplete },
    ref
  ) {
    const [values, setValues] = useState<string[]>(() =>
      new Array(length).fill('')
    )
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    const focusAt = useCallback((index: number) => {
      inputsRef.current[index]?.focus()
    }, [])

    const handleChange = useCallback(
      (index: number, char: string) => {
        const digit = char.replace(/\D/g, '').slice(-1)
        const next = [...values]
        next[index] = digit
        setValues(next)

        if (digit !== '' && index < length - 1) {
          focusAt(index + 1)
        }

        const code = next.join('')
        if (code.length === length && next.every((v) => v !== '')) {
          onComplete(code)
        }
      },
      [values, length, onComplete, focusAt]
    )

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && values[index] === '' && index > 0) {
          focusAt(index - 1)
        }
      },
      [values, focusAt]
    )

    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasted = e.clipboardData
          .getData('text')
          .replace(/\D/g, '')
          .slice(0, length)
        const next = new Array(length).fill('') as string[]
        for (let i = 0; i < pasted.length; i++) {
          next[i] = pasted[i]
        }
        setValues(next)
        focusAt(Math.min(pasted.length, length - 1))

        if (pasted.length === length) {
          onComplete(pasted)
        }
      },
      [length, onComplete, focusAt]
    )

    return (
      <div
        ref={ref}
        className={cx('gds-gap-sm flex items-center', className)}
        data-component="otp-input"
      >
        {values.map((v, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={v}
            disabled={disabled}
            className={cx(
              'text-fg bg-bg h-12 w-10 rounded border text-center text-lg font-semibold tabular-nums',
              error === true ? 'border-danger' : 'border-border',
              disabled === true && 'cursor-not-allowed opacity-50',
              focusCls
            )}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
          />
        ))}
      </div>
    )
  }
)
