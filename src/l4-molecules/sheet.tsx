// sheet — side panel overlay with slide transition
import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'
import { glassClass } from '../utils/glass'
import { useEscapeKey, useFocusTrap, useScrollLock } from '../utils/hooks'

type SheetSide = 'left' | 'right'

export type SheetProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  side?: SheetSide
  title?: string
  description?: string
  glass?: boolean
  width?: number | string
  className?: string
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  {
    open,
    onClose,
    children,
    side = 'right',
    title,
    description,
    glass,
    width = 320,
    className,
  },
  ref
) {
  const trapRef = useFocusTrap(open)
  useScrollLock(open)
  useEscapeKey(open, onClose)

  if (!open) return null

  const isRight = side === 'right'
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      data-component="sheet"
      data-state="open"
    >
      <div
        ref={mergeRefs(ref, trapRef)}
        style={style}
        className={cx(
          'gds-ctx gds-shadow-xl fixed top-0 bottom-0 flex flex-col border transition-transform duration-200',
          isRight ? 'right-0 border-l' : 'left-0 border-r',
          glass
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
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
        <div className="gds-pad-x-lg gds-pad-y-lg flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
})
