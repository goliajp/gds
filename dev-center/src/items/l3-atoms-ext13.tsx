import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { InfoTip, PulseIndicator, TextBadge } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsN: DevCenterItem[] = []

const infoTipItem: DevCenterItem = {
  id: 'info-tip',
  label: 'InfoTip',
  layer: 'l3',
  type: 'interactive',
  tags: ['info', 'tooltip', 'help', 'hint', 'icon', 'atom'],
  defaultConfig: {
    content: 'This field is required for tax calculations.',
    size: 'default',
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { InfoTip } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center gap-2 p-8">
          <span className="text-sm text-fg">Tax rate</span>
          <InfoTip content={config.content} size={config.size} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="content" value={config.content} onChange={(v) => setConfig('content', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { InfoTip } from '@golia/gds'\n\n<InfoTip\n  content="${config.content}"\n  size="${config.size}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['content', 'Tooltip content', 'ReactNode', '—'],
        ['size', 'Icon size', '"sm" | "default"', '"default"'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsN.push(infoTipItem)

const pulseIndicatorItem: DevCenterItem = {
  id: 'pulse-indicator',
  label: 'PulseIndicator',
  layer: 'l3',
  type: 'interactive',
  tags: ['pulse', 'live', 'status', 'indicator', 'animation', 'atom'],
  defaultConfig: {
    color: 'success',
    size: 'default',
    label: 'Live',
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PulseIndicator } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center gap-8 p-8">
          <PulseIndicator color={config.color} label={config.label} size={config.size} />
          <PulseIndicator color={config.color} size={config.size} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="color" value={config.color} options={['accent', 'success', 'warning', 'danger']} onChange={(v) => setConfig('color', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('size', v)} />
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { PulseIndicator } from '@golia/gds'\n\n<PulseIndicator\n  color="${config.color}"\n  size="${config.size}"${config.label ? `\n  label="${config.label}"` : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['color', 'Pulse color', '"accent" | "success" | "warning" | "danger"', '"success"'],
        ['size', 'Indicator size', '"sm" | "default" | "lg"', '"default"'],
        ['label', 'Optional label text', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsN.push(pulseIndicatorItem)

const textBadgeItem: DevCenterItem = {
  id: 'text-badge',
  label: 'TextBadge',
  layer: 'l3',
  type: 'interactive',
  tags: ['badge', 'label', 'tag', 'new', 'beta', 'pro', 'atom'],
  defaultConfig: {
    label: 'NEW',
    variant: 'accent',
    size: 'default',
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { TextBadge } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-wrap items-center gap-4 p-8">
          <span className="flex items-center gap-2 text-sm text-fg">
            Feature name <TextBadge label={config.label} size={config.size} variant={config.variant} />
          </span>
          <span className="flex items-center gap-2 text-sm text-fg">
            Settings <TextBadge label="BETA" size={config.size} variant="warning" />
          </span>
          <span className="flex items-center gap-2 text-sm text-fg">
            Premium <TextBadge label="PRO" size={config.size} variant="success" />
          </span>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="pills" label="variant" value={config.variant} options={['accent', 'success', 'warning', 'danger', 'muted']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { TextBadge } from '@golia/gds'\n\n<TextBadge\n  label="${config.label}"\n  variant="${config.variant}"\n  size="${config.size}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Badge text', 'string', '—'],
        ['variant', 'Color variant', '"accent" | "success" | "warning" | "danger" | "muted"', '"accent"'],
        ['size', 'Badge size', '"sm" | "default"', '"default"'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsN.push(textBadgeItem)

export { atomItemsN }
