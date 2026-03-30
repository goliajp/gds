// rich-select-list — option list dropdown for rich-select
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { RichSelectOption } from './rich-select'

type RichSelectListProps = {
  options: RichSelectOption[]
  value: string | null
  focusedIndex: number
  glass?: boolean
  onSelect: (value: string) => void
  onFocus: (index: number) => void
}

export type { RichSelectListProps }

export function RichSelectList({
  options,
  value,
  focusedIndex,
  glass,
  onSelect,
  onFocus,
}: RichSelectListProps) {
  return (
    <div
      role="listbox"
      className={cx(
        'gds-radius-popover border-border bg-bg absolute z-50 mt-1 max-h-60 w-full overflow-auto border shadow-lg',
        glassClass(glass)
      )}
    >
      {options.map((opt, i) => (
        <div
          key={opt.value}
          role="option"
          aria-selected={opt.value === value}
          data-focused={i === focusedIndex ? '' : undefined}
          className={cx(
            'flex cursor-pointer items-start gap-2 px-3 py-2 transition-colors',
            opt.value === value && 'bg-accent/10 text-accent',
            i === focusedIndex && 'bg-bg-tertiary/50',
            opt.value !== value &&
              i !== focusedIndex &&
              'hover:bg-bg-tertiary/30'
          )}
          onClick={() => onSelect(opt.value)}
          onMouseEnter={() => onFocus(i)}
        >
          {opt.icon !== undefined && (
            <span className="mt-0.5 shrink-0">{opt.icon}</span>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm">{opt.label}</div>
            {opt.description !== undefined && (
              <div className="text-fg-muted truncate text-xs">
                {opt.description}
              </div>
            )}
          </div>
          {opt.badge !== undefined && (
            <span className="bg-bg-tertiary text-fg-muted shrink-0 rounded-full px-2 py-0.5 text-[10px]">
              {opt.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
