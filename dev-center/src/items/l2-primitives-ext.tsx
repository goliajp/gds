import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Skeleton, Truncate } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

const primitiveItemsExt: DevCenterItem[] = []

// skeleton
const skeletonItem: DevCenterItem = {
  id: 'skeleton',
  label: 'Skeleton',
  layer: 'l2',
  type: 'interactive',
  tags: ['skeleton', 'loading', 'placeholder', 'shimmer', 'pulse'],
  variants: ['text', 'circle', 'rect'],
  defaultConfig: { lines: 1, width: '', height: '' },

  stage: ({ config, variant }) => (
    <div>
      <ImportLine text="import { Skeleton } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="w-[300px] flex flex-col gap-4">
          <Skeleton
            variant={variant as 'text' | 'circle' | 'rect'}
            lines={config.lines}
            width={config.width !== '' ? config.width : undefined}
            height={config.height !== '' ? config.height : undefined}
          />
        </div>
      </LivePreview>

      <DocSection title="Variants" columns={3}>
        <DemoCard title="Text" description="Default, single line" code={`<Skeleton variant="text" />`}>
          <div className="w-full">
            <Skeleton variant="text" />
          </div>
        </DemoCard>
        <DemoCard title="Circle" description="Avatar placeholder" code={`<Skeleton variant="circle" />`}>
          <Skeleton variant="circle" />
        </DemoCard>
        <DemoCard title="Rect" description="Card / image placeholder" code={`<Skeleton variant="rect" />`}>
          <div className="w-full">
            <Skeleton variant="rect" />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Multi-line Text" columns={1}>
        <DemoCard
          title="Paragraph"
          description="Multiple shimmer lines with last line shorter"
          full
          code={`<Skeleton variant="text" lines={4} />`}
        >
          <div className="w-full">
            <Skeleton variant="text" lines={4} />
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Custom Dimensions" columns={2}>
        <DemoCard title="Custom width" code={`<Skeleton width={120} />`}>
          <Skeleton width={120} />
        </DemoCard>
        <DemoCard title="Custom size circle" code={`<Skeleton variant="circle" width={64} height={64} />`}>
          <Skeleton variant="circle" width={64} height={64} />
        </DemoCard>
      </DocSection>

      <DocSection title="Composition" columns={1}>
        <DemoCard
          title="Card skeleton"
          description="Compose skeletons to build loading states"
          full
          code={`<div className="flex gap-3">
  <Skeleton variant="circle" />
  <div className="flex-1 flex flex-col gap-2">
    <Skeleton width="60%" />
    <Skeleton />
  </div>
</div>`}
        >
          <div className="flex w-full gap-3">
            <Skeleton variant="circle" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton width="60%" />
              <Skeleton />
            </div>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['variant', "'text' | 'circle' | 'rect'", "'text'", 'Shape variant'],
            ['width', 'number | string', '—', 'Custom width'],
            ['height', 'number | string', '—', 'Custom height'],
            ['lines', 'number', '1', 'Number of text lines'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig, variant, setVariant }) => (
    <>
      <Ctrl type="pills" label="variant" value={variant} options={['text', 'circle', 'rect']} onChange={setVariant} />
      <Ctrl type="number" label="lines" value={config.lines} onChange={(v) => setConfig('lines', v)} />
      <Ctrl type="text" label="width" value={config.width} onChange={(v) => setConfig('width', v)} placeholder="e.g. 200 or 50%" />
      <Ctrl type="text" label="height" value={config.height} onChange={(v) => setConfig('height', v)} placeholder="e.g. 3rem" />
    </>
  ),

  code: ({ config, variant }) => {
    const lines = ["import { Skeleton } from '@goliapkg/gds'"]
    lines.push('')
    const props: string[] = []
    if (variant !== 'text') props.push(`variant="${variant}"`)
    if (config.lines !== 1) props.push(`lines={${config.lines}}`)
    if (config.width !== '') props.push(`width="${config.width}"`)
    if (config.height !== '') props.push(`height="${config.height}"`)
    if (props.length === 0) {
      lines.push('<Skeleton />')
    } else {
      lines.push('<Skeleton')
      for (const p of props) lines.push(`  ${p}`)
      lines.push('/>')
    }
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable
        rows={[
          ['variant', 'Shape variant', "'text' | 'circle' | 'rect'", "'text'"],
          ['width', 'Custom width', 'number | string', '—'],
          ['height', 'Custom height', 'number | string', '—'],
          ['lines', 'Number of text lines', 'number', '1'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]}
      />
    </div>
  ),
}
primitiveItemsExt.push(skeletonItem)

// truncate
// helper for controlled expand demo
function ExpandDemo() {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="w-full">
      <Truncate lines={2} expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        This text starts clamped to 2 lines. Click anywhere to expand and see the full content.
        Click again to collapse. This pattern is useful for preview cards and comment sections.
      </Truncate>
    </div>
  )
}

