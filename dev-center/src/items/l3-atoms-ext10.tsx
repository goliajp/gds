import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { AnimatedNumber, Sparkle } from '@gds/l3-atoms'
import { Button } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const atomItemsK: DevCenterItem[] = []

// sparkle
const sparkleItem: DevCenterItem = {
  id: 'sparkle',
  label: 'Sparkle',
  layer: 'l3',
  type: 'interactive',
  tags: ['sparkle', 'star', 'animation', 'decorative', 'particle', 'atom'],
  defaultConfig: { active: true, count: 3, color: 'var(--gds-accent)' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Sparkle } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center justify-center p-8">
          <Sparkle active={config.active} count={config.count} color={config.color}>
            <span className="text-fg gds-heading text-xl font-bold">New</span>
          </Sparkle>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="active" value={config.active} onChange={(v) => setConfig('active', v)} />
      <Ctrl type="number" label="count" value={config.count} min={1} max={8} onChange={(v) => setConfig('count', v)} />
      <Ctrl
        type="pills"
        label="color"
        value={config.color}
        options={['var(--gds-accent)', 'var(--gds-success)', 'var(--gds-warning)', 'gold']}
        onChange={(v) => setConfig('color', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { Sparkle } from '@golia/gds'\n\n<Sparkle\n  active={${config.active}}\n  count={${config.count}}\n  color="${config.color}"\n>\n  <span>New</span>\n</Sparkle>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Element to decorate with sparkles', 'ReactNode', '—'],
        ['active', 'Show or hide sparkle particles', 'boolean', 'true'],
        ['count', 'Number of sparkle particles', 'number', '3'],
        ['color', 'Fill color for star SVGs', 'string', 'var(--gds-accent)'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsK.push(sparkleItem)

// animated-number
function AnimatedNumberDemo({ config }: { config: Record<string, any> }) {
  const [val, setVal] = useState(config.value as number)
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedNumber
        value={val}
        duration={config.duration}
        className="text-fg gds-heading text-2xl font-bold"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setVal(Math.floor(Math.random() * 10000))}
      >
        Randomize
      </Button>
    </div>
  )
}

const animatedNumberItem: DevCenterItem = {
  id: 'animated-number',
  label: 'AnimatedNumber',
  layer: 'l3',
  type: 'interactive',
  tags: ['animated', 'number', 'counter', 'animation', 'transition', 'atom'],
  defaultConfig: { value: 1234, duration: 500 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { AnimatedNumber } from '@golia/gds'" />
      <LivePreview>
        <AnimatedNumberDemo config={config} />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="value" value={config.value} min={0} max={99999} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="number" label="duration" value={config.duration} min={0} max={3000} onChange={(v) => setConfig('duration', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { AnimatedNumber } from '@golia/gds'\n\n<AnimatedNumber\n  value={${config.value}}\n  duration={${config.duration}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Target number to display', 'number', '—'],
        ['duration', 'Animation duration in ms', 'number', '500'],
        ['format', 'Custom number formatter', '(n: number) => string', 'toLocaleString()'],
        ['className', 'CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsK.push(animatedNumberItem)

export { atomItemsK }
