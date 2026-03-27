import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { FocusRing, SkipNav } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const primitiveItemsExt5: DevCenterItem[] = []

const skipNavItem: DevCenterItem = {
  id: 'skip-nav',
  label: 'SkipNav',
  layer: 'l2',
  type: 'interactive',
  tags: ['a11y', 'accessibility', 'skip', 'navigation', 'keyboard', 'primitive'],
  defaultConfig: {
    targetId: 'main-content',
    label: 'Skip to content',
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SkipNav } from '@golia/gds'" />
      <LivePreview>
        <div className="relative flex flex-col items-center gap-4 p-8">
          <p className="text-fg-muted gds-text-body">
            Press <kbd className="rounded border border-border bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs">Tab</kbd> to reveal the skip link
          </p>
          <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-border bg-bg p-4">
            <SkipNav label={config.label} targetId={config.targetId} />
            <nav className="mb-3 flex gap-3 text-sm text-fg-muted">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </nav>
            <div className="rounded bg-bg-secondary p-3 text-center text-sm text-fg" id={config.targetId}>
              Main content area
            </div>
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl
        type="text"
        label="targetId"
        value={config.targetId}
        onChange={(v) => setConfig('targetId', v)}
      />
      <Ctrl
        type="text"
        label="label"
        value={config.label}
        onChange={(v) => setConfig('label', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { SkipNav } from '@golia/gds'\n\n<SkipNav\n  targetId="${config.targetId}"\n  label="${config.label}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['targetId', 'ID of the main content element', 'string', '"main-content"'],
        ['label', 'Visible text when focused', 'string', '"Skip to content"'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt5.push(skipNavItem)

const focusRingItem: DevCenterItem = {
  id: 'focus-ring',
  label: 'FocusRing',
  layer: 'l2',
  type: 'interactive',
  tags: ['a11y', 'accessibility', 'focus', 'ring', 'outline', 'primitive'],
  defaultConfig: {
    color: 'var(--gds-accent)',
    width: 2,
    offset: 2,
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FocusRing } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center justify-center gap-6 p-8">
          <FocusRing color={config.color} offset={config.offset} width={config.width}>
            <button className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-fg">
              Focus me
            </button>
          </FocusRing>
          <FocusRing color={config.color} offset={config.offset} width={config.width}>
            <input
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg outline-none"
              placeholder="Or focus me"
            />
          </FocusRing>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl
        type="pills"
        label="color"
        value={config.color}
        options={[
          'var(--gds-accent)',
          'var(--gds-success)',
          'var(--gds-danger)',
        ]}
        onChange={(v) => setConfig('color', v)}
      />
      <Ctrl
        type="pills"
        label="width"
        value={config.width}
        options={[1, 2, 3]}
        onChange={(v) => setConfig('width', v)}
      />
      <Ctrl
        type="pills"
        label="offset"
        value={config.offset}
        options={[0, 1, 2, 4]}
        onChange={(v) => setConfig('offset', v)}
      />
    </>
  ),

  code: ({ config }) =>
    `import { FocusRing } from '@golia/gds'\n\n<FocusRing\n  color="${config.color}"\n  width={${config.width}}\n  offset={${config.offset}}\n>\n  <button>Focus me</button>\n</FocusRing>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Element to wrap with focus ring', 'ReactNode', '—'],
        ['color', 'CSS color for the ring', 'string', 'var(--gds-accent)'],
        ['width', 'Ring width in pixels', 'number', '2'],
        ['offset', 'Ring offset in pixels', 'number', '2'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt5.push(focusRingItem)

export { primitiveItemsExt5 }
