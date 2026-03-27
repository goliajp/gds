import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { BentoGrid, FeatureCard, PricingCard } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt11: DevCenterItem[] = []

const bentoGridItem: DevCenterItem = {
  id: 'bento-grid',
  label: 'BentoGrid',
  layer: 'l7',
  type: 'interactive',
  tags: ['grid', 'bento', 'layout', 'pattern'],
  defaultConfig: { columns: '4', gap: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { BentoGrid } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <BentoGrid columns={Number(config.columns)} gap={config.gap}>
          <div className="col-span-2 row-span-2 rounded-lg border border-border bg-surface p-4 text-fg-muted text-xs">2x2 span</div>
          <div className="rounded-lg border border-border bg-surface p-4 text-fg-muted text-xs">1x1</div>
          <div className="rounded-lg border border-border bg-surface p-4 text-fg-muted text-xs">1x1</div>
          <div className="col-span-2 rounded-lg border border-border bg-surface p-4 text-fg-muted text-xs">2x1 span</div>
        </BentoGrid>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['children', 'ReactNode', '—', 'Grid items, use col-span-* / row-span-* to span cells'],
          ['columns', 'number', '4', 'Number of grid columns'],
          ['gap', "'sm' | 'default' | 'lg'", "'default'", 'Gap between grid items'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="columns" value={config.columns} options={['2', '3', '4', '6']} onChange={(v) => setConfig('columns', v)} />
      <Ctrl type="pills" label="gap" value={config.gap} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('gap', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { BentoGrid } from '@goliapkg/gds'\n\n<BentoGrid columns={${config.columns}} gap="${config.gap}">\n  <div className="col-span-2 row-span-2">Featured</div>\n  <div>Item 1</div>\n  <div>Item 2</div>\n</BentoGrid>`,
}
patternItemsExt11.push(bentoGridItem)

const featureCardItem: DevCenterItem = {
  id: 'feature-card',
  label: 'FeatureCard',
  layer: 'l7',
  type: 'interactive',
  tags: ['card', 'feature', 'landing', 'showcase', 'pattern'],
  defaultConfig: { title: 'Lightning Fast', description: 'Build and deploy in seconds with our optimized pipeline.', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FeatureCard } from '@goliapkg/gds'" />
      <LivePreview>
        <FeatureCard
          icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          title={config.title}
          description={config.description}
          glass={config.glass}
          action={<Button variant="secondary" size="sm">Learn More</Button>}
        />
      </LivePreview>

      <DocSection title="Examples" columns={3}>
        <FeatureCard title="Secure" description="End-to-end encryption for all data." />
        <FeatureCard title="Scalable" description="Handles millions of requests." glass />
        <FeatureCard title="Open Source" description="Community driven development." action={<Button size="sm" variant="secondary">GitHub</Button>} />
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['icon', 'ReactNode', '—', 'Icon displayed at the top'],
          ['title', 'string', '—', 'Feature title (required)'],
          ['description', 'string', '—', 'Feature description text'],
          ['action', 'ReactNode', '—', 'Optional CTA element at the bottom'],
          ['glass', 'boolean', 'false', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="text" label="description" value={config.description} onChange={(v) => setConfig('description', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { FeatureCard } from '@goliapkg/gds'\n\n<FeatureCard\n  icon={<ZapIcon />}\n  title="${config.title}"\n  description="${config.description}"${config.glass ? '\n  glass' : ''}\n  action={<Button>Learn More</Button>}\n/>`,
}
patternItemsExt11.push(featureCardItem)

const pricingCardItem: DevCenterItem = {
  id: 'pricing-card',
  label: 'PricingCard',
  layer: 'l7',
  type: 'interactive',
  tags: ['card', 'pricing', 'tier', 'plan', 'pattern'],
  defaultConfig: { name: 'Pro', price: '$29', period: '/month', highlighted: false, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PricingCard } from '@goliapkg/gds'" />
      <LivePreview>
        <PricingCard
          name={config.name}
          price={config.price}
          period={config.period}
          features={['Unlimited projects', '50GB storage', 'Priority support', 'Custom domains']}
          highlighted={config.highlighted}
          glass={config.glass}
          action={<Button variant={config.highlighted ? 'primary' : 'secondary'} size="sm" className="w-full">Get Started</Button>}
        />
      </LivePreview>

      <DocSection title="Examples" columns={3}>
        <PricingCard name="Free" price="$0" features={['1 project', '1GB storage']} action={<Button variant="secondary" size="sm" className="w-full">Start Free</Button>} />
        <PricingCard name="Pro" price="$29" features={['Unlimited projects', '50GB storage', 'Priority support']} highlighted action={<Button variant="primary" size="sm" className="w-full">Get Started</Button>} />
        <PricingCard name="Enterprise" price="Custom" period="" features={['Unlimited everything', 'Dedicated support', 'SLA guarantee']} action={<Button variant="secondary" size="sm" className="w-full">Contact Sales</Button>} />
      </DocSection>

      <DocSection title="API">
        <DocTable rows={[
          ['name', 'string', '—', 'Tier name (required)'],
          ['price', 'string', '—', 'Formatted price (required)'],
          ['period', 'string', "'/month'", 'Billing period label'],
          ['features', 'string[]', '—', 'List of included features (required)'],
          ['action', 'ReactNode', '—', 'CTA button at the bottom'],
          ['highlighted', 'boolean', 'false', 'Emphasize this tier with accent border'],
          ['glass', 'boolean', 'false', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="name" value={config.name} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="text" label="price" value={config.price} onChange={(v) => setConfig('price', v)} />
      <Ctrl type="text" label="period" value={config.period} onChange={(v) => setConfig('period', v)} />
      <Ctrl type="check" label="highlighted" value={config.highlighted} onChange={(v) => setConfig('highlighted', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { PricingCard } from '@goliapkg/gds'\n\n<PricingCard\n  name="${config.name}"\n  price="${config.price}"\n  period="${config.period}"\n  features={['Feature 1', 'Feature 2']}${config.highlighted ? '\n  highlighted' : ''}${config.glass ? '\n  glass' : ''}\n  action={<Button>Get Started</Button>}\n/>`,
}
patternItemsExt11.push(pricingCardItem)

export { patternItemsExt11 }
