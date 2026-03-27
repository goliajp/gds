// rich-select-list — option list dropdown for rich-select
import type { RichSelectOption } from './rich-select'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type RichSelectListProps = {
  options: RichSelectOption[]
  value: string | null
  focusedIndex: number
  glass?: boolean
  onSelect: (value: string) => void
  onFocus: (index: number) => void
}

export function RichSelectList({ options, value, focusedIndex, glass, onSelect, onFocus }: RichSelectListProps) {
  return (
    <div
      role="listbox"
      className={cx(
        'absolute z-50 mt-1 w-full gds-radius-popover border border-border bg-bg shadow-lg overflow-auto max-h-60',
        glassClass(glass),
      )}
    >
      {options.map((opt, i) => (
        <div
          key={opt.value}
          role="option"
          aria-selected={opt.value === value}
          data-focused={i === focusedIndex ? '' : undefined}
          className={cx(
            'flex items-start gap-2 px-3 py-2 cursor-pointer transition-colors',
            opt.value === value && 'bg-accent/10 text-accent',
            i === focusedIndex && 'bg-bg-tertiary/50',
            opt.value !== value && i !== focusedIndex && 'hover:bg-bg-tertiary/30',
          )}
          onClick={() => onSelect(opt.value)}
          onMouseEnter={() => onFocus(i)}
        >
          {opt.icon !== undefined && <span className="mt-0.5 shrink-0">{opt.icon}</span>}
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{opt.label}</div>
            {opt.description !== undefined && (
              <div className="text-xs text-fg-muted truncate">{opt.description}</div>
            )}
          </div>
          {opt.badge !== undefined && (
            <span className="shrink-0 rounded-full bg-bg-tertiary px-2 py-0.5 text-[10px] text-fg-muted">
              {opt.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
