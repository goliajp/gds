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

// semantic sub-components for manual table composition

export const Thead = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function Thead({ className, ...props }, ref) {
    return <thead ref={ref} className={className} {...props} />
  },
)

export const Tbody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function Tbody({ className, ...props }, ref) {
    return <tbody ref={ref} className={className} {...props} />
  },
)

export const Tfoot = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function Tfoot({ className, ...props }, ref) {
    return <tfoot ref={ref} className={cx('bg-bg-secondary font-semibold', className)} {...props} />
  },
)

export const Tr = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  function Tr({ className, ...props }, ref) {
    return <tr ref={ref} className={cx('transition-colors', className)} {...props} />
  },
)

export const Th = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  function Th({ className, ...props }, ref) {
    return <th ref={ref} className={cx('border border-border bg-bg-secondary px-2.5 py-1.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-fg-muted', className)} {...props} />
  },
)

export const Td = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function Td({ className, ...props }, ref) {
    return <td ref={ref} className={cx('border border-border/60 px-2.5 py-1.5 text-xs whitespace-nowrap text-fg', className)} {...props} />
  },
)

export const ThNum = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  function ThNum({ className, ...props }, ref) {
    return <th ref={ref} className={cx('border border-border bg-bg-secondary px-2.5 py-1.5 text-right text-xs font-semibold tracking-wide whitespace-nowrap text-fg-muted', className)} {...props} />
  },
)

export const TdNum = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TdNum({ className, ...props }, ref) {
    return <td ref={ref} className={cx('border border-border/60 px-2.5 py-1.5 text-right text-xs tabular-nums whitespace-nowrap text-fg', className)} {...props} />
  },
)

export const TdMuted = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TdMuted({ className, ...props }, ref) {
    return <td ref={ref} className={cx('border border-border/60 px-2.5 py-1.5 text-xs whitespace-nowrap text-fg-muted', className)} {...props} />
  },
)

export const TdFoot = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TdFoot({ className, ...props }, ref) {
    return <td ref={ref} className={cx('border border-border bg-bg-secondary px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-fg', className)} {...props} />
  },
)

export const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cx('mt-2 text-xs text-fg-muted', className)} {...props} />
  },
)

export const TableFooter = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableFooter({ className, ...props }, ref) {
    return <tfoot ref={ref} className={cx('bg-bg-secondary font-semibold', className)} {...props} />
  },
)

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
