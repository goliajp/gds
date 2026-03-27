import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type InputWithButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  buttonLabel: string
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  value: string
}

export const InputWithButton = forwardRef<HTMLDivElement, InputWithButtonProps>(
  function InputWithButton(
    { buttonLabel, className, disabled = false, onChange, onSubmit, placeholder, value, ...props },
    ref,
  ) {
    return (
      <div
        className={cx('inline-flex items-center overflow-hidden rounded-md border border-border', className)}
        data-component="input-with-button"
        ref={ref}
        {...props}
      >
        <input
          className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-fg outline-none placeholder:text-fg-muted"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
          placeholder={placeholder}
          type="text"
          value={value}
        />
        <button
          className="shrink-0 border-l border-border bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/20 disabled:opacity-50"
          disabled={disabled}
          onClick={onSubmit}
          type="button"
        >
          {buttonLabel}
        </button>
      </div>
    )
  },
)

export type { InputWithButtonProps }
