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
  function FormPattern(
    { title, description, sections, actions, glass, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-pad gds-radius-card flex flex-col',
          glassClass(glass),
          className
        )}
        data-component="form-pattern"
      >
        {(title !== undefined || description !== undefined) && (
          <div className="mb-4">
            {title !== undefined && (
              <h2 className="gds-heading text-fg font-semibold">{title}</h2>
            )}
            {description !== undefined && (
              <p className="gds-text-body text-fg-muted mt-1">{description}</p>
            )}
          </div>
        )}
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && <Separator className="my-4" />}
            <div className="gds-gap flex flex-col">
              <h3 className="gds-text-body text-fg font-medium">
                {section.title}
              </h3>
              {section.fields}
            </div>
          </div>
        ))}
        {actions !== undefined && (
          <>
            <Separator className="my-4" />
            <div className="gds-gap-sm flex justify-end">{actions}</div>
          </>
        )}
      </div>
    )
  }
)

export type { FormSection }
