// tag-cloud — interactive tag cloud with counts and selection
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type TagCloudTag = {
  label: string
  count: number
}

export type TagCloudProps = {
  tags: TagCloudTag[]
  selected?: string[]
  onToggle?: (label: string) => void
  className?: string
}

export const TagCloud = forwardRef<HTMLDivElement, TagCloudProps>(
  function TagCloud({ tags, selected, onToggle, className }, ref) {
    const selectedSet = new Set(selected ?? [])
    return (
      <div
        ref={ref}
        className={cx('flex flex-wrap gap-2', className)}
        data-component="tag-cloud"
      >
        {tags.map((tag) => {
          const isSelected = selectedSet.has(tag.label)
          return (
            <button
              key={tag.label}
              type="button"
              onClick={() => onToggle?.(tag.label)}
              className={cx(
                'gds-text-body rounded-full px-3 py-1 font-medium transition-colors select-none',
                isSelected
                  ? 'bg-accent/15 text-accent'
                  : 'bg-bg-tertiary text-fg-muted hover:bg-bg-tertiary/80'
              )}
            >
              {tag.label}
              <span className="ml-1.5 text-[10px] opacity-60">{tag.count}</span>
            </button>
          )
        })}
      </div>
    )
  }
)
