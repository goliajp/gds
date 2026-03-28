import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Collapsible } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsF: DevCenterItem[] = []

// collapsible
const collapsibleItem: DevCenterItem = {
  id: 'collapsible',
  label: 'Collapsible',
  layer: 'l4',
  type: 'interactive',
  tags: ['collapsible', 'toggle', 'expand', 'collapse', 'disclosure'],
  defaultConfig: { defaultOpen: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Collapsible } from '@goliapkg/gds'" />

      <LivePreview className="block">
        <div className="w-full max-w-sm">
          <Collapsible
            defaultOpen={config.defaultOpen}
            trigger={
              <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2">
                <span className="text-sm font-medium text-fg">Click to expand</span>
                <span className="text-xs text-fg-muted">▼</span>
              </div>
            }
          >
            <div className="mt-2 rounded-lg border border-border bg-surface/50 p-4">
              <p className="text-sm text-fg-muted">
                This is the collapsible content. It can contain any ReactNode.
              </p>
            </div>
          </Collapsible>
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable
          rows={[
            ['trigger', 'ReactNode', '—', 'Clickable trigger element'],
            ['children', 'ReactNode', '—', 'Collapsible content'],
            ['defaultOpen', 'boolean', 'false', 'Initial open state (uncontrolled)'],
            ['open', 'boolean', '—', 'Controlled open state'],
            ['onOpenChange', '(open: boolean) => void', '—', 'Called when open state changes'],
            ['className', 'string', '—', 'Additional CSS classes'],
          ]}
        />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="defaultOpen" value={config.defaultOpen} onChange={(v) => setConfig('defaultOpen', v)} />
    </>
  ),

  code: ({ config }) => {
    const lines = ["import { Collapsible } from '@goliapkg/gds'", '']
    const props: string[] = ['trigger={<button>Toggle</button>}']
    if (config.defaultOpen === true) props.push('defaultOpen')
    lines.push('<Collapsible')
    for (const p of props) lines.push(`  ${p}`)
    lines.push('>')
    lines.push('  <div>Collapsible content</div>')
    lines.push('</Collapsible>')
    return lines.join('\n')
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['trigger', 'Clickable trigger element', 'ReactNode', '—'],
        ['children', 'Collapsible content', 'ReactNode', '—'],
        ['defaultOpen', 'Initial open state (uncontrolled)', 'boolean', 'false'],
        ['open', 'Controlled open state', 'boolean', '—'],
        ['onOpenChange', 'Called when open state changes', '(open: boolean) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Supports both controlled (open + onOpenChange) and uncontrolled (defaultOpen) modes</p>
          <p>• Trigger can be any ReactNode — the component wraps it with a click handler</p>
          <p>• Content animates open/closed with height transition</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsF.push(collapsibleItem)

export { moleculeItemsF }
