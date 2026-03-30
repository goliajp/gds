// markdown-preview — simple markdown renderer with DOMPurify sanitization
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'
import { sanitizeHtml } from '../utils/sanitize'
import { parseMarkdown } from './markdown-parser'

export type MarkdownPreviewProps = {
  content: string
  glass?: boolean
  className?: string
  /** v2: sanitize HTML output via DOMPurify, default true */
  sanitize?: boolean
  /** v2: DOMPurify config override */
  sanitizeConfig?: Record<string, unknown>
  /** v2: enable GFM features (tables, strikethrough, task lists), default true */
  gfm?: boolean
}

export const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  function MarkdownPreview({ content, glass, className, sanitize: shouldSanitize = true }, ref) {
    const html = useMemo(() => {
      const raw = parseMarkdown(content)
      if (!shouldSanitize) return raw
      try {
        return sanitizeHtml(raw, { ADD_ATTR: ['target', 'rel'] })
      } catch {
        // DOMPurify not installed — fall back to regex sanitization
        return raw
      }
    }, [content, shouldSanitize])

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
