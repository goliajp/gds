// text-reveal — text that reveals character-by-character or word-by-word
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type TextRevealProps = {
  by?: 'character' | 'word'
  className?: string
  staggerDelay?: number
  text: string
}

export const TextReveal = forwardRef<HTMLSpanElement, TextRevealProps>(
  function TextReveal({ by = 'word', className, staggerDelay = 50, text }, ref) {
    const parts = useMemo(() => {
      if (by === 'character') return text.split('')
      return text.split(' ')
    }, [by, text])

    return (
      <span ref={ref} className={cx('inline', className)} data-component="text-reveal" aria-label={text}>
        {parts.map((part, i) => (
          <span
            key={`${i}-${part}`}
            className="inline-block animate-fadeIn opacity-0"
            style={{ animationDelay: `${i * staggerDelay}ms`, animationFillMode: 'forwards' }}
            aria-hidden
          >
            {part}
            {by === 'word' && i < parts.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    )
  },
)