const truncateItem: DevCenterItem = {
  id: 'truncate',
  label: 'Truncate',
  layer: 'l2',
  type: 'interactive',
  tags: ['truncate', 'ellipsis', 'clamp', 'text', 'overflow'],
  defaultConfig: { lines: 1, expanded: false },

  stage: ({ config, setConfig }) => (
    <div>
      <ImportLine text="import { Truncate } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="w-[300px]">
          <Truncate lines={config.lines} expanded={config.expanded} onToggle={() => setConfig('expanded', !config.expanded)}>
            This is a long piece of text that demonstrates the truncation behavior of the Truncate component.
            It can handle both single-line ellipsis and multi-line clamping with configurable line counts.
            Pass expanded + onToggle to make it interactive.
          </Truncate>
        </div>
      </LivePreview>

      <DocSection title="Single Line" columns={1}>
        <DemoCard title="Default" description="Single line with ellipsis" full code={`<Truncate>Long text...</Truncate>`}>
          <div className="w-full">
            <Truncate>This is a very long text that will be truncated to a single line with an ellipsis at the end</Truncate>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Multi-line Clamp" columns={1}>
        <DemoCard title="3 lines" description="Clamp to 3 visible lines" full code={`<Truncate lines={3}>Long text...</Truncate>`}>
          <div className="w-full">
            <Truncate lines={3}>
              This text will be clamped to three lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Truncate>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Controlled Expand" columns={1}>
        <DemoCard title="Click to expand" description="Parent controls expanded state" full code={`const [expanded, setExpanded] = useState(false)\n\n<Truncate lines={2} expanded={expanded} onToggle={() => setExpanded(!expanded)}>\n  Long text...\n</Truncate>`}>
          <ExpandDemo />
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['children', 'ReactNode', '—', 'Content to truncate'],
            ['lines', 'number', '1', 'Number of lines before truncation'],
            ['expanded', 'boolean', 'false', 'Whether content is expanded (controlled)'],
            ['onToggle', '() => void', '—', 'Callback to toggle expanded state'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="lines" value={config.lines} onChange={(v) => setConfig('lines', v)} min={1} max={10} />
      <Ctrl type="check" label="expanded" value={config.expanded} onChange={(v) => setConfig('expanded', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Truncate } from '@goliapkg/gds'"]
    lines.push('')
    const props: string[] = []
    if (config.lines !== 1) props.push(`lines={${config.lines}}`)
    if (config.expanded === true) props.push('expanded')
    props.push('onToggle={handleToggle}')
    lines.push('<Truncate')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('>')
    lines.push('  Long text content...')
    lines.push('</Truncate>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable
        rows={[
          ['children', 'Content to truncate', 'ReactNode', '—'],
          ['lines', 'Number of lines before truncation', 'number', '1'],
          ['expanded', 'Whether content is expanded', 'boolean', 'false'],
          ['onToggle', 'Toggle expanded callback', '() => void', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]}
      />
    </div>
  ),
}
primitiveItemsExt.push(truncateItem)

export { primitiveItemsExt }
