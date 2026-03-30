// status-page — full-page status display for 404, 500, maintenance, etc.
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type StatusPageProps = {
  code?: string | number
  title: string
  description?: string
  action?: ReactNode
  secondaryAction?: ReactNode
  illustration?: ReactNode
  className?: string
}

export const StatusPage = forwardRef<HTMLDivElement, StatusPageProps>(
  function StatusPage(
    {
      code,
      title,
      description,
      action,
      secondaryAction,
      illustration,
      className,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center',
          className
        )}
        data-component="status-page"
      >
        {illustration !== undefined && (
          <div className="mb-2">{illustration}</div>
        )}
        {code !== undefined && (
          <p className="text-fg-muted/10 text-6xl font-bold">{code}</p>
        )}
        <h1 className="text-fg text-xl font-semibold">{title}</h1>
        {description !== undefined && (
          <p className="text-fg-muted max-w-md">{description}</p>
        )}
        {(action !== undefined || secondaryAction !== undefined) && (
          <div className="mt-2 flex items-center gap-3">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    )
  }
)
