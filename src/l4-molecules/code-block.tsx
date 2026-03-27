// code-block — styled code display with line numbers and copy button
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type CodeBlockProps = {
  code: string
  language?: string
  showLineNumbers?: boolean
  maxHeight?: number | string
  glass?: boolean
  className?: string
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  function CodeBlock({ code, language, showLineNumbers = true, maxHeight, glass, className }, ref) {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }).catch(() => {
        // clipboard api not available
      })
    }, [code])

    const lines = code.split('\n')
    const lineNumberWidth = String(lines.length).length

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border overflow-hidden',
          glass === true
            ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
            : 'border-border bg-bg-tertiary',
          className,
        )}
        data-component="code-block"
        data-variant={glass === true ? 'glass' : 'default'}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5">
          <span className="select-none text-xs text-fg-muted" data-testid="code-language">
            {language ?? 'code'}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={cx(
              'select-none gds-radius-button px-2 py-0.5 text-xs text-fg-muted transition-colors hover:text-fg',
              focusCls,
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7.5l3 3 5-6" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4.5" y="4.5" width="7" height="7" rx="1.5" />
                <path d="M9.5 4.5V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5A1.5 1.5 0 003 9.5h1.5" />
              </svg>
            )}
          </button>
        </div>

        {/* code body */}
        <div
          className="overflow-auto"
          style={maxHeight !== undefined ? { maxHeight } : undefined}
          data-selectable
        >
          <pre className="m-0 p-0">
            <code className="block px-3 py-2 font-mono text-xs leading-5 text-fg">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  {showLineNumbers && (
                    <span
                      className="mr-3 inline-block select-none border-r border-border/30 pr-3 text-right text-fg-muted/40"
                      style={{ minWidth: `${lineNumberWidth}ch` }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1 whitespace-pre">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    )
  },
)
