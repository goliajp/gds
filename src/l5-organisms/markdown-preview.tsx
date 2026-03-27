// markdown-preview — simple markdown renderer without external deps
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'
import { parseMarkdown } from './markdown-parser'

export type MarkdownPreviewProps = {
  content: string
  glass?: boolean
  className?: string
}

export const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  function MarkdownPreview({ content, glass, className }, ref) {
    const html = useMemo(() => parseMarkdown(content), [content])

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover gds-pad-x gds-pad-y text-sm text-fg leading-relaxed',
          glass === true && 'bg-white/5 backdrop-blur-md',
          className,
        )}
        data-component="markdown-preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  },
)
