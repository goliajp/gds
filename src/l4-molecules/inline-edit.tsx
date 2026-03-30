// inline-edit — editable text with confirm/cancel buttons and validation
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type InlineEditProps = {
  value: string
  onSave: (value: string) => void
  onCancel?: () => void
  validate?: (value: string) => string | null
  placeholder?: string
  disabled?: boolean
  className?: string
}

const checkIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 7.5l3 3 6-6.5" />
  </svg>
)

const cancelIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
)

const editIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 2l3 3-7 7H0V9z" />
  </svg>
)

export const InlineEdit = forwardRef<HTMLDivElement, InlineEditProps>(
  function InlineEdit(
    {
      value,
      onSave,
      onCancel,
      validate,
      placeholder = 'Click to edit',
      disabled,
      className,
    },
    ref
  ) {
    const [editing, setEditing] = useState(false)
    const [editValue, setEditValue] = useState(value)
    const [error, setError] = useState<string | null>(null)

    const startEditing = useCallback(() => {
      if (disabled === true) return
      setEditValue(value)
      setError(null)
      setEditing(true)
    }, [disabled, value])

    const save = useCallback(() => {
      if (validate !== undefined) {
        const err = validate(editValue)
        if (err !== null) {
          setError(err)
          return
        }
      }
      setEditing(false)
      setError(null)
      onSave(editValue)
    }, [editValue, onSave, validate])

    const cancel = useCallback(() => {
      setEditing(false)
      setEditValue(value)
      setError(null)
      if (onCancel !== undefined) {
        onCancel()
      }
    }, [onCancel, value])

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
        <div
          ref={ref}
          className={cx('inline-flex flex-col', className)}
          data-component="inline-edit"
          data-state="editing"
        >
          <div className="flex items-center gap-1">
            <input
              autoFocus
              className={cx(
                'gds-text-body text-fg border-accent/50 border-b bg-transparent px-0.5 outline-none',
                error !== null && 'border-danger/50',
                focusCls
              )}
              onChange={(e) => {
                setEditValue(e.target.value)
                setError(null)
              }}
              onKeyDown={handleKeyDown}
              type="text"
              value={editValue}
            />
            <button
              type="button"
              onClick={save}
              className={cx(
                'text-success hover:text-success/80 shrink-0 p-0.5',
                focusCls
              )}
              aria-label="Save"
            >
              {checkIcon}
            </button>
            <button
              type="button"
              onClick={cancel}
              className={cx(
                'text-fg-muted hover:text-fg shrink-0 p-0.5',
                focusCls
              )}
              aria-label="Cancel"
            >
              {cancelIcon}
            </button>
          </div>
          {error !== null && (
            <span className="text-danger mt-0.5 text-[10px]">{error}</span>
          )}
        </div>
      )
    }

    const isEmpty = value === ''

    return (
      <div
        ref={ref}
        className={cx(
          'group inline-flex cursor-pointer items-center gap-1',
          disabled === true && 'pointer-events-none opacity-50',
          className
        )}
        data-component="inline-edit"
        data-state="display"
        onClick={startEditing}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') startEditing()
        }}
        role="button"
        tabIndex={disabled === true ? -1 : 0}
      >
        <span
          className={cx(
            'gds-text-body',
            isEmpty ? 'text-fg-muted' : 'text-fg',
            focusCls
          )}
        >
          {isEmpty ? placeholder : value}
        </span>
        <span className="text-fg-muted/0 group-hover:text-fg-muted/60 transition-colors">
          {editIcon}
        </span>
      </div>
    )
  }
)
