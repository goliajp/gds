import { DiffIndicator, VerifiedBadge } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsV: DevCenterItem[] = []

const verifiedBadgeItem: DevCenterItem = {
  id: 'verified-badge',
  label: 'VerifiedBadge',
  layer: 'l3',
  type: 'interactive',
  tags: ['verified', 'check', 'badge', 'certification', 'atom'],
  defaultConfig: { variant: 'default', size: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { VerifiedBadge } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-3">
          <span className="text-sm text-fg">Username</span>
          <VerifiedBadge size={config.size} variant={config.variant} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'gold', 'official']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { VerifiedBadge } from '@goliapkg/gds'\n\n<VerifiedBadge variant="${config.variant}" size="${config.size}" />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['variant', 'Badge color variant', "'default' | 'gold' | 'official'", "'default'"],
        ['size', 'Badge size', "'sm' | 'default'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsV.push(verifiedBadgeItem)

const diffIndicatorItem: DevCenterItem = {
  id: 'diff-indicator',
  label: 'DiffIndicator',
  layer: 'l3',
  type: 'interactive',
  tags: ['diff', 'change', 'delta', 'indicator', 'arrow', 'atom'],
  defaultConfig: { value: '12', inverted: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { DiffIndicator } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-4">
          <DiffIndicator inverted={config.inverted === 'true'} unit="%" value={Number(config.value ?? 0)} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="value" value={config.value} options={['-8', '0', '12', '42']} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="pills" label="inverted" value={config.inverted} options={['false', 'true']} onChange={(v) => setConfig('inverted', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { DiffIndicator } from '@goliapkg/gds'\n\n<DiffIndicator value={${config.value}} unit="%" ${config.inverted === 'true' ? 'inverted ' : ''}/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Numeric change value', 'number', '—'],
        ['unit', 'Unit suffix (e.g. "%")', 'string', '—'],
        ['inverted', 'Reverse color meaning (lower is good)', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsV.push(diffIndicatorItem)

export { atomItemsV }
