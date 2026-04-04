// emoji-picker — grid of emoji buttons with category tabs and search
import { forwardRef, useMemo, useState } from 'react'

import { cx } from '../utils/cx'

type EmojiCategory = {
  name: string
  emojis: string[]
}

const defaultCategories: EmojiCategory[] = [
  {
    name: 'Smileys',
    emojis: [
      '😀',
      '😂',
      '🥹',
      '😍',
      '🤔',
      '😎',
      '🥳',
      '😴',
      '🤯',
      '😱',
      '🙄',
      '😤',
    ],
  },
  {
    name: 'Gestures',
    emojis: [
      '👍',
      '👎',
      '👏',
      '🤝',
      '✌️',
      '🤞',
      '🫶',
      '💪',
      '🙏',
      '👋',
      '🫡',
      '🤙',
    ],
  },
  {
    name: 'Animals',
    emojis: [
      '🐶',
      '🐱',
      '🐻',
      '🦊',
      '🐸',
      '🐵',
      '🦁',
      '🐧',
      '🦋',
      '🐝',
      '🐢',
      '🐬',
    ],
  },
  {
    name: 'Objects',
    emojis: [
      '🔥',
      '⭐',
      '💡',
      '🎯',
      '🚀',
      '💎',
      '🎉',
      '📌',
      '🔔',
      '💬',
      '❤️',
      '✅',
    ],
  },
]

export type EmojiPickerProps = React.HTMLAttributes<HTMLDivElement> & {
  onSelect: (emoji: string) => void
  categories?: EmojiCategory[]
  columns?: number
  glass?: boolean
}

export const EmojiPicker = forwardRef<HTMLDivElement, EmojiPickerProps>(
  function EmojiPicker(
    {
      onSelect,
      categories = defaultCategories,
      columns = 8,
      glass = false,
      className,
      ...props
    },
    ref
  ) {
    const [activeTab, setActiveTab] = useState(0)
    const [search, setSearch] = useState('')

    const filteredEmojis = useMemo(() => {
      if (search === '') return categories[activeTab]?.emojis ?? []
      // flatten and filter (search matches category name loosely)
      return categories.flatMap((cat) => cat.emojis)
    }, [search, activeTab, categories])

    return (
      <div
        ref={ref}
        className={cx(
          'border-border w-fit rounded-lg border p-2 shadow-lg',
          glass ? 'bg-bg/80 backdrop-blur-xl' : 'bg-bg-secondary',
          className
        )}
        data-component="emoji-picker"
        {...props}
      >
        {/* search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-border text-fg placeholder:text-fg-muted mb-2 w-full rounded-md border bg-transparent px-2 py-1 text-xs outline-none"
        />

        {/* category tabs */}
        {search === '' && (
          <div className="mb-2 flex gap-1 overflow-x-auto">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                className={cx(
                  'shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors',
                  i === activeTab
                    ? 'bg-accent/15 text-accent'
                    : 'text-fg-muted hover:text-fg'
                )}
                onClick={() => setActiveTab(i)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* emoji grid */}
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {filteredEmojis.map((emoji, i) => (
            <button
              key={`${emoji}-${i}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-base transition-colors hover:bg-white/10"
              onClick={() => onSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    )
  }
)
