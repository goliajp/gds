import { useState } from 'react'

import { SortableTable, Wizard } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsQ: DevCenterItem[] = []

const sortableTableItem: DevCenterItem = {
  id: 'sortable-table',
  label: 'SortableTable',
  layer: 'l4',
  type: 'interactive',
  tags: ['table', 'sort', 'data', 'grid', 'molecule'],
  defaultConfig: {},

  stage: () => {
    const columns = [
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      { key: 'age', header: 'Age' },
    ]
    const data = [
      { name: 'Alice', role: 'Engineer', age: 30 },
      { name: 'Bob', role: 'Designer', age: 35 },
      { name: 'Charlie', role: 'PM', age: 25 },
      { name: 'Diana', role: 'Engineer', age: 28 },
    ]
    return (
      <div>
        <ImportLine text="import { SortableTable } from '@goliapkg/gds'" />
        <LivePreview className="!p-6">
          <SortableTable columns={columns} data={data} defaultSort={{ key: 'name', dir: 'asc' }} />
        </LivePreview>
      </div>
    )
  },

  code: () => [
    "import { SortableTable } from '@goliapkg/gds'",
    '',
    '<SortableTable',
    '  columns={[',
    "    { key: 'name', header: 'Name' },",
    "    { key: 'role', header: 'Role' },",
    '  ]}',
    '  data={rows}',
    "  defaultSort={{ key: 'name', dir: 'asc' }}",
    '/>',
  ].join('\n'),

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['columns', 'Column definitions', 'SortableColumn[]', '—'],
        ['data', 'Row data array', 'Record<string, unknown>[]', '—'],
        ['defaultSort', 'Initial sort state', '{ key: string, dir: "asc" | "desc" }', '—'],
        ['className', 'Root element class', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">SortableColumn</div>
        <DocTable rows={[
          ['key', 'Data field key', 'string', '—'],
          ['header', 'Header label', 'string', '—'],
          ['sortable', 'Enable sorting for this column', 'boolean', 'true'],
        ]} />
      </div>
    </div>
  ),
}
moleculeItemsQ.push(sortableTableItem)

const wizardItem: DevCenterItem = {
  id: 'wizard',
  label: 'Wizard',
  layer: 'l4',
  type: 'interactive',
  tags: ['wizard', 'steps', 'multi-step', 'form', 'molecule'],
  defaultConfig: { stepCount: '3' },

  stage: ({ config }) => {
    const [step, setStep] = useState(0)
    const count = Number(config.stepCount ?? 0)
    const steps = Array.from({ length: count }, (_, i) => ({
      title: `Step ${i + 1}`,
      content: <div className="rounded-lg border border-border p-4 text-sm text-fg-muted">Content for step {i + 1}</div>,
    }))
    return (
      <div>
        <ImportLine text="import { Wizard } from '@goliapkg/gds'" />
        <LivePreview className="!p-6">
          <Wizard steps={steps} currentStep={step} onStepChange={setStep} />
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl label="steps" type="pills" value={config.stepCount} options={['2', '3', '4', '5']} onChange={v => setConfig('stepCount', v)} />
    </>
  ),

  code: () => [
    "import { Wizard } from '@goliapkg/gds'",
    '',
    '<Wizard',
    '  steps={[',
    "    { title: 'Account', content: <AccountForm /> },",
    "    { title: 'Profile', content: <ProfileForm /> },",
    "    { title: 'Review', content: <ReviewStep /> },",
    '  ]}',
    '  currentStep={step}',
    '  onStepChange={setStep}',
    '/>',
  ].join('\n'),

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['steps', 'Step definitions', 'WizardStep[]', '—'],
        ['currentStep', 'Controlled active step index', 'number', '—'],
        ['onStepChange', 'Step change callback', '(step: number) => void', '—'],
        ['className', 'Root element class', 'string', '—'],
      ]} />
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">WizardStep</div>
        <DocTable rows={[
          ['title', 'Step title', 'string', '—'],
          ['content', 'Step content', 'ReactNode', '—'],
        ]} />
      </div>
    </div>
  ),
}
moleculeItemsQ.push(wizardItem)

export { moleculeItemsQ }
