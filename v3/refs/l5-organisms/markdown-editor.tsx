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
      [onChange]
    )

    return (
      <div
        ref={ref}
        className={cx(
          'border-border bg-surface flex gap-px overflow-hidden rounded-lg border',
          className
        )}
        data-component="markdown-editor"
      >
        <textarea
          className="text-fg min-h-[200px] flex-1 resize-none bg-transparent p-3 font-mono text-sm outline-none"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <div className="bg-border w-px" />
        <div className="min-h-[200px] flex-1 overflow-auto">
          <MarkdownPreview content={value} className="h-full" />
        </div>
      </div>
    )
  }
)

export { MarkdownEditor }
export type { MarkdownEditorProps }
