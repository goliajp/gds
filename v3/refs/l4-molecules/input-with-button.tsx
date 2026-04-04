import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type InputWithButtonProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  buttonLabel: string
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  value: string
}

export const InputWithButton = forwardRef<HTMLDivElement, InputWithButtonProps>(
  function InputWithButton(
    {
      buttonLabel,
      className,
      disabled = false,
      onChange,
      onSubmit,
      placeholder,
      value,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'border-border inline-flex items-center overflow-hidden rounded-md border',
          className
        )}
        data-component="input-with-button"
        ref={ref}
        {...props}
      >
        <input
          className="text-fg placeholder:text-fg-muted min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm outline-none"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit()
          }}
          placeholder={placeholder}
          type="text"
          value={value}
        />
        <button
          className="border-border bg-accent/10 text-accent hover:bg-accent/20 shrink-0 border-l px-3 py-1.5 text-sm font-medium disabled:opacity-50"
          disabled={disabled}
          onClick={onSubmit}
          type="button"
        >
          {buttonLabel}
        </button>
      </div>
    )
  }
)

export type { InputWithButtonProps }
