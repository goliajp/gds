// demo — shared components for rich item demos
// LivePreview, DemoCard, DocSection, DocTable, ImportLine, CodeBlock

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { codeToHtml } from 'shiki'

import { cx } from '@gds/utils/cx'

// code block — syntax-highlighted with copy button
export function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    codeToHtml(code, { lang, theme: 'vitesse-dark' })
      .then(result => { if (!cancelled) setHtml(result) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [code, lang])

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {})
  }

  return (
    <div className="relative">
      <div
        className="dc-code-block overflow-auto rounded-md bg-[#121212] px-4 py-3 text-xs leading-relaxed"
        data-selectable
        dangerouslySetInnerHTML={html !== '' ? { __html: html } : undefined}
      >
        {html === '' ? <pre className="text-fg-muted/60"><code>{code}</code></pre> : undefined}
      </div>
      <button
        className={cx(
          'absolute right-2 top-2 rounded px-1.5 py-0.5 text-xs transition-colors',
          copied ? 'text-success' : 'text-fg-muted/25 hover:text-fg-muted/50',
        )}
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? '✓' : 'copy'}
      </button>
    </div>
  )
}

// live preview — centered canvas with dot grid background
export function LivePreview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className="mt-4 overflow-visible border border-border bg-surface shadow-sm"
      style={{ borderRadius: 'var(--gds-radius-card, 12px)' }}
    >
      <div
        className="flex items-center gap-2 border-b border-border/50 bg-bg-secondary px-3 select-none"
        style={{ padding: 'var(--gds-pad-y, 6px) var(--gds-pad-x, 12px)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/15 ring-1 ring-fg-muted/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/15 ring-1 ring-fg-muted/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/15 ring-1 ring-fg-muted/25" />
        </div>
        <span className="text-xs font-semibold tracking-wide text-fg-muted/40 uppercase">Live Preview</span>
      </div>
      <div className={cx(
        'flex min-h-40 items-center justify-center overflow-visible dc-canvas-bg',
        className,
      )} style={{ padding: 'var(--gds-pad-x-lg, 16px)' }}>
        {children}
      </div>
    </div>
  )
}

