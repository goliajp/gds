// toast-provider — renders toast items from the global store
// place once at app root: <ToastProvider />
// then call toast.success('Done!') from anywhere

import { forwardRef, useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

import { cx } from '../utils/cx'
import { renderPortal } from '../utils/portal'
import { Toast } from './toast'
import type { ToastItem } from './toast-store'
import { toast as toastApi, toastStore } from './toast-store'

export type ToastPosition = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'

export type ToastProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  maxVisible?: number
  position?: ToastPosition
}

const positionStyles: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
}

const emptySnapshot: ToastItem[] = []

export const ToastProvider = forwardRef<HTMLDivElement, ToastProviderProps>(
  function ToastProvider({ position = 'bottom-right', maxVisible = 5, className, ...props }, ref) {
    const items = useSyncExternalStore(
      toastStore.subscribe,
      toastStore.getSnapshot,
      () => emptySnapshot,
    )
    const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

    const handleClose = useCallback((id: string) => {
      const timer = timersRef.current.get(id)
      if (timer !== undefined) {
        clearTimeout(timer)
        timersRef.current.delete(id)
      }
      toastApi.dismiss(id)
    }, [])

    // auto-dismiss timers
    useEffect(() => {
      const timers = timersRef.current
      const now = Date.now()
      for (const item of items) {
        if (item.duration > 0 && !timers.has(item.id)) {
          // account for elapsed time since creation (e.g. toast fired before provider mounted)
          const elapsed = now - item.createdAt
          const remaining = Math.max(0, item.duration - elapsed)
          if (remaining === 0) {
            toastApi.dismiss(item.id)
            continue
          }
          const timer = setTimeout(() => {
            timers.delete(item.id)
            toastApi.dismiss(item.id)
          }, remaining)
          timers.set(item.id, timer)
        }
      }
      // cleanup timers for removed items
      for (const [id, timer] of timers) {
        if (!items.some(i => i.id === id)) {
          clearTimeout(timer)
          timers.delete(id)
        }
      }
    }, [items])

    // cleanup all timers on unmount
    useEffect(() => {
      const timers = timersRef.current
      return () => {
        for (const timer of timers.values()) clearTimeout(timer)
        timers.clear()
      }
    }, [])

    const visible = items.slice(-maxVisible)
    if (visible.length === 0) return null

    const actionButton = (item: ToastItem) => {
      if (item.action === undefined) return undefined
      return (
        <button
          type="button"
          onClick={() => {
            item.action?.onClick()
            handleClose(item.id)
          }}
          className="shrink-0 gds-text-label font-medium text-accent hover:underline"
        >
          {item.action.label}
        </button>
      )
    }

    return renderPortal(
      <div
        {...props}
        ref={ref}
        className={cx(
          'fixed z-[var(--gds-z-toast)] flex w-80 flex-col gap-2 pointer-events-none',
          positionStyles[position],
          className,
        )}
        data-component="toast-provider"
        aria-live="polite"
        aria-label="Notifications"
      >
        {visible.map(item => (
          <div key={item.id} className="pointer-events-auto animate-slide-up">
            <Toast
              title={item.title}
              description={item.description}
              variant={item.variant}
              onClose={item.dismissible ? () => handleClose(item.id) : undefined}
              action={actionButton(item)}
            />
          </div>
        ))}
      </div>,
    )
  },
)
