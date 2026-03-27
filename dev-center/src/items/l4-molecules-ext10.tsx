import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Input } from '@gds/l2-primitives'
import { InputGroup } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsK: DevCenterItem[] = []

const inputGroupItem: DevCenterItem = {
  id: 'input-group',
  label: 'InputGroup',
  layer: 'l4',
  type: 'interactive',
  tags: ['input', 'group', 'prefix', 'suffix', 'addon', 'molecule'],
  defaultConfig: { prefix: '$', suffix: '.00', error: false, disabled: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { InputGroup } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-72">
          <InputGroup
            prefix={config.prefix || undefined}
            suffix={config.suffix || undefined}
            error={config.error}
            disabled={config.disabled}
          >
            <Input placeholder="Amount" />
          </InputGroup>
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['children', 'ReactNode', '—', 'The Input component'],
          ['prefix', 'ReactNode', '—', 'Element before input (e.g., "$", icon)'],
          ['suffix', 'ReactNode', '—', 'Element after input (e.g., ".com")'],
          ['error', 'boolean', 'false', 'Error border state'],
          ['disabled', 'boolean', 'false', 'Disable the group'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="prefix" value={config.prefix} onChange={(v) => setConfig('prefix', v)} />
      <Ctrl type="text" label="suffix" value={config.suffix} onChange={(v) => setConfig('suffix', v)} />
      <Ctrl type="check" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { InputGroup } from '@goliapkg/gds'\nimport { Input } from '@goliapkg/gds'\n\n<InputGroup${config.prefix ? ` prefix="${config.prefix}"` : ''}${config.suffix ? ` suffix="${config.suffix}"` : ''}${config.error ? ' error' : ''}${config.disabled ? ' disabled' : ''}>\n  <Input placeholder="Amount" />\n</InputGroup>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'The Input component', 'ReactNode', '—'],
        ['prefix', 'Element before input (e.g., "$", icon)', 'ReactNode', '—'],
        ['suffix', 'Element after input (e.g., ".com")', 'ReactNode', '—'],
        ['error', 'Error border state', 'boolean', 'false'],
        ['disabled', 'Disable the group', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Wraps an Input with optional prefix/suffix addons</p>
          <p>• Prefix and suffix can be text strings or ReactNode icons</p>
          <p>• Error and disabled states propagate visual styling to the group border</p>
        </div>
      </div>
    </div>
  ),
}
moleculeItemsK.push(inputGroupItem)

export { moleculeItemsK }
