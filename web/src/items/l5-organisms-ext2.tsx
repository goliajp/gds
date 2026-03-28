import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Carousel, ImagePreview } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt2: DevCenterItem[] = []

// carousel
const carouselItem: DevCenterItem = {
  id: 'carousel',
  label: 'Carousel',
  layer: 'l5',
  type: 'interactive',
  tags: ['slider', 'slideshow', 'gallery', 'carousel'],
  defaultConfig: { showDots: true, showArrows: true, autoPlay: false, glass: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Carousel } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="w-80">
          <Carousel
            showDots={config.showDots}
            showArrows={config.showArrows}
            autoPlay={config.autoPlay}
            glass={config.glass}
          >
            <div className="flex h-40 items-center justify-center rounded-lg bg-accent/10 text-accent">Slide 1</div>
            <div className="flex h-40 items-center justify-center rounded-lg bg-success/10 text-success">Slide 2</div>
            <div className="flex h-40 items-center justify-center rounded-lg bg-warning/10 text-warning">Slide 3</div>
          </Carousel>
        </div>
      </LivePreview>

      <DocSection title="Features" columns={2}>
        <DemoCard title="With Arrows" description="Navigate via prev/next buttons" code={`<Carousel showArrows>\n  <div>Slide 1</div>\n  <div>Slide 2</div>\n</Carousel>`}>
          <div className="w-full">
            <Carousel showArrows showDots={false}>
              <div className="flex h-24 items-center justify-center rounded bg-accent/10 text-sm text-accent">First</div>
              <div className="flex h-24 items-center justify-center rounded bg-success/10 text-sm text-success">Second</div>
            </Carousel>
          </div>
        </DemoCard>
        <DemoCard title="Dots Only" description="Navigate via dot indicators" code={`<Carousel showArrows={false} showDots>\n  ...\n</Carousel>`}>
          <div className="w-full">
            <Carousel showArrows={false} showDots>
              <div className="flex h-24 items-center justify-center rounded bg-warning/10 text-sm text-warning">A</div>
              <div className="flex h-24 items-center justify-center rounded bg-danger/10 text-sm text-danger">B</div>
              <div className="flex h-24 items-center justify-center rounded bg-accent/10 text-sm text-accent">C</div>
            </Carousel>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Auto-Play">
        <DemoCard title="Auto-Play" description="Advances every 3s, pauses on hover" full code={`<Carousel autoPlay interval={3000}>\n  ...\n</Carousel>`}>
          <div className="w-64">
            <Carousel autoPlay interval={3000}>
              <div className="flex h-20 items-center justify-center rounded bg-accent/10 text-xs text-accent">Auto 1</div>
              <div className="flex h-20 items-center justify-center rounded bg-success/10 text-xs text-success">Auto 2</div>
              <div className="flex h-20 items-center justify-center rounded bg-warning/10 text-xs text-warning">Auto 3</div>
            </Carousel>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="showDots" type="check" value={config.showDots} onChange={v => setConfig('showDots', v)} />
      <Ctrl label="showArrows" type="check" value={config.showArrows} onChange={v => setConfig('showArrows', v)} />
      <Ctrl label="autoPlay" type="check" value={config.autoPlay} onChange={v => setConfig('autoPlay', v)} />
      <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Carousel } from '@goliapkg/gds'", '']
    const props: string[] = []
    if (config.showDots === false) props.push('showDots={false}')
    if (config.showArrows === false) props.push('showArrows={false}')
    if (config.autoPlay === true) props.push('autoPlay')
    if (config.glass === true) props.push('glass')
    lines.push('<Carousel')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('>')
    lines.push('  <div>Slide 1</div>')
    lines.push('  <div>Slide 2</div>')
    lines.push('</Carousel>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Slide elements', 'ReactNode', '—'],
        ['autoPlay', 'Auto-advance slides', 'boolean', 'false'],
        ['interval', 'Auto-play interval in ms', 'number', '5000'],
        ['showDots', 'Show dot indicators', 'boolean', 'true'],
        ['showArrows', 'Show prev/next arrows', 'boolean', 'true'],
        ['glass', 'Glass morphism effect', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Each direct child becomes a slide — wrap content in a single div per slide</p>
          <p>• Auto-play pauses on hover to avoid frustrating users</p>
          <p>• Touch swipe supported on mobile (50px threshold)</p>
          <p>• Slides wrap around — last → first and first → last</p>
        </div>
      </div>
    </div>
  ),
}

organismItemsExt2.push(carouselItem)

// image-preview
const imagePreviewItem: DevCenterItem = {
  id: 'image-preview',
  label: 'ImagePreview',
  layer: 'l5',
  type: 'interactive',
  tags: ['image', 'lightbox', 'preview', 'zoom', 'gallery'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { ImagePreview } from '@goliapkg/gds'" />

      <LivePreview>
        <ImagePreview
          src="https://picsum.photos/seed/gds-demo/400/300"
          alt="Sample image"
          thumbnailClassName="h-32 w-44"
        />
      </LivePreview>

      <DocSection title="Features" columns={2}>
        <DemoCard title="Click to Preview" description="Thumbnail opens fullscreen lightbox" code={`<ImagePreview\n  src="/photo.jpg"\n  alt="Photo"\n  thumbnailClassName="h-32 w-44"\n/>`}>
          <div className="text-[11px] text-fg-muted/60">Click the thumbnail above to see the lightbox overlay with close button</div>
        </DemoCard>
        <DemoCard title="Keyboard Support" description="Press Escape to close lightbox" code={`// lightbox closes on:\n// - Escape key\n// - Click backdrop\n// - Close button (X)`}>
          <div className="text-[11px] text-fg-muted/60">Full keyboard navigation — Escape to close, backdrop click to dismiss</div>
        </DemoCard>
      </DocSection>

      <DocSection title="Custom Thumbnail">
        <DemoCard title="Styled Thumbnail" description="Use thumbnailClassName for sizing" full code={`<ImagePreview\n  src="/photo.jpg"\n  alt="Hero"\n  thumbnailClassName="h-48 w-72 rounded-xl"\n/>`}>
          <ImagePreview
            src="https://picsum.photos/seed/gds-hero/600/400"
            alt="Hero image"
            thumbnailClassName="h-36 w-56 rounded-xl"
          />
        </DemoCard>
      </DocSection>
    </div>
  ),

  code: () => {
    const lines = ["import { ImagePreview } from '@goliapkg/gds'", '']
    lines.push('<ImagePreview')
    lines.push('  src="/photo.jpg"')
    lines.push('  alt="Photo"')
    lines.push('  thumbnailClassName="h-32 w-44"')
    lines.push('/>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['src', 'Image URL', 'string', '—'],
        ['alt', 'Image alt text', 'string', "''"],
        ['thumbnailClassName', 'CSS classes for thumbnail image', 'string', '—'],
        ['className', 'CSS classes for wrapper div', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Renders inline thumbnail — click opens fullscreen lightbox overlay</p>
          <p>• Lightbox uses createPortal to body for proper z-index stacking</p>
          <p>• Scroll is locked while lightbox is open</p>
          <p>• Close via Escape key, backdrop click, or X button</p>
          <p>• Image scales to fit viewport (max 90vw x 90vh)</p>
        </div>
      </div>
    </div>
  ),
}

organismItemsExt2.push(imagePreviewItem)

export { organismItemsExt2 }
