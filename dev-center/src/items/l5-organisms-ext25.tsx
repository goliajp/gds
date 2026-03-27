import { ContainerList, SystemHealth } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt25: DevCenterItem[] = []

const systemHealthItem: DevCenterItem = {
  id: 'system-health',
  label: 'SystemHealth',
  layer: 'l5',
  type: 'interactive',
  tags: ['system', 'health', 'cpu', 'memory', 'disk', 'monitoring', 'devops', 'organism'],
  defaultConfig: { cpu: '45', mem: '75', disk: '36' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SystemHealth } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <SystemHealth metrics={[
            { label: 'CPU', value: Number(config.cpu), max: 100, unit: '%' },
            { label: 'Memory', value: Number(config.mem), max: 100, unit: '%' },
            { label: 'Disk', value: Number(config.disk), max: 100, unit: '%' },
          ]} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="cpu" value={config.cpu} options={['25', '45', '75', '95']} onChange={(v) => setConfig('cpu', v)} />
      <Ctrl type="pills" label="mem" value={config.mem} options={['30', '55', '75', '92']} onChange={(v) => setConfig('mem', v)} />
      <Ctrl type="pills" label="disk" value={config.disk} options={['20', '36', '70', '88']} onChange={(v) => setConfig('disk', v)} />
    </>
  ),

  code: () =>
    `import { SystemHealth } from '@goliapkg/gds'\n\n<SystemHealth\n  metrics={[\n    { label: 'CPU', value: 45, max: 100, unit: '%' },\n    { label: 'Memory', value: 12, max: 16, unit: 'GB' },\n    { label: 'Disk', value: 180, max: 500, unit: 'GB' },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['metrics', 'Array of health metrics', 'HealthMetric[]', '—'],
        ['metrics[].label', 'Metric label', 'string', '—'],
        ['metrics[].value', 'Current value', 'number', '—'],
        ['metrics[].max', 'Maximum value', 'number', '100'],
        ['metrics[].unit', 'Unit suffix', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt25.push(systemHealthItem)

const sampleContainers = [
  { name: 'api-server', image: 'goliajp/server:latest', status: 'running' as const, ports: '3100:3100' },
  { name: 'postgres', image: 'postgres:16', status: 'running' as const, ports: '5432:5432' },
  { name: 'valkey', image: 'valkey/valkey:8', status: 'stopped' as const },
]

const containerListItem: DevCenterItem = {
  id: 'container-list',
  label: 'ContainerList',
  layer: 'l5',
  type: 'interactive',
  tags: ['docker', 'container', 'list', 'devops', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ContainerList } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-[500px]">
          <ContainerList containers={sampleContainers} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { ContainerList } from '@goliapkg/gds'\n\n<ContainerList\n  containers={[\n    { name: 'api-server', image: 'goliajp/server:latest', status: 'running', ports: '3100:3100' },\n    { name: 'postgres', image: 'postgres:16', status: 'stopped' },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['containers', 'Array of container objects', 'ContainerInfo[]', '—'],
        ['containers[].name', 'Container name', 'string', '—'],
        ['containers[].image', 'Docker image', 'string', '—'],
        ['containers[].status', 'Container status', "'running' | 'stopped' | 'paused'", '—'],
        ['containers[].ports', 'Port mapping', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt25.push(containerListItem)

export { organismItemsExt25 }
