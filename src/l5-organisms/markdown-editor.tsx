// markdown-editor — split pane editor with live preview
import { forwardRef, useCallback } from 'react'

import { cx } from '../utils/cx'
import { MarkdownPreview } from './markdown-preview'

type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  function MarkdownEditor({ value, onChange, placeholder, className }, ref) {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      [onChange],
    )

    return (
      <div
        ref={ref}
        className={cx('flex gap-px rounded-lg border border-border bg-surface overflow-hidden', className)}
        data-component="markdown-editor"
      >
        <textarea
          className="flex-1 resize-none bg-transparent p-3 text-sm text-fg outline-none font-mono min-h-[200px]"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <div className="w-px bg-border" />
        <div className="flex-1 overflow-auto min-h-[200px]">
          <MarkdownPreview content={value} className="h-full" />
        </div>
      </div>
    )
  },
)

export { MarkdownEditor }
export type { MarkdownEditorProps }
