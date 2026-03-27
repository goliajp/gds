// inbox-layout — email/messaging split pane with list and detail
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type InboxLayoutProps = {
  list: ReactNode
  detail: ReactNode
  listWidth?: number
  className?: string
}

export const InboxLayout = forwardRef<HTMLDivElement, InboxLayoutProps>(
  function InboxLayout({ list, detail, listWidth = 360, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex h-full overflow-hidden', className)}
        data-component="inbox-layout"
      >
        <div
          className="shrink-0 overflow-y-auto border-r border-border"
          style={{ width: listWidth }}
        >
          {list}
        </div>
        <div className="min-w-0 flex-1 overflow-y-auto">
          {detail}
        </div>
      </div>
    )
  },
)
