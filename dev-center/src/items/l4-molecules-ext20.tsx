import { FormActions, StatComparison } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsU: DevCenterItem[] = []

const statComparisonItem: DevCenterItem = {
  id: 'stat-comparison',
  label: 'StatComparison',
  layer: 'l4',
  type: 'interactive',
  tags: ['stat', 'comparison', 'versus', 'before-after', 'molecule'],
  defaultConfig: { highlight: 'none' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StatComparison } from '@golia/gds'" />
      <LivePreview>
        <div className="w-80">
          <StatComparison
            left={{ label: 'Before', value: '$1,200' }}
            right={{ label: 'After', value: '$2,400' }}
            highlight={config.highlight as 'left' | 'right' | 'none'}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="highlight" value={config.highlight} options={['none', 'left', 'right']} onChange={(v) => setConfig('highlight', v)} />
  ),

  code: ({ config }) =>
    `import { StatComparison } from '@golia/gds'\n\n<StatComparison\n  left={{ label: 'Before', value: '$1,200' }}\n  right={{ label: 'After', value: '$2,400' }}\n  highlight="${config.highlight}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['left', 'Left stat with label and value', '{ label: string, value: string | number }', '—'],
        ['right', 'Right stat with label and value', '{ label: string, value: string | number }', '—'],
        ['highlight', 'Which side to highlight', "'left' | 'right' | 'none'", "'none'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsU.push(statComparisonItem)

const formActionsItem: DevCenterItem = {
  id: 'form-actions',
  label: 'FormActions',
  layer: 'l4',
  type: 'interactive',
  tags: ['form', 'actions', 'save', 'cancel', 'reset', 'molecule'],
  defaultConfig: { loading: 'false', showReset: 'true' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FormActions } from '@golia/gds'" />
      <LivePreview>
        <div className="w-96">
          <FormActions
            onSave={() => {}}
            onCancel={() => {}}
            onReset={config.showReset === 'true' ? () => {} : undefined}
            loading={config.loading === 'true'}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="loading" value={config.loading} options={['false', 'true']} onChange={(v) => setConfig('loading', v)} />
      <Ctrl type="pills" label="showReset" value={config.showReset} options={['true', 'false']} onChange={(v) => setConfig('showReset', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { FormActions } from '@golia/gds'\n\n<FormActions\n  onSave={handleSave}\n  onCancel={handleCancel}\n  ${config.showReset === 'true' ? 'onReset={handleReset}\n  ' : ''}${config.loading === 'true' ? 'loading\n' : ''}/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['onSave', 'Save button handler', '() => void', '—'],
        ['onCancel', 'Cancel button handler', '() => void', '—'],
        ['onReset', 'Reset button handler (shows button when provided)', '() => void', '—'],
        ['saveLabel', 'Custom save button label', 'string', "'Save'"],
        ['loading', 'Shows loading state on save button', 'boolean', 'false'],
        ['disabled', 'Disables all buttons', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsU.push(formActionsItem)

export { moleculeItemsU }
