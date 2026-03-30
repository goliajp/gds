import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { isActivationKey } from '../utils/dom'

type CategoryTagProps = React.HTMLAttributes<HTMLDivElement> & {
  color: string
  count?: number
  label: string
  onClick?: () => void
}

export const CategoryTag = forwardRef<HTMLDivElement, CategoryTagProps>(
  function CategoryTag(
    { className, color, count, label, onClick, ...props },
    ref
  ) {
    return (
      <div
        className={cx(
          'border-border bg-surface inline-flex items-center gap-2 rounded-md border px-2.5 py-1',
          onClick !== undefined && 'hover:bg-bg-tertiary cursor-pointer',
          className
        )}
        data-component="category-tag"
        onClick={onClick}
        onKeyDown={
          onClick !== undefined
            ? (e) => {
                if (isActivationKey(e)) {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        ref={ref}
        role={onClick !== undefined ? 'button' : undefined}
        tabIndex={onClick !== undefined ? 0 : undefined}
        {...props}
      >
        <span
          className="h-3 w-1 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="gds-text-label text-fg">{label}</span>
        {count !== undefined && (
          <span className="gds-text-label text-fg-muted">{count}</span>
        )}
      </div>
    )
  }
)

export type { CategoryTagProps }
