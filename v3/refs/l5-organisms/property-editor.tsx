// property-editor — key-value property editor with inline editing
import { forwardRef } from 'react'

import { InlineEdit } from '../l4-molecules/inline-edit'
import { cx } from '../utils/cx'

type PropertyItem = {
  editable?: boolean
  key: string
  value: string
}

type PropertyEditorProps = {
  className?: string
  onChange?: (key: string, value: string) => void
  properties: PropertyItem[]
}

export const PropertyEditor = forwardRef<HTMLDivElement, PropertyEditorProps>(
  function PropertyEditor({ className, onChange, properties }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border overflow-hidden border',
          className
        )}
        data-component="property-editor"
      >
        {properties.map((prop, i) => (
          <div
            key={prop.key}
            className={cx(
              'gds-pad-x gds-pad-y-sm flex items-center justify-between',
              i < properties.length - 1 && 'border-border border-b'
            )}
          >
            <span className="gds-text-body text-fg-muted font-medium">
              {prop.key}
            </span>
            <div className="text-right">
              {prop.editable === true && onChange !== undefined ? (
                <InlineEdit
                  onSave={(v) => onChange(prop.key, v)}
                  value={prop.value}
                />
              ) : (
                <span className="gds-text-body text-fg">{prop.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
)

export type { PropertyEditorProps, PropertyItem }
