import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { BadgeDot, Divider, ScreenOverlay } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const primitiveItemsExt6: DevCenterItem[] = []

const dividerItem: DevCenterItem = {
  id: 'divider',
  label: 'Divider',
  layer: 'l2',
  type: 'interactive',
  tags: ['divider', 'line', 'icon', 'separator', 'decorative', 'primitive'],
  defaultConfig: {
    orientation: 'horizontal',
    hasIcon: false,
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Divider } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-col gap-4 p-8" style={{ minWidth: 240, minHeight: config.orientation === 'vertical' ? 120 : undefined }}>
          {config.orientation === 'vertical' ? (
            <div className="flex h-24 items-center gap-4">
              <span className="text-fg-muted text-sm">Left</span>
              <Divider
                icon={config.hasIcon ? <span className="text-xs">+</span> : undefined}
                orientation="vertical"
              />
              <span className="text-fg-muted text-sm">Right</span>
            </div>
          ) : (
            <>
              <span className="text-fg-muted text-sm">Above</span>
              <Divider icon={config.hasIcon ? <span className="text-xs">or</span> : undefined} />
              <span className="text-fg-muted text-sm">Below</span>
            </>
          )}
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="orientation" value={config.orientation} options={['horizontal', 'vertical']} onChange={(v) => setConfig('orientation', v)} />
      <Ctrl type="check" label="hasIcon" value={config.hasIcon} onChange={(v) => setConfig('hasIcon', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Divider } from '@golia/gds'\n\n<Divider\n  orientation="${config.orientation}"${config.hasIcon ? '\n  icon={<span>or</span>}' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['orientation', 'Direction of the divider', '"horizontal" | "vertical"', '"horizontal"'],
        ['icon', 'Optional icon centered in the divider', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt6.push(dividerItem)

const badgeDotItem: DevCenterItem = {
  id: 'badge-dot',
  label: 'BadgeDot',
  layer: 'l2',
  type: 'interactive',
  tags: ['badge', 'dot', 'notification', 'indicator', 'primitive'],
  defaultConfig: {
    color: 'danger',
    show: true,
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { BadgeDot } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center gap-8 p-8">
          <BadgeDot color={config.color} show={config.show}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-tertiary text-sm text-fg">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
          </BadgeDot>
          <BadgeDot color={config.color} show={config.show}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm text-accent">
              A
            </div>
          </BadgeDot>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="color" value={config.color} options={['accent', 'danger', 'success']} onChange={(v) => setConfig('color', v)} />
      <Ctrl type="check" label="show" value={config.show} onChange={(v) => setConfig('show', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { BadgeDot } from '@golia/gds'\n\n<BadgeDot color="${config.color}" show={${config.show}}>\n  <Icon />\n</BadgeDot>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Element to attach the dot to', 'ReactNode', '—'],
        ['show', 'Whether to show the dot', 'boolean', 'true'],
        ['color', 'Dot color', '"accent" | "danger" | "success"', '"danger"'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt6.push(badgeDotItem)

function ScreenOverlayDemo({ config }: { config: Record<string, any> }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex items-center justify-center p-8">
      <button
        className="rounded-lg bg-accent px-4 py-2 text-sm text-white"
        onClick={() => setVisible(true)}
        type="button"
      >
        Show overlay
      </button>
      <ScreenOverlay glass={config.glass} onClick={() => setVisible(false)} visible={visible} />
    </div>
  )
}

const screenOverlayItem: DevCenterItem = {
  id: 'screen-overlay',
  label: 'ScreenOverlay',
  layer: 'l2',
  type: 'interactive',
  tags: ['overlay', 'backdrop', 'modal', 'screen', 'portal', 'primitive'],
  defaultConfig: {
    glass: false,
  },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ScreenOverlay } from '@golia/gds'" />
      <LivePreview>
        <ScreenOverlayDemo config={config} />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
  ),

  code: ({ config }) =>
    `import { ScreenOverlay } from '@golia/gds'\n\n<ScreenOverlay\n  visible={open}\n  onClick={() => setOpen(false)}${config.glass ? '\n  glass' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['visible', 'Whether overlay is shown', 'boolean', '—'],
        ['onClick', 'Click handler (for dismiss)', '() => void', '—'],
        ['glass', 'Use glass/blur backdrop', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
primitiveItemsExt6.push(screenOverlayItem)

export { primitiveItemsExt6 }
