import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { GridLayout, Masonry } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt: DevCenterItem[] = []

// grid-layout
const gridLayoutItem: DevCenterItem = {
  id: 'grid-layout',
  label: 'GridLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['grid', 'layout', 'responsive', 'columns'],
  defaultConfig: { columns: 3, gap: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { GridLayout } from '@goliapkg/gds'" />

      <LivePreview className="block">
        <GridLayout columns={config.columns} gap={config.gap}>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-sm text-fg-muted"
            >
              Item {i + 1}
            </div>
          ))}
        </GridLayout>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['children', 'ReactNode', '—', 'Grid items'],
            ['columns', 'number | { sm?, md?, lg?, xl? }', '{ sm: 1, md: 2, lg: 3 }', 'Column configuration'],
            ['gap', "'sm' | 'default' | 'lg'", "'default'", 'Gap size between items'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="columns" value={String(config.columns)} options={['1', '2', '3', '4', '6']} onChange={(v) => setConfig('columns', Number(v))} />
      <Ctrl type="pills" label="gap" value={config.gap} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('gap', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { GridLayout } from '@goliapkg/gds'"]
    lines.push('')
    lines.push(`<GridLayout columns={${config.columns}} gap="${config.gap}">`)
    lines.push('  <div>Item 1</div>')
    lines.push('  <div>Item 2</div>')
    lines.push('  <div>Item 3</div>')
    lines.push('</GridLayout>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Grid items', 'ReactNode', '—'],
        ['columns', 'Column configuration', "number | { sm?, md?, lg?, xl? }", '{ sm: 1, md: 2, lg: 3 }'],
        ['gap', 'Gap size between items', "'sm' | 'default' | 'lg'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt.push(gridLayoutItem)

// masonry
const masonryItem: DevCenterItem = {
  id: 'masonry',
  label: 'Masonry',
  layer: 'l7',
  type: 'interactive',
  tags: ['masonry', 'layout', 'columns', 'pinterest', 'waterfall'],
  defaultConfig: { columns: 3, gap: 16 },

  stage: ({ config }) => {
    const heights = [80, 120, 60, 100, 140, 90, 70, 110, 85]
    return (
      <div>
        <ImportLine text="import { Masonry } from '@goliapkg/gds'" />

        <LivePreview className="block">
          <Masonry columns={config.columns} gap={config.gap}>
            {heights.map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-sm text-fg-muted"
                style={{ height: h }}
              >
                {h}px
              </div>
            ))}
          </Masonry>
        </LivePreview>

        <DocSection title="API">
          <DocTable
            rows={[
              ['children', 'ReactNode', '—', 'Masonry items'],
              ['columns', 'number', '3', 'Number of columns'],
              ['gap', 'number', '16', 'Gap in pixels between items'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="columns" value={String(config.columns)} options={['2', '3', '4', '5']} onChange={(v) => setConfig('columns', Number(v))} />
      <Ctrl type="number" label="gap" value={config.gap} onChange={(v) => setConfig('gap', v)} min={0} max={48} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Masonry } from '@goliapkg/gds'"]
    lines.push('')
    lines.push(`<Masonry columns={${config.columns}} gap={${config.gap}}>`)
    lines.push('  <div>Item 1</div>')
    lines.push('  <div>Item 2</div>')
    lines.push('  <div>Item 3</div>')
    lines.push('</Masonry>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Masonry items', 'ReactNode', '—'],
        ['columns', 'Number of columns', 'number', '3'],
        ['gap', 'Gap in pixels between items', 'number', '16'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt.push(masonryItem)

export { patternItemsExt }
