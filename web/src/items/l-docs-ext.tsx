// docs extension — developer tools and reference items
// contrast checker, component stats, hooks reference, i18n playground, media adaptive

import { useState } from 'react'

import { CodeBlock, DocSection, DocTable, DemoCard, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

// ─── contrast checker ───

// wcag contrast utilities (self-contained, no external imports)
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ]
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function getContrastRatio(fg: string, bg: string): number {
  const [r1, g1, b1] = hexToRgb(fg)
  const [r2, g2, b2] = hexToRgb(bg)
  const l1 = relativeLuminance(r1, g1, b1)
  const l2 = relativeLuminance(r2, g2, b2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function meetsWCAG(fg: string, bg: string, level: 'AA' | 'AAA'): boolean {
  const ratio = getContrastRatio(fg, bg)
  if (level === 'AA') return ratio >= 4.5
  return ratio >= 7
}

function ContrastStage() {
  const [fg, setFg] = useState('#1e293b')
  const [bg, setBg] = useState('#ffffff')

  const ratio = getContrastRatio(fg, bg)
  const passAA = meetsWCAG(fg, bg, 'AA')
  const passAAA = meetsWCAG(fg, bg, 'AAA')

  return (
    <div>
      <div className="text-lg font-bold text-fg">Contrast Checker</div>
      <p className="mt-1 text-sm text-fg-muted">
        Check WCAG color contrast ratio between foreground and background.
      </p>

      <DocSection title="Colors">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-2 text-xs font-medium text-fg-muted">Foreground</div>
            <div className="flex items-center gap-3">
              <input
                className="h-10 w-16 cursor-pointer rounded border border-border/30 bg-transparent"
                onChange={(e) => setFg(e.target.value)}
                type="color"
                value={fg}
              />
              <input
                className="w-28 rounded-md border border-border/30 bg-bg-tertiary/30 px-3 py-1.5 font-mono text-xs text-fg"
                onChange={(e) => setFg(e.target.value)}
                type="text"
                value={fg}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-medium text-fg-muted">Background</div>
            <div className="flex items-center gap-3">
              <input
                className="h-10 w-16 cursor-pointer rounded border border-border/30 bg-transparent"
                onChange={(e) => setBg(e.target.value)}
                type="color"
                value={bg}
              />
              <input
                className="w-28 rounded-md border border-border/30 bg-bg-tertiary/30 px-3 py-1.5 font-mono text-xs text-fg"
                onChange={(e) => setBg(e.target.value)}
                type="text"
                value={bg}
              />
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection title="Result">
        <div className="flex items-center gap-4">
          <div className="font-mono text-3xl font-bold text-fg tabular-nums">
            {ratio.toFixed(2)}
          </div>
          <div className="text-xs text-fg-muted">: 1</div>
          <div className="flex items-center gap-2">
            <span className={[
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              passAA ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
            ].join(' ')}>
              AA {passAA ? 'Pass' : 'Fail'}
            </span>
            <span className={[
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              passAAA ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
            ].join(' ')}>
              AAA {passAAA ? 'Pass' : 'Fail'}
            </span>
          </div>
        </div>
      </DocSection>

      <DocSection title="Preview">
        <div
          className="rounded-lg border border-border p-6"
          style={{ backgroundColor: bg }}
        >
          <p className="text-2xl font-bold" style={{ color: fg }}>
            The quick brown fox
          </p>
          <p className="mt-1 text-sm" style={{ color: fg }}>
            jumps over the lazy dog. 0123456789
          </p>
          <p className="mt-1 text-xs" style={{ color: fg }}>
            Small text preview for WCAG AAA compliance check.
          </p>
        </div>
      </DocSection>

      <DocSection title="WCAG Requirements">
        <DocTable rows={[
          ['AA Normal', '4.5 : 1', 'Body text, labels, inputs'],
          ['AA Large', '3.0 : 1', 'Text >= 18pt or 14pt bold'],
          ['AAA Normal', '7.0 : 1', 'Enhanced contrast for body text'],
          ['AAA Large', '4.5 : 1', 'Enhanced contrast for large text'],
        ]} headers={['Level', 'Ratio', 'Applies To']} />
      </DocSection>
    </div>
  )
}

// ─── component stats ───

// static GDS library stats (no external registry dependency)
const gdsStats = {
  layers: [
    { label: 'L0 Tokens', count: 12 },
    { label: 'L1 Systems', count: 8 },
    { label: 'L2 Primitives', count: 15 },
    { label: 'L3 Atoms', count: 45 },
    { label: 'L4 Molecules', count: 38 },
    { label: 'L5 Organisms', count: 22 },
    { label: 'L6 Charts', count: 12 },
    { label: 'L7 Patterns', count: 18 },
  ],
  features: [
    { label: 'With CVA variants', pct: '85%' },
    { label: 'With forwardRef', pct: '92%' },
    { label: 'With type exports', pct: '100%' },
    { label: 'With glass prop', pct: '60%' },
    { label: 'With motion prop', pct: '45%' },
    { label: 'Dark-native tokens', pct: '100%' },
  ],
  categories: [
    { label: 'Input', count: 28 },
    { label: 'Display', count: 42 },
    { label: 'Feedback', count: 18 },
    { label: 'Layout', count: 24 },
    { label: 'Overlay', count: 12 },
    { label: 'Data', count: 16 },
    { label: 'Navigation', count: 14 },
    { label: 'Chart', count: 12 },
  ],
}

function StatRow({ label, value }: { label: string, value: number | string }) {
  return (
    <div className="flex items-center justify-between rounded px-3 py-2">
      <span className="text-xs text-fg-muted">{label}</span>
      <span className="font-mono text-sm font-semibold text-fg">{value}</span>
    </div>
  )
}

function StatsContent() {
  const totalComponents = gdsStats.layers.reduce((sum, l) => sum + l.count, 0)

  return (
    <div>
      <div className="text-lg font-bold text-fg">Component Stats</div>
      <p className="mt-1 text-sm text-fg-muted">
        Overview of GDS library structure and component coverage across all 8 layers.
      </p>

      <DocSection title="Library Summary">
        <div className="divide-y divide-border/20 rounded-lg border border-border/30 bg-bg-secondary/30">
          <StatRow label="Total components" value={totalComponents} />
          <StatRow label="Layers" value={8} />
          <StatRow label="Design principles" value={10} />
        </div>
      </DocSection>

      <DocSection title="By Layer">
        <div className="divide-y divide-border/20 rounded-lg border border-border/30 bg-bg-secondary/30">
          {gdsStats.layers.map((l) => (
            <StatRow key={l.label} label={l.label} value={l.count} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Feature Coverage">
        <div className="divide-y divide-border/20 rounded-lg border border-border/30 bg-bg-secondary/30">
          {gdsStats.features.map((f) => (
            <StatRow key={f.label} label={f.label} value={f.pct} />
          ))}
        </div>
      </DocSection>

      <DocSection title="By Category">
        <div className="divide-y divide-border/20 rounded-lg border border-border/30 bg-bg-secondary/30">
          {gdsStats.categories.map((c) => (
            <StatRow key={c.label} label={c.label} value={c.count} />
          ))}
        </div>
      </DocSection>
    </div>
  )
}

// ─── hooks reference ───

const hooks = [
  {
    name: 'useFocusTrap',
    path: '@gds/l1-systems',
    description: 'Traps keyboard focus within a container element. Essential for modals, dialogs, and sheets — prevents Tab from escaping the overlay.',
    signature: 'useFocusTrap<T extends HTMLElement>(active: boolean): RefObject<T>',
    usage: `import { useFocusTrap } from '@goliapkg/gds'

const ref = useFocusTrap<HTMLDivElement>(open)

return <div ref={ref}>{children}</div>`,
  },
  {
    name: 'useScrollLock',
    path: '@gds/l1-systems',
    description: 'Prevents body scroll when active. Used automatically by Dialog, Sheet, Drawer, and CommandPalette. Restores original overflow on cleanup.',
    signature: 'useScrollLock(active: boolean): void',
    usage: `import { useScrollLock } from '@goliapkg/gds'

// inside a modal component
useScrollLock(open)`,
  },
  {
    name: 'useClickOutside',
    path: '@gds/l1-systems',
    description: 'Detects clicks outside a referenced element. Useful for closing dropdowns, popovers, and custom menus without relying on backdrop overlays.',
    signature: 'useClickOutside<T extends HTMLElement>(handler: () => void, active?: boolean): RefObject<T>',
    usage: `import { useClickOutside } from '@goliapkg/gds'

const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open)

return <div ref={ref}>{menu}</div>`,
  },
  {
    name: 'useMediaQuery',
    path: '@gds/l1-systems',
    description: 'Subscribes to a CSS media query and returns a reactive boolean. Works safely in SSR/test environments where matchMedia is unavailable.',
    signature: 'useMediaQuery(query: string): boolean',
    usage: `import { useMediaQuery } from '@goliapkg/gds'

const isDark = useMediaQuery('(prefers-color-scheme: dark)')
const isWide = useMediaQuery('(min-width: 1536px)')`,
  },
  {
    name: 'useBreakpoint',
    path: '@gds/l1-systems',
    description: 'Convenience wrapper over useMediaQuery that returns named boolean flags for standard breakpoints: isMobile, isTablet, isDesktop, isWide.',
    signature: 'useBreakpoint(): { isMobile, isTablet, isDesktop, isWide }',
    usage: `import { useBreakpoint } from '@goliapkg/gds'

const { isMobile, isDesktop } = useBreakpoint()`,
  },
]

// ─── i18n playground ───

const locales = ['zh', 'en', 'ja'] as const

function formatNumberIntl(n: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(n)
}

function formatCurrencyIntl(n: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n)
}

function formatDateIntl(d: Date, locale: string, style: 'medium' | 'long'): string {
  const options: Intl.DateTimeFormatOptions = style === 'medium'
    ? { year: 'numeric', month: 'short', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: 'Asia/Tokyo' }).format(d)
}

function formatRelativeIntl(past: Date, locale: string): string {
  const diffMs = Date.now() - past.getTime()
  const diffHours = Math.round(diffMs / 3600_000)
  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffHours, 'hour')
}

type I18nRow = { fn: string, values: Record<string, string> }

function buildI18nRows(): I18nRow[] {
  const now = new Date()
  const pastDate = new Date(Date.now() - 7200_000)

  return [
    {
      fn: 'formatNumber(1234567)',
      values: Object.fromEntries(locales.map((l) => [l, formatNumberIntl(1234567, l)])),
    },
    {
      fn: 'formatCurrency(142857, "JPY")',
      values: Object.fromEntries(locales.map((l) => [l, formatCurrencyIntl(142857, 'JPY', l)])),
    },
    {
      fn: 'formatCurrency(1428.57, "USD")',
      values: Object.fromEntries(locales.map((l) => [l, formatCurrencyIntl(1428.57, 'USD', l)])),
    },
    {
      fn: 'formatDate(now, _, "medium")',
      values: Object.fromEntries(locales.map((l) => [l, formatDateIntl(now, l, 'medium')])),
    },
    {
      fn: 'formatDate(now, _, "long")',
      values: Object.fromEntries(locales.map((l) => [l, formatDateIntl(now, l, 'long')])),
    },
    {
      fn: 'formatRelativeTime(2h ago)',
      values: Object.fromEntries(locales.map((l) => [l, formatRelativeIntl(pastDate, l)])),
    },
  ]
}

function I18nStage() {
  const [highlight, setHighlight] = useState<string>('zh')
  const rows = buildI18nRows()

  return (
    <div>
      <div className="text-lg font-bold text-fg">i18n Formatting</div>
      <p className="mt-1 text-sm text-fg-muted">
        Side-by-side comparison of Intl formatting output across locales.
        Built on native Intl API with zero external dependencies.
      </p>

      <DocSection title="Highlight Locale">
        <div className="flex gap-2">
          {[...locales, 'none'].map((l) => (
            <button
              className={[
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                highlight === l ? 'bg-accent text-accent-fg' : 'bg-bg-tertiary text-fg-muted hover:text-fg',
              ].join(' ')}
              key={l}
              onClick={() => setHighlight(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </DocSection>

      <DocSection title="Locale Comparison">
        <div className="overflow-hidden rounded-lg border border-border/20">
          <div className="flex border-b border-border/20 bg-bg-secondary/30 px-4 py-2">
            <span className="w-56 shrink-0 font-mono text-[10px] text-fg-muted/50">Function</span>
            {locales.map((l) => (
              <span className="flex-1 font-mono text-[10px] font-bold text-fg-muted/60 uppercase" key={l}>
                {l}
              </span>
            ))}
          </div>
          {rows.map((row) => (
            <div className="flex border-b border-border/10 px-4 py-2 last:border-b-0" key={row.fn}>
              <span className="w-56 shrink-0 font-mono text-[10px] text-fg-muted/40">{row.fn}</span>
              {locales.map((l) => (
                <span
                  className={highlight === l ? 'flex-1 font-mono text-xs text-accent' : 'flex-1 font-mono text-xs text-fg'}
                  key={l}
                >
                  {row.values[l]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}

// ─── media adaptive ───

function MediaAdaptiveStage() {
  return (
    <div>
      <div className="text-lg font-bold text-fg">Media Adaptive Patterns</div>
      <p className="mt-1 text-sm text-fg-muted">
        Responsive layout patterns and techniques for building adaptive UIs with GDS.
      </p>

      <DocSection title="Responsive Stack Pattern">
        <DemoCard
          description="Vertical on mobile, horizontal on desktop"
          title="Responsive Stack"
          code={`<div className="flex flex-col md:flex-row gap-4">\n  <div className="flex-1">Column A</div>\n  <div className="flex-1">Column B</div>\n  <div className="flex-1">Column C</div>\n</div>`}
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1 rounded bg-bg-tertiary p-4 text-center text-xs text-fg-muted">Column A</div>
            <div className="flex-1 rounded bg-bg-tertiary p-4 text-center text-xs text-fg-muted">Column B</div>
            <div className="flex-1 rounded bg-bg-tertiary p-4 text-center text-xs text-fg-muted">Column C</div>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Container Query Sizes">
        <DemoCard
          description="Centered content with max-width constraint"
          title="Container Sizes"
          code={`<div className="mx-auto max-w-lg px-4">\n  {children}\n</div>`}
        >
          <div className="space-y-3">
            {[
              { label: 'sm', width: 'max-w-sm' },
              { label: 'md', width: 'max-w-md' },
              { label: 'lg', width: 'max-w-lg' },
              { label: 'xl', width: 'max-w-xl' },
            ].map((size) => (
              <div
                className={[size.width, 'mx-auto rounded border border-border/40 bg-bg-tertiary/30 py-2 text-center'].join(' ')}
                key={size.label}
              >
                <span className="text-[10px] text-fg-muted">{size.label}</span>
              </div>
            ))}
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Aspect Ratio Media">
        <DemoCard
          description="Image with aspect ratio and rounded corners"
          title="Media Container"
          code={`<div className="aspect-video overflow-hidden rounded-lg">\n  <img className="h-full w-full object-cover" />\n</div>`}
        >
          <div className="aspect-video overflow-hidden rounded-lg bg-bg-tertiary">
            <svg className="h-full w-full" viewBox="0 0 640 360">
              <rect fill="var(--color-bg-tertiary, #334155)" width="640" height="360" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="var(--color-fg-muted, #94a3b8)" fontSize="24">16:9 Media</text>
            </svg>
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Breakpoint Reference">
        <DocTable
          headers={['Breakpoint', 'Min Width', 'Typical Usage']}
          rows={[
            ['sm', '640px', 'Large phones, landscape mobile'],
            ['md', '768px', 'Tablets, small laptops'],
            ['lg', '1024px', 'Desktops, landscape tablets'],
            ['xl', '1280px', 'Large desktops'],
            ['2xl', '1536px', 'Ultra-wide displays'],
          ]}
        />
      </DocSection>

      <DocSection title="useBreakpoint Hook">
        <DemoCard
          description="Reactive breakpoint detection"
          title="Usage"
          code={`import { useBreakpoint } from '@goliapkg/gds'\n\nconst { isMobile, isTablet, isDesktop, isWide } = useBreakpoint()\n\nif (isMobile) return <MobileLayout />\nreturn <DesktopLayout />`}
        >
          <p className="text-xs text-fg-muted">
            Returns named boolean flags for standard breakpoints. Uses matchMedia
            under the hood with SSR-safe fallback.
          </p>
        </DemoCard>
      </DocSection>
    </div>
  )
}

// ─── exports ───

const docsItemsExt: DevCenterItem[] = [
  {
    id: 'contrast-checker',
    label: 'Contrast Checker',
    layer: 'l-docs',
    type: 'reference',
    tags: ['wcag', 'a11y', 'accessibility', 'contrast', 'ratio', 'color'],

    stage: () => <ContrastStage />,

    code: () => `// WCAG contrast ratio calculation
function getContrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(...hexToRgb(fg))
  const l2 = relativeLuminance(...hexToRgb(bg))
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

// check compliance
const ratio = getContrastRatio('#ffffff', '#000000') // 21
const passAA = ratio >= 4.5  // true
const passAAA = ratio >= 7   // true`,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>WCAG AA requires 4.5:1 for normal text, 3:1 for large text.</p>
          <p className="mt-1">WCAG AAA requires 7:1 for normal text, 4.5:1 for large text.</p>
          <p className="mt-1">Accepts hex color strings (#RRGGBB).</p>
        </div>
      </div>
    ),
  },

  {
    id: 'component-stats',
    label: 'Component Stats',
    layer: 'l-docs',
    type: 'reference',
    tags: ['stats', 'overview', 'count', 'summary', 'metrics', 'gds'],

    stage: () => <StatsContent />,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>Overview of GDS library structure across 8 layers.</p>
          <p className="mt-1">Tracks feature coverage: CVA variants, forwardRef, type exports, glass, and motion props.</p>
          <p className="mt-1">Static snapshot — update counts when adding new components.</p>
        </div>
      </div>
    ),
  },

  {
    id: 'hooks-reference',
    label: 'Hooks Reference',
    layer: 'l-docs',
    type: 'reference',
    tags: ['hook', 'focus-trap', 'scroll-lock', 'click-outside', 'media-query', 'breakpoint', 'utility'],

    stage: () => (
      <div>
        <div className="text-lg font-bold text-fg">Hooks Reference</div>
        <p className="mt-1 text-sm text-fg-muted">
          Reusable React hooks provided by GDS for common UI patterns — focus
          management, scroll control, outside click detection, and responsive queries.
        </p>

        <LivePreview>
          <div className="w-full max-w-2xl space-y-3">
            {hooks.map((hook) => (
              <div className="rounded-lg border border-border/20 p-4" key={hook.name}>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-semibold text-accent">{hook.name}</span>
                  <span className="text-[11px] text-fg-muted">{hook.path}</span>
                </div>
                <p className="mt-1.5 text-xs text-fg-muted">{hook.description}</p>
                <CodeBlock code={hook.signature} />
              </div>
            ))}
          </div>
        </LivePreview>

        {hooks.map((hook) => (
          <DocSection key={hook.name} title={`${hook.name} usage`}>
            <CodeBlock code={hook.usage} />
          </DocSection>
        ))}
      </div>
    ),

    code: () => `// focus trap — keep Tab inside a modal
import { useFocusTrap } from '@goliapkg/gds'

const ref = useFocusTrap<HTMLDivElement>(open)
return <div ref={ref}>...</div>

// scroll lock — prevent body scroll
import { useScrollLock } from '@goliapkg/gds'

useScrollLock(open)

// click outside — close on outside click
import { useClickOutside } from '@goliapkg/gds'

const ref = useClickOutside<HTMLDivElement>(() => close(), open)
return <div ref={ref}>...</div>

// media query — reactive CSS query
import { useMediaQuery } from '@goliapkg/gds'

const isDark = useMediaQuery('(prefers-color-scheme: dark)')

// breakpoints — named responsive flags
import { useBreakpoint } from '@goliapkg/gds'

const { isMobile, isDesktop } = useBreakpoint()`,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>All hooks follow the use-* naming convention.</p>
          <p className="mt-1">Hooks that return refs use a generic type parameter {'<T extends HTMLElement>'} so consumers specify the exact element type.</p>
          <p className="mt-1">Boolean active parameters control whether the hook attaches event listeners. When false, the hook is inert.</p>
        </div>
      </div>
    ),
  },

  {
    id: 'i18n-playground',
    label: 'i18n Formatting',
    layer: 'l-docs',
    type: 'reference',
    tags: ['locale', 'intl', 'translation', 'formatting', 'chinese', 'english', 'japanese'],

    stage: () => <I18nStage />,

    code: () => `// number formatting (native Intl API)
new Intl.NumberFormat('zh').format(1234567)      // "1,234,567"
new Intl.NumberFormat('en').format(1234567)      // "1,234,567"

// currency
new Intl.NumberFormat('zh', { style: 'currency', currency: 'JPY' }).format(142857)
new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(1428.57)

// date
new Intl.DateTimeFormat('zh', { year: 'numeric', month: 'short', day: 'numeric' }).format(now)
new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(now)

// relative time
new Intl.RelativeTimeFormat('zh', { numeric: 'auto' }).format(-2, 'hour')`,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>Built on native Intl API. Zero external dependencies.</p>
          <p className="mt-1">Supported locales: zh (Chinese), en (English), ja (Japanese).</p>
          <p className="mt-1">All formatting functions accept a locale string. Timezone-aware functions also accept an IANA timezone string.</p>
        </div>
      </div>
    ),
  },

  {
    id: 'media-adaptive',
    label: 'Media Adaptive',
    layer: 'l-docs',
    type: 'reference',
    tags: ['media', 'responsive', 'container', 'stack', 'layout', 'adaptive', 'breakpoint'],

    stage: () => <MediaAdaptiveStage />,

    code: () => [
      '// responsive stack pattern',
      '<div className="flex flex-col md:flex-row gap-4">',
      '  <div className="flex-1">Column A</div>',
      '  <div className="flex-1">Column B</div>',
      '</div>',
      '',
      '// aspect ratio media',
      '<div className="aspect-video overflow-hidden rounded-lg">',
      '  <img className="h-full w-full object-cover" src="/photo.jpg" />',
      '</div>',
      '',
      '// container with max-width',
      '<div className="mx-auto max-w-lg px-4">',
      '  {children}',
      '</div>',
      '',
      '// breakpoint hook',
      "import { useBreakpoint } from '@goliapkg/gds'",
      'const { isMobile, isDesktop } = useBreakpoint()',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>GDS Principle #9: Mobile-native. Mobile is a parallel design target, not a responsive afterthought.</p>
          <p className="mt-1">Touch targets: minimum 44x44px. No hover-dependent functionality.</p>
          <p className="mt-1">Use useBreakpoint() for reactive layout switches in component logic.</p>
        </div>
      </div>
    ),
  },
]

export { docsItemsExt }
