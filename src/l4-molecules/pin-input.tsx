// pin-input — PIN/OTP code input with auto-focus progression
import type { ClipboardEvent, KeyboardEvent } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type PinInputProps = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  error?: boolean
  length?: number
  mask?: boolean
  numeric?: boolean
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  value?: string
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  function PinInput(
    {
      className,
      disabled = false,
      error = false,
      length = 4,
      mask = false,
      numeric = false,
      onChange,
      onComplete,
      value,
      ...props
    },
    ref,
  ) {
    const [internalValues, setInternalValues] = useState<string[]>(() =>
      Array.from({ length }, () => ''),
    )
    const isControlled = value !== undefined
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const setInputRef = useCallback(
      (index: number) => (el: HTMLInputElement | null) => {
        inputRefs.current[index] = el
      },
      [],
    )

    const focusInput = useCallback((index: number) => {
      const target = inputRefs.current[index]
      if (target !== null && target !== undefined) {
        target.focus()
      }
    }, [])

    const getDisplayValues = (): string[] => {
      if (isControlled) {
        return Array.from({ length }, (_, i) => value[i] ?? '')
      }
      return internalValues
    }

    const checkComplete = useCallback(
      (newValue: string, newValues?: string[]) => {
        if (onComplete !== undefined) {
          if (isControlled) {
            if (newValue.length === length) {
              onComplete(newValue)
            }
          } else if (
            newValues !== undefined &&
            newValues.every((v) => v !== '') &&
            newValues.join('').length === length
          ) {
            onComplete(newValues.join(''))
          }
        }
      },
      [isControlled, length, onComplete],
    )

    const handleInput = useCallback(
      (index: number, char: string) => {
        if (char.length !== 1) return
        if (numeric && !/^\d$/.test(char)) return

        if (isControlled) {
          const chars = (value ?? '').split('')
          while (chars.length < index) {
            chars.push('')
          }
          chars[index] = char
          const next = chars.join('')
          if (onChange !== undefined) {
            onChange(next)
          }
          checkComplete(next)
        } else {
          const newValues = [...internalValues]
          newValues[index] = char
          setInternalValues(newValues)
          checkComplete('', newValues)
        }

        if (index < length - 1) {
          focusInput(index + 1)
        }
      },
      [value, length, numeric, isControlled, internalValues, onChange, checkComplete, focusInput],
    )

    const handleKeyDown = useCallback(
      (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          e.preventDefault()
          if (isControlled) {
            const chars = (value ?? '').split('')
            if (chars[index] !== undefined && chars[index] !== '') {
              chars[index] = ''
              if (onChange !== undefined) {
                onChange(chars.join('').replace(/\s+$/, ''))
              }
            } else if (index > 0) {
              chars.splice(index - 1, 1)
              if (onChange !== undefined) {
                onChange(chars.join(''))
              }
              focusInput(index - 1)
            }
          } else {
            const newValues = [...internalValues]
            if (newValues[index] !== '') {
              newValues[index] = ''
              setInternalValues(newValues)
            } else if (index > 0) {
              newValues[index - 1] = ''
              setInternalValues(newValues)
              focusInput(index - 1)
            }
          }
        }
      },
      [value, isControlled, internalValues, onChange, focusInput],
    )

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        let pasted = e.clipboardData.getData('text').slice(0, length)
        if (numeric) {
          pasted = pasted.replace(/\D/g, '')
        }
        if (pasted.length === 0) return

        if (isControlled) {
          if (onChange !== undefined) {
            onChange(pasted)
          }
          checkComplete(pasted)
        } else {
          const newValues = Array.from({ length }, (_, i) => pasted[i] ?? '')
          setInternalValues(newValues)
          checkComplete('', newValues)
        }

        const nextIndex = Math.min(pasted.length, length - 1)
        focusInput(nextIndex)
      },
      [length, numeric, isControlled, onChange, checkComplete, focusInput],
    )

    const displayValues = getDisplayValues()

    return (
      <div
        className={cx('flex gap-2', error && 'animate-shake', className)}
        data-component="pin-input"
        ref={ref}
        {...props}
      >
        {Array.from({ length }, (_, i) => (
          <input
            aria-label={`${numeric ? 'Digit' : 'Pin digit'} ${i + 1}`}
            autoComplete={numeric ? 'one-time-code' : undefined}
            className={cx(
              'h-10 w-10 rounded-md border bg-bg text-center text-sm text-fg transition-colors outline-none',
              numeric && 'h-12 font-mono text-lg tabular-nums',
              error
                ? 'border-danger'
                : 'border-border hover:border-border-strong',
              focusCls,
              disabled && 'cursor-not-allowed opacity-50',
            )}
            disabled={disabled}
            inputMode={numeric ? 'numeric' : undefined}
            key={i}
            maxLength={1}
            onInput={(e) => {
              const target = e.target as HTMLInputElement
              const char = target.value
              if (char.length > 0) {
                handleInput(i, char[char.length - 1])
              }
              target.value = displayValues[i] ?? ''
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            pattern={numeric ? '[0-9]*' : undefined}
            ref={setInputRef(i)}
            type={mask ? 'password' : 'text'}
            value={
              mask && displayValues[i] !== undefined && displayValues[i] !== ''
                ? '\u2022'
                : (displayValues[i] ?? '')
            }
          />
        ))}
      </div>
    )
  },
)

export type { PinInputProps }
