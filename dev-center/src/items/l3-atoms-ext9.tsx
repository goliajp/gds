import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { CountUp, Marquee, Typewriter } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsJ: DevCenterItem[] = []

// marquee
const marqueeItem: DevCenterItem = {
  id: 'marquee',
  label: 'Marquee',
  layer: 'l3',
  type: 'interactive',
  tags: ['marquee', 'scroll', 'animation', 'loop', 'atom'],
  defaultConfig: { speed: 30, direction: 'left', pauseOnHover: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Marquee } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
          <Marquee speed={config.speed} direction={config.direction} pauseOnHover={config.pauseOnHover}>
            <span className="mx-4 text-fg gds-text-body">GOLIA Design System</span>
            <span className="mx-4 text-fg-muted gds-text-body">Components</span>
            <span className="mx-4 text-accent gds-text-body">Tokens</span>
            <span className="mx-4 text-success gds-text-body">Motion</span>
            <span className="mx-4 text-warning gds-text-body">Glass</span>
          </Marquee>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="speed" value={config.speed} min={5} max={200} onChange={(v) => setConfig('speed', v)} />
      <Ctrl type="pills" label="direction" value={config.direction} options={['left', 'right']} onChange={(v) => setConfig('direction', v)} />
      <Ctrl type="check" label="pauseOnHover" value={config.pauseOnHover} onChange={(v) => setConfig('pauseOnHover', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Marquee } from '@goliapkg/gds'\n\n<Marquee\n  speed={${config.speed}}\n  direction="${config.direction}"\n  pauseOnHover={${config.pauseOnHover}}\n>\n  <span>Scrolling content</span>\n</Marquee>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Content to scroll', 'ReactNode', '—'],
        ['speed', 'Pixels per second', 'number', '30'],
        ['direction', 'Scroll direction', "'left' | 'right'", "'left'"],
        ['pauseOnHover', 'Pause animation on hover', 'boolean', 'true'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsJ.push(marqueeItem)

// typewriter
const typewriterItem: DevCenterItem = {
  id: 'typewriter',
  label: 'Typewriter',
  layer: 'l3',
  type: 'interactive',
  tags: ['typewriter', 'text', 'animation', 'typing', 'atom'],
  defaultConfig: { text: 'GOLIA Design System', speed: 50, delay: 0, cursor: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Typewriter } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-2">
          <Typewriter
            key={`${config.text}-${config.speed}-${config.delay}`}
            text={config.text}
            speed={config.speed}
            delay={config.delay}
            cursor={config.cursor}
            className="text-fg gds-heading"
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="text" value={config.text} onChange={(v) => setConfig('text', v)} />
      <Ctrl type="number" label="speed" value={config.speed} min={10} max={200} onChange={(v) => setConfig('speed', v)} />
      <Ctrl type="number" label="delay" value={config.delay} min={0} max={2000} onChange={(v) => setConfig('delay', v)} />
      <Ctrl type="check" label="cursor" value={config.cursor} onChange={(v) => setConfig('cursor', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Typewriter } from '@goliapkg/gds'\n\n<Typewriter\n  text="${config.text}"\n  speed={${config.speed}}\n  delay={${config.delay}}\n  cursor={${config.cursor}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['text', 'Text to type', 'string', '—'],
        ['speed', 'Milliseconds per character', 'number', '50'],
        ['delay', 'Initial delay before typing (ms)', 'number', '0'],
        ['cursor', 'Show blinking cursor', 'boolean', 'true'],
        ['onComplete', 'Callback when typing finishes', '() => void', '—'],
        ['className', 'CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsJ.push(typewriterItem)

// count-up
const countUpItem: DevCenterItem = {
  id: 'count-up',
  label: 'CountUp',
  layer: 'l3',
  type: 'interactive',
  tags: ['count', 'number', 'animation', 'counter', 'atom'],
  defaultConfig: { value: 12345, duration: 1500, decimals: 0, prefix: '', suffix: '', separator: ',' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CountUp } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-8">
          <CountUp
            key={`${config.value}-${config.duration}`}
            value={config.value}
            duration={config.duration}
            decimals={config.decimals}
            prefix={config.prefix !== '' ? config.prefix : undefined}
            suffix={config.suffix !== '' ? config.suffix : undefined}
            separator={config.separator}
            className="text-fg gds-heading text-2xl font-bold"
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="value" value={config.value} min={0} max={999999} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="number" label="duration" value={config.duration} min={0} max={5000} onChange={(v) => setConfig('duration', v)} />
      <Ctrl type="number" label="decimals" value={config.decimals} min={0} max={4} onChange={(v) => setConfig('decimals', v)} />
      <Ctrl type="text" label="prefix" value={config.prefix} onChange={(v) => setConfig('prefix', v)} />
      <Ctrl type="text" label="suffix" value={config.suffix} onChange={(v) => setConfig('suffix', v)} />
      <Ctrl type="pills" label="separator" value={config.separator} options={[',', '.', ' ', '']} onChange={(v) => setConfig('separator', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CountUp } from '@goliapkg/gds'\n\n<CountUp\n  value={${config.value}}\n  duration={${config.duration}}\n  decimals={${config.decimals}}${config.prefix !== '' ? `\n  prefix="${config.prefix}"` : ''}${config.suffix !== '' ? `\n  suffix="${config.suffix}"` : ''}\n  separator="${config.separator}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Target number', 'number', '—'],
        ['duration', 'Animation duration (ms)', 'number', '1500'],
        ['decimals', 'Decimal places', 'number', '0'],
        ['prefix', 'Text before number', 'string', '—'],
        ['suffix', 'Text after number', 'string', '—'],
        ['separator', 'Thousands separator', 'string', "','"],
        ['className', 'CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsJ.push(countUpItem)

export { atomItemsJ }
