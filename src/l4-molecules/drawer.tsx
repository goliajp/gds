// drawer — mobile-first bottom drawer with slide-up transition
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'
import { glassClass } from '../utils/glass'
import { useEscapeKey, useFocusTrap, useScrollLock } from '../utils/hooks'

type DrawerHeight = 'sm' | 'default' | 'lg' | 'full'

const heightMap: Record<DrawerHeight, string> = {
  sm: 'h-[30vh]',
  default: 'h-[50vh]',
  lg: 'h-[75vh]',
  full: 'h-screen',
}

export type DrawerProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  height?: DrawerHeight
  glass?: boolean
  className?: string
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { open, onClose, title, children, height = 'default', glass, className },
  ref
) {
  const trapRef = useFocusTrap(open)
  useScrollLock(open)
  useEscapeKey(open, onClose)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      data-component="drawer"
      data-state="open"
    >
      <div
        ref={mergeRefs(ref, trapRef)}
        className={cx(
          'gds-ctx fixed inset-x-0 bottom-0 flex flex-col rounded-t-xl border-t transition-transform duration-200',
          heightMap[height],
          glass
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          className
        )}
      >
        {/* drag handle */}
        <div className="flex justify-center py-2">
          <div
            className="bg-fg-muted/30 h-1 w-8 rounded-full"
            data-testid="drag-handle"
          />
        </div>

        {/* header */}
        {title !== undefined && (
          <div className="gds-pad-x-lg flex items-center justify-between pb-2">
            <h2 className="text-fg text-sm font-semibold">{title}</h2>
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

        {/* content */}
        <div className="gds-pad-x-lg gds-pad-y-lg flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
})
