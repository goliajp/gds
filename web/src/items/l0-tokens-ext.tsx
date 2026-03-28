import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection } from '../components/demo'

import { radiusScale } from '@gds/l0-tokens/radius-system'
import { iconSize } from '@gds/l0-tokens/size-system'

import type { DevCenterItem } from '../types'

const tokenItemsExt: DevCenterItem[] = [
  {
    id: 'glass-tokens',
    label: 'Glass Tokens',
    layer: 'l0-glass',
    type: 'reference',
    tags: ['glass', 'blur', 'frosted', 'backdrop'],
    defaultConfig: { level: 'md' },
    stage: ({ config }) => {
      const levels = [
        { name: 'sm', cls: 'gds-glass-sm', blur: 'blur-sm', desc: 'Inline elements, badges' },
        { name: 'md', cls: 'gds-glass', blur: 'blur-md', desc: 'Cards, panels (default)' },
        { name: 'lg', cls: 'gds-glass-lg', blur: 'blur-lg', desc: 'Overlays, modals' },
      ]

      return (
        <div>
          <DocSection title="Glass intensities">
            <DemoCard title="3 Blur Levels" description="sm (4-8px), md (12-20px), lg (24-40px) — scales with glass axis" full>
              <div className="relative rounded-xl overflow-hidden" style={{ height: 240 }}>
                <div className="absolute inset-0 grid grid-cols-3 gap-0">
                  <div className="bg-gradient-to-br from-accent/40 to-success/40" />
                  <div className="bg-gradient-to-br from-warning/40 to-danger/40" />
                  <div className="bg-gradient-to-br from-success/40 to-accent/40" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
                  {levels.map(l => (
                    <div
                      key={l.name}
                      className={`flex-1 flex flex-col items-center justify-center rounded-lg border border-white/10 p-4 ${l.cls}`}
                      style={{ height: 160 }}
                    >
                      <div className="text-sm font-medium text-fg">{l.name}</div>
                      <div className="mt-1 text-[9px] text-fg-muted/60 text-center">{l.desc}</div>
                      <div className="mt-2 text-[8px] font-mono text-fg-muted/30">{l.cls}</div>
                    </div>
                  ))}
                </div>
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Glass axis">
            <DemoCard title="Off / Subtle / Full" description="Controls blur intensity and background opacity" full>
              <div className="grid grid-cols-3 gap-3">
                {(['off', 'subtle', 'full'] as const).map(axis => (
                  <div key={axis} className="rounded-md border border-white/[0.04] bg-white/[0.02] p-3">
                    <div className="text-[10px] font-medium text-accent mb-1">{axis}</div>
                    <div className="text-[9px] text-fg-muted/40 space-y-0.5">
                      <p>blur: {axis === 'off' ? '0px' : axis === 'subtle' ? '4/12/24px' : '8/20/40px'}</p>
                      <p>saturate: {axis === 'off' ? '100%' : axis === 'subtle' ? '130-160%' : '150-200%'}</p>
                      <p>bg-opacity: {axis === 'off' ? '95%' : axis === 'subtle' ? '25%' : '15%'}</p>
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
        <Ctrl label="intensity" type="pills" value={config.level} options={['sm', 'md', 'lg']} onChange={v => setConfig('level', v)} />
      </>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Glass Material System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 3 intensities: sm, md, lg — each with independent blur + saturate + bg-opacity</p>
            <p>• Glass axis: off (solid), subtle, full — controls all 3 intensities together</p>
            <p>• Dark mode: -5% bg opacity (more translucent). Light mode: +10% (more readable)</p>
            <p>• Fallback: when backdrop-filter unsupported, degrades to 85% solid bg</p>
            <p>• gds-glass = backdrop-blur + saturate + semi-transparent bg + subtle border</p>
          </div>
        </div>
        <DocTable rows={[
          ['gds-glass-sm', 'Light glass (inline)', 'blur-sm + saturate-sm', 'utility'],
          ['gds-glass', 'Default glass (cards)', 'blur-md + saturate-md', 'utility'],
          ['gds-glass-lg', 'Heavy glass (modals)', 'blur-lg + saturate-lg', 'utility'],
          ['--gds-glass-blur-sm', 'Small blur amount', '0/4/8 px', 'CSS var'],
          ['--gds-glass-blur-md', 'Medium blur amount', '0/12/20 px', 'CSS var'],
          ['--gds-glass-blur-lg', 'Large blur amount', '0/24/40 px', 'CSS var'],
          ['--gds-glass-bg-opacity', 'Background opacity', '0.15-0.95', 'CSS var'],
        ]} />
      </div>
    ),
    code: () => `// glass utilities
<div className="gds-glass-sm rounded-md border border-border p-2">
  Light glass — badges, tooltips
</div>
<div className="gds-glass rounded-lg border border-border p-4">
  Default glass — cards, panels
</div>
<div className="gds-glass-lg rounded-xl border border-border p-6">
  Heavy glass — modals, overlays
</div>

// CSS variables
backdrop-filter: blur(var(--gds-glass-blur-md));
background-color: rgba(surface, var(--gds-glass-bg-opacity));`,
  },
  {
    id: 'radius',
    label: 'Radius',
    layer: 'l0',
    type: 'reference',
    tags: ['border-radius', 'shape', 'rounded', 'sharp'],
    defaultConfig: { shape: 'default' },
    stage: ({ config }) => {
      const shape = config.shape as string
      const scale = radiusScale(shape)
      const baseRadii = [
        { name: 'sm', value: scale.sm },
        { name: 'md', value: scale.md },
        { name: 'lg', value: scale.lg },
        { name: 'xl', value: scale.xl },
        { name: 'full', value: 9999 },
      ]
      const semanticRadii = [
        { name: 'button', cls: 'gds-radius-button', value: scale.md },
        { name: 'input', cls: 'gds-radius-input', value: scale.md },
        { name: 'tooltip', cls: 'gds-radius-tooltip', value: scale.md },
        { name: 'popover', cls: 'gds-radius-popover', value: scale.lg },
        { name: 'card', cls: 'gds-radius-card', value: scale.xl },
        { name: 'modal', cls: 'gds-radius-modal', value: scale.xl },
        { name: 'badge', cls: 'gds-radius-badge', value: 9999 },
      ]

      return (
        <div>
          <DocSection title="Base radius scale">
            <DemoCard title={`Shape: ${shape}`} description="Golden-ratio progression: 4/6/8/12 base, shaped by axis factor" full>
              <div className="flex items-end gap-4 justify-center">
                {baseRadii.filter(r => r.name !== 'full').map(r => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div
                      className="h-16 w-16 border-2 border-accent/40 bg-accent/10"
                      style={{ borderRadius: r.value }}
                    />
                    <div className="text-[10px] font-medium text-fg">{r.name}</div>
                    <div className="text-[9px] font-mono text-fg-muted/30">{r.value}px</div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Semantic radius tokens">
            <DemoCard title="Component-specific radius" description="Each component type maps to a base scale step" full>
              <div className="grid grid-cols-4 gap-3">
                {semanticRadii.map(r => (
                  <div key={r.name} className={`flex h-16 items-center justify-center border border-border bg-surface ${r.cls}`}>
                    <div className="text-center">
                      <div className="text-[10px] font-medium text-fg">{r.name}</div>
                      <div className="text-[8px] font-mono text-fg-muted/30">{r.value === 9999 ? 'full' : `${r.value}px`}</div>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Shape axis comparison">
            <DemoCard title="Sharp / Default / Rounded" description="Shape factor: 0.5x / 1.0x / 2.0x" full>
              <div className="grid grid-cols-3 gap-4">
                {(['sharp', 'default', 'rounded'] as const).map(s => {
                  const sc = radiusScale(s)
                  return (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className="text-[10px] font-medium text-fg-muted/50">{s}</div>
                      <div className="flex gap-2">
                        {[sc.sm, sc.md, sc.lg, sc.xl].map((v, i) => (
                          <div
                            key={i}
                            className="h-10 w-10 border border-accent/30 bg-accent/10"
                            style={{ borderRadius: v }}
                          />
                        ))}
                      </div>
                      <div className="text-[8px] font-mono text-fg-muted/20">{sc.sm}/{sc.md}/{sc.lg}/{sc.xl}px</div>
                    </div>
                  )
                })}
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="shape" type="pills" value={config.shape} options={['sharp', 'default', 'rounded']} onChange={v => setConfig('shape', v)} />
      </>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Radius System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 4-step base scale: sm/md/lg/xl + full (pill)</p>
            <p>• Golden-ratio progression: 4 / 6 / 8 / 12 px (base)</p>
            <p>• Shape axis: sharp (0.5x), default (1.0x), rounded (2.0x)</p>
            <p>• 7 semantic tokens map to base steps (button=md, card=xl, badge=full)</p>
          </div>
        </div>
        <DocTable rows={[
          ['gds-radius-button', 'Buttons, inputs', 'md step', 'utility'],
          ['gds-radius-input', 'Form inputs', 'md step', 'utility'],
          ['gds-radius-card', 'Cards, dialogs', 'xl step', 'utility'],
          ['gds-radius-popover', 'Popovers, dropdowns', 'lg step', 'utility'],
          ['gds-radius-badge', 'Badges, pills', 'full (9999px)', 'utility'],
          ['--gds-radius-sm', 'Small radius', '2/4/8 px', 'CSS var'],
          ['--gds-radius-md', 'Medium radius', '3/6/12 px', 'CSS var'],
          ['--gds-radius-lg', 'Large radius', '4/8/16 px', 'CSS var'],
          ['--gds-radius-xl', 'Extra large radius', '6/12/24 px', 'CSS var'],
        ]} />
      </div>
    ),
    code: () => `// semantic radius utilities
<button className="gds-radius-button">Button</button>
<input className="gds-radius-input" />
<div className="gds-radius-card border border-border">Card</div>
<div className="gds-radius-popover">Popover</div>
<span className="gds-radius-badge">Badge</span>

// CSS variable access
border-radius: var(--gds-radius-card);

// shape axis values (controlled by theme)
// sharp: 2/3/4/6px | default: 4/6/8/12px | rounded: 8/12/16/24px`,
  },
  {
    id: 'density',
    label: 'Density',
    layer: 'l0',
    type: 'reference',
    tags: ['compact', 'comfortable', 'size', 'height'],
    defaultConfig: { density: 'default' },
    stage: ({ config }) => {
      const density = config.density as string
      const heights = [
        { name: 'xs', label: 'gds-h-xs' },
        { name: 'sm', label: 'gds-h-sm' },
        { name: 'default', label: 'gds-h' },
        { name: 'lg', label: 'gds-h-lg' },
        { name: 'xl', label: 'gds-h-xl' },
      ]

      const heightValues: Record<string, Record<string, number>> = {
        compact: { xs: 20, sm: 24, default: 28, lg: 32, xl: 36 },
        default: { xs: 24, sm: 28, default: 32, lg: 36, xl: 40 },
        comfortable: { xs: 28, sm: 32, default: 36, lg: 40, xl: 48 },
      }
      const hv = heightValues[density] ?? heightValues.default

      return (
        <div>
          <DocSection title="Component height scale">
            <DemoCard title={`Density: ${density}`} description="5-tier height scale, all values shift together" full>
              <div className="flex flex-col gap-2">
                {heights.map(h => (
                  <div key={h.name} className="flex items-center gap-3">
                    <span className="w-16 text-right text-[10px] font-mono text-fg-muted/40">{h.label}</span>
                    <div
                      className="rounded bg-accent/20 flex items-center px-3"
                      style={{ height: hv[h.name], width: `${Math.min(100, (hv[h.name] / 48) * 100)}%`, maxWidth: '100%' }}
                    >
                      <span className="text-[10px] text-fg-muted">{hv[h.name]}px</span>
                    </div>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Density comparison" columns={2}>
            <DemoCard title="Height Scale by Density" description="compact / default / comfortable">
              <DocTable
                headers={['Tier', 'Compact', 'Default', 'Comfortable']}
                rows={heights.map(h => [
                  h.name,
                  `${heightValues.compact[h.name]}px`,
                  `${heightValues.default[h.name]}px`,
                  `${heightValues.comfortable[h.name]}px`,
                ])}
              />
            </DemoCard>
            <DemoCard title="Related Scales" description="Icons, text, gap, padding all shift with density">
              <DocTable
                headers={['Token', 'Compact', 'Default', 'Comfortable']}
                rows={[
                  ['icon', '14px', '16px', '20px'],
                  ['text', '11px', '13px', '14px'],
                  ['gap', '6px', '12px', '16px'],
                  ['pad', '8px', '16px', '24px'],
                ]}
              />
            </DemoCard>
          </DocSection>

          <DocSection title="Icon sizes">
            <DemoCard title="Icon Scale" description="Matched to component heights" full>
              <div className="flex items-end gap-6 justify-center">
                {Object.entries(iconSize).map(([name, px]) => (
                  <div key={name} className="flex flex-col items-center gap-1.5">
                    <div className="rounded bg-accent/20 flex items-center justify-center" style={{ width: px, height: px }}>
                      <div className="rounded-sm bg-accent/40" style={{ width: px * 0.6, height: px * 0.6 }} />
                    </div>
                    <div className="text-[9px] font-mono text-fg-muted/40">{name}</div>
                    <div className="text-[8px] text-fg-muted/20">{px}px</div>
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
        <Ctrl label="density" type="pills" value={config.density} options={['compact', 'default', 'comfortable']} onChange={v => setConfig('density', v)} />
      </>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Density System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• 3 density levels: compact, default, comfortable</p>
            <p>• 5-tier height scale: xs/sm/default/lg/xl — all shift together</p>
            <p>• Related scales shift in sync: icon size, text size, gap, padding</p>
            <p>• Base unit: 4px. Heights are multiples of base unit</p>
            <p>• Icon sizes matched to component heights for visual balance</p>
            <p>• Touch targets: desktop 32px min, mobile 44px min</p>
          </div>
        </div>
        <DocTable rows={[
          ['gds-h-xs', 'Extra small height', '20/24/28 px', 'utility'],
          ['gds-h-sm', 'Small height', '24/28/32 px', 'utility'],
          ['gds-h', 'Default height', '28/32/36 px', 'utility'],
          ['gds-h-lg', 'Large height', '32/36/40 px', 'utility'],
          ['gds-h-xl', 'Extra large height', '36/40/48 px', 'utility'],
          ['gds-icon-sm', 'Small icon', '12/14/16 px', 'utility'],
          ['gds-icon', 'Default icon', '14/16/20 px', 'utility'],
          ['gds-icon-lg', 'Large icon', '16/20/24 px', 'utility'],
        ]} />
      </div>
    ),
    code: () => `// height utilities
<div className="gds-h">Default height (28/32/36px)</div>
<div className="gds-h-sm">Small height</div>
<div className="gds-h-lg">Large height</div>

// square variants (icon buttons, avatars)
<div className="gds-sq">32x32 square</div>
<div className="gds-sq-sm">28x28 square</div>

// icon sizing
<svg className="gds-icon" />
<svg className="gds-icon-sm" />

// icon sizing within parent
<button className="gds-icon-child">
  <svg />  {/* auto-sized to current density */}
</button>`,
  },
]

export { tokenItemsExt }
