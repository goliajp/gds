// mention-list — suggestion dropdown for mention-input

import { cx } from '../utils/cx'

type MentionSuggestion = {
  id: string
  label: string
}

type MentionListProps = {
  filtered: MentionSuggestion[]
  highlightedIndex: number
  onSelect: (suggestion: MentionSuggestion) => void
  trigger: string
}

export function MentionList({ filtered, highlightedIndex, onSelect, trigger }: MentionListProps) {
  return (
    <div
      className="absolute left-0 right-0 top-full z-50 mt-1 gds-radius-popover border border-border bg-surface shadow-lg"
      role="listbox"
      data-testid="mention-suggestions"
    >
      {filtered.map((suggestion, index) => (
        <button
          key={suggestion.id}
          type="button"
          role="option"
          aria-selected={index === highlightedIndex}
          className={cx(
            'flex w-full items-center px-3 py-1.5 text-left text-sm text-fg transition-colors',
            index === highlightedIndex && 'bg-accent/10 text-accent',
            index !== highlightedIndex && 'hover:bg-bg-secondary',
          )}
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(suggestion)
          }}
        >
          <span className="mr-1.5 text-fg-muted">{trigger}</span>
          {suggestion.label}
        </button>
      ))}
    </div>
  )
}

export type { MentionListProps, MentionSuggestion }
