// code-snippet — compact code display with optional line numbers and copy
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type CodeSnippetProps = {
  code: string
  language?: string
  copyable?: boolean
  showLineNumbers?: boolean
  glass?: boolean
  className?: string
}

export const CodeSnippet = forwardRef<HTMLPreElement, CodeSnippetProps>(
  function CodeSnippet({ code, language, copyable = true, showLineNumbers = true, glass, className }, ref) {
    const [copied, setCopied] = useState(false)
    const lines = code.split('\n')

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {
        // clipboard api not available
      })
    }, [code])

    return (
      <div
        className={cx(
          'group relative overflow-hidden gds-radius-popover border',
          glass === true
            ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
            : 'border-border/40 bg-bg-secondary',
          className,
        )}
        data-component="code-snippet"
      >
        {/* header */}
        {language !== undefined && (
          <div className="flex items-center justify-between border-b border-border/20 px-3 py-1.5">
            <span className="select-none text-[10px] uppercase text-fg-muted/40">
              {language}
            </span>
          </div>
        )}

        {/* copy button */}
        {copyable && (
          <button
            type="button"
            aria-label="Copy code"
            className={cx(
              'absolute top-2 right-2 flex h-6 w-6 items-center justify-center gds-radius-button bg-bg-tertiary/80 text-fg-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-fg',
              focusCls,
            )}
            onClick={handleCopy}
          >
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7.5l3 3 5-6" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4.5" y="4.5" width="7" height="7" rx="1.5" />
                <path d="M9.5 4.5V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5A1.5 1.5 0 003 9.5h1.5" />
              </svg>
            )}
          </button>
        )}

        {/* code */}
        <pre
          ref={ref}
          className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed text-fg"
          data-selectable
        >
          <code>
            {lines.map((line, i) => (
              <div className="flex" key={i}>
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-6 shrink-0 select-none text-right text-fg-muted/30">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    )
  },
)
