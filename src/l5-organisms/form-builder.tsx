// form-builder — schema-driven form renderer
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type FormField = {
  id: string
  label: string
  type: 'checkbox' | 'number' | 'select' | 'text' | 'textarea'
  options?: string[]
  required?: boolean
  placeholder?: string
}

export type FormBuilderProps = {
  fields: FormField[]
  values: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
  className?: string
}

const inputCls = cx(
  'w-full gds-radius-button border border-border bg-bg gds-pad-x gds-pad-y-sm text-sm text-fg',
  'placeholder:text-fg-muted/50',
  focusCls,
)

function renderField(
  field: FormField,
  value: unknown,
  onChange: (id: string, value: unknown) => void,
) {
  const id = `form-field-${field.id}`

  if (field.type === 'checkbox') {
    return (
      <label htmlFor={id} className="flex cursor-pointer items-center gds-gap-sm select-none">
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(field.id, e.target.checked)}
          className={cx('h-4 w-4 rounded border-border', focusCls)}
        />
        <span className="text-sm text-fg">{field.label}</span>
        {field.required === true && <span className="text-danger">*</span>}
      </label>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className="flex flex-col gds-gap-xs">
        <label htmlFor={id} className="gds-text-body font-medium text-fg-muted select-none">
          {field.label}
          {field.required === true && <span className="ml-0.5 text-danger">*</span>}
        </label>
        <textarea
          id={id}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={cx(inputCls, 'min-h-[72px] resize-y')}
          rows={3}
        />
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div className="flex flex-col gds-gap-xs">
        <label htmlFor={id} className="gds-text-body font-medium text-fg-muted select-none">
          {field.label}
          {field.required === true && <span className="ml-0.5 text-danger">*</span>}
        </label>
        <select
          id={id}
          value={String(value ?? '')}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={cx(inputCls, 'cursor-pointer')}
        >
          <option value="">{field.placeholder ?? 'Select...'}</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    )
  }

  // text or number
  return (
    <div className="flex flex-col gds-gap-xs">
      <label htmlFor={id} className="gds-text-body font-medium text-fg-muted select-none">
        {field.label}
        {field.required === true && <span className="ml-0.5 text-danger">*</span>}
      </label>
      <input
        id={id}
        type={field.type}
        value={String(value ?? '')}
        placeholder={field.placeholder}
        onChange={(e) => {
          if (field.type === 'number') {
            onChange(field.id, e.target.value === '' ? '' : Number(e.target.value))
          } else {
            onChange(field.id, e.target.value)
          }
        }}
        className={inputCls}
      />
    </div>
  )
}

export const FormBuilder = forwardRef<HTMLDivElement, FormBuilderProps>(
  function FormBuilder({ fields, values, onChange, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-4', className)}
        data-component="form-builder"
      >
        {fields.map((field) => (
          <div key={field.id}>
            {renderField(field, values[field.id], onChange)}
          </div>
        ))}
      </div>
    )
  },
)
