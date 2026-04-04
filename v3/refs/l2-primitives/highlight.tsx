import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type HighlightProps = React.HTMLAttributes<HTMLSpanElement> & {
  text: string
  query: string
  highlightClass?: string
  caseSensitive?: boolean
}

export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  function Highlight(
    {
      text,
      query,
      highlightClass = 'bg-accent/20 text-accent',
      caseSensitive = false,
      className,
      ...props
    },
    ref
  ) {
    if (query === undefined || query === null || query === '') {
      return (
        <span
          className={className}
          data-component="highlight"
          ref={ref}
          {...props}
        >
          {text}
        </span>
      )
    }

    const safeText = text ?? ''
    const safeQuery = query ?? ''
    const flags = caseSensitive ? 'g' : 'gi'
    const escaped = safeQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = safeText.split(new RegExp(`(${escaped})`, flags))

    return (
      <span
        className={cx(className)}
        data-component="highlight"
        ref={ref}
        {...props}
      >
        {parts.map((part, i) => {
          const isMatch = caseSensitive
            ? part === query
            : part.toLowerCase() === query.toLowerCase()
          if (isMatch) {
            return (
              <mark className={cx('bg-transparent', highlightClass)} key={i}>
                {part}
              </mark>
            )
          }
          return part
        })}
      </span>
    )
  }
)
