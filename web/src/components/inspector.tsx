import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

import { cx } from '@gds/utils/cx'

import { CodeBlock } from './demo'
import { layers } from './nav'

import type { ControlsProps, DevCenterItem, StageProps } from '../types'

type InspectorTab = 'props' | 'docs' | 'code'

type InspectorProps = {
  item: DevCenterItem | undefined
  stageProps: StageProps
  controlsProps: ControlsProps
}

export function Inspector({ item, stageProps, controlsProps }: InspectorProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [tab, setTab] = useState<InspectorTab>('props')

  const hasControls = item?.controls !== undefined
  const hasVariants = item?.variants !== undefined && item.variants.length > 1
  const hasDocs = item?.docs !== undefined
  const hasCode = item?.code !== undefined

  // compute smart default tab
  const defaultTab: InspectorTab = hasControls || hasVariants
    ? 'props'
    : hasDocs
      ? 'docs'
      : 'code'

  // reset tab when item changes
  useEffect(() => {
    const newDefault: InspectorTab = (item?.controls !== undefined || (item?.variants !== undefined && item.variants.length > 1))
      ? 'props'
      : item?.docs !== undefined
        ? 'docs'
        : 'code'
    setTab(newDefault)
  }, [item?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // collapsed strip
  if (collapsed) {
    return (
      <button
        className="flex w-7 shrink-0 flex-col items-center gap-2 border-l border-border bg-bg-secondary pt-3 text-fg-muted/40 transition-colors hover:bg-bg-tertiary hover:text-fg-muted/60"
        onClick={() => setCollapsed(false)}
        title="expand inspector"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="text-[10px] tracking-wider [writing-mode:vertical-lr]">
          Inspector
        </span>
      </button>
    )
  }

  if (item === undefined) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-fg-muted/20">
        No item selected
      </div>
    )
  }

  const meta = layers.find(l => l.id === item.layer)

  const availableTabs: { id: InspectorTab; label: string }[] = [
    ...(hasControls || hasVariants ? [{ id: 'props' as const, label: 'Props' }] : []),
    ...(hasDocs ? [{ id: 'docs' as const, label: 'Docs' }] : []),
    ...(hasCode ? [{ id: 'code' as const, label: 'Code' }] : []),
  ]

  // guard: if current tab is unavailable, fall back
  const activeTab = availableTabs.some(t => t.id === tab)
    ? tab
    : availableTabs[0]?.id ?? defaultTab

  return (
    <div className="flex h-full flex-col">
      {/* header: item name, layer badge, type badge, tags */}
      <div className="shrink-0 border-b border-border px-4 py-3">
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
          <span className={cx(
            'rounded px-1.5 py-0.5 text-xs font-medium',
            item.type === 'interactive' ? 'bg-accent/10 text-accent' : 'bg-fg-muted/10 text-fg-muted/60',
          )}>
            {item.type}
          </span>
          {item.tags !== undefined && item.tags.length > 0 && (
            <span className="truncate text-xs text-fg-muted/30">
              {item.tags.join(' · ')}
            </span>
          )}
        </div>
      </div>

      {/* tab bar + collapse button */}
      {availableTabs.length > 0 && (
        <div className="flex shrink-0 items-center border-b border-border">
          {availableTabs.map(t => (
            <button
              key={t.id}
              className={cx(
                'flex-1 px-3 py-2 text-xs transition-colors',
                activeTab === t.id
                  ? 'border-b-2 border-accent font-medium text-accent'
                  : 'text-fg-muted/50 hover:text-fg-muted/80',
              )}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
          <button
            className="mx-1 rounded p-1 text-fg-muted/20 transition-colors hover:bg-bg-tertiary hover:text-fg-muted/50"
            onClick={() => setCollapsed(true)}
            title="collapse inspector"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'props' && (
          <PropsPanel
            item={item}
            controlsProps={controlsProps}
          />
        )}

        {activeTab === 'docs' && hasDocs && (
          <div className="px-4 py-3">
            {item.docs!()}
          </div>
        )}

        {activeTab === 'code' && hasCode && (
          <CodePanel item={item} stageProps={stageProps} />
        )}
      </div>

      {/* empty state when no tabs available */}
      {availableTabs.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-xs text-fg-muted/20">
          No inspector content
        </div>
      )}
    </div>
  )
}

// props tab: controls + variants + reset button
function PropsPanel({ item, controlsProps }: {
  item: DevCenterItem
  controlsProps: ControlsProps
}) {
  const hasControls = item.controls !== undefined
  const hasVariants = item.variants !== undefined && item.variants.length > 1

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {/* variant selector */}
      {hasVariants && (
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-muted/40">
            Variant
          </div>
          <div className="flex flex-wrap gap-1">
            {item.variants!.map(v => (
              <button
                key={v}
                className={cx(
                  'rounded px-2 py-0.5 text-xs transition-colors',
                  v === controlsProps.variant
                    ? 'bg-accent text-accent-fg'
                    : 'bg-fg-muted/5 text-fg-muted/50 hover:text-fg-muted/80',
                )}
                onClick={() => controlsProps.setVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* controls */}
      {hasControls && item.controls!(controlsProps)}

      {/* reset button */}
      <button
        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded border border-border py-1.5 text-xs text-fg-muted/40 transition-colors hover:bg-bg-tertiary hover:text-fg-muted/60"
        onClick={controlsProps.resetConfig}
      >
        <RotateCcw className="h-3 w-3" />
        Reset to defaults
      </button>
    </div>
  )
}

// code tab: reuses CodeBlock from demo
function CodePanel({ item, stageProps }: {
  item: DevCenterItem
  stageProps: StageProps
}) {
  function getCode(): string | undefined {
    if (item.code === undefined) return undefined
    if (item.code.length > 0) {
      return (item.code as (props: StageProps) => string)(stageProps)
    }
    return (item.code as () => string)()
  }

  const code = getCode()
  if (code === undefined) return null

  return <CodeBlock code={code} />
}
