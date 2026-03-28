import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button, IconButton, Separator } from '@gds/l2-primitives'
import { SplashScreen, Toolbar } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt7: DevCenterItem[] = []

// toolbar
const toolbarItem: DevCenterItem = {
  id: 'toolbar',
  label: 'Toolbar',
  layer: 'l7',
  type: 'interactive',
  tags: ['toolbar', 'actions', 'icon', 'buttons', 'horizontal', 'pattern'],
  defaultConfig: { position: 'top', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Toolbar } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <div className="relative flex flex-col items-center gap-4">
          <Toolbar position={config.position} glass={config.glass}>
            <IconButton size="sm" variant="ghost" aria-label="Bold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" /><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg>
            </IconButton>
            <IconButton size="sm" variant="ghost" aria-label="Italic">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>
            </IconButton>
            <Separator orientation="vertical" className="h-4" />
            <IconButton size="sm" variant="ghost" aria-label="Link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
            </IconButton>
          </Toolbar>
        </div>
      </LivePreview>
      <DocSection title="Examples" columns={2}>
        <DemoCard title="Top toolbar" description="Default toolbar with border-bottom" code={`<Toolbar>\n  <IconButton>...</IconButton>\n  <Separator orientation="vertical" />\n  <IconButton>...</IconButton>\n</Toolbar>`}>
          <Toolbar>
            <Button size="sm" variant="ghost">File</Button>
            <Button size="sm" variant="ghost">Edit</Button>
            <Button size="sm" variant="ghost">View</Button>
          </Toolbar>
        </DemoCard>
        <DemoCard title="Floating" description="Rounded pill with glass and shadow" code={`<Toolbar position="floating">\n  ...\n</Toolbar>`}>
          <div className="flex justify-center py-4">
            <Toolbar position="floating">
              <Button size="sm" variant="ghost">Undo</Button>
              <Button size="sm" variant="ghost">Redo</Button>
            </Toolbar>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="position" value={config.position} options={['top', 'bottom', 'floating']} onChange={(v) => setConfig('position', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = []
    if (config.position !== 'top') props.push(`position="${config.position}"`)
    if (config.glass === true) props.push('glass')
    return `import { Toolbar } from '@goliapkg/gds'\n\n<Toolbar${props.length > 0 ? ' ' + props.join(' ') : ''}>\n  <IconButton aria-label="Bold">...</IconButton>\n  <Separator orientation="vertical" />\n  <IconButton aria-label="Link">...</IconButton>\n</Toolbar>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Toolbar items (buttons, separators)', 'ReactNode', '—'],
        ['position', 'Toolbar position style', "'top' | 'bottom' | 'floating'", "'top'"],
        ['glass', 'Glass material (auto-true for floating)', 'boolean', 'false (true for floating)'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt7.push(toolbarItem)

// splash-screen
const splashScreenItem: DevCenterItem = {
  id: 'splash-screen',
  label: 'SplashScreen',
  layer: 'l7',
  type: 'interactive',
  tags: ['splash', 'loading', 'screen', 'startup', 'pattern'],
  defaultConfig: { visible: true, title: 'GOLIA', message: 'Loading...' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SplashScreen } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <div className="relative h-64 overflow-hidden rounded-lg border border-white/[0.04]">
          <SplashScreen
            visible={config.visible}
            title={config.title}
            message={config.message}
            logo={<div className="text-3xl font-bold text-accent">G</div>}
            className="absolute"
          />
          {config.visible !== true && (
            <div className="flex h-full items-center justify-center text-sm text-fg-muted">
              App content visible
            </div>
          )}
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="visible" value={config.visible} onChange={(v) => setConfig('visible', v)} />
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="text" label="message" value={config.message} onChange={(v) => setConfig('message', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = [`visible={${config.visible}}`]
    if (config.title !== '') props.push(`title="${config.title}"`)
    if (config.message !== '') props.push(`message="${config.message}"`)
    return `import { SplashScreen } from '@goliapkg/gds'\n\n<SplashScreen\n  ${props.join('\n  ')}\n  logo={<Logo />}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['visible', 'Show/hide splash screen', 'boolean', '—'],
        ['logo', 'Logo element centered at top', 'ReactNode', '—'],
        ['title', 'Title below logo', 'string', '—'],
        ['message', 'Message below title', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt7.push(splashScreenItem)

export { patternItemsExt7 }
