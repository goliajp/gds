import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine } from '../components/demo'

import { FIXED_COLORS } from '@gds/l0-tokens/color-derive'
import { fontPreset, fontStack, fontWeight } from '@gds/l0-tokens/font-system'
import { spacing } from '@gds/l0-tokens/size-system'

import type { DevCenterItem } from '../types'

const tokenItems: DevCenterItem[] = [
  {
    id: 'colors',
    label: 'Colors',
    layer: 'l0',
    type: 'reference',
    tags: ['semantic', 'palette', 'accent', 'danger', 'success', 'warning'],
    stage: () => {
      const semantic = [
        { name: 'accent', css: '--gds-accent', cls: 'bg-accent' },
        { name: 'accent-hover', css: '--gds-accent-hover', cls: 'bg-accent-hover' },
        { name: 'accent-fg', css: '--gds-accent-fg', cls: 'bg-accent-fg' },
        { name: 'success', css: '--gds-success', cls: 'bg-success' },
        { name: 'warning', css: '--gds-warning', cls: 'bg-warning' },
        { name: 'danger', css: '--gds-danger', cls: 'bg-danger' },
      ]
      const surfaces = [
        { name: 'bg', css: '--gds-bg', cls: 'bg-bg' },
        { name: 'bg-secondary', css: '--gds-bg-secondary', cls: 'bg-bg-secondary' },
        { name: 'bg-tertiary', css: '--gds-bg-tertiary', cls: 'bg-bg-tertiary' },
        { name: 'surface', css: '--gds-surface', cls: 'bg-surface' },
        { name: 'surface-raised', css: '--gds-surface-raised', cls: 'bg-surface-raised' },
      ]
      const foreground = [
        { name: 'fg', css: '--gds-fg', cls: 'bg-fg' },
        { name: 'fg-secondary', css: '--gds-fg-secondary', cls: 'bg-fg-secondary' },
        { name: 'fg-muted', css: '--gds-fg-muted', cls: 'bg-fg-muted' },
      ]
      const borders = [
        { name: 'border', css: '--gds-border', cls: 'bg-border' },
        { name: 'border-strong', css: '--gds-border-strong', cls: 'bg-border-strong' },
      ]
      const fixed = [
        { name: 'status-active', css: '--gds-status-active', hex: FIXED_COLORS.statusActive },
        { name: 'status-inactive', css: '--gds-status-inactive', hex: FIXED_COLORS.statusInactive },
        { name: 'status-pending', css: '--gds-status-pending', hex: FIXED_COLORS.statusPending },
        { name: 'status-draft', css: '--gds-status-draft', hex: FIXED_COLORS.statusDraft },
        { name: 'priority-critical', css: '--gds-priority-critical', hex: FIXED_COLORS.priorityCritical },
        { name: 'priority-high', css: '--gds-priority-high', hex: FIXED_COLORS.priorityHigh },
        { name: 'priority-medium', css: '--gds-priority-medium', hex: FIXED_COLORS.priorityMedium },
        { name: 'priority-low', css: '--gds-priority-low', hex: FIXED_COLORS.priorityLow },
        { name: 'action-create', css: '--gds-action-create', hex: FIXED_COLORS.actionCreate },
        { name: 'action-update', css: '--gds-action-update', hex: FIXED_COLORS.actionUpdate },
        { name: 'action-delete', css: '--gds-action-delete', hex: FIXED_COLORS.actionDelete },
        { name: 'dot', css: '--gds-dot', hex: FIXED_COLORS.dot },
      ]

      function Swatch({ name, css, cls }: { name: string, css: string, cls: string }) {
        return (
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 shrink-0 rounded-md ${cls} border border-white/[0.06]`} />
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-fg truncate">{name}</div>
              <div className="text-[9px] font-mono text-fg-muted/40 truncate">{css}</div>
            </div>
          </div>
        )
      }

      function FixedSwatch({ name, css, hex }: { name: string, css: string, hex: string }) {
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-md border border-white/[0.06]" style={{ backgroundColor: hex }} />
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-fg truncate">{name}</div>
              <div className="text-[9px] font-mono text-fg-muted/40 truncate">{css}</div>
            </div>
          </div>
        )
      }

      return (
        <div>
          <ImportLine text="import { FIXED_COLORS, deriveDarkPalette } from '@goliapkg/gds'" />

          <DocSection title="Semantic colors (derived from primary)">
            <DemoCard title="Accent & Status" description="Derived from primaryColor — changes with theme preset">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {semantic.map(c => <Swatch key={c.name} {...c} />)}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Surfaces" columns={2}>
            <DemoCard title="Backgrounds" description="Tinted by primaryColor hue">
              <div className="flex flex-col gap-2">
                {surfaces.map(c => <Swatch key={c.name} {...c} />)}
              </div>
            </DemoCard>
            <DemoCard title="Foreground & Borders" description="High contrast, whisper of hue">
              <div className="flex flex-col gap-2">
                {foreground.map(c => <Swatch key={c.name} {...c} />)}
                {borders.map(c => <Swatch key={c.name} {...c} />)}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Categorical palette (10 colors)">
            <DemoCard title="Palette" description="Golden-angle hue distribution from primaryColor" full>
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div className={`h-10 w-full rounded-md bg-palette-${i}`} />
                    <span className="text-[9px] font-mono text-fg-muted/40">{i}</span>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Fixed colors (never change per theme)" columns={2}>
            <DemoCard title="Status & Priority" description="Anchored to universal meaning">
              <div className="grid grid-cols-2 gap-2">
                {fixed.slice(0, 8).map(c => <FixedSwatch key={c.name} {...c} />)}
              </div>
            </DemoCard>
            <DemoCard title="Action & Misc" description="Create/update/delete + notification dot">
              <div className="grid grid-cols-2 gap-2">
                {fixed.slice(8).map(c => <FixedSwatch key={c.name} {...c} />)}
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Color Architecture</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>The entire color system derives from a single primaryColor hex.</p>
            <p>• Accent family: derived via HSL manipulation for WCAG AA contrast</p>
            <p>• Surfaces: tinted by primary hue at 3-6% saturation</p>
            <p>• Fixed colors: danger/warning/success/status/priority never change</p>
            <p>• Palette: 10 categorical colors via golden-angle hue distribution</p>
            <p>• Mode-aware: dark mode uses higher saturation, lower bg lightness</p>
          </div>
        </div>
        <DocTable rows={[
          ['--gds-accent', 'Primary action color', 'color', 'derived'],
          ['--gds-accent-hover', 'Accent hover state', 'color', 'derived'],
          ['--gds-accent-fg', 'Text on accent background', 'color', 'derived'],
          ['--gds-success', 'Positive outcome', 'color', '#22c55e / #16a34a'],
          ['--gds-warning', 'Caution', 'color', '#f59e0b / #d97706'],
          ['--gds-danger', 'Destructive/error', 'color', '#ef4444 / #dc2626'],
          ['--gds-bg', 'Primary background', 'color', 'derived'],
          ['--gds-fg', 'Primary foreground', 'color', 'derived'],
          ['--gds-fg-muted', 'Muted text', 'color', 'derived'],
          ['--gds-border', 'Default border', 'color', 'derived'],
          ['--gds-surface', 'Card/panel background', 'color', 'derived'],
          ['--gds-palette-N', 'Categorical (0-9)', 'color', 'derived'],
        ]} />
      </div>
    ),
    code: () => `// semantic color usage
<div className="bg-accent text-accent-fg">Primary action</div>
<div className="bg-success/10 text-success">Approved</div>
<div className="bg-danger/10 text-danger">Rejected</div>
<div className="text-fg">Primary text</div>
<div className="text-fg-muted">Secondary text</div>
<div className="border-border">Default border</div>

// categorical palette
<div className="bg-palette-0">Series 0</div>
<div className="bg-palette-1">Series 1</div>

// fixed status colors
<div className="bg-status-active">Active</div>
<div className="bg-priority-critical">Critical</div>
<div className="text-action-create">+</div>`,
  },
  {
    id: 'typography',
    label: 'Typography',
    layer: 'l0',
    type: 'reference',
    tags: ['font', 'text', 'heading', 'mono', 'flex'],
    stage: () => {
      const staticSizes = [
        { name: 'text-2xs', css: '--gds-text-2xs', value: '0.625rem (10px)' },
        { name: 'text-xs', css: '--gds-text-xs', value: '0.75rem (12px)' },
        { name: 'text-sm', css: '--gds-text-sm', value: '0.875rem (14px)' },
        { name: 'text-base', css: '--gds-text-base', value: '1rem (16px)' },
        { name: 'text-lg', css: '--gds-text-lg', value: '1.125rem (18px)' },
        { name: 'text-xl', css: '--gds-text-xl', value: '1.25rem (20px)' },
        { name: 'text-2xl', css: '--gds-text-2xl', value: '1.5rem (24px)' },
      ]
      const densitySizes = [
        { name: 'gds-text-caption', desc: 'captions, timestamps' },
        { name: 'gds-text-label', desc: 'form labels, badges' },
        { name: 'gds-text-body', desc: 'body text, descriptions' },
      ]
      const weights = Object.entries(fontWeight).map(([k, v]) => ({ name: k, value: v }))

      const stacks = [
        { name: 'sans', value: fontStack.sans, desc: 'body text, headings, CJK' },
        { name: 'mono', value: fontStack.mono, desc: 'code, terminal, technical' },
        { name: 'flex', value: fontStack.flex, desc: 'tabular numbers, aligned labels' },
      ]

      const presetKeys = Object.keys(fontPreset) as (keyof typeof fontPreset)[]

      return (
        <div>
          <ImportLine text="import { fontStack, fontWeight, fontPreset, presetToStyle } from '@goliapkg/gds'" />

          <DocSection title="Static text scale">
            <DemoCard title="Size Scale" description="Fixed sizes from 2xs to 2xl" full>
              <div className="flex flex-col gap-2">
                {staticSizes.map(s => (
                  <div key={s.name} className="flex items-baseline gap-3">
                    <span className="w-16 shrink-0 text-right text-[9px] font-mono text-fg-muted/40">{s.name}</span>
                    <span className={`${s.name} text-fg`}>The quick brown fox</span>
                    <span className="text-[9px] text-fg-muted/30">{s.value}</span>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Density-aware text" columns={2}>
            <DemoCard title="Dynamic Sizes" description="Scale with density axis (compact/default/comfortable)">
              <div className="flex flex-col gap-2">
                {densitySizes.map(s => (
                  <div key={s.name} className="flex items-baseline gap-3">
                    <span className="w-28 shrink-0 text-right text-[9px] font-mono text-fg-muted/40">{s.name}</span>
                    <span className={`${s.name} text-fg`}>{s.desc}</span>
                  </div>
                ))}
              </div>
            </DemoCard>
            <DemoCard title="Font Weights" description="5-step weight scale">
              <div className="flex flex-col gap-1.5">
                {weights.map(w => (
                  <div key={w.name} className="flex items-baseline gap-3">
                    <span className="w-16 shrink-0 text-right text-[9px] font-mono text-fg-muted/40">{w.value}</span>
                    <span className="text-sm text-fg" style={{ fontWeight: w.value }}>{w.name} — The quick brown fox</span>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Font stacks">
            <DemoCard title="3 Font Families" description="sans (body), mono (code), flex (tabular)" full>
              <div className="flex flex-col gap-3">
                {stacks.map(s => (
                  <div key={s.name} className="rounded-md border border-white/[0.04] bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-medium text-accent">{s.name}</span>
                      <span className="text-[9px] text-fg-muted/30">{s.desc}</span>
                    </div>
                    <div className="text-sm text-fg truncate" style={{ fontFamily: s.value }}>
                      ABCDEFG abcdefg 0123456789 +-=
                    </div>
                    <div className="mt-1 text-[8px] font-mono text-fg-muted/20 truncate">{s.value}</div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Font presets">
            <DemoCard title="Named Presets" description="Complete recipes: stack + weight + size + leading + tracking + features" full>
              <div className="flex flex-col gap-1">
                {presetKeys.map(k => {
                  const p = fontPreset[k]
                  return (
                    <div key={k} className="flex items-baseline gap-3 py-0.5">
                      <span className="w-20 shrink-0 text-right text-[9px] font-mono text-fg-muted/40">{k}</span>
                      <span
                        className="text-fg"
                        style={{
                          fontFamily: `var(--gds-font-${p.family})`,
                          fontWeight: p.weight,
                          fontSize: p.size,
                          lineHeight: p.leading,
                          letterSpacing: p.tracking,
                          ...(p.features ? { fontFeatureSettings: p.features } : {}),
                          ...(p.variation ? { fontVariationSettings: p.variation } : {}),
                        }}
                      >
                        Sample text 0123
                      </span>
                      <span className="text-[8px] text-fg-muted/20">{p.family} {p.weight} {p.size}</span>
                    </div>
                  )
                })}
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Typography System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 3 font stacks: sans (body/CJK), mono (code), flex (tabular via Roboto Flex MONO axis)</p>
            <p>• Static text scale: 7 sizes from text-2xs (10px) to text-2xl (24px)</p>
            <p>• Density-aware text: caption/label/body scale with the density axis</p>
            <p>• 5 font weights: light(300), regular(400), medium(500), semibold(600), bold(700)</p>
            <p>• Named presets: complete recipes for h1-h6, body, label, code, finance, etc.</p>
            <p>• OpenType features: tabular nums, slashed zero, CJK punctuation</p>
          </div>
        </div>
      </div>
    ),
    code: () => `// static text sizes
<h1 className="text-2xl font-bold text-fg">Heading</h1>
<p className="text-sm text-fg-muted">Body text</p>

// density-aware text (scales with axis)
<span className="gds-text-caption text-fg-muted">10/11/12px</span>
<span className="gds-text-label text-fg">11/12/13px</span>
<span className="gds-text-body text-fg">13/14/15px</span>

// font stacks
<div style={{ fontFamily: 'var(--gds-font-sans)' }}>Body</div>
<div style={{ fontFamily: 'var(--gds-font-mono)' }}>Code</div>
<div style={{ fontFamily: 'var(--gds-font-flex)' }}>Tabular</div>

// font presets (programmatic)
import { presetToStyle } from '@goliapkg/gds'
<span style={presetToStyle('finance')}>$1,234.56</span>`,
  },
  {
    id: 'spacing',
    label: 'Spacing',
    layer: 'l0',
    type: 'reference',
    tags: ['gap', 'padding', 'margin', 'space'],
    stage: () => {
      const spaceScale = Object.entries(spacing).map(([k, v]) => ({ step: k, px: v }))
      const densityGaps = [
        { tier: 'compact', xs: 2, sm: 4, default: 6, lg: 8 },
        { tier: 'default', xs: 4, sm: 6, default: 8, lg: 12 },
        { tier: 'comfortable', xs: 6, sm: 8, default: 12, lg: 16 },
      ]
      const densityPads = [
        { tier: 'compact', sm: '4x2', default: '8x4', lg: '12x6' },
        { tier: 'default', sm: '8x4', default: '12x6', lg: '16x8' },
        { tier: 'comfortable', sm: '10x6', default: '16x8', lg: '20x12' },
      ]

      return (
        <div>
          <DocSection title="Space scale (static)">
            <DemoCard title="--gds-space-0 through --gds-space-10" description="Base unit: 4px, 11-step scale" full>
              <div className="flex flex-col gap-1.5">
                {spaceScale.map(s => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="w-8 text-right text-[10px] font-mono text-fg-muted/50">{s.step}</span>
                    <span className="w-10 text-right text-[9px] font-mono text-fg-muted/30">{s.px}px</span>
                    <div className="h-2.5 rounded-sm bg-accent/30" style={{ width: Math.max(2, s.px * 3) }} />
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Density-aware gap scale" columns={2}>
            <DemoCard title="Gap by Density" description="--gds-gap-xs through --gds-gap-lg">
              <DocTable
                headers={['Density', 'xs', 'sm', 'default', 'lg']}
                rows={densityGaps.map(d => [
                  d.tier,
                  `${d.xs}px`,
                  `${d.sm}px`,
                  `${d.default}px`,
                  `${d.lg}px`,
                ])}
              />
            </DemoCard>
            <DemoCard title="Padding by Density" description="--gds-pad-x/y (x-axis x y-axis)">
              <DocTable
                headers={['Density', 'sm', 'default', 'lg']}
                rows={densityPads.map(d => [
                  d.tier,
                  d.sm,
                  d.default,
                  d.lg,
                ])}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Spacing System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Static scale: 11 steps (0-10) from 0px to 64px, base unit 4px</p>
            <p>• Density-aware gap: gds-gap-xs/sm/default/lg shift with density axis</p>
            <p>• Density-aware padding: gds-pad-x/y at sm/default/lg sizes</p>
            <p>• Use static --gds-space-N for explicit spacing, density utilities for adaptive</p>
          </div>
        </div>
      </div>
    ),
    code: () => `// static spacing
<div style={{ gap: 'var(--gds-space-3)' }}>12px gap</div>
<div style={{ padding: 'var(--gds-space-4)' }}>16px padding</div>

// density-aware gap (shifts with compact/default/comfortable)
<div className="flex gds-gap">auto gap</div>
<div className="flex gds-gap-sm">small gap</div>
<div className="flex gds-gap-lg">large gap</div>

// density-aware padding
<div className="gds-pad-x gds-pad-y">auto padding</div>
<div className="gds-pad-x-sm gds-pad-y-sm">small padding</div>`,
  },
  {
    id: 'shadows',
    label: 'Shadows',
    layer: 'l0',
    type: 'reference',
    tags: ['elevation', 'shadow', 'depth'],
    defaultConfig: { elevation: 'raised' },
    stage: ({ config }) => {
      const tiers = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      const elevations = ['flat', 'subtle', 'raised'] as const
      const elev = config.elevation as string

      return (
        <div>
          <DocSection title="Shadow scale">
            <DemoCard title={`Elevation: ${elev}`} description="5-tier shadow scale, each doubling blur radius" full>
              <div className="grid grid-cols-5 gap-3">
                {tiers.map(t => (
                  <div key={t} className={`flex h-20 items-center justify-center rounded-lg border border-border bg-surface gds-shadow-${t}`}>
                    <div className="text-center">
                      <div className="text-[10px] font-medium text-fg">{t}</div>
                      <div className="text-[8px] font-mono text-fg-muted/30">gds-shadow-{t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Elevation axis comparison">
            <DemoCard title="Flat / Subtle / Raised" description="Elevation axis scales shadow opacity (0x / 0.6x / 1.0x)" full>
              <div className="grid grid-cols-3 gap-4">
                {elevations.map(e => (
                  <div key={e} className="flex flex-col items-center gap-2">
                    <div className="text-[10px] font-medium text-fg-muted/50">{e}</div>
                    <div className="text-[9px] text-fg-muted/30">{e === 'flat' ? 'no shadows' : e === 'subtle' ? '60% opacity' : 'full opacity'}</div>
                    <div className="mt-1 flex flex-col gap-2 w-full">
                      {(['sm', 'md', 'lg'] as const).map(t => (
                        <div
                          key={t}
                          className={`flex h-8 items-center justify-center rounded-md border border-border bg-surface text-[9px] text-fg-muted/40 ${e !== 'flat' ? `gds-shadow-${t}` : ''}`}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="elevation" type="pills" value={config.elevation} options={['flat', 'subtle', 'raised']} onChange={v => setConfig('elevation', v)} />
      </>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Shadow System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 5 tiers: xs, sm, md, lg, xl — each doubling blur radius</p>
            <p>• Elevation axis: flat (0x), subtle (0.6x), raised (1.0x) scales opacity</p>
            <p>• Dark mode: 3x opacity multiplier (shadows need to be stronger on dark bg)</p>
            <p>• md and above use compound shadows (ambient + direct) for realism</p>
          </div>
        </div>
        <DocTable rows={[
          ['gds-shadow-xs', 'Subtle lift', '1px blur, 1px offset', 'utility'],
          ['gds-shadow-sm', 'Small card', '2px blur', 'utility'],
          ['gds-shadow-md', 'Default card', '6px + 4px compound', 'utility'],
          ['gds-shadow-lg', 'Dropdown/popover', '15px + 6px compound', 'utility'],
          ['gds-shadow-xl', 'Modal/dialog', '25px + 10px compound', 'utility'],
        ]} />
      </div>
    ),
    code: () => `// shadow utilities
<div className="gds-shadow-xs">Subtle lift</div>
<div className="gds-shadow-sm">Small card</div>
<div className="gds-shadow-md">Default card</div>
<div className="gds-shadow-lg">Dropdown</div>
<div className="gds-shadow-xl">Modal</div>

// CSS variable access
box-shadow: var(--gds-shadow-md);

// elevation axis controls shadow intensity
// flat = none, subtle = 60%, raised = 100%`,
  },
]

export { tokenItems }
