import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { Footer, Hero, NavBar } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt12: DevCenterItem[] = []

const heroItem: DevCenterItem = {
  id: 'hero',
  label: 'Hero',
  layer: 'l7',
  type: 'interactive',
  tags: ['hero', 'landing', 'section', 'above-the-fold', 'pattern'],
  defaultConfig: { title: 'Build Something Great', subtitle: 'The modern design system for ambitious teams.', align: 'center', glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Hero } from '@golia/gds'" />
      <LivePreview className="block">
        <Hero
          title={config.title}
          subtitle={config.subtitle}
          align={config.align}
          glass={config.glass}
          actions={<div className="flex gap-3 justify-center"><Button>Get Started</Button><Button variant="secondary">Learn More</Button></div>}
          media={config.align === 'left' ? <div className="rounded-lg border border-border bg-surface p-8 text-fg-muted text-xs">Media Slot</div> : undefined}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['title', 'string', '—', 'Main heading text (required)'],
          ['subtitle', 'string', '—', 'Supporting description text'],
          ['actions', 'ReactNode', '—', 'CTA buttons area'],
          ['media', 'ReactNode', '—', 'Image/video slot (below in center, right in left)'],
          ['align', "'left' | 'center'", "'center'", 'Layout alignment'],
          ['glass', 'boolean', 'false', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
      <Ctrl type="text" label="subtitle" value={config.subtitle} onChange={(v) => setConfig('subtitle', v)} />
      <Ctrl type="pills" label="align" value={config.align} options={['center', 'left']} onChange={(v) => setConfig('align', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Hero } from '@golia/gds'\n\n<Hero\n  title="${config.title}"\n  subtitle="${config.subtitle}"\n  align="${config.align}"${config.glass ? '\n  glass' : ''}\n  actions={<Button>Get Started</Button>}\n/>`,
}
patternItemsExt12.push(heroItem)

const footerItem: DevCenterItem = {
  id: 'footer',
  label: 'Footer',
  layer: 'l7',
  type: 'interactive',
  tags: ['footer', 'navigation', 'links', 'copyright', 'pattern'],
  defaultConfig: { glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Footer } from '@golia/gds'" />
      <LivePreview className="block">
        <Footer
          columns={[
            { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] },
            { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }] },
            { title: 'Support', links: [{ label: 'Docs', href: '#' }, { label: 'Contact', href: '#' }] },
          ]}
          logo={<span className="text-sm font-bold text-fg">GOLIA</span>}
          copyright="&copy; 2026 GOLIA K.K. All rights reserved."
          glass={config.glass}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['columns', '{ title, links }[]', '—', 'Array of link column groups'],
          ['copyright', 'string', '—', 'Copyright text at the bottom'],
          ['logo', 'ReactNode', '—', 'Logo in copyright row'],
          ['glass', 'boolean', 'false', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Footer } from '@golia/gds'\n\n<Footer\n  columns={[\n    { title: 'Product', links: [{ label: 'Features', href: '/features' }] },\n  ]}\n  copyright="&copy; 2026 GOLIA"\n  logo={<Logo />}${config.glass ? '\n  glass' : ''}\n/>`,
}
patternItemsExt12.push(footerItem)

const navBarItem: DevCenterItem = {
  id: 'nav-bar',
  label: 'NavBar',
  layer: 'l7',
  type: 'interactive',
  tags: ['navbar', 'navigation', 'header', 'menu', 'pattern'],
  defaultConfig: { sticky: true, glass: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { NavBar } from '@golia/gds'" />
      <LivePreview className="block">
        <NavBar
          logo={<span className="text-sm font-bold text-fg">GOLIA</span>}
          links={[
            { label: 'Home', href: '#', active: true },
            { label: 'Products', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Pricing', href: '#' },
          ]}
          actions={<Button size="sm">Sign In</Button>}
          sticky={config.sticky}
          glass={config.glass}
        />
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['logo', 'ReactNode', '—', 'Brand logo element on the left'],
          ['links', '{ label, href, active? }[]', '—', 'Navigation links in the center'],
          ['actions', 'ReactNode', '—', 'Action elements on the right (buttons, avatar)'],
          ['sticky', 'boolean', 'true', 'Stick to top of viewport'],
          ['glass', 'boolean', 'true', 'Enable glass material effect'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="sticky" value={config.sticky} onChange={(v) => setConfig('sticky', v)} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { NavBar } from '@golia/gds'\n\n<NavBar\n  logo={<Logo />}\n  links={[\n    { label: 'Home', href: '/', active: true },\n    { label: 'About', href: '/about' },\n  ]}\n  actions={<Button>Sign In</Button>}${!config.sticky ? '\n  sticky={false}' : ''}${!config.glass ? '\n  glass={false}' : ''}\n/>`,
}
patternItemsExt12.push(navBarItem)

export { patternItemsExt12 }
