// notification-toast — renders stacked toasts with auto-dismiss via portal
import { forwardRef, useEffect } from 'react'

import { Toast } from '../l4-molecules/toast'
import { cx } from '../utils/cx'
import { renderPortal } from '../utils/portal'

type ToastEntry = {
  id: string
  message?: string
  title: string
  variant?: 'danger' | 'info' | 'success' | 'warning'
}

type NotificationToastPosition = 'bottom-right' | 'top-right'

type NotificationToastProps = {
  className?: string
  onClose: (id: string) => void
  position?: NotificationToastPosition
  toasts: ToastEntry[]
}

const positionMap: Record<NotificationToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'bottom-right': 'bottom-4 right-4',
}

const variantToToast = (v?: ToastEntry['variant']) => {
  if (v === 'info') return 'default'
  return v ?? 'default'
}

export const NotificationToast = forwardRef<HTMLDivElement, NotificationToastProps>(
  function NotificationToast({ toasts, onClose, position = 'top-right', className }, ref) {
    useEffect(() => {
      const timers = toasts.map((t) =>
        window.setTimeout(() => onClose(t.id), 5000),
      )
      return () => timers.forEach((id) => window.clearTimeout(id))
    }, [toasts, onClose])

    if (toasts.length === 0) return null

    return renderPortal(
      <div
        ref={ref}
        className={cx('fixed z-50 flex w-80 flex-col gap-2', positionMap[position], className)}
        data-component="notification-toast"
      >
        {toasts.map((t) => (
          <Toast key={t.id} title={t.title} description={t.message} variant={variantToToast(t.variant)} onClose={() => onClose(t.id)} />
        ))}
      </div>,
    )
  },
)

export type { NotificationToastPosition, NotificationToastProps, ToastEntry }
