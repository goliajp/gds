import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type FormActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  loading?: boolean
  onCancel?: () => void
  onReset?: () => void
  onSave?: () => void
  saveLabel?: string
}

const btnBase = 'rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50'

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  function FormActions({ className, disabled, loading, onCancel, onReset, onSave, saveLabel = 'Save', ...props }, ref) {
    return (
      <div
        className={cx('flex items-center justify-end gds-gap', className)}
        data-component="form-actions"
        ref={ref}
        {...props}
      >
        {onReset !== undefined && (
          <button className={cx(btnBase, 'text-fg-muted hover:text-fg')} disabled={disabled} onClick={onReset} type="button">
            Reset
          </button>
        )}
        {onCancel !== undefined && (
          <button className={cx(btnBase, 'border border-border text-fg hover:bg-surface')} disabled={disabled} onClick={onCancel} type="button">
            Cancel
          </button>
        )}
        {onSave !== undefined && (
          <button className={cx(btnBase, 'bg-accent text-white hover:bg-accent/90')} disabled={disabled ?? loading} onClick={onSave} type="submit">
            {loading === true ? 'Saving...' : saveLabel}
          </button>
        )}
      </div>
    )
  },
)

export type { FormActionsProps }
