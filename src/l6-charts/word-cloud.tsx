import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const PALETTE = Array.from({ length: 10 }, (_, i) => `var(--gds-palette-${i})`)

export type WordCloudProps = {
  words: { text: string; weight: number }[]
  maxFontSize?: number
  minFontSize?: number
  glass?: boolean
  height?: number
  className?: string
}

export const WordCloud = forwardRef<HTMLDivElement, WordCloudProps>(
  function WordCloud(
    { words, maxFontSize = 48, minFontSize = 12, glass, height = 300, className, ...props },
    ref,
  ) {
    const weights = words.map((w) => w.weight)
    const minW = Math.min(...weights)
    const maxW = Math.max(...weights)
    const range = maxW - minW

    return (
      <div
        className={cx(
          'flex flex-wrap items-center justify-center gap-2 overflow-hidden gds-radius-popover border border-[var(--gds-border,#e5e7eb)]',
          glass && 'backdrop-blur-md bg-white/5',
          className,
        )}
        data-component="word-cloud"
        ref={ref}
        style={{ height }}
        {...props}
      >
        {words.map((w, i) => {
          const t = range === 0 ? 0.5 : (w.weight - minW) / range
          const fontSize = Math.round(minFontSize + t * (maxFontSize - minFontSize))
          return (
            <span
              className="inline-block select-none px-1"
              key={`${w.text}-${i}`}
              style={{ fontSize, color: PALETTE[i % PALETTE.length] }}
            >
              {w.text}
            </span>
          )
        })}
      </div>
    )
  },
)
