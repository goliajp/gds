// z-index reference item
import { DocTable, DemoCard, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

const zLevels = [
  { name: 'z-dropdown', value: 50, color: 'bg-accent/20 border-accent/30', usage: 'Dropdown menus, select popups' },
  { name: 'z-sticky', value: 100, color: 'bg-success/20 border-success/30', usage: 'Sticky headers, floating toolbars' },
  { name: 'z-overlay', value: 200, color: 'bg-warning/20 border-warning/30', usage: 'Backdrop overlays, dimmed backgrounds' },
  { name: 'z-modal', value: 300, color: 'bg-danger/20 border-danger/30', usage: 'Modal dialogs, sheets, drawers' },
  { name: 'z-popover', value: 400, color: 'bg-palette-4/20 border-palette-4/30', usage: 'Popovers, tooltips above modals' },
  { name: 'z-toast', value: 500, color: 'bg-palette-6/20 border-palette-6/30', usage: 'Toast notifications — always on top' },
]

const tokenItemsExt3: DevCenterItem[] = [
  {
    id: 'z-index',
    label: 'Z-Index',
    layer: 'l0',
    type: 'reference',
    tags: ['z-index', 'stacking', 'layer', 'overlay', 'modal', 'toast'],
    stage: () => {
      return (
        <div>
          <DocSection title="Stacking order">
            <DemoCard title="Z-Index Scale" description="6 semantic layers — click to inspect" full>
              <div className="relative flex flex-col items-center py-6" style={{ height: 360 }}>
                {[...zLevels].reverse().map((level, i) => {
                  const total = zLevels.length
                  const offsetX = i * 12
                  const offsetY = i * 44
                  return (
                    <div
                      key={level.name}
                      className={`absolute flex items-center justify-between rounded-lg border px-5 py-3 ${level.color}`}
                      style={{
                        zIndex: level.value,
                        top: offsetY,
                        left: `calc(50% - 180px + ${offsetX}px)`,
                        width: 360 - i * 8,
                        boxShadow: `0 ${(total - i) * 2}px ${(total - i) * 4}px rgba(0,0,0,0.15)`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-fg">{level.name}</span>
                      </div>
                      <span className="font-mono text-lg font-bold text-fg/60">{level.value}</span>
                    </div>
                  )
                })}
              </div>
            </DemoCard>
          </DocSection>

          <DocSection title="Token reference">
            <DemoCard title="CSS Variables & Tailwind Classes" description="All z-index tokens with their values and usage" full>
              <DocTable
                headers={['CSS Variable', 'Tailwind', 'Value', 'Usage']}
                rows={zLevels.map(level => [
                  `--gds-${level.name}`,
                  level.name,
                  String(level.value),
                  level.usage,
                ])}
              />
            </DemoCard>
          </DocSection>

          <DocSection title="Usage rules">
            <DemoCard title="Do's and Don'ts" description="Rules for maintaining a predictable stacking context" full>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-success/20 bg-success/5 p-4">
                  <div className="mb-3 text-[11px] font-semibold text-success">DO</div>
                  <div className="space-y-2 text-[10px] text-fg-muted/70">
                    <p>Use semantic z-index tokens exclusively</p>
                    <p>Modals above overlays: z-modal {'>'} z-overlay</p>
                    <p>Toast always wins: z-toast is the highest layer</p>
                    <p>Dropdowns at z-dropdown for inline popups</p>
                    <p>Sticky elements at z-sticky for scroll-fixed UI</p>
                  </div>
                </div>
                <div className="rounded-lg border border-danger/20 bg-danger/5 p-4">
                  <div className="mb-3 text-[11px] font-semibold text-danger">DON'T</div>
                  <div className="space-y-2 text-[10px] text-fg-muted/70">
                    <p>Never use arbitrary z-index (z-[999], z-[9999])</p>
                    <p>Never use z-50 directly — use the semantic token</p>
                    <p>Never stack modals above toasts</p>
                    <p>Never use z-index without a stacking context</p>
                    <p>Never increment z-index to "fix" overlap bugs</p>
                  </div>
                </div>
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Z-Index Scale</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>6 semantic z-index levels, defined as CSS custom properties in tokens.css</p>
            <p>Each level has a clear purpose — never use arbitrary z-index values</p>
            <p>Stacking order: dropdown (50) &lt; sticky (100) &lt; overlay (200) &lt; modal (300) &lt; popover (400) &lt; toast (500)</p>
            <p>Toast is always the highest — it must be visible above everything</p>
            <p>Popovers above modals — for tooltips/menus inside modal dialogs</p>
          </div>
        </div>
        <DocTable rows={[
          ['--gds-z-dropdown', 'Dropdown menus', '50', 'CSS var'],
          ['--gds-z-sticky', 'Sticky headers', '100', 'CSS var'],
          ['--gds-z-overlay', 'Backdrop overlays', '200', 'CSS var'],
          ['--gds-z-modal', 'Modal dialogs', '300', 'CSS var'],
          ['--gds-z-popover', 'Popovers, tooltips', '400', 'CSS var'],
          ['--gds-z-toast', 'Toast notifications', '500', 'CSS var'],
          ['z-dropdown', 'Tailwind utility', 'z-index: 50', 'class'],
          ['z-sticky', 'Tailwind utility', 'z-index: 100', 'class'],
          ['z-overlay', 'Tailwind utility', 'z-index: 200', 'class'],
          ['z-modal', 'Tailwind utility', 'z-index: 300', 'class'],
          ['z-popover', 'Tailwind utility', 'z-index: 400', 'class'],
          ['z-toast', 'Tailwind utility', 'z-index: 500', 'class'],
        ]} />
      </div>
    ),
    code: () => `/* CSS variables — defined in tokens.css */
:root {
  --gds-z-dropdown: 50;
  --gds-z-sticky: 100;
  --gds-z-overlay: 200;
  --gds-z-modal: 300;
  --gds-z-popover: 400;
  --gds-z-toast: 500;
}

/* Tailwind usage */
<div className="z-dropdown">Dropdown menu</div>
<div className="z-sticky">Sticky header</div>
<div className="z-overlay">Backdrop overlay</div>
<div className="z-modal">Modal dialog</div>
<div className="z-popover">Popover / tooltip</div>
<div className="z-toast">Toast notification</div>

/* CSS usage */
.my-modal {
  z-index: var(--gds-z-modal);
}
.my-toast {
  z-index: var(--gds-z-toast);
}

/* stacking context — always create one */
.my-overlay {
  position: fixed;
  z-index: var(--gds-z-overlay);
  isolation: isolate; /* creates stacking context */
}`,
  },
]

export { tokenItemsExt3 }