// demo card — example with title, description, live preview, and collapsible code
export function DemoCard({ title, description, code, children, full }: {
  title: string
  description?: string
  code?: string
  children: ReactNode
  full?: boolean
}) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div
      className={cx(
        'flex flex-col overflow-visible border border-border bg-surface shadow-sm transition-colors hover:border-border',
        full === true && 'lg:col-span-2',
      )}
      style={{ borderRadius: 'var(--gds-radius-card, 12px)' }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 border-b border-border/50 bg-bg-secondary select-none"
        style={{ padding: 'var(--gds-pad-y, 6px) var(--gds-pad-x, 12px)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/15 ring-1 ring-fg-muted/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/15 ring-1 ring-fg-muted/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted/15 ring-1 ring-fg-muted/25" />
        </div>
        <div className="flex flex-1 items-baseline gap-2 pl-1">
          <span className="text-xs font-semibold tracking-wide text-fg uppercase">{title}</span>
          {description !== undefined && (
            <span className="text-xs text-fg-muted/50">{description}</span>
          )}
        </div>
        {code !== undefined && (
          <button
            className={cx(
              'flex items-center gap-1 rounded px-1.5 py-0.5 text-xs transition-colors',
              showCode ? 'text-accent' : 'text-fg-muted/30 hover:bg-bg-tertiary/50 hover:text-fg',
            )}
            onClick={() => setShowCode(prev => !prev)}
          >
            {showCode ? 'Hide' : 'Code'}
          </button>
        )}
      </div>

      {/* preview */}
      <div className="flex-1 overflow-visible" style={{ padding: 'var(--gds-pad-x, 12px)' }}>
        {children}
      </div>

      {/* code block — now with syntax highlighting + copy */}
      {showCode && code !== undefined && (
        <div className="border-t border-border/50">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  )
}

// doc section — titled section with anchor link and optional grid layout
export function DocSection({ title, columns = 1, children }: {
  title: string
  columns?: 1 | 2 | 3
  children: ReactNode
}) {
  return (
    <div className="mt-8 scroll-mt-8">
      <h3 className="group mb-4 flex items-center gap-2 text-base font-semibold text-fg">
        {title}
        <div className="h-px flex-1 bg-border" />
      </h3>
      <div className={
        columns === 3
          ? 'grid grid-cols-1 lg:grid-cols-3'
          : columns === 2
            ? 'grid grid-cols-1 lg:grid-cols-2'
            : 'flex flex-col'
      } style={{ gap: 'var(--gds-gap-lg, 12px)' }}>
        {children}
      </div>
    </div>
  )
}

// unified table — column dividers, proper widths, readable text
export function DocTable({ headers, rows, compact, flexColumn }: {
  headers?: string[]
  rows: string[][]
  compact?: boolean
  flexColumn?: number
}) {
  const cols = headers ?? ['Prop', 'Description', 'Type', 'Default']
  const hPy = compact === true ? 'py-1.5' : 'py-2.5'
  const cellPy = compact === true ? 'py-2' : 'py-2.5'
  const flexIdx = flexColumn ?? autoFlexColumn(cols)

  return (
    <div
      className="border border-border"
      style={{ borderRadius: 'var(--gds-radius-lg, 8px)' }}
      data-selectable
    >
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr>
            {cols.map((col, ci) => (
              <th
                key={col}
                className={cx(
                  'px-3 py-1.5 text-left text-[10px] font-semibold text-fg-muted/60 whitespace-nowrap',
                  ci < cols.length - 1 && 'border-r border-r-border/30',
                  'border-b border-b-border bg-bg-secondary',
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, ri) => (
            <tr
              key={ri}
              className={ri < rows.length - 1 ? 'border-b border-b-border/30' : ''}
            >
              {cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={cx(
                    'px-3 py-1.5 break-words',
                    ci < cols.length - 1 && 'border-r border-r-border/30',
                    ci === 0 && 'font-mono text-accent whitespace-nowrap',
                    ci === flexIdx && 'text-fg-muted',
                    ci > 0 && ci !== flexIdx && 'text-fg-muted/70 font-mono',
                  )
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// pick which column gets flexible width
function autoFlexColumn(cols: string[]): number {
  if (cols.length <= 2) return cols.length - 1
  const wideNames = ['description', 'purpose', 'role', 'rule', 'content', 'details', 'notes']
  for (let i = 0; i < cols.length; i++) {
    if (wideNames.includes(cols[i].toLowerCase())) return i
  }
  return 1
}

function colWidth(cols: string[], idx: number): string {
  const name = cols[idx].toLowerCase()
  if (name === 'prop' || name === 'name') return '160px'
  if (name === 'type') return '240px'
  if (name === 'default') return '100px'
  if (name === 'version') return '100px'
  if (name === 'layers' || name === 'used by') return '120px'
  if (name === 'module') return '140px'
  if (idx === cols.length - 1) return '100px'
  return '160px'
}

// import line — copyable import statement with syntax highlighting
export function ImportLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {})
  }

  return (
    <button
      className="mt-3 flex w-full items-center gap-2 border border-border bg-bg-secondary/40 text-left font-mono text-xs transition-colors hover:border-border"
      style={{
        borderRadius: 'var(--gds-radius-md, 6px)',
        padding: 'var(--gds-pad-y, 6px) var(--gds-pad-x, 12px)',
      }}
      onClick={handleCopy}
    >
      <span className="flex-1 truncate">
        <span className="text-[#c792ea]">import</span>
        <span className="text-fg-muted"> {'{ '}</span>
        <span className="text-fg">{text.match(/\{([^}]+)\}/)?.[1]?.trim() ?? text}</span>
        <span className="text-fg-muted">{' }'}</span>
        <span className="text-[#c792ea]"> from</span>
        <span className="text-[#c3e88d]"> &apos;{text.match(/from\s+'([^']+)'/)?.[1] ?? '@goliapkg/gds'}&apos;</span>
      </span>
      <span className={cx(
        'shrink-0 text-xs transition-colors',
        copied ? 'text-success' : 'text-fg-muted/30',
      )}>
        {copied ? '✓ copied' : 'copy'}
      </span>
    </button>
  )
}
