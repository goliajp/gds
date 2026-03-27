import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { codeToHtml } from 'shiki'

import { layers } from './nav'

import type { ControlsProps, DevCenterItem, StageProps } from '../types'

type InspectorProps = {
  item: DevCenterItem | undefined
  stageProps: StageProps
  controlsProps: ControlsProps
}

export function Inspector({ item, stageProps, controlsProps }: InspectorProps) {
  if (item === undefined) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-fg-muted/20">
        No item selected
      </div>
    )
  }

  const meta = layers.find(l => l.id === item.layer)
  const hasControls = item.controls !== undefined
  const hasCode = item.code !== undefined
  const hasDocs = item.docs !== undefined

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* component info header */}
      <div className="shrink-0 border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-fg">{item.label}</span>
          {meta !== undefined && (
            <span
              className="rounded px-1 py-px text-xs font-bold tracking-wider"
              style={{
                color: meta.color,
                background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
              }}
            >
              {meta.shortLabel}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className={[
            'rounded px-1.5 py-0.5 text-xs font-medium',
            item.type === 'interactive' ? 'bg-accent/10 text-accent' : 'bg-fg-muted/10 text-fg-muted/60',
          ].join(' ')}>
            {item.type}
          </span>
          {item.tags !== undefined && item.tags.length > 0 && (
            <span className="text-xs text-fg-muted/30 truncate">
              {item.tags.join(' · ')}
            </span>
          )}
        </div>
      </div>

      {/* controls section */}
      {hasControls && (
        <InspectorSection title="Controls" defaultOpen>
          <div className="px-4 pb-3">
            {item.controls!(controlsProps)}
          </div>
        </InspectorSection>
      )}

      {/* variants */}
      {item.variants !== undefined && item.variants.length > 1 && (
        <InspectorSection title="Variants" defaultOpen>
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-1">
              {item.variants.map(v => (
                <button
                  key={v}
                  className={[
                    'rounded px-2 py-0.5 text-xs transition-colors',
                    v === controlsProps.variant
                      ? 'bg-accent text-accent-fg'
                      : 'bg-fg-muted/5 text-fg-muted/50 hover:text-fg-muted/80',
                  ].join(' ')}
                  onClick={() => controlsProps.setVariant(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </InspectorSection>
      )}

      {/* code section */}
      {hasCode && (
        <InspectorSection title="Code" defaultOpen>
          <CodeBlock item={item} stageProps={stageProps} />
        </InspectorSection>
      )}

      {/* docs section */}
      {hasDocs && (
        <InspectorSection title="API Reference" defaultOpen={!hasControls && !hasCode}>
          <div className="px-4 pb-3">
            {item.docs!()}
          </div>
        </InspectorSection>
      )}

      {/* empty state */}
      {!hasControls && !hasCode && !hasDocs && (
        <div className="flex flex-1 items-center justify-center text-xs text-fg-muted/20">
          No inspector content
        </div>
      )}
    </div>
  )
}

// collapsible section
function InspectorSection({ title, defaultOpen = false, children }: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-white/[0.04]">
      <button
        className="flex w-full items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-fg-muted/3"
        onClick={() => setOpen(prev => !prev)}
      >
        <svg
          className={[
            'h-3 w-3 shrink-0 text-fg-muted/30 transition-transform',
            open ? 'rotate-90' : '',
          ].join(' ')}
          viewBox="0 0 16 16" fill="currentColor"
        >
          <path d="M6 3l5 5-5 5V3z" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-fg-muted/40">
          {title}
        </span>
      </button>
      {open && children}
    </div>
  )
}

// code block with shiki syntax highlighting + copy
function CodeBlock({ item, stageProps }: { item: DevCenterItem; stageProps: StageProps }) {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  function getCode(): string | undefined {
    if (item.code === undefined) return undefined
    if (item.code.length > 0) {
      return (item.code as (props: StageProps) => string)(stageProps)
    }
    return (item.code as () => string)()
  }

  const code = getCode()

  useEffect(() => {
    if (code === undefined) return
    let cancelled = false
    codeToHtml(code, {
      lang: 'tsx',
      theme: 'vitesse-dark',
    }).then(result => {
      if (!cancelled) setHtml(result)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [code])

  if (code === undefined) return null

  function handleCopy() {
    navigator.clipboard.writeText(code!).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {})
  }

  return (
    <div className="relative px-3 pb-3">
      <div
        ref={containerRef}
        className="dc-code-block overflow-auto rounded-md bg-[#121212] px-3 py-2.5 text-xs leading-relaxed"
        data-selectable
        dangerouslySetInnerHTML={html !== '' ? { __html: html } : undefined}
      >
        {html === '' ? <pre className="text-fg-muted/50"><code>{code}</code></pre> : undefined}
      </div>
      <button
        className={[
          'absolute right-4 top-1.5 rounded px-1.5 py-0.5 text-xs transition-colors',
          copied ? 'text-success' : 'text-fg-muted/25 hover:text-fg-muted/50',
        ].join(' ')}
        onClick={handleCopy}
      >
        {copied ? '✓' : 'copy'}
      </button>
    </div>
  )
}
