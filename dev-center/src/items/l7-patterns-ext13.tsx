import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { CTABanner, FAQ, Testimonial } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt13: DevCenterItem[] = []

const testimonialItem: DevCenterItem = {
  id: 'testimonial',
  label: 'Testimonial',
  layer: 'l7',
  type: 'interactive',
  tags: ['testimonial', 'quote', 'review', 'endorsement', 'pattern'],
  defaultConfig: { quote: 'This design system changed how we build products. Everything is consistent and fast.', author: 'Jane Smith', role: 'CTO at TechCorp', rating: 5, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Testimonial } from '@goliapkg/gds'" />
      <LivePreview>
        <Testimonial
          quote={config.quote}
          author={config.author}
          role={config.role}
          rating={config.rating}
          glass={config.glass}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['quote', 'string', '—', 'Quote text (required)'],
          ['author', 'string', '—', 'Author name (required)'],
          ['role', 'string', '—', 'Author role/title'],
          ['avatar', 'string', '—', 'Author photo URL'],
          ['rating', 'number', '—', 'Star rating 1-5'],
          ['glass', 'boolean', 'false', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="quote" value={config.quote} onChange={(v) => setConfig('quote', v)} />
      <Ctrl type="text" label="author" value={config.author} onChange={(v) => setConfig('author', v)} />
      <Ctrl type="text" label="role" value={config.role} onChange={(v) => setConfig('role', v)} />
      <Ctrl type="number" label="rating" value={config.rating} onChange={(v) => setConfig('rating', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Testimonial } from '@goliapkg/gds'\n\n<Testimonial\n  quote="${config.quote}"\n  author="${config.author}"${config.role ? `\n  role="${config.role}"` : ''}${config.rating ? `\n  rating={${config.rating}}` : ''}${config.glass ? '\n  glass' : ''}\n/>`,
}
patternItemsExt13.push(testimonialItem)

const faqItem: DevCenterItem = {
  id: 'faq',
  label: 'FAQ',
  layer: 'l7',
  type: 'interactive',
  tags: ['faq', 'questions', 'answers', 'accordion', 'pattern'],
  defaultConfig: { title: 'FAQ', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FAQ } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <FAQ
          title={config.title}
          items={[
            { question: 'What is GDS?', answer: 'GOLIA Design System — a comprehensive component library for building modern web applications.' },
            { question: 'How do I install it?', answer: 'Run bun add @goliapkg/gds and import components directly.' },
            { question: 'Is it open source?', answer: 'Yes, GDS is fully open source under the MIT license.' },
          ]}
          glass={config.glass}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['items', '{ question, answer }[]', '—', 'Array of FAQ entries (required)'],
          ['title', 'string', "'FAQ'", 'Section heading'],
          ['glass', 'boolean', 'false', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { FAQ } from '@goliapkg/gds'\n\n<FAQ\n  title="${config.title}"\n  items={[\n    { question: 'What is GDS?', answer: 'A design system.' },\n    { question: 'Is it free?', answer: 'Yes.' },\n  ]}${config.glass ? '\n  glass' : ''}\n/>`,
}
patternItemsExt13.push(faqItem)

const ctaBannerItem: DevCenterItem = {
  id: 'cta-banner',
  label: 'CTABanner',
  layer: 'l7',
  type: 'interactive',
  tags: ['cta', 'banner', 'call-to-action', 'hero', 'pattern'],
  defaultConfig: { title: 'Ready to Get Started?', description: 'Join thousands of teams building with GDS.', variant: 'default', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CTABanner } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <CTABanner
          title={config.title}
          description={config.description}
          variant={config.variant}
          glass={config.glass}
          actions={<div className="flex gap-3"><Button>Get Started</Button><Button variant="secondary">Learn More</Button></div>}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['title', 'string', '—', 'Main heading text (required)'],
          ['description', 'string', '—', 'Supporting text below title'],
          ['actions', 'ReactNode', '—', 'Action buttons (required)'],
          ['variant', "'default' | 'accent' | 'gradient'", "'default'", 'Visual style variant'],
          ['glass', 'boolean', 'false', 'Enable glass material effect (default variant only)'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="text" label="description" value={config.description} onChange={(v) => setConfig('description', v)} />
      <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'accent', 'gradient']} onChange={(v) => setConfig('variant', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CTABanner } from '@goliapkg/gds'\n\n<CTABanner\n  title="${config.title}"${config.description ? `\n  description="${config.description}"` : ''}${config.variant !== 'default' ? `\n  variant="${config.variant}"` : ''}${config.glass ? '\n  glass' : ''}\n  actions={<Button>Get Started</Button>}\n/>`,
}
patternItemsExt13.push(ctaBannerItem)

export { patternItemsExt13 }
