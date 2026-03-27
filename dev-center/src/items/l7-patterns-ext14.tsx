import { ComparisonTable, TimelineSteps } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt14: DevCenterItem[] = [
  {
    id: 'timeline-steps',
    label: 'TimelineSteps',
    layer: 'l7',
    type: 'interactive',
    tags: ['timeline', 'steps', 'progress', 'order', 'milestone'],
    defaultConfig: { stepCount: '4' },

    stage: ({ config }) => {
      const allSteps = [
        { label: 'Order placed', description: 'Mar 20', status: 'completed' as const },
        { label: 'Payment', description: 'Mar 20', status: 'completed' as const },
        { label: 'Processing', status: 'current' as const },
        { label: 'Shipped', description: 'Est. Mar 25', status: 'upcoming' as const },
        { label: 'Delivered', status: 'upcoming' as const },
      ]
      const steps = allSteps.slice(0, Number(config.stepCount))
      return (
        <div>
          <ImportLine text="import { TimelineSteps } from '@goliapkg/gds'" />

          <LivePreview className="!p-6">
            <TimelineSteps steps={steps} />
          </LivePreview>

          <DocSection title="States" columns={2}>
            <DemoCard title="All Completed" description="Every step finished" code={`steps={[{ label: 'Done', status: 'completed' }]}`}>
              <TimelineSteps steps={[
                { label: 'Step 1', status: 'completed' },
                { label: 'Step 2', status: 'completed' },
                { label: 'Step 3', status: 'completed' },
              ]} />
            </DemoCard>
            <DemoCard title="Just Started" description="First step is current" code={`steps={[{ label: 'Start', status: 'current' }]}`}>
              <TimelineSteps steps={[
                { label: 'Start', status: 'current' },
                { label: 'Middle', status: 'upcoming' },
                { label: 'End', status: 'upcoming' },
              ]} />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="steps" type="pills" value={config.stepCount} options={['3', '4', '5']} onChange={v => setConfig('stepCount', v)} />
      </>
    ),

    code: () => [
      "import { TimelineSteps } from '@goliapkg/gds'",
      '',
      '<TimelineSteps',
      '  steps={[',
      "    { label: 'Placed', status: 'completed' },",
      "    { label: 'Processing', status: 'current' },",
      "    { label: 'Shipped', status: 'upcoming' },",
      '  ]}',
      '/>',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['steps', 'Step definitions', 'TimelineStep[]', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">TimelineStep</div>
          <DocTable rows={[
            ['label', 'Step name', 'string', '—'],
            ['description', 'Optional subtext', 'string', '—'],
            ['status', 'Step state', "'completed' | 'current' | 'upcoming'", '—'],
          ]} />
        </div>
      </div>
    ),
  },
  {
    id: 'comparison-table',
    label: 'ComparisonTable',
    layer: 'l7',
    type: 'interactive',
    tags: ['compare', 'pricing', 'table', 'features', 'plans'],
    defaultConfig: { highlight: true, glass: false },

    stage: ({ config }) => {
      const features = ['Storage', 'Users', 'API access', 'Support', 'Custom domain']
      const plans = [
        { name: 'Free', values: ['1 GB', '1', false, false, false] },
        { name: 'Pro', values: ['100 GB', '10', true, true, false] },
        { name: 'Enterprise', values: ['Unlimited', 'Unlimited', true, true, true] },
      ]
      return (
        <div>
          <ImportLine text="import { ComparisonTable } from '@goliapkg/gds'" />

          <LivePreview className="!p-6">
            <ComparisonTable
              features={features}
              plans={plans}
              highlightColumn={config.highlight ? 1 : undefined}
              glass={config.glass}
            />
          </LivePreview>

          <DocSection title="Variants" columns={2}>
            <DemoCard title="Two Plans" description="Minimal comparison" code={`<ComparisonTable features={['A', 'B']} plans={[...]} />`}>
              <ComparisonTable
                features={['Feature A', 'Feature B']}
                plans={[
                  { name: 'Basic', values: [true, false] },
                  { name: 'Plus', values: [true, true] },
                ]}
              />
            </DemoCard>
            <DemoCard title="String Values" description="Mix of text and boolean" code={`values: ['10 GB', true, '24/7']`}>
              <ComparisonTable
                features={['Disk', 'SSL', 'Support']}
                plans={[
                  { name: 'Starter', values: ['5 GB', true, 'Email'] },
                  { name: 'Business', values: ['500 GB', true, '24/7'] },
                ]}
                highlightColumn={1}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="highlight" type="check" value={config.highlight} onChange={v => setConfig('highlight', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: () => [
      "import { ComparisonTable } from '@goliapkg/gds'",
      '',
      '<ComparisonTable',
      "  features={['Storage', 'Users', 'Support']}",
      '  plans={[',
      "    { name: 'Free', values: ['1 GB', true, false] },",
      "    { name: 'Pro', values: ['100 GB', true, true] },",
      '  ]}',
      '  highlightColumn={1}',
      '/>',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['features', 'Row labels', 'string[]', '—'],
          ['plans', 'Column definitions with values', 'ComparisonPlan[]', '—'],
          ['highlightColumn', 'Index of highlighted plan column', 'number', '—'],
          ['glass', 'Apply glass material', 'boolean', 'false'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">ComparisonPlan</div>
          <DocTable rows={[
            ['name', 'Plan name (column header)', 'string', '—'],
            ['values', 'Feature values per row', '(boolean | string)[]', '—'],
          ]} />
        </div>
      </div>
    ),
  },
]

export { patternItemsExt14 }
