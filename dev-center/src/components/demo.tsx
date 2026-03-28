// demo — shared components for rich item demos
// LivePreview, DemoCard, DocSection, DocTable, ImportLine, CodeBlock

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { codeToTokens } from 'shiki'

import { cx } from '@gds/utils/cx'

// language metadata — color + display label per language
const langMeta: Record<string, { color: string; label: string }> = {
  tsx: { color: '#61dafb', label: 'tsx' },
  jsx: { color: '#61dafb', label: 'jsx' },
  ts: { color: '#3178c6', label: 'ts' },
  typescript: { color: '#3178c6', label: 'ts' },
  js: { color: '#f7df1e', label: 'js' },
  javascript: { color: '#f7df1e', label: 'js' },
  css: { color: '#a855f7', label: 'css' },
  bash: { color: '#4eaa25', label: 'bash' },
  shell: { color: '#4eaa25', label: 'shell' },
  sh: { color: '#4eaa25', label: 'sh' },
  json: { color: '#f59e0b', label: 'json' },
  html: { color: '#e34c26', label: 'html' },
  text: { color: '#6b7280', label: 'text' },
  plaintext: { color: '#6b7280', label: 'text' },
}

// auto-detect language from code content
function detectLang(code: string): string {
  const s = code.trimStart()
  if (/^(\$\s|bun |npm |npx |yarn |pnpm |git |cd |ls |mkdir |rm |cp |mv |curl |wget |brew )/.test(s)) return 'bash'
  if (/^#!\//.test(s)) return 'bash'
  if (/^(@import|@apply|@theme|@media|@keyframes|@source)/.test(s)) return 'css'
  if (/^\.[a-z][\w-]*\s*\{/m.test(s)) return 'css'
  if (/^[\[{]/.test(s.trim()) && /"/.test(s)) return 'json'
  // plain text: no code-like characters and no code keywords
  if (!/[(){};=<>]/.test(s) && !/^(import|export|const|let|var|type|function)\s/.test(s)) return 'text'
  return 'tsx'
}

type Token = { content: string; color?: string; fontStyle?: number }

// code block — token-level syntax highlighting with line numbers
export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const resolvedLang = lang ?? detectLang(code)
  const [tokens, setTokens] = useState<Token[][] | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    codeToTokens(code, { lang: resolvedLang, theme: 'vitesse-dark' })
      .then(result => { if (!cancelled) setTokens(result.tokens) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [code, resolvedLang])

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {})
  }

  // fall back to plain text lines while tokens load
  const lines = tokens ?? code.split('\n').map(line => [{ content: line }])
  const gutterW = Math.max(2, String(lines.length).length)
  const meta = langMeta[resolvedLang] ?? { color: '#6b7280', label: resolvedLang }

  return (
    <div className="dc-syntax overflow-hidden rounded-md border border-white/[0.06] bg-[#0d0d0d]">
      {/* header: language badge + copy */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-1">
        <span
          className="select-none text-[10px] font-semibold tracking-wider uppercase"
          style={{ color: meta.color }}
        >
          {meta.label}
        </span>
        <button
          className={cx(
            'select-none rounded px-1.5 py-0.5 text-[10px] transition-colors',
            copied ? 'text-success' : 'text-white/15 hover:text-white/40',
          )}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? '✓' : 'copy'}
        </button>
      </div>
      {/* code body with line number gutter */}
      <div className="overflow-x-auto" data-selectable>
        <pre className="m-0 py-1.5" style={{ tabSize: 2 }}>
          <code className="block">
            {lines.map((lineTokens, i) => (
              <div key={i} className="dc-syntax-line flex">
                <span
                  className="shrink-0 select-none pr-3 text-right text-[11px] leading-5 text-white/[0.12]"
                  style={{ minWidth: `${gutterW + 1.5}ch`, paddingLeft: '12px' }}
                  data-line={i + 1}
                >
                  {i + 1}
                </span>
                <span className="flex-1 border-l border-white/[0.04] pl-3 pr-4 text-[12px] leading-5 whitespace-pre">
                  {lineTokens.map((token, j) => {
                    const st: CSSProperties = {}
                    if (token.color !== undefined) st.color = token.color
                    if (token.fontStyle !== undefined) {
                      if (token.fontStyle & 1) st.fontStyle = 'italic'
                      if (token.fontStyle & 2) st.fontWeight = 'bold'
                      if (token.fontStyle & 4) st.textDecoration = 'underline'
                    }
                    return <span key={j} style={st}>{token.content}</span>
                  })}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

// live preview — centered canvas with dot grid background
export function LivePreview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className="mt-4 overflow-visible border border-border bg-surface/80 shadow-sm backdrop-blur-xl"
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
        'flex flex-col overflow-visible border border-border bg-surface/80 shadow-sm backdrop-blur-xl transition-colors hover:border-border',
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
                  )}
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
