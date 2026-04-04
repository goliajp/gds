// dialog — modal overlay with focus trap, scroll lock, escape key
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useEscapeKey, useFocusTrap, useScrollLock } from '../utils/hooks'
import { renderPortal } from '../utils/portal'

type DialogWidth = 'default' | 'lg' | 'md' | 'sm' | 'xl'

const widthMap: Record<DialogWidth, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  default: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export type DialogProps = {
  /** Whether the dialog is visible */
  open: boolean
  /** Called when backdrop click, escape key, or close button */
  onClose: () => void
  /** Header title text */
  title?: string
  /** Subtitle shown below the title */
  description?: string
  children: ReactNode
  /** Enable frosted glass translucency effect */
  glass?: boolean
  /** Max-width preset for the dialog panel */
  width?: DialogWidth
  className?: string
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    open,
    onClose,
    title,
    description,
    children,
    glass,
    width = 'default',
    className,
  },
  ref
) {
  const trapRef = useFocusTrap(open)
  useScrollLock(open)
  useEscapeKey(open, onClose)

  if (!open) return null

  return renderPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      data-component="dialog"
      data-state="open"
    >
      <div
        ref={(node) => {
          // merge refs
          ;(trapRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node
          if (typeof ref === 'function') ref(node)
          else if (ref !== null && ref !== undefined)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node
        }}
        className={cx(
          'gds-ctx animate-popup gds-radius-card gds-shadow-xl w-full border',
          glass
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          widthMap[width],
          className
        )}
      >
        {(title !== undefined || description !== undefined) && (
          <div className="gds-gap border-border gds-pad-x-lg gds-pad-y-lg flex items-start justify-between border-b">
            <div className="min-w-0">
              {title !== undefined && (
                <h2 className="text-fg text-sm font-semibold">{title}</h2>
              )}
              {description !== undefined && (
                <p className="gds-text-body text-fg-muted mt-0.5">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className={cx(
                'gds-radius-button text-fg-muted hover:text-fg shrink-0 p-1',
                focusCls
              )}
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 3l8 8M11 3l-8 8" />
              </svg>
            </button>
          </div>
        )}
        <div className="gds-pad-x-lg gds-pad-y-lg">{children}</div>
      </div>
    </div>
  )
})

type DialogFooterProps = {
  children: ReactNode
  className?: string
}

function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cx(
        'gds-gap-sm border-border gds-pad-x-lg gds-pad-y flex items-center justify-end border-t',
        className
      )}
    >
      {children}
    </div>
  )
}

export { DialogFooter }
export type { DialogFooterProps }
