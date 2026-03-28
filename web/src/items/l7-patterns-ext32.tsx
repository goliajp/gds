import { useState } from 'react'

import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Badge, Button } from '@gds/l2-primitives'

import type { DevCenterItem } from '../types'

function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="rounded-lg border border-border/40 bg-bg-secondary">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-bold text-fg">Logo</span>
        <div className="hidden items-center gap-4 md:flex">
          {['Home', 'Products', 'About', 'Contact'].map((link) => (
            <span className="text-xs text-fg-muted transition-colors hover:text-fg" key={link}>{link}</span>
          ))}
          <Button size="sm">Sign Up</Button>
        </div>
        <button
          className="rounded p-1 text-fg-muted hover:bg-bg-tertiary md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 4h12M2 8h12M2 12h12" /></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="space-y-1 border-t border-border/30 px-4 py-2 md:hidden">
          {['Home', 'Products', 'About', 'Contact'].map((link) => (
            <div className="rounded px-2 py-1.5 text-xs text-fg-muted hover:bg-bg-tertiary hover:text-fg" key={link}>{link}</div>
          ))}
          <Button className="mt-2 w-full" size="sm">Sign Up</Button>
        </div>
      )}
    </div>
  )
}

const patternItemsExt32: DevCenterItem[] = [
  {
    id: 'patterns',
    label: 'UI Patterns',
    layer: 'l7',
    type: 'reference',
    tags: ['empty', 'loading', 'skeleton', 'error', 'list', 'card'],

    stage: () => (
      <div>
        <ImportLine text="// reusable UI patterns for common states and layouts" />

        <DocSection title="States">
          <div className="grid grid-cols-2 gap-3">
            <DemoCard title="Empty State" description="No data available" code={`<div className="flex flex-col items-center gap-3 py-12">\n  <Inbox className="h-10 w-10 text-fg-muted/20" />\n  <p>No items found</p>\n  <Button>Create New</Button>\n</div>`}>
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border/40 py-12">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fg-muted/20"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <div className="text-sm text-fg-muted">No items found</div>
                <Button size="sm" variant="secondary">Create New</Button>
              </div>
            </DemoCard>

            <DemoCard title="Loading State" description="Skeleton placeholder" code={`<div className="animate-pulse rounded bg-bg-tertiary" />`}>
              <div className="space-y-2 rounded-lg border border-border/40 p-4">
                {[1, 2, 3].map((i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <div className="h-8 w-8 animate-pulse rounded-full bg-bg-tertiary" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 w-3/4 animate-pulse rounded bg-bg-tertiary" />
                      <div className="h-2.5 w-1/2 animate-pulse rounded bg-bg-tertiary" />
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </div>
        </DocSection>

        <DocSection title="Data Display">
          <div className="grid grid-cols-2 gap-3">
            <DemoCard title="List Item" description="Interactive row with avatar and badge" code={`<div className="flex items-center gap-3 px-4 py-3">\n  <Avatar />\n  <div>Name / Email</div>\n  <Badge>Status</Badge>\n</div>`}>
              <div className="rounded-lg border border-border/40">
                {['Alice Chen', 'Bob Tanaka', 'Charlie Li'].map((name, i) => (
                  <div className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0 hover:bg-bg-tertiary" key={name}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">{name[0]}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-fg">{name}</div>
                      <div className="text-xs text-fg-muted">user@golia.jp</div>
                    </div>
                    <Badge variant={i === 0 ? 'success' : i === 1 ? 'warning' : 'default'}>
                      {i === 0 ? 'Active' : i === 1 ? 'Pending' : 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            </DemoCard>

            <DemoCard title="Content Card" description="Preview with metadata" code={`<div className="rounded-lg border p-4">\n  <Icon />\n  <Title />\n  <Description />\n  <Badge />\n</div>`}>
              <div className="rounded-lg border border-border/40 bg-surface p-4">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><path d="M3 2h7l3 3v9H3z" /><path d="M9 2v4h4" /></svg>
                  <span className="text-sm font-medium text-fg">Document Title</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">A brief description of the document or resource. Used for content previews and summaries.</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="info">Draft</Badge>
                  <span className="text-[10px] text-fg-muted">Updated 2 hours ago</span>
                </div>
              </div>
            </DemoCard>
          </div>
        </DocSection>

        <DocSection title="Feedback">
          <DemoCard title="Error State" description="Inline error with retry action" code={`<div className="border border-danger/20 bg-danger/5 ...">\n  <span>!</span>\n  <p>Error message</p>\n  <Button variant="danger">Retry</Button>\n</div>`}>
            <div className="flex items-center gap-3 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-danger/10">
                <span className="text-sm text-danger">!</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-danger">Something went wrong</div>
                <p className="mt-0.5 text-xs text-fg-muted">Unable to load data. Please check your connection and try again.</p>
              </div>
              <Button size="sm" variant="danger">Retry</Button>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    code: () => `// empty state
<div className="flex flex-col items-center gap-3 py-12">
  <Inbox className="h-10 w-10 text-fg-muted/20" />
  <p className="text-sm text-fg-muted">No items found</p>
  <Button variant="secondary" size="sm">Create New</Button>
</div>

// skeleton loading
<div className="flex items-center gap-3">
  <div className="h-8 w-8 animate-pulse rounded-full bg-bg-tertiary" />
  <div className="flex-1 space-y-1.5">
    <div className="h-3 w-3/4 animate-pulse rounded bg-bg-tertiary" />
    <div className="h-2.5 w-1/2 animate-pulse rounded bg-bg-tertiary" />
  </div>
</div>

// error state
<div className="flex items-center gap-3 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3">
  <span className="text-danger">!</span>
  <div className="flex-1">
    <div className="text-sm font-medium text-danger">Error title</div>
    <p className="text-xs text-fg-muted">Description</p>
  </div>
  <Button variant="danger" size="sm">Retry</Button>
</div>`,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">When to use each pattern</div>
          <div className="space-y-1.5 text-[10px] text-fg-muted/50">
            <p><span className="font-medium text-fg-muted">Empty state</span> — when a collection has zero items. Always include a CTA.</p>
            <p><span className="font-medium text-fg-muted">Loading state</span> — during async data fetch. Use skeletons matching expected layout.</p>
            <p><span className="font-medium text-fg-muted">List item</span> — for browseable collections. Avatar + text + badge.</p>
            <p><span className="font-medium text-fg-muted">Content card</span> — for document previews. Icon + title + description.</p>
            <p><span className="font-medium text-fg-muted">Error state</span> — inline error with retry. Use danger colors.</p>
          </div>
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Prefer tables for dense data. Cards for content previews only.</p>
            <p>• Loading skeletons should match the shape of loaded content.</p>
            <p>• Error messages must be actionable — always provide a retry path.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'responsive-pattern',
    label: 'Responsive',
    layer: 'l7',
    type: 'reference',
    tags: ['responsive', 'mobile', 'breakpoint', 'grid', 'layout', 'navigation'],

    stage: () => (
      <div>
        <ImportLine text="// mobile-first responsive design patterns" />

        <LivePreview>
          <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-bg-secondary/50 px-4 py-2.5">
            <span className="text-xs text-fg-muted">Active breakpoint:</span>
            <Badge className="sm:hidden" variant="info">xs (&lt;640px)</Badge>
            <Badge className="hidden sm:inline-flex md:hidden" variant="info">sm (640px+)</Badge>
            <Badge className="hidden md:inline-flex lg:hidden" variant="info">md (768px+)</Badge>
            <Badge className="hidden lg:inline-flex xl:hidden" variant="info">lg (1024px+)</Badge>
            <Badge className="hidden xl:inline-flex" variant="info">xl (1280px+)</Badge>
          </div>
        </LivePreview>

        <DocSection title="Card Grid" columns={1}>
          <DemoCard title="Responsive Card Grid" description="1 col on mobile, 2 on md, 3 on lg" code={`<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">...</div>`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((name) => (
                <div key={name} className="rounded-lg border border-border/40 p-3">
                  <div className="text-sm font-medium text-fg">{name}</div>
                  <div className="mt-1 text-xs text-fg-muted">Card content</div>
                  <div className="mt-2 h-8 rounded bg-bg-tertiary/50" />
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Form Layout" columns={1}>
          <DemoCard title="Responsive Form" description="Stacked on mobile, side-by-side on md+" code={`<div className="flex flex-col gap-3 md:flex-row">...</div>`}>
            <div className="space-y-3">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-fg-muted">First Name</label>
                  <div className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-fg-muted">John</div>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-fg-muted">Last Name</label>
                  <div className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-fg-muted">Doe</div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-fg-muted">Email</label>
                <div className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-fg-muted">john@example.com</div>
              </div>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Navigation" columns={1}>
          <DemoCard title="Responsive Navigation" description="Hamburger on mobile, inline links on md+" code={`<nav className="hidden md:flex gap-4">{links}</nav>\n<button className="md:hidden"><Menu /></button>`}>
            <ResponsiveNav />
          </DemoCard>
        </DocSection>

        <DocSection title="Sidebar Layout" columns={1}>
          <DemoCard title="Responsive Sidebar" description="Stacked on mobile, sidebar + content on lg+" code={`<div className="flex flex-col gap-3 lg:flex-row">...</div>`}>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex flex-row gap-2 rounded-lg border border-border/40 bg-bg-secondary p-3 lg:w-48 lg:flex-col">
                {['Profile', 'Search', 'Settings'].map((label) => (
                  <div className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-fg-muted hover:bg-bg-tertiary hover:text-fg" key={label}>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-lg border border-border/40 p-4">
                <div className="text-xs text-fg-muted">Main content area</div>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div className="h-16 rounded bg-bg-tertiary/30" key={i} />
                  ))}
                </div>
              </div>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    code: () => [
      '// responsive grid',
      '<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">',
      '  {items.map(item => <Card key={item.id} {...item} />)}',
      '</div>',
      '',
      '// responsive form row',
      '<div className="flex flex-col gap-3 md:flex-row">',
      '  <Input className="flex-1" />',
      '  <Input className="flex-1" />',
      '</div>',
      '',
      '// responsive nav',
      '<nav className="hidden md:flex gap-4">{links}</nav>',
      '<button className="md:hidden"><Menu /></button>',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Breakpoint Reference</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p><span className="text-fg-muted">sm</span> — 640px+</p>
            <p><span className="text-fg-muted">md</span> — 768px+</p>
            <p><span className="text-fg-muted">lg</span> — 1024px+</p>
            <p><span className="text-fg-muted">xl</span> — 1280px+</p>
          </div>
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Mobile-first: base styles for small screens, breakpoints for larger</p>
            <p>• grid-cols-1 as base, scale up with md:grid-cols-2, lg:grid-cols-3</p>
            <p>• flex-col as base, md:flex-row for side-by-side layouts</p>
            <p>• overflow-x-auto + min-w for wide tables on small screens</p>
            <p>• hidden / md:flex for show/hide at breakpoints</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { patternItemsExt32 }
