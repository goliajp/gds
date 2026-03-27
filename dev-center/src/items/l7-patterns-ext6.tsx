import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { ActionBar, MediaGrid, ProfileCard } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt6: DevCenterItem[] = []

// media-grid
const mediaGridItem: DevCenterItem = {
  id: 'media-grid',
  label: 'MediaGrid',
  layer: 'l7',
  type: 'interactive',
  tags: ['media', 'grid', 'gallery', 'image', 'responsive', 'pattern'],
  defaultConfig: { columns: 4, gap: 'default', aspectRatio: 1 },

  stage: ({ config }) => {
    const colors = ['bg-palette-0/30', 'bg-palette-1/30', 'bg-palette-2/30', 'bg-palette-3/30', 'bg-palette-4/30', 'bg-palette-5/30']
    return (
      <div>
        <ImportLine text="import { MediaGrid } from '@golia/gds'" />
        <LivePreview className="block">
          <MediaGrid
            columns={config.columns}
            gap={config.gap}
            aspectRatio={config.aspectRatio}
          >
            {colors.map((c, i) => (
              <div key={i} className={`${c} flex items-center justify-center text-xs text-fg-muted`}>
                {i + 1}
              </div>
            ))}
          </MediaGrid>
        </LivePreview>
        <DocSection title="Examples" columns={1}>
          <DemoCard title="Photo gallery" description="4-column grid with square aspect ratio" code={`<MediaGrid columns={4} aspectRatio={1}>\n  <img src="..." />\n  <img src="..." />\n</MediaGrid>`}>
            <MediaGrid columns={4} aspectRatio={1}>
              {colors.slice(0, 4).map((c, i) => (
                <div key={i} className={`${c} flex items-center justify-center text-xs text-fg-muted`}>{i + 1}</div>
              ))}
            </MediaGrid>
          </DemoCard>
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="columns" value={config.columns} onChange={(v) => setConfig('columns', v)} min={1} max={6} />
      <Ctrl type="pills" label="gap" value={config.gap} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('gap', v)} />
      <Ctrl type="number" label="aspectRatio" value={config.aspectRatio} onChange={(v) => setConfig('aspectRatio', v)} min={0.5} max={2} />
    </>
  ),

  code: ({ config }) => {
    const props = []
    if (config.columns !== 4) props.push(`columns={${config.columns}}`)
    if (config.gap !== 'default') props.push(`gap="${config.gap}"`)
    if (config.aspectRatio !== 1) props.push(`aspectRatio={${config.aspectRatio}}`)
    return `import { MediaGrid } from '@golia/gds'\n\n<MediaGrid${props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : ''}>\n  <img src="photo1.jpg" />\n  <img src="photo2.jpg" />\n</MediaGrid>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Media items', 'ReactNode', '—'],
        ['columns', 'Grid columns (fixed or responsive)', 'number | { sm?, md?, lg? }', '{ sm: 2, md: 3, lg: 4 }'],
        ['gap', 'Gap between items', "'sm' | 'default' | 'lg'", "'default'"],
        ['aspectRatio', 'Aspect ratio for each cell', 'number', '1'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt6.push(mediaGridItem)

// profile-card
const profileCardItem: DevCenterItem = {
  id: 'profile-card',
  label: 'ProfileCard',
  layer: 'l7',
  type: 'interactive',
  tags: ['profile', 'card', 'avatar', 'user', 'pattern'],
  defaultConfig: { glass: false, name: 'Alice Smith', role: 'Engineer' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ProfileCard } from '@golia/gds'" />
      <LivePreview>
        <ProfileCard
          name={config.name}
          role={config.role}
          glass={config.glass}
          stats={[
            { label: 'Posts', value: '42' },
            { label: 'Followers', value: '1.2k' },
            { label: 'Following', value: '89' },
          ]}
          actions={
            <>
              <Button size="sm">Follow</Button>
              <Button size="sm" variant="ghost">Message</Button>
            </>
          }
        />
      </LivePreview>
      <DocSection title="Examples" columns={2}>
        <DemoCard title="Minimal" description="Name only" code={`<ProfileCard name="Alice" />`}>
          <ProfileCard name="Alice" />
        </DemoCard>
        <DemoCard title="With stats" description="Profile with statistics" code={`<ProfileCard\n  name="Alice"\n  role="Designer"\n  stats={[{ label: 'Projects', value: '12' }]}\n/>`}>
          <ProfileCard name="Alice" role="Designer" stats={[{ label: 'Projects', value: '12' }]} />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="name" value={config.name} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="text" label="role" value={config.role} onChange={(v) => setConfig('role', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = [`name="${config.name}"`]
    if (config.role !== '') props.push(`role="${config.role}"`)
    if (config.glass === true) props.push('glass')
    return `import { ProfileCard } from '@golia/gds'\n\n<ProfileCard\n  ${props.join('\n  ')}\n  stats={[{ label: 'Posts', value: '42' }]}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'User display name', 'string', '—'],
        ['role', 'Role or title', 'string', '—'],
        ['avatar', 'Image URL (falls back to initials)', 'string', '—'],
        ['stats', 'Key-value stat pairs', '{ label: string, value: string }[]', '—'],
        ['actions', 'Action buttons slot', 'ReactNode', '—'],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt6.push(profileCardItem)

// action-bar
const actionBarItem: DevCenterItem = {
  id: 'action-bar',
  label: 'ActionBar',
  layer: 'l7',
  type: 'interactive',
  tags: ['action', 'bar', 'sticky', 'form', 'bulk', 'pattern'],
  defaultConfig: { glass: true, position: 'bottom', justify: 'end' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ActionBar } from '@golia/gds'" />
      <LivePreview className="block">
        <div className="relative h-40 overflow-hidden rounded-lg border border-white/[0.04]">
          <div className="p-4 text-xs text-fg-muted">Form content area...</div>
          <ActionBar
            glass={config.glass}
            position={config.position}
            justify={config.justify}
          >
            <Button size="sm" variant="ghost">Cancel</Button>
            <Button size="sm">Save</Button>
          </ActionBar>
        </div>
      </LivePreview>
      <DocSection title="Examples" columns={2}>
        <DemoCard title="Form actions" description="Save/cancel at bottom" code={`<ActionBar>\n  <Button variant="ghost">Cancel</Button>\n  <Button>Save</Button>\n</ActionBar>`}>
          <div className="relative h-24">
            <ActionBar>
              <Button size="sm" variant="ghost">Cancel</Button>
              <Button size="sm">Save</Button>
            </ActionBar>
          </div>
        </DemoCard>
        <DemoCard title="Bulk operations" description="Top bar with space-between" code={`<ActionBar position="top" justify="between">\n  <span>3 selected</span>\n  <Button>Delete</Button>\n</ActionBar>`}>
          <div className="relative h-24">
            <ActionBar position="top" justify="between">
              <span className="text-xs text-fg-muted">3 selected</span>
              <Button size="sm" variant="danger">Delete</Button>
            </ActionBar>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="position" value={config.position} options={['top', 'bottom']} onChange={(v) => setConfig('position', v)} />
      <Ctrl type="pills" label="justify" value={config.justify} options={['start', 'center', 'end', 'between']} onChange={(v) => setConfig('justify', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = []
    if (config.position !== 'bottom') props.push(`position="${config.position}"`)
    if (config.justify !== 'end') props.push(`justify="${config.justify}"`)
    if (config.glass !== true) props.push('glass={false}')
    return `import { ActionBar } from '@golia/gds'\n\n<ActionBar${props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : ''}>\n  <Button variant="ghost">Cancel</Button>\n  <Button>Save</Button>\n</ActionBar>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Action buttons', 'ReactNode', '—'],
        ['position', 'Sticky position', "'top' | 'bottom'", "'bottom'"],
        ['justify', 'Horizontal alignment', "'start' | 'center' | 'end' | 'between'", "'end'"],
        ['glass', 'Glass material', 'boolean', 'true'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt6.push(actionBarItem)

export { patternItemsExt6 }
