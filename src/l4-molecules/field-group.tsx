// field-group — titled group of form fields with optional multi-column grid
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type FieldGroupColumns = 1 | 2 | 3

const columnClasses: Record<FieldGroupColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}

export type FieldGroupProps = {
  children: ReactNode
  columns?: FieldGroupColumns
  title?: string
  description?: string
  className?: string
}

export const FieldGroup = forwardRef<HTMLFieldSetElement, FieldGroupProps>(
  function FieldGroup({ children, columns = 1, title, description, className }, ref) {
    return (
      <fieldset ref={ref} className={cx('space-y-4', className)} data-component="field-group">
        {title !== undefined && (
          <div>
            <legend className="text-sm font-semibold text-fg">{title}</legend>
            {description !== undefined && (
              <p className="mt-0.5 gds-text-body text-fg-muted">{description}</p>
            )}
          </div>
        )}
        <div className={cx('grid gds-gap', columnClasses[columns])}>{children}</div>
      </fieldset>
    )
  },
)

export type { FieldGroupColumns }
