import { forwardRef, useSyncExternalStore } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { Table } from './table'

type ResponsiveTableColumn = { key: string; header: string }

type ResponsiveTableProps = React.HTMLAttributes<HTMLDivElement> & {
  columns: ResponsiveTableColumn[]
  data: Record<string, unknown>[]
  glass?: boolean
  className?: string
}

// simple media query hook without useEffect
const mobileQuery =
  typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 1023px)')
    : null

function subscribeMobile(cb: () => void) {
  mobileQuery?.addEventListener('change', cb)
  return () => mobileQuery?.removeEventListener('change', cb)
}

function getIsMobile() {
  return mobileQuery?.matches ?? false
}

export const ResponsiveTable = forwardRef<HTMLDivElement, ResponsiveTableProps>(
  function ResponsiveTable({ columns, data, glass, className, ...props }, ref) {
    const isMobile = useSyncExternalStore(
      subscribeMobile,
      getIsMobile,
      () => false
    )

    if (isMobile) {
      return (
        <div
          className={cx('gds-gap flex flex-col', className)}
          data-component="responsive-table"
          data-mode="cards"
          ref={ref}
          {...props}
        >
          {data.map((row, i) => (
            <div
              key={i}
              className={cx(
                'gds-radius-popover border-border gds-pad border',
                glassClass(glass)
              )}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="gds-pad-y-sm flex justify-between"
                >
                  <span className="gds-text-caption text-fg-muted font-medium">
                    {col.header}
                  </span>
                  <span className="gds-text-body text-fg">
                    {String(row[col.key] ?? '')}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    return (
      <div
        data-component="responsive-table"
        data-mode="table"
        ref={ref}
        {...props}
      >
        <Table glass={glass} className={className}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>{String(row[col.key] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
)

export type { ResponsiveTableColumn, ResponsiveTableProps }
