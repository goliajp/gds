// composition-pattern — header + sidebar + content + footer layout composition
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type CompositionPatternProps = {
  header?: ReactNode
  sidebar?: ReactNode
  content: ReactNode
  footer?: ReactNode
  sidebarPosition?: 'left' | 'right'
  sidebarWidth?: number | string
  glass?: boolean
  className?: string
}

export const CompositionPattern = forwardRef<HTMLDivElement, CompositionPatternProps>(
  function CompositionPattern(
    { header, sidebar, content, footer, sidebarPosition = 'left', sidebarWidth = 240, glass, className },
    ref,
  ) {
    const width = typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth
    const isRight = sidebarPosition === 'right'

    const sidebarEl = sidebar !== undefined ? (
      <div
        className={cx(
          'shrink-0 overflow-auto',
          isRight ? 'border-l border-border' : 'border-r border-border',
        )}
        style={{ width }}
      >
        {sidebar}
      </div>
    ) : null

    return (
      <div
        ref={ref}
        className={cx('gds-ctx flex h-full flex-col', glassClass(glass), className)}
        data-component="composition-pattern"
      >
        {header !== undefined && (
          <div className="shrink-0 border-b border-border">{header}</div>
        )}
        <div className="flex min-h-0 flex-1">
          {isRight ? null : sidebarEl}
          <div className="flex-1 overflow-auto">{content}</div>
          {isRight ? sidebarEl : null}
        </div>
        {footer !== undefined && (
          <div className="shrink-0 border-t border-border">{footer}</div>
        )}
      </div>
    )
  },
)
