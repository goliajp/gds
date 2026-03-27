// form-pattern — sectioned form layout with title, description, and action bar
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { Separator } from '../l2-primitives/separator'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type FormSection = {
  title: string
  fields: ReactNode
}

export type FormPatternProps = {
  title?: string
  description?: string
  sections: FormSection[]
  actions?: ReactNode
  glass?: boolean
  className?: string
}

export const FormPattern = forwardRef<HTMLDivElement, FormPatternProps>(
  function FormPattern({ title, description, sections, actions, glass, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('gds-ctx flex flex-col gds-pad gds-radius-card', glassClass(glass), className)}
        data-component="form-pattern"
      >
        {(title !== undefined || description !== undefined) && (
          <div className="mb-4">
            {title !== undefined && (
              <h2 className="gds-heading font-semibold text-fg">{title}</h2>
            )}
            {description !== undefined && (
              <p className="mt-1 gds-text-body text-fg-muted">{description}</p>
            )}
          </div>
        )}
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && <Separator className="my-4" />}
            <div className="flex flex-col gds-gap">
              <h3 className="gds-text-body font-medium text-fg">{section.title}</h3>
              {section.fields}
            </div>
          </div>
        ))}
        {actions !== undefined && (
          <>
            <Separator className="my-4" />
            <div className="flex justify-end gds-gap-sm">{actions}</div>
          </>
        )}
      </div>
    )
  },
)

export type { FormSection }
