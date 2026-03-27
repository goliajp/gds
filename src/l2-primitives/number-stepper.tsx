// number-stepper — increment/decrement buttons for number-input
import { cx } from '../utils/cx'

type NumberStepperProps = {
  direction: 'decrement' | 'increment'
  disabled?: boolean
  onClick: () => void
}

const btnBase =
  'flex items-center justify-center select-none px-2 text-fg-muted hover:text-fg hover:bg-bg-tertiary transition-colors disabled:cursor-not-allowed disabled:opacity-50'

export function NumberStepper({ direction, disabled, onClick }: NumberStepperProps) {
  const isDecrement = direction === 'decrement'
  return (
    <button
      aria-label={direction}
      className={cx(
        btnBase,
        isDecrement ? 'rounded-l-[inherit] border-r border-border' : 'rounded-r-[inherit] border-l border-border',
      )}
      disabled={disabled}
      onClick={onClick}
      tabIndex={-1}
      type="button"
    >
      {isDecrement ? '-' : '+'}
    </button>
  )
}
