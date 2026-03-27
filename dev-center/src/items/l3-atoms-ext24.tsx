import { GlowDot, KeyValue } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsY: DevCenterItem[] = []

const glowDotItem: DevCenterItem = {
  id: 'glow-dot',
  label: 'GlowDot',
  layer: 'l3',
  type: 'interactive',
  tags: ['glow', 'dot', 'led', 'indicator', 'status', 'atom'],
  defaultConfig: { color: 'accent', size: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { GlowDot } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center gap-6">
          <GlowDot color={config.color} size={config.size} />
          <div className="flex items-center gap-3">
            <GlowDot color="accent" />
            <GlowDot color="success" />
            <GlowDot color="warning" />
            <GlowDot color="danger" />
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="color" value={config.color} options={['accent', 'success', 'warning', 'danger']} onChange={(v) => setConfig('color', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { GlowDot } from '@golia/gds'\n\n<GlowDot color="${config.color}"${config.size !== 'default' ? ` size="${config.size}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['color', 'Glow color', "'accent' | 'success' | 'warning' | 'danger'", "'accent'"],
        ['size', 'Dot size', "'sm' | 'default' | 'lg'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsY.push(glowDotItem)

const keyValueItem: DevCenterItem = {
  id: 'key-value',
  label: 'KeyValue',
  layer: 'l3',
  type: 'interactive',
  tags: ['key', 'value', 'pair', 'label', 'data', 'atom'],
  defaultConfig: { label: 'Status', value: 'Active', mono: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { KeyValue } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-col gap-3">
          <KeyValue label={config.label} value={config.value} mono={config.mono === 'true'} />
          <KeyValue label="Build" value="abc-12345" mono />
          <KeyValue label="Uptime" value="3d 14h 22m" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="text" label="value" value={config.value} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="pills" label="mono" value={config.mono} options={['false', 'true']} onChange={(v) => setConfig('mono', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { KeyValue } from '@golia/gds'\n\n<KeyValue label="${config.label}" value="${config.value}"${config.mono === 'true' ? ' mono' : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Label text (key)', 'string', '—'],
        ['value', 'Value content', 'ReactNode', '—'],
        ['mono', 'Monospace value font', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsY.push(keyValueItem)

export { atomItemsY }
