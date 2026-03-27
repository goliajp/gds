import { useState } from 'react'

import { DevOpsLayout, ServerOverview } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt24: DevCenterItem[] = []

const devopsTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'containers', label: 'Containers' },
  { id: 'logs', label: 'Logs' },
]

const devopsLayoutItem: DevCenterItem = {
  id: 'devops-layout',
  label: 'DevOpsLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['devops', 'layout', 'tabs', 'dashboard', 'pattern'],
  defaultConfig: { showStatus: 'true' },

  stage: ({ config }) => {
    const [tab, setTab] = useState('overview')
    return (
      <div>
        <ImportLine text="import { DevOpsLayout } from '@golia/gds'" />
        <LivePreview>
          <div className="h-48 border border-border rounded-lg overflow-hidden">
            <DevOpsLayout
              tabs={devopsTabs}
              activeTab={tab}
              onTabChange={setTab}
              statusBar={config.showStatus === 'true' ? <div className="text-xs text-fg-muted">3 servers online</div> : undefined}
            >
              <div className="p-4 text-xs text-fg-muted">Active tab: {tab}</div>
            </DevOpsLayout>
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="showStatus" value={config.showStatus} options={['true', 'false']} onChange={(v) => setConfig('showStatus', v)} />
  ),

  code: () =>
    `import { DevOpsLayout } from '@golia/gds'\n\n<DevOpsLayout\n  tabs={[{ id: 'overview', label: 'Overview' }, ...]}\n  activeTab={activeTab}\n  onTabChange={setActiveTab}\n  statusBar={<StatusMetrics />}\n>\n  {children}\n</DevOpsLayout>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['tabs', 'Tab definitions array', '{ id: string; label: string }[]', '—'],
        ['activeTab', 'Currently active tab id', 'string', '—'],
        ['onTabChange', 'Called when tab is clicked', '(id: string) => void', '—'],
        ['statusBar', 'Optional status bar content', 'ReactNode', '—'],
        ['children', 'Tab content area', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt24.push(devopsLayoutItem)

const sampleServers = [
  { name: 't01', location: 'Tokyo', status: 'online' as const, metrics: { cpu: 45, mem: 60, disk: 30 } },
  { name: 't02', location: 'Osaka', status: 'online' as const, metrics: { cpu: 82, mem: 71, disk: 55 } },
  { name: 'backup', location: 'Nagoya', status: 'offline' as const },
]

const serverOverviewItem: DevCenterItem = {
  id: 'server-overview',
  label: 'ServerOverview',
  layer: 'l7',
  type: 'interactive',
  tags: ['server', 'overview', 'grid', 'metrics', 'devops', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ServerOverview } from '@golia/gds'" />
      <LivePreview>
        <div className="w-[600px]">
          <ServerOverview servers={sampleServers} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { ServerOverview } from '@golia/gds'\n\n<ServerOverview\n  servers={[\n    { name: 't01', location: 'Tokyo', status: 'online', metrics: { cpu: 45, mem: 60, disk: 30 } },\n    { name: 'backup', location: 'Nagoya', status: 'offline' },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['servers', 'Array of server objects', 'ServerInfo[]', '—'],
        ['servers[].name', 'Server hostname', 'string', '—'],
        ['servers[].location', 'Physical location', 'string', '—'],
        ['servers[].status', 'Online/offline status', "'online' | 'offline'", '—'],
        ['servers[].metrics', 'CPU/mem/disk percentages', '{ cpu: number; mem: number; disk: number }', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt24.push(serverOverviewItem)

export { patternItemsExt24 }
