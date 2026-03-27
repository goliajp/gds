// table — lightweight styled table wrapper
// for when DataTable is overkill — just semantic HTML table elements with styling
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  striped?: boolean
  compact?: boolean
  hoverable?: boolean
  glass?: boolean
  className?: string
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  function Table({ striped, compact, hoverable = true, glass, className, children, ...props }, ref) {
    return (
      <div
        data-component="table"
        data-striped={striped ?? undefined}
        data-compact={compact ?? undefined}
        className={cx(
          'gds-radius-popover overflow-hidden border border-border',
          glassClass(glass),
          striped && '[&_tbody_tr:nth-child(even)]:bg-bg-secondary/30',
          compact && '[&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-1',
          !compact && '[&_th]:gds-pad-x [&_th]:py-1.5 [&_td]:gds-pad-x [&_td]:gds-pad-y',
          hoverable && '[&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-bg-tertiary/30',
          '[&_th]:bg-bg-tertiary/50 [&_th]:text-left [&_th]:font-medium [&_th]:text-fg-muted [&_th]:border-b [&_th]:border-border [&_th]:gds-text-body',
          '[&_td]:border-b [&_td]:border-border [&_td]:gds-text-body [&_tbody_tr:last-child_td]:border-0',
          className,
        )}
      >
        <table ref={ref} className="w-full" {...props}>
          {children}
        </table>
      </div>
    )
  },
)
