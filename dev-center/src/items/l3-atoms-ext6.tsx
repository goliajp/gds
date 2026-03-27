import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ScrollToTop, ThemeToggle } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsG: DevCenterItem[] = []

// scroll-to-top
const scrollToTopItem: DevCenterItem = {
  id: 'scroll-to-top',
  label: 'ScrollToTop',
  layer: 'l3',
  type: 'interactive',
  tags: ['scroll', 'top', 'button', 'floating', 'navigation', 'back-to-top'],
  defaultConfig: { threshold: 300, smooth: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ScrollToTop } from '@goliapkg/gds'" />

      <LivePreview>
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-fg-muted">
            ScrollToTop appears as a fixed button when page is scrolled past threshold ({config.threshold}px).
          </p>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 12V4M4 7l4-3 4 3" />
            </svg>
          </div>
          <p className="text-xs text-fg-muted/50">Preview only — scroll this page to see the real component</p>
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['threshold', 'number', '300', 'Scroll distance before showing'],
            ['smooth', 'boolean', 'true', 'Use smooth scroll behavior'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>

      <ScrollToTop threshold={config.threshold} smooth={config.smooth} />
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="threshold" value={config.threshold} onChange={(v) => setConfig('threshold', v)} min={0} max={1000} />
      <Ctrl type="check" label="smooth" value={config.smooth} onChange={(v) => setConfig('smooth', v)} />
    </>
  ),
}
atomItemsG.push(scrollToTopItem)

// theme-toggle
function ThemeToggleDemo({ size }: { size: 'default' | 'sm' }) {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle mode={mode} onChange={setMode} size={size} />
      <span className="text-sm text-fg-muted">Current: {mode}</span>
    </div>
  )
}

const themeToggleItem: DevCenterItem = {
  id: 'theme-toggle',
  label: 'ThemeToggle',
  layer: 'l3',
  type: 'interactive',
  tags: ['theme', 'toggle', 'dark', 'light', 'mode', 'sun', 'moon'],
  defaultConfig: { size: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ThemeToggle } from '@goliapkg/gds'" />

      <LivePreview>
        <ThemeToggleDemo size={config.size} />
      </LivePreview>

      <DocSection title="Sizes" columns={2}>
        <DemoCard title="Default" description="Standard size (32px)" code={`<ThemeToggle mode={mode} onChange={setMode} />`}>
          <ThemeToggleDemo size="default" />
        </DemoCard>
        <DemoCard title="Small" description="Compact size (24px)" code={`<ThemeToggle mode={mode} onChange={setMode} size="sm" />`}>
          <ThemeToggleDemo size="sm" />
        </DemoCard>
      </DocSection>

      <DocSection title="API">
        <DocTable
          rows={[
            ['mode', "'dark' | 'light'", '—', 'Current theme mode'],
            ['onChange', "(mode: 'dark' | 'light') => void", '—', 'Called when toggled'],
            ['size', "'default' | 'sm'", "'default'", 'Button size'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="size" value={config.size} options={['default', 'sm']} onChange={(v) => setConfig('size', v)} />
    </>
  ),
}
atomItemsG.push(themeToggleItem)

export { atomItemsG }
