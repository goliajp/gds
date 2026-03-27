// form-layout — standard form container with header, body, and action footer
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type FormLayoutProps = {
  title?: string
  description?: string
  children: ReactNode
  actions?: ReactNode
  className?: string
}

export const FormLayout = forwardRef<HTMLDivElement, FormLayoutProps>(
  function FormLayout({ title, description, children, actions, className }, ref) {
    const hasHeader = title !== undefined || description !== undefined

    return (
      <div
        ref={ref}
        className={cx('flex flex-col', className)}
        data-component="form-layout"
      >
        {hasHeader && (
          <div className="mb-4">
            {title !== undefined && (
              <h2 className="gds-text-body font-semibold text-fg">{title}</h2>
            )}
            {description !== undefined && (
              <p className="mt-0.5 gds-text-body text-fg-muted">{description}</p>
            )}
          </div>
        )}
        <div className="flex flex-col gds-gap-lg">{children}</div>
        {actions !== undefined && (
          <div className="mt-6 flex justify-end gds-gap-sm">{actions}</div>
        )}
      </div>
    )
  },
)
