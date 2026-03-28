import { Blinking, CountBadge } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsZ: DevCenterItem[] = []

const countBadgeItem: DevCenterItem = {
  id: 'count-badge',
  label: 'CountBadge',
  layer: 'l3',
  type: 'interactive',
  tags: ['count', 'badge', 'notification', 'number', 'atom'],
  defaultConfig: { count: 5, max: 99, variant: 'danger' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CountBadge } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-6">
          <CountBadge count={config.count} max={config.max} variant={config.variant} />
          <div className="flex items-center gap-3">
            <CountBadge count={3} variant="accent" />
            <CountBadge count={42} variant="danger" />
            <CountBadge count={150} max={99} variant="success" />
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="count" value={config.count} min={0} max={999} onChange={(v) => setConfig('count', v)} />
      <Ctrl type="number" label="max" value={config.max} min={1} max={999} onChange={(v) => setConfig('max', v)} />
      <Ctrl type="pills" label="variant" value={config.variant} options={['accent', 'danger', 'success']} onChange={(v) => setConfig('variant', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CountBadge } from '@goliapkg/gds'\n\n<CountBadge count={${config.count}}${config.max !== 99 ? ` max={${config.max}}` : ''}${config.variant !== 'danger' ? ` variant="${config.variant}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['count', 'Number to display', 'number', '—'],
        ['max', 'Maximum before showing +', 'number', '99'],
        ['variant', 'Color variant', "'accent' | 'danger' | 'success'", "'danger'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsZ.push(countBadgeItem)

const blinkingItem: DevCenterItem = {
  id: 'blinking',
  label: 'Blinking',
  layer: 'l3',
  type: 'interactive',
  tags: ['blink', 'pulse', 'animation', 'attention', 'atom'],
  defaultConfig: { active: true, speed: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Blinking } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-6">
          <Blinking active={config.active} speed={config.speed}>
            <span className="h-3 w-3 rounded-full bg-danger inline-block" />
          </Blinking>
          <Blinking active speed="fast">
            <span className="text-sm font-medium text-warning">LIVE</span>
          </Blinking>
          <Blinking active speed="slow">
            <span className="h-2 w-2 rounded-full bg-success inline-block" />
          </Blinking>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="active" value={config.active} onChange={(v) => setConfig('active', v)} />
      <Ctrl type="pills" label="speed" value={config.speed} options={['slow', 'default', 'fast']} onChange={(v) => setConfig('speed', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Blinking } from '@goliapkg/gds'\n\n<Blinking${!config.active ? ' active={false}' : ''}${config.speed !== 'default' ? ` speed="${config.speed}"` : ''}>\n  <span className="h-3 w-3 rounded-full bg-danger" />\n</Blinking>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['active', 'Enable blinking animation', 'boolean', 'true'],
        ['speed', 'Animation speed', "'slow' | 'default' | 'fast'", "'default'"],
        ['children', 'Content to blink', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsZ.push(blinkingItem)

export { atomItemsZ }
