// inbox-layout — responsive 3-pane email layout with resizable divider
// v2: complete rewrite from simple 2-pane to full-featured inbox layout
// desktop: sidebar? + list + detail with drag-resize
// mobile: one pane at a time with swipe/back navigation

import type { ReactNode } from 'react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useIsMobile } from '../utils/hooks'

export type InboxLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  /** left sidebar (e.g. app navigation) */
  sidebar?: ReactNode
  /** conversation list pane */
  list: ReactNode
  /** detail/thread pane — null shows empty state */
  detail?: ReactNode

  /** list pane width in px, default 360 */
  listWidth?: number
  /** min list width, default 280 */
  listMinWidth?: number
  /** max list width, default 500 */
  listMaxWidth?: number
  /** enable drag resize between list and detail, default true */
  resizable?: boolean

  /** which pane to show on mobile */
  mobileView?: 'detail' | 'list'
  /** callback when mobile view changes */
  onMobileViewChange?: (view: 'detail' | 'list') => void

  /** shown when detail is null */
  emptyState?: ReactNode

  /** batch action bar at bottom of list pane */
  batchActions?: ReactNode

  /** frosted glass effect */
  glass?: boolean
  className?: string
}

export const InboxLayout = forwardRef<HTMLDivElement, InboxLayoutProps>(
  function InboxLayout({
    sidebar,
    list,
    detail,
    listWidth: initialListWidth = 360,
    listMinWidth = 280,
    listMaxWidth = 500,
    resizable = true,
    mobileView = 'list',
    onMobileViewChange,
    emptyState,
    batchActions,
    glass,
    className,
    ...props
  }, ref) {
    const isMobile = useIsMobile()
    const [listWidth, setListWidth] = useState(initialListWidth)
    const isDragging = useRef(false)
    const dragStart = useRef({ x: 0, width: 0 })

    // drag resize handlers
    const handleDragStart = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      isDragging.current = true
      dragStart.current = { x: e.clientX, width: listWidth }
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }, [listWidth])

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return
        const delta = e.clientX - dragStart.current.x
        const newWidth = Math.max(listMinWidth, Math.min(listMaxWidth, dragStart.current.width + delta))
        setListWidth(newWidth)
      }

      const handleMouseUp = () => {
        if (!isDragging.current) return
        isDragging.current = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        // reset body styles if unmounted during drag
        if (isDragging.current) {
          isDragging.current = false
          document.body.style.cursor = ''
          document.body.style.userSelect = ''
        }
      }
    }, [listMinWidth, listMaxWidth])

    // double-click divider resets width
    const handleDividerDoubleClick = useCallback(() => {
      setListWidth(initialListWidth)
    }, [initialListWidth])

    // mobile back button handler
    const handleMobileBack = useCallback(() => {
      if (onMobileViewChange !== undefined) {
        onMobileViewChange('list')
      }
    }, [onMobileViewChange])

    // mobile: show one pane at a time
    if (isMobile) {
      return (
        <div
          {...props}
          ref={ref}
          className={cx('flex h-full flex-col overflow-hidden', className)}
          data-component="inbox-layout"
          data-state={mobileView}
          data-mobile-view={mobileView}
        >
          {mobileView === 'list' && (
            <div className="flex-1 min-h-0 overflow-y-auto">
              {list}
              {batchActions !== undefined && (
                <div className="sticky bottom-0 animate-slide-up">{batchActions}</div>
              )}
            </div>
          )}
          {mobileView === 'detail' && (
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-accent hover:bg-white/[0.04] border-b border-border"
                onClick={handleMobileBack}
                aria-label="Back to message list"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
              <div className="flex-1 min-h-0 overflow-y-auto">
                {detail ?? emptyState ?? null}
              </div>
            </div>
          )}
        </div>
      )
    }

    // desktop: multi-pane layout
    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          'flex h-full overflow-hidden',
          glassClass(glass),
          className,
        )}
        data-component="inbox-layout"
        data-state={detail !== undefined ? 'detail' : 'list'}
      >
        {/* sidebar */}
        {sidebar !== undefined && (
          <div className="shrink-0">{sidebar}</div>
        )}

        {/* list pane */}
        <div
          className="shrink-0 flex flex-col overflow-hidden border-r border-border"
          style={{ width: listWidth }}
        >
          <div className="flex-1 min-h-0 overflow-y-auto">
            {list}
          </div>
          {batchActions !== undefined && (
            <div className="shrink-0 border-t border-border animate-slide-up">
              {batchActions}
            </div>
          )}
        </div>

        {/* resize divider */}
        {resizable && (
          <div
            className="shrink-0 w-1 cursor-col-resize bg-transparent hover:bg-accent/20 active:bg-accent/30 transition-colors focus:bg-accent/20 focus:outline-none"
            onMouseDown={handleDragStart}
            onDoubleClick={handleDividerDoubleClick}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 50 : 10
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                setListWidth(prev => Math.max(listMinWidth, prev - step))
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                setListWidth(prev => Math.min(listMaxWidth, prev + step))
              } else if (e.key === 'Home') {
                e.preventDefault()
                setListWidth(listMinWidth)
              } else if (e.key === 'End') {
                e.preventDefault()
                setListWidth(listMaxWidth)
              }
            }}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize list pane"
            aria-valuenow={listWidth}
            aria-valuemin={listMinWidth}
            aria-valuemax={listMaxWidth}
            tabIndex={0}
          />
        )}

        {/* detail pane */}
        <div className="min-w-0 flex-1 overflow-y-auto">
          {detail ?? emptyState ?? null}
        </div>
      </div>
    )
  },
)
