import { Badge } from '@gds/l2-primitives'
import { Button } from '@gds/l2-primitives'
import { Input } from '@gds/l2-primitives'
import { Progress } from '@gds/l2-primitives'
import { Switch } from '@gds/l3-atoms'
import { Card, CardContent, CardHeader } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine } from '../components/demo'

import type { DevCenterItem } from '../types'

const systemItems: DevCenterItem[] = [
  {
    id: 'theme-playground',
    label: 'Theme Playground',
    layer: 'l1',
    type: 'interactive',
    tags: ['theme', 'playground', 'interactive', 'axes', 'live'],
    defaultConfig: {
      mode: 'dark',
      shape: 'default',
      density: 'default',
      elevation: 'raised',
      glass: 'full',
      motion: 'full',
      primaryColor: '#3b82f6',
    },
    stage: ({ config }) => (
      <div>
        <ImportLine text="import { useTheme, useSetThemeMode, useSetThemeShape, useThemeEffect } from '@goliapkg/gds'" />

        <DocSection title="Live component samples">
          <DemoCard title="Buttons" description="Primary and secondary variants respond to theme axes" full>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Form elements" columns={2}>
          <DemoCard title="Input" description="Default and error states">
            <div className="flex flex-col gap-3">
              <Input placeholder="Default input" />
              <Input placeholder="Error state" error />
            </div>
          </DemoCard>
          <DemoCard title="Switch" description="On and off states">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Switch checked />
                <span className="text-[11px] text-fg-muted">Enabled</span>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={false} />
                <span className="text-[11px] text-fg-muted">Disabled</span>
              </div>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Badges & Progress" columns={2}>
          <DemoCard title="Badges" description="Semantic status badges">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </DemoCard>
          <DemoCard title="Progress" description="Linear progress bar">
            <div className="flex flex-col gap-3">
              <Progress value={65} />
              <Progress value={30} variant="success" />
              <Progress value={90} variant="warning" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Card">
          <DemoCard title="Card Component" description="Container with depth-aware scaling" full>
            <Card>
              <CardHeader title="Sample Card" description="Cards respond to elevation and glass axes" />
              <CardContent>
                <div className="text-[11px] text-fg-muted">
                  This card uses the current theme settings. The elevation axis controls shadow depth,
                  glass controls backdrop translucency, and shape controls border radius.
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="primary" size="sm">Action</Button>
                  <Button variant="ghost" size="sm">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </DemoCard>
        </DocSection>

        <DocSection title="Current config">
          <DemoCard title="Active Theme Axes" description="Values shown reflect the controls panel (informational — not yet live-applied)" full>
            <div className="flex flex-col gap-1.5">
              {Object.entries(config).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3 rounded-md border border-white/[0.04] bg-white/[0.02] px-3 py-1.5">
                  <span className="w-24 shrink-0 text-[10px] font-medium text-accent">{key}</span>
                  <span className="text-[10px] font-mono text-fg-muted/60">{String(val)}</span>
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),
    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="mode" type="pills" value={config.mode} options={['dark', 'light', 'system']} onChange={v => setConfig('mode', v)} />
        <Ctrl label="shape" type="pills" value={config.shape} options={['sharp', 'default', 'rounded']} onChange={v => setConfig('shape', v)} />
        <Ctrl label="density" type="pills" value={config.density} options={['compact', 'default', 'comfortable']} onChange={v => setConfig('density', v)} />
        <Ctrl label="elevation" type="pills" value={config.elevation} options={['flat', 'subtle', 'raised']} onChange={v => setConfig('elevation', v)} />
        <Ctrl label="glass" type="pills" value={config.glass} options={['off', 'subtle', 'full']} onChange={v => setConfig('glass', v)} />
        <Ctrl label="motion" type="pills" value={config.motion} options={['off', 'reduced', 'full']} onChange={v => setConfig('motion', v)} />
        <Ctrl label="primaryColor" type="text" value={config.primaryColor} onChange={v => setConfig('primaryColor', v)} placeholder="#3b82f6" />
      </>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Theme Playground</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Interactive showcase of all theme axes with real GDS components</p>
            <p>• Controls panel allows adjusting each axis independently</p>
            <p>• Components shown use current theme — axes shown are informational</p>
            <p>• Full live theme switching requires useThemeEffect() in app root</p>
          </div>
        </div>
        <DocTable rows={[
          ['useTheme()', 'Read full theme state', 'ThemeState', '—'],
          ['useSetThemeMode()', 'Set mode axis', '(mode) => void', '—'],
          ['useSetThemeShape()', 'Set shape axis', '(shape) => void', '—'],
          ['useSetThemeDensity()', 'Set density axis', '(density) => void', '—'],
          ['useSetThemeElevation()', 'Set elevation axis', '(elevation) => void', '—'],
          ['useSetThemeGlass()', 'Set glass axis', '(glass) => void', '—'],
          ['useSetThemeMotion()', 'Set motion axis', '(motion) => void', '—'],
          ['useSetThemePrimaryColor()', 'Set primary color hex', '(hex) => void', '—'],
          ['useResetTheme()', 'Reset all axes to defaults', '() => void', '—'],
          ['useThemeEffect()', 'Apply theme CSS vars to :root', 'void (hook)', '—'],
          ['configureTheme()', 'Set multiple axes at once', '(partial: Partial<ThemeState>) => void', '—'],
        ]} />
      </div>
    ),
    code: () => `import {
  useTheme,
  useSetThemeMode,
  useSetThemeShape,
  useSetThemeDensity,
  useSetThemeElevation,
  useSetThemeGlass,
  useSetThemeMotion,
  useThemeEffect,
  configureTheme,
} from '@goliapkg/gds'

// 1. apply theme to document (call once in App root)
useThemeEffect()

// 2. read current theme
const theme = useTheme()
// → { mode, shape, density, elevation, glass, motion, primaryColor }

// 3. set individual axes
const setMode = useSetThemeMode()
setMode('dark')

const setShape = useSetThemeShape()
setShape('rounded')

// 4. configure multiple axes at once
configureTheme({
  mode: 'dark',
  shape: 'rounded',
  density: 'compact',
  elevation: 'raised',
  glass: 'full',
  motion: 'full',
  primaryColor: '#3b82f6',
})`,
  },
  {
    id: 'theme',
    label: 'Theme',
    layer: 'l1',
    type: 'reference',
    tags: ['dark', 'light', 'mode', 'axes', 'preset'],
    defaultConfig: { showAxis: 'all' },
    stage: ({ config }) => {
      const axes = [
        { name: 'mode', options: ['light', 'dark', 'system'], desc: 'Color scheme', current: 'system' },
        { name: 'shape', options: ['sharp', 'default', 'rounded'], desc: 'Border radius scale factor', current: 'default' },
        { name: 'density', options: ['compact', 'default', 'comfortable'], desc: 'Component height + spacing', current: 'default' },
        { name: 'elevation', options: ['flat', 'subtle', 'raised'], desc: 'Shadow intensity', current: 'raised' },
        { name: 'glass', options: ['off', 'subtle', 'full'], desc: 'Backdrop blur + translucency', current: 'full' },
        { name: 'motion', options: ['off', 'reduced', 'full'], desc: 'Animation speed', current: 'full' },
      ]

      return (
        <div>
          <ImportLine text="import { useTheme, useSetThemeMode, useSetThemeShape } from '@goliapkg/gds'" />

          <DocSection title="Theme axes">
            <DemoCard title="6 Dimensional Axes" description="Each axis independently controls a visual dimension" full>
              <div className="flex flex-col gap-2">
                {axes.map(a => (
                  <div key={a.name} className="flex items-center gap-3 rounded-md border border-white/[0.04] bg-white/[0.02] px-3 py-2">
                    <span className="w-20 shrink-0 text-[10px] font-medium text-accent">{a.name}</span>
                    <div className="flex gap-1">
                      {a.options.map(o => (
                        <span
                          key={o}
                          className={`rounded px-1.5 py-0.5 text-[9px] ${o === a.current ? 'bg-accent/15 text-accent font-medium' : 'text-fg-muted/30'}`}
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                    <span className="ml-auto text-[9px] text-fg-muted/20">{a.desc}</span>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Dark vs Light" columns={2}>
            <DemoCard title="Dark Mode" description="Default — optimized for dark backgrounds">
              <div className="rounded-lg border border-border bg-bg p-4">
                <div className="text-sm font-medium text-fg">Primary text</div>
                <div className="mt-1 text-xs text-fg-muted">Muted text</div>
                <div className="mt-2 flex gap-2">
                  <div className="h-6 w-6 rounded bg-accent" />
                  <div className="h-6 w-6 rounded bg-success" />
                  <div className="h-6 w-6 rounded bg-warning" />
                  <div className="h-6 w-6 rounded bg-danger" />
                </div>
              </div>
            </DemoCard>
            <DemoCard title="Light Mode" description="Derived adaptation from dark tokens">
              <div className="rounded-lg border p-4" style={{ borderColor: '#e5e7eb', backgroundColor: '#ffffff' }}>
                <div className="text-sm font-medium" style={{ color: '#1f2937' }}>Primary text</div>
                <div className="mt-1 text-xs" style={{ color: '#6b7280' }}>Muted text</div>
                <div className="mt-2 flex gap-2">
                  <div className="h-6 w-6 rounded" style={{ backgroundColor: '#3b82f6' }} />
                  <div className="h-6 w-6 rounded" style={{ backgroundColor: '#16a34a' }} />
                  <div className="h-6 w-6 rounded" style={{ backgroundColor: '#d97706' }} />
                  <div className="h-6 w-6 rounded" style={{ backgroundColor: '#dc2626' }} />
                </div>
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Theme resolution pipeline">
            <DemoCard title="How It Works" description="Single primaryColor → full palette + 5 axis overrides → CSS vars on :root" full>
              <div className="flex items-center gap-2 text-[9px] font-mono text-fg-muted/40">
                <span className="rounded bg-accent/10 px-2 py-1 text-accent">primaryColor</span>
                <span>→</span>
                <span className="rounded bg-white/[0.04] px-2 py-1">derivePalette()</span>
                <span>→</span>
                <span className="rounded bg-white/[0.04] px-2 py-1">resolveAxes()</span>
                <span>→</span>
                <span className="rounded bg-white/[0.04] px-2 py-1">fontToCssVars()</span>
                <span>→</span>
                <span className="rounded bg-success/10 px-2 py-1 text-success">:root CSS vars</span>
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="focus" type="pills" value={config.showAxis} options={['all', 'mode', 'shape', 'density', 'elevation', 'glass', 'motion']} onChange={v => setConfig('showAxis', v)} />
      </>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Theme System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Single primaryColor (hex) drives the entire color palette</p>
            <p>• 6 axes: mode, shape, density, elevation, glass, motion</p>
            <p>• Each axis is constrained to 2-3 valid options</p>
            <p>• Resolution: primaryColor → derive palette → resolve axes → flat CSS vars</p>
            <p>• Persistence: localStorage, syncs across tabs</p>
            <p>• Jotai atoms: themeAtom (read/write), resolvedModeAtom (derived)</p>
          </div>
        </div>
        <DocTable rows={[
          ['useTheme()', 'Read full theme state', 'ThemeState', '—'],
          ['useSetThemeMode()', 'Set mode (light/dark/system)', '(mode) => void', '—'],
          ['useSetThemeShape()', 'Set shape axis', '(shape) => void', '—'],
          ['useSetThemeDensity()', 'Set density axis', '(density) => void', '—'],
          ['useSetThemeElevation()', 'Set elevation axis', '(elevation) => void', '—'],
          ['useSetThemeGlass()', 'Set glass axis', '(glass) => void', '—'],
          ['useSetThemeMotion()', 'Set motion axis', '(motion) => void', '—'],
          ['useSetThemePrimaryColor()', 'Set primary color hex', '(hex) => void', '—'],
          ['useResetTheme()', 'Reset to defaults', '() => void', '—'],
          ['useThemeEffect()', 'Apply theme to document', 'void (hook)', '—'],
        ]} />
      </div>
    ),
    code: () => `import { useTheme, useSetThemeMode, useSetThemeShape } from '@goliapkg/gds'

// read theme
const theme = useTheme()

// set individual axes
const setMode = useSetThemeMode()
setMode('dark')

const setShape = useSetThemeShape()
setShape('rounded')

// apply to document (call once in App root)
import { useThemeEffect } from '@goliapkg/gds'
useThemeEffect()

// theme state shape
type ThemeState = {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string  // hex
  shape: 'sharp' | 'default' | 'rounded'
  density: 'compact' | 'default' | 'comfortable'
  elevation: 'flat' | 'subtle' | 'raised'
  glass: 'off' | 'subtle' | 'full'
  motion: 'off' | 'reduced' | 'full'
}`,
  },
  {
    id: 'depth-system',
    label: 'Depth System',
    layer: 'l1',
    type: 'reference',
    tags: ['nesting', 'context', 'auto-scale', 'gds-ctx'],
    stage: () => {
      const depthTable = [
        { depth: 'root', gap: 24, pad: 20, radius: 12, shadow: 'md', text: 13, heading: 16, alpha: 1.0 },
        { depth: '0 (.gds-ctx)', gap: 16, pad: 16, radius: 10, shadow: 'sm', text: 12, heading: 14, alpha: 0.95 },
        { depth: '1 (nested)', gap: 12, pad: 12, radius: 8, shadow: 'none', text: 11, heading: 13, alpha: 0.88 },
        { depth: '2', gap: 8, pad: 8, radius: 6, shadow: 'none', text: 10, heading: 12, alpha: 0.80 },
        { depth: '3+', gap: 6, pad: 6, radius: 4, shadow: 'none', text: 10, heading: 11, alpha: 0.72 },
      ]

      return (
        <div>
          <DocSection title="Live nesting demo">
            <DemoCard title="Auto-scaling Depth" description="Each .gds-ctx container reduces spacing, radius, text, and opacity" full>
              <div className="gds-ctx rounded-xl border border-border bg-surface gds-ctx-pad">
                <div className="gds-ctx-heading text-fg mb-1">Depth 0</div>
                <div className="gds-ctx-text text-fg-muted mb-3">gap: 16px, pad: 16px, radius: 10px, text: 12px</div>
                <div className="gds-ctx rounded-lg border border-border bg-surface gds-ctx-pad">
                  <div className="gds-ctx-heading text-fg mb-1">Depth 1</div>
                  <div className="gds-ctx-text text-fg-muted mb-3">gap: 12px, pad: 12px, radius: 8px, text: 11px</div>
                  <div className="gds-ctx rounded-md border border-border bg-surface gds-ctx-pad">
                    <div className="gds-ctx-heading text-fg mb-1">Depth 2</div>
                    <div className="gds-ctx-text text-fg-muted mb-2">gap: 8px, pad: 8px, radius: 6px, text: 10px</div>
                    <div className="gds-ctx rounded border border-border bg-surface gds-ctx-pad">
                      <div className="gds-ctx-heading text-fg">Depth 3+</div>
                      <div className="gds-ctx-text text-fg-muted">gap: 6px, pad: 6px, radius: 4px</div>
                    </div>
                  </div>
                </div>
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Depth scale table">
            <DemoCard title="Values at Each Depth" description="All values auto-cascade via CSS specificity" full>
              <DocTable
                headers={['Depth', 'Gap', 'Padding', 'Radius', 'Shadow', 'Text', 'Heading', 'fg-alpha']}
                rows={depthTable.map(d => [
                  d.depth,
                  `${d.gap}px`,
                  `${d.pad}px`,
                  `${d.radius}px`,
                  d.shadow,
                  `${d.text}px`,
                  `${d.heading}px`,
                  String(d.alpha),
                ])}
              />
            </DemoCard>
          </DocSection>

          <DocSection title="Utility classes">
            <DemoCard title="Depth-aware Utilities" description="Use instead of fixed Tailwind classes for auto-scaling" full>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { util: 'gds-ctx-pad', desc: 'padding at current depth' },
                  { util: 'gds-ctx-pad-x / gds-ctx-pad-y', desc: 'axis-specific padding' },
                  { util: 'gds-ctx-gap', desc: 'gap at current depth' },
                  { util: 'gds-ctx-radius', desc: 'border-radius at current depth' },
                  { util: 'gds-ctx-shadow', desc: 'box-shadow at current depth' },
                  { util: 'gds-ctx-text', desc: 'font-size (body) at current depth' },
                  { util: 'gds-ctx-heading', desc: 'font-size (heading) at current depth' },
                ].map(u => (
                  <div key={u.util} className="flex items-center gap-2 rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-1.5">
                    <span className="text-[9px] font-mono text-accent shrink-0">{u.util}</span>
                    <span className="text-[9px] text-fg-muted/30">{u.desc}</span>
                  </div>
                ))}
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Depth System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Container components (Card, Dialog, Panel, Sheet) add .gds-ctx class</p>
            <p>• Each nesting level of .gds-ctx reduces CSS custom properties automatically</p>
            <p>• Leaf components (Button, Input, Badge) inherit current depth, never add .gds-ctx</p>
            <p>• Developers never set depth manually — just compose normally</p>
            <p>• Pure CSS cascade: .gds-ctx .gds-ctx .gds-ctx = depth 2 specificity</p>
            <p>• 7 properties auto-scale: gap, padding, radius, shadow, text, heading, fg-alpha</p>
          </div>
        </div>
        <DocTable rows={[
          ['gds-ctx', 'Container depth marker', 'class', 'Card, Dialog, Panel, Sheet'],
          ['gds-ctx-pad', 'Depth-aware padding', 'utility', '20/16/12/8/6 px'],
          ['gds-ctx-gap', 'Depth-aware gap', 'utility', '24/16/12/8/6 px'],
          ['gds-ctx-radius', 'Depth-aware radius', 'utility', '12/10/8/6/4 px'],
          ['gds-ctx-shadow', 'Depth-aware shadow', 'utility', 'md/sm/none/none/none'],
          ['gds-ctx-text', 'Depth-aware body text', 'utility', '13/12/11/10/10 px'],
          ['gds-ctx-heading', 'Depth-aware heading', 'utility', '16/14/13/12/11 px'],
        ]} />
      </div>
    ),
    code: () => `// container components auto-add gds-ctx
<Card>                              {/* depth 0 */}
  <div className="gds-ctx-text">    {/* 12px text */}
    <Card>                          {/* depth 1 */}
      <div className="gds-ctx-text">{/* 11px text */}
        auto-scaled!
      </div>
    </Card>
  </div>
</Card>

// manual depth (rare)
<div className="gds-ctx gds-ctx-pad gds-ctx-gap gds-ctx-radius">
  <div className="gds-ctx">nested — smaller everything</div>
</div>

// backward-compat aliases
gds-pad = gds-ctx-pad
gds-radius = gds-ctx-radius
gds-shadow = gds-ctx-shadow
gds-text = gds-ctx-text
gds-heading = gds-ctx-heading`,
  },
]

export { systemItems }
