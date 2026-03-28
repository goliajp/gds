import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Highlight } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const primitiveItemsExt2: DevCenterItem[] = []

const highlightItem: DevCenterItem = {
  id: 'highlight',
  label: 'Highlight',
  layer: 'l2',
  type: 'interactive',
  tags: ['highlight', 'search', 'mark', 'text', 'match'],
  defaultConfig: { text: 'The quick brown fox jumps over the lazy dog', query: 'fox', caseSensitive: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Highlight } from '@goliapkg/gds'" />

      <LivePreview>
        <Highlight
          text={config.text}
          query={config.query}
          caseSensitive={config.caseSensitive}
        />
      </LivePreview>

      <DocSection title="Examples" columns={2}>
        <div className="space-y-2">
          <div className="text-[10px] font-medium text-fg-muted/50">Single match</div>
          <Highlight text="Search results for query" query="query" />
        </div>
        <div className="space-y-2">
          <div className="text-[10px] font-medium text-fg-muted/50">Multiple matches</div>
          <Highlight text="foo bar foo baz foo" query="foo" />
        </div>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['text', 'string', '—', 'Full text to display'],
            ['query', 'string', '—', 'Substring to highlight'],
            ['highlightClass', 'string', "'bg-accent/20 text-accent'", 'CSS classes for highlighted text'],
            ['caseSensitive', 'boolean', 'false', 'Case-sensitive matching'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="text" value={config.text} onChange={(v) => setConfig('text', v)} />
      <Ctrl type="text" label="query" value={config.query} onChange={(v) => setConfig('query', v)} />
      <Ctrl type="check" label="caseSensitive" value={config.caseSensitive} onChange={(v) => setConfig('caseSensitive', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Highlight } from '@goliapkg/gds'"]
    lines.push('')
    const props: string[] = []
    props.push(`text="${config.text}"`)
    props.push(`query="${config.query}"`)
    if (config.caseSensitive === true) props.push('caseSensitive')
    lines.push('<Highlight')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable
        rows={[
          ['text', 'Full text string', 'string', '—'],
          ['query', 'Search term', 'string', '—'],
          ['highlightClass', 'Mark CSS classes', 'string', "'bg-accent/20 text-accent'"],
          ['caseSensitive', 'Case sensitivity', 'boolean', 'false'],
        ]}
      />
    </div>
  ),
}
primitiveItemsExt2.push(highlightItem)

export { primitiveItemsExt2 }
