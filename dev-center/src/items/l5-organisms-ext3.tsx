import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { DiffViewer, JsonViewer, MarkdownPreview } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt3: DevCenterItem[] = []

// diff-viewer
const diffViewerItem: DevCenterItem = {
  id: 'diff-viewer',
  label: 'DiffViewer',
  layer: 'l5',
  type: 'interactive',
  tags: ['diff', 'compare', 'text', 'code', 'viewer'],
  defaultConfig: { mode: 'unified', glass: false },

  stage: ({ config }) => {
    const oldText = 'function greet(name) {\n  console.log("hello")\n  return name\n}'
    const newText = 'function greet(name) {\n  console.log("hello", name)\n  return name.toUpperCase()\n}'

    return (
      <div>
        <ImportLine text="import { DiffViewer } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-[600px]">
            <DiffViewer oldText={oldText} newText={newText} mode={config.mode} glass={config.glass} />
          </div>
        </LivePreview>

        <DocSection title="Modes" columns={1}>
          <DemoCard
            title="Unified"
            description="Single column with +/- markers"
            full
            code={`<DiffViewer oldText={old} newText={new} mode="unified" />`}
          >
            <div className="w-full">
              <DiffViewer oldText="alpha\nbeta\ngamma" newText="alpha\ndelta\ngamma\nepsilon" mode="unified" />
            </div>
          </DemoCard>
          <DemoCard
            title="Split"
            description="Two columns side by side"
            full
            code={`<DiffViewer oldText={old} newText={new} mode="split" />`}
          >
            <div className="w-full">
              <DiffViewer
                oldText="alpha\nbeta\ngamma"
                newText="alpha\ndelta\ngamma\nepsilon"
                mode="split"
                oldTitle="Before"
                newTitle="After"
              />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="API">
          <DocTable
            rows={[
              ['oldText', 'string', '—', 'Original text'],
              ['newText', 'string', '—', 'Modified text'],
              ['mode', "'split' | 'unified'", "'unified'", 'Display mode'],
              ['oldTitle', 'string', "'Old'", 'Title for old pane (split mode)'],
              ['newTitle', 'string', "'New'", 'Title for new pane (split mode)'],
              ['glass', 'boolean', 'false', 'Frosted glass surface'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="mode" value={config.mode} options={['unified', 'split']} onChange={(v) => setConfig('mode', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),
}
organismItemsExt3.push(diffViewerItem)

// json-viewer
const jsonViewerItem: DevCenterItem = {
  id: 'json-viewer',
  label: 'JsonViewer',
  layer: 'l5',
  type: 'interactive',
  tags: ['json', 'tree', 'data', 'viewer', 'inspector'],
  defaultConfig: { expanded: 2, glass: false },

  stage: ({ config }) => {
    const sampleData = {
      name: 'GOLIA Design System',
      version: '1.0.0',
      features: ['tokens', 'components', 'charts'],
      config: {
        theme: 'dark',
        motion: true,
        density: { default: 'comfortable', compact: 'dense' },
      },
      active: true,
      count: 42,
      nullable: null,
    }

    return (
      <div>
        <ImportLine text="import { JsonViewer } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-[500px]">
            <JsonViewer data={sampleData} defaultExpanded={config.expanded} glass={config.glass} />
          </div>
        </LivePreview>

        <DocSection title="Data Types" columns={2}>
          <DemoCard title="Primitives" description="String, number, boolean, null" code={`<JsonViewer data="hello" />`}>
            <div className="flex flex-col gap-2 w-full">
              <JsonViewer data="hello world" />
              <JsonViewer data={3.14} />
              <JsonViewer data={false} />
              <JsonViewer data={null} />
            </div>
          </DemoCard>
          <DemoCard title="Nested Object" description="Collapsible nested structure" code={`<JsonViewer data={obj} defaultExpanded />`}>
            <div className="w-full">
              <JsonViewer data={{ users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }} defaultExpanded />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="API">
          <DocTable
            rows={[
              ['data', 'unknown', '—', 'JSON-serializable value'],
              ['defaultExpanded', 'boolean | number', '2', 'Expand depth (true=all)'],
              ['glass', 'boolean', 'false', 'Frosted glass surface'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="expanded" value={config.expanded} onChange={(v) => setConfig('expanded', v)} min={0} max={10} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),
}
organismItemsExt3.push(jsonViewerItem)

// markdown-preview
const markdownPreviewItem: DevCenterItem = {
  id: 'markdown-preview',
  label: 'MarkdownPreview',
  layer: 'l5',
  type: 'interactive',
  tags: ['markdown', 'preview', 'text', 'render', 'prose'],
  defaultConfig: { glass: false },

  stage: ({ config }) => {
    const sampleMd = `# GDS Components

The **GOLIA Design System** provides a comprehensive set of components.

## Features

- *Tokens* — design tokens for spacing, color, typography
- **Atoms** — basic building blocks
- Components — composable UI elements

## Code Example

\`\`\`
function hello() {
  return 'world'
}
\`\`\`

> Design is not just what it looks like. Design is how it works.

Visit [GOLIA](https://golia.jp) for more info.

---

Built with \`React\` and \`TypeScript\`.`

    return (
      <div>
        <ImportLine text="import { MarkdownPreview } from '@goliapkg/gds'" />

        <LivePreview>
          <div className="w-[500px]">
            <MarkdownPreview content={sampleMd} glass={config.glass} />
          </div>
        </LivePreview>

        <DocSection title="Elements" columns={2}>
          <DemoCard title="Headings" description="H1 through H6" code={`<MarkdownPreview content="# H1\\n## H2\\n### H3" />`}>
            <div className="w-full">
              <MarkdownPreview content={'# Heading 1\n## Heading 2\n### Heading 3'} />
            </div>
          </DemoCard>
          <DemoCard title="Inline" description="Bold, italic, code, links" code={`<MarkdownPreview content="**bold** *italic* \`code\`" />`}>
            <div className="w-full">
              <MarkdownPreview content={'**bold text** and *italic text* and `inline code` and [a link](https://golia.jp)'} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="API">
          <DocTable
            rows={[
              ['content', 'string', '—', 'Markdown string to render'],
              ['glass', 'boolean', 'false', 'Frosted glass surface'],
              ['className', 'string', '—', 'Additional CSS classes'],
            ]}
          />
        </DocSection>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),
}
organismItemsExt3.push(markdownPreviewItem)

export { organismItemsExt3 }
