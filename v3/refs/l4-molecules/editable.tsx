// editable — inline editable text, click to edit, enter/blur to save, escape to cancel
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type EditableProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const Editable = forwardRef<HTMLSpanElement, EditableProps>(function Editable(
  { value, onChange, placeholder = 'Click to edit', disabled, className },
  ref
) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = useCallback(() => {
    if (disabled === true) return
    setDraft(value)
    setEditing(true)
    // auto-focus happens via autoFocus prop
  }, [disabled, value])

  const save = useCallback(() => {
    setEditing(false)
    onChange(draft)
  }, [draft, onChange])

  const cancel = useCallback(() => {
    setEditing(false)
    setDraft(value)
  }, [value])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        save()
      }
      if (e.key === 'Escape') {
        cancel()
      }
    },
    [save, cancel]
  )

  if (editing) {
    return (
      <input
        ref={inputRef}
        autoFocus
        className={cx(
          'gds-text-body text-fg bg-transparent underline outline-none',
          focusCls,
          className
        )}
        data-component="editable"
        data-state="editing"
        onBlur={save}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        value={draft}
      />
    )
  }

  const isEmpty = value === ''

  return (
    <span
      ref={ref}
      className={cx(
        'gds-text-body inline cursor-pointer hover:underline',
        disabled === true && 'pointer-events-none opacity-50',
        isEmpty ? 'text-fg-muted' : 'text-fg',
        focusCls,
        className
      )}
      data-component="editable"
      data-state="display"
      onClick={startEditing}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          startEditing()
        }
      }}
      role="button"
      tabIndex={disabled === true ? -1 : 0}
    >
      {isEmpty ? placeholder : value}
    </span>
  )
})

export { Editable }
export type { EditableProps }
