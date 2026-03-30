// panel-group + panel — layout primitives for multi-pane content areas
// PaneGroup is a flex container, Pane is a flex child
// fixed-width panels on desktop, full-width stacked on mobile

import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { useIsMobile } from '../utils/hooks'

// ---- Pane ----

export type PaneProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** fixed width in px (desktop only), omit for flex-1 */
  width?: number
  /** minimum width in px */
  minWidth?: number
  /** maximum width in px */
  maxWidth?: number
  /** center content horizontally */
  center?: boolean
  /** enable vertical scroll, default true */
  scrollable?: boolean
  className?: string
}

export const Pane = forwardRef<HTMLDivElement, PaneProps>(
  function Pane({
    children,
    width,
    minWidth,
    maxWidth,
    center,
    scrollable = true,
    className,
    ...props
  }, ref) {
    const isMobile = useIsMobile()

    const style: React.CSSProperties = {}
    if (width !== undefined && !isMobile) {
      style.width = width
      style.flexShrink = 0
    }
    if (minWidth !== undefined && !isMobile) style.minWidth = minWidth
    if (maxWidth !== undefined && !isMobile) style.maxWidth = maxWidth

    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          width === undefined && 'flex-1',
          isMobile && 'w-full',
          scrollable && 'min-h-0 overflow-y-auto',
          center === true && 'flex justify-center',
          className,
        )}
        data-component="panel"
        style={Object.keys(style).length > 0 ? style : undefined}
      >
        {children}
      </div>
    )
  },
)

// ---- PaneGroup ----

export type PaneGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** layout direction, default 'horizontal' */
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export const PaneGroup = forwardRef<HTMLDivElement, PaneGroupProps>(
  function PaneGroup({ children, direction = 'horizontal', className, ...props }, ref) {
    const isMobile = useIsMobile()

    // on mobile, horizontal groups stack vertically
    const isVertical = direction === 'vertical' || isMobile

    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          'flex min-h-0 flex-1',
          isVertical ? 'flex-col' : 'flex-row',
          className,
        )}
        data-component="panel-group"
      >
        {children}
      </div>
    )
  },
)
