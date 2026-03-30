// toast-store — global imperative toast state management
// provides a Sonner-compatible API: toast.success('msg'), toast.error('msg'), etc.
// decoupled from React — store is a plain JS module, React reads via useSyncExternalStore

import type { ToastVariant } from './toast'

export type ToastOptions = {
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  description?: string
  dismissible?: boolean
}

export type ToastItem = {
  id: string
  title: string
  variant: ToastVariant
  description?: string
  duration: number
  dismissible: boolean
  action?: {
    label: string
    onClick: () => void
  }
  createdAt: number
}

// ---- store ----

let items: ToastItem[] = []
let nextId = 0
const listeners = new Set<() => void>()

function emit(): void {
  for (const fn of listeners) fn()
}

function addToast(title: string, variant: ToastVariant, options?: ToastOptions): string {
  const id = `gds-toast-${++nextId}`
  const item: ToastItem = {
    id,
    title,
    variant,
    description: options?.description,
    duration: options?.duration ?? 5000,
    dismissible: options?.dismissible !== false,
    action: options?.action,
    createdAt: Date.now(),
  }
  items = [...items, item]
  emit()
  return id
}

function dismiss(id: string): void {
  const prev = items
  items = items.filter(t => t.id !== id)
  if (items !== prev) emit()
}

function dismissAll(): void {
  if (items.length === 0) return
  items = []
  emit()
}

function getSnapshot(): ToastItem[] {
  return items
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// ---- public API ----

export const toast = {
  show: (title: string, options?: ToastOptions): string => addToast(title, 'default', options),
  success: (title: string, options?: ToastOptions): string => addToast(title, 'success', options),
  error: (title: string, options?: ToastOptions): string => addToast(title, 'danger', options),
  warning: (title: string, options?: ToastOptions): string => addToast(title, 'warning', options),
  info: (title: string, options?: ToastOptions): string => addToast(title, 'default', options),
  dismiss,
  dismissAll,
}

// for React consumption
export const toastStore = {
  getSnapshot,
  subscribe,
}
