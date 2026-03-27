import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Sidebar, StatsCard } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt8: DevCenterItem[] = []

// stats-card
const statsCardItem: DevCenterItem = {
  id: 'stats-card',
  label: 'StatsCard',
  layer: 'l7',
  type: 'interactive',
  tags: ['stats', 'kpi', 'metric', 'card', 'trend', 'sparkline', 'pattern'],
  defaultConfig: { label: 'Revenue', value: '$12,345', trend: 12.5, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StatsCard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            label={config.label}
            value={config.value}
            trend={config.trend}
            sparkData={[2, 5, 3, 8, 6, 9, 7, 12]}
            glass={config.glass}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            }
          />
          <StatsCard
            label="Users"
            value="1,284"
            trend={-3.2}
            sparkData={[8, 6, 7, 4, 5, 3, 4, 2]}
            glass={config.glass}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="text" label="value" value={config.value} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="number" label="trend" value={config.trend} min={-100} max={100} onChange={(v) => setConfig('trend', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['icon', 'Icon element', 'ReactNode', '—'],
        ['label', 'Metric label', 'string', '—'],
        ['value', 'Display value', 'string | number', '—'],
        ['trend', 'Percentage change', 'number', '—'],
        ['sparkData', 'Mini chart data points', 'number[]', '—'],
        ['glass', 'Glass material', 'boolean', 'false'],
      ]} />
    </div>
  ),
}
patternItemsExt8.push(statsCardItem)

// sidebar
function SidebarDemo({ glass }: { glass: boolean }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-64 rounded-lg border border-white/[0.04] overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        glass={glass}
      >
        <div className="flex flex-col gap-1 p-2">
          {['Home', 'Dashboard', 'Settings'].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-fg-muted hover:bg-white/5 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
              </svg>
              {!collapsed && <span>{item}</span>}
            </div>
          ))}
        </div>
      </Sidebar>
      <div className="flex-1 flex items-center justify-center text-sm text-fg-muted">
        Content area
      </div>
    </div>
  )
}

const sidebarItem: DevCenterItem = {
  id: 'sidebar',
  label: 'Sidebar',
  layer: 'l7',
  type: 'interactive',
  tags: ['sidebar', 'navigation', 'collapsible', 'panel', 'pattern'],
  defaultConfig: { glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Sidebar } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <SidebarDemo glass={config.glass} />
      </LivePreview>
      <DocSection title="Examples">
        <DemoCard title="Right position" description="Sidebar on the right side" code={`<Sidebar position="right" collapsed={false}>\n  ...\n</Sidebar>`}>
          <div className="flex h-32 rounded overflow-hidden border border-white/[0.04]">
            <div className="flex-1 flex items-center justify-center text-[10px] text-fg-muted">Content</div>
            <Sidebar position="right" width={120}>
              <div className="p-2 text-[10px] text-fg-muted">Right nav</div>
            </Sidebar>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Sidebar content', 'ReactNode', '—'],
        ['collapsed', 'Collapse state', 'boolean', 'false'],
        ['onCollapse', 'Collapse toggle callback', '(collapsed: boolean) => void', '—'],
        ['width', 'Expanded width (px)', 'number', '240'],
        ['collapsedWidth', 'Collapsed width (px)', 'number', '56'],
        ['position', 'Side of screen', "'left' | 'right'", "'left'"],
        ['glass', 'Glass material', 'boolean', 'false'],
      ]} />
    </div>
  ),
}
patternItemsExt8.push(sidebarItem)

export { patternItemsExt8 }
