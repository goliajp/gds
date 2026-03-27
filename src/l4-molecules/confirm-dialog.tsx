// confirm-dialog — pre-composed confirmation dialog with cancel/confirm buttons
import { forwardRef } from 'react'

import { Button } from '../l2-primitives/button'
import { Dialog } from './dialog'

type ConfirmDialogProps = {
  cancelLabel?: string
  className?: string
  confirmLabel?: string
  loading?: boolean
  message?: string
  onClose: () => void
  onConfirm: () => void
  open: boolean
  title?: string
  variant?: 'danger' | 'default'
}

export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  function ConfirmDialog(
    {
      cancelLabel = 'Cancel',
      className,
      confirmLabel = 'Confirm',
      loading = false,
      message,
      onClose,
      onConfirm,
      open,
      title = 'Confirm',
      variant = 'default',
    },
    ref,
  ) {
    return (
      <Dialog className={className} onClose={onClose} open={open} ref={ref} title={title} width="sm">
        <div className="flex flex-col gds-gap" data-component="confirm-dialog" data-variant={variant}>
          {message !== undefined && <p className="gds-text-body text-fg-muted">{message}</p>}
          <div className="flex items-center justify-end gds-gap-sm">
            <Button disabled={loading} onClick={onClose} size="sm" variant="ghost">
              {cancelLabel}
            </Button>
            <Button
              disabled={loading}
              onClick={onConfirm}
              size="sm"
              variant={variant === 'danger' ? 'danger' : 'primary'}
            >
              {loading ? 'Loading...' : confirmLabel}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  },
)

export type { ConfirmDialogProps }
