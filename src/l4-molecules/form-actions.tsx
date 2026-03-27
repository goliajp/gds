import { forwardRef } from 'react'

import { Button } from '../l2-primitives/button'
import { cx } from '../utils/cx'

type FormActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  loading?: boolean
  onCancel?: () => void
  onReset?: () => void
  onSave?: () => void
  saveLabel?: string
}

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
          <Button variant="ghost" disabled={disabled} onClick={onReset} type="button">
            Reset
          </Button>
        )}
        {onCancel !== undefined && (
          <Button variant="secondary" disabled={disabled} onClick={onCancel} type="button">
            Cancel
          </Button>
        )}
        {onSave !== undefined && (
          <Button disabled={disabled ?? loading} loading={loading} onClick={onSave} type="submit">
            {loading === true ? 'Saving...' : saveLabel}
          </Button>
        )}
      </div>
    )
  },
)

export type { FormActionsProps }
