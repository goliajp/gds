import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Drawer } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsJ: DevCenterItem[] = []

// drawer
function DrawerDemo({ height, glass }: { height: 'sm' | 'default' | 'lg' | 'full'; glass: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        className="rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent/90"
        onClick={() => setOpen(true)}
      >
        Open Drawer
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Bottom Drawer" height={height} glass={glass}>
        <div className="flex flex-col gap-3 text-sm text-fg-muted">
          <p>This is a bottom drawer that slides up from the bottom of the screen.</p>
          <p>It is designed for mobile-first interactions like action sheets, filters, and detail views.</p>
          <p>Current height: {height}</p>
        </div>
      </Drawer>
    </div>
  )
}

const drawerItem: DevCenterItem = {
  id: 'drawer',
  label: 'Drawer',
  layer: 'l4',
  type: 'interactive',
  tags: ['drawer', 'bottom', 'sheet', 'mobile', 'slide', 'overlay', 'action-sheet'],
  defaultConfig: { height: 'default', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Drawer } from '@goliapkg/gds'" />

      <LivePreview>
        <DrawerDemo height={config.height} glass={config.glass} />
      </LivePreview>

      <DocSection title="Heights" columns={2}>
        <DemoCard title="Small (30vh)" description="Compact drawer for quick actions" code={`<Drawer height="sm">...</Drawer>`}>
          <DrawerDemo height="sm" glass={false} />
        </DemoCard>
        <DemoCard title="Large (75vh)" description="Extended drawer for forms" code={`<Drawer height="lg">...</Drawer>`}>
          <DrawerDemo height="lg" glass={false} />
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['open', 'boolean', '—', 'Whether the drawer is visible'],
            ['onClose', '() => void', '—', 'Called when closed'],
            ['title', 'string', '—', 'Optional header title'],
            ['children', 'ReactNode', '—', 'Drawer content'],
            ['height', "'sm' | 'default' | 'lg' | 'full'", "'default'", 'Drawer height'],
            ['glass', 'boolean', 'false', 'Frosted glass surface'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="height" value={config.height} options={['sm', 'default', 'lg', 'full']} onChange={(v) => setConfig('height', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Drawer } from '@goliapkg/gds'", '']
    const props: string[] = ['open={open}', 'onClose={() => setOpen(false)}', 'title="Bottom Drawer"']
    if (config.height !== 'default') props.push(`height="${config.height}"`)
    if (config.glass === true) props.push('glass')
    lines.push('<Drawer')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('>')
    lines.push('  <p>Drawer content here</p>')
    lines.push('</Drawer>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['open', 'Whether the drawer is visible', 'boolean', '—'],
        ['onClose', 'Called when closed', '() => void', '—'],
        ['title', 'Optional header title', 'string', '—'],
        ['children', 'Drawer content', 'ReactNode', '—'],
        ['height', 'Drawer height preset', "'sm' | 'default' | 'lg' | 'full'", "'default'"],
        ['glass', 'Frosted glass surface', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Slides up from the bottom — ideal for mobile-first interactions</p>
          <p>• Escape key and backdrop click close the drawer</p>
          <p>• Scroll is locked on the body while the drawer is open</p>
          <p>• Use height="full" for complex forms or detail views</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsJ.push(drawerItem)

export { moleculeItemsJ }
