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
  function FormLayout(
    { title, description, children, actions, className },
    ref
  ) {
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
              <h2 className="gds-text-body text-fg font-semibold">{title}</h2>
            )}
            {description !== undefined && (
              <p className="gds-text-body text-fg-muted mt-0.5">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="gds-gap-lg flex flex-col">{children}</div>
        {actions !== undefined && (
          <div className="gds-gap-sm mt-6 flex justify-end">{actions}</div>
        )}
      </div>
    )
  }
)
