import { cva } from 'class-variance-authority'
import { forwardRef, useCallback } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'
import { NumberStepper } from './number-stepper'

const numberInputVariants = cva(
  'flex items-center gds-radius-input border bg-bg text-fg transition-colors ' +
    '[&:has(input:focus-visible)]:ring-2 [&:has(input:focus-visible)]:ring-accent [&:has(input:focus-visible)]:ring-offset-1 [&:has(input:focus-visible)]:ring-offset-bg',
  {
    compoundVariants: [
      {
        error: true,
        className:
          '[&:has(input:focus-visible)]:ring-danger',
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

type NumberInputProps = VariantProps<typeof numberInputVariants> & {
  className?: string
  disabled?: boolean
  glass?: boolean
  max?: number
  min?: number
  onChange: (value: number | null) => void
  placeholder?: string
  step?: number
  value: number | null
}

function clamp(val: number, min?: number, max?: number): number {
  let result = val
  if (min !== undefined && result < min) {
    result = min
  }
  if (max !== undefined && result > max) {
    result = max
  }
  return result
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    { className, disabled, error, glass, inputSize, max, min, onChange, placeholder, step = 1, value },
    ref,
  ) {
    const handleDecrement = useCallback(() => {
      const base = value ?? 0
      onChange(clamp(base - step, min, max))
    }, [value, step, min, max, onChange])

    const handleIncrement = useCallback(() => {
      const base = value ?? 0
      onChange(clamp(base + step, min, max))
    }, [value, step, min, max, onChange])

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        if (raw === '') {
          onChange(null)
          return
        }
        const parsed = Number(raw)
        if (Number.isNaN(parsed)) {
          return
        }
        onChange(clamp(parsed, min, max))
      },
      [min, max, onChange],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          handleIncrement()
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          handleDecrement()
        }
      },
      [handleIncrement, handleDecrement],
    )

    return (
      <div
        className={cx(
          numberInputVariants({ error, inputSize }),
          glassClass(glass),
          glass === true && 'border-white/10 bg-bg/60',
          disabled === true && 'cursor-not-allowed opacity-50',
          className,
        )}
        data-component="number-input"
      >
        <NumberStepper direction="decrement" disabled={disabled} onClick={handleDecrement} />
        <input
          className={cx(
            'min-w-0 flex-1 bg-transparent text-center outline-none placeholder:text-fg-muted/50',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          )}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={ref}
          type="number"
          value={value ?? ''}
        />
        <NumberStepper direction="increment" disabled={disabled} onClick={handleIncrement} />
      </div>
    )
  },
)

export { numberInputVariants, NumberInput }
export type { NumberInputProps }
