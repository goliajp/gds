import { ActionCard, MetricTile } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAC: DevCenterItem[] = []

const metricTileItem: DevCenterItem = {
  id: 'metric-tile',
  label: 'MetricTile',
  layer: 'l4',
  type: 'interactive',
  tags: ['metric', 'tile', 'stat', 'kpi', 'devops', 'molecule'],
  defaultConfig: { variant: 'default', value: '72' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { MetricTile } from '@golia/gds'" />
      <LivePreview>
        <div className="flex gap-3">
          <MetricTile label="CPU" unit="%" value={config.value} variant={config.variant} />
          <MetricTile label="MEM" unit="%" value="85" variant="warning" />
          <MetricTile label="DISK" unit="%" value="94" variant="danger" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'success', 'warning', 'danger']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="value" value={config.value} options={['32', '72', '85', '94']} onChange={(v) => setConfig('value', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { MetricTile } from '@golia/gds'\n\n<MetricTile label="CPU" value={${config.value}} unit="%" variant="${config.variant}" />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Label text below the value', 'string', '—'],
        ['value', 'Display value', 'string | number', '—'],
        ['unit', 'Unit suffix', 'string', '—'],
        ['variant', 'Color variant', "'default' | 'success' | 'warning' | 'danger'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAC.push(metricTileItem)

const actionCardItem: DevCenterItem = {
  id: 'action-card',
  label: 'ActionCard',
  layer: 'l4',
  type: 'interactive',
  tags: ['action', 'card', 'click', 'navigation', 'molecule'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ActionCard } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-col gap-2 w-64">
          <ActionCard title="Create Project" description="Start a new project from scratch" onClick={() => {}} />
          <ActionCard title="Import Data" description="Import from CSV or JSON" onClick={() => {}} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { ActionCard } from '@golia/gds'\n\n<ActionCard\n  title="Create Project"\n  description="Start a new project"\n  onClick={() => navigate('/new')}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['title', 'Card title', 'string', '—'],
        ['description', 'Subtitle text', 'string', '—'],
        ['icon', 'Icon element on the left', 'ReactNode', '—'],
        ['onClick', 'Click handler', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAC.push(actionCardItem)

export { moleculeItemsAC }
