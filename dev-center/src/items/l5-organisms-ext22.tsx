import { useState } from 'react'

import { DeployLog, TagCloud } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt22: DevCenterItem[] = []

const deployLogItem: DevCenterItem = {
  id: 'deploy-log',
  label: 'DeployLog',
  layer: 'l5',
  type: 'interactive',
  tags: ['deploy', 'ci', 'log', 'devops', 'table', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { DeployLog } from '@golia/gds'" />
      <LivePreview>
        <DeployLog entries={[
          { project: 'admin', device: 't01', version: 'v2.1.0', status: 'success', timestamp: '2m ago' },
          { project: 'server', device: 't01', version: 'v1.8.3', status: 'failure', timestamp: '15m ago' },
          { project: 'web', device: 't01', version: 'v3.0.1', status: 'pending', timestamp: '1h ago' },
        ]} />
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { DeployLog } from '@golia/gds'\n\n<DeployLog entries={[\n  { project: 'admin', device: 't01', version: 'v2.1.0', status: 'success', timestamp: '2m ago' },\n  { project: 'server', device: 't01', version: 'v1.8.3', status: 'failure', timestamp: '15m ago' },\n]} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['entries', 'Deploy log entries', 'DeployLogEntry[]', '—'],
        ['entries[].project', 'Project name', 'string', '—'],
        ['entries[].device', 'Target device/server', 'string', '—'],
        ['entries[].version', 'Deployed version', 'string', '—'],
        ['entries[].status', 'Deploy status', "'success' | 'failure' | 'pending'", '—'],
        ['entries[].timestamp', 'Time label', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt22.push(deployLogItem)

function TagCloudDemo() {
  const [selected, setSelected] = useState<string[]>(['react'])
  const handleToggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    )
  }
  return (
    <TagCloud
      tags={[
        { label: 'react', count: 42 },
        { label: 'typescript', count: 38 },
        { label: 'rust', count: 15 },
        { label: 'wasm', count: 8 },
        { label: 'tailwind', count: 27 },
      ]}
      selected={selected}
      onToggle={handleToggle}
    />
  )
}

const tagCloudItem: DevCenterItem = {
  id: 'tag-cloud',
  label: 'TagCloud',
  layer: 'l5',
  type: 'interactive',
  tags: ['tag', 'cloud', 'filter', 'chip', 'category', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { TagCloud } from '@golia/gds'" />
      <LivePreview>
        <TagCloudDemo />
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { TagCloud } from '@golia/gds'\n\n<TagCloud\n  tags={[\n    { label: 'react', count: 42 },\n    { label: 'typescript', count: 38 },\n  ]}\n  selected={selected}\n  onToggle={handleToggle}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['tags', 'Tag items with labels and counts', '{ label: string, count: number }[]', '—'],
        ['selected', 'Currently selected tag labels', 'string[]', '[]'],
        ['onToggle', 'Called when a tag is clicked', '(label: string) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt22.push(tagCloudItem)

export { organismItemsExt22 }
