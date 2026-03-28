import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Input, Label } from '@gds/l2-primitives'
import { StepperForm } from '@gds/l7-patterns'

import type { DevCenterItem } from '../types'

const patternItemsExt5: DevCenterItem[] = []

const demoSteps = [
  {
    title: 'Account',
    description: 'Create credentials',
    content: (
      <div className="flex flex-col gap-2 max-w-sm">
        <div><Label>Email</Label><Input placeholder="john@example.com" className="mt-1" /></div>
        <div><Label>Password</Label><Input type="password" placeholder="********" className="mt-1" /></div>
      </div>
    ),
  },
  {
    title: 'Profile',
    description: 'Personal info',
    content: (
      <div className="flex flex-col gap-2 max-w-sm">
        <div><Label>Name</Label><Input placeholder="John Doe" className="mt-1" /></div>
        <div><Label>Company</Label><Input placeholder="Acme Inc." className="mt-1" /></div>
      </div>
    ),
  },
  {
    title: 'Review',
    content: (
      <div className="text-sm text-fg-muted">
        <p>Review your information and click Complete to finish.</p>
      </div>
    ),
  },
]

const stepperFormItem: DevCenterItem = {
  id: 'stepper-form',
  label: 'StepperForm',
  layer: 'l7',
  type: 'interactive',
  tags: ['stepper', 'form', 'wizard', 'multi-step', 'pattern'],
  defaultConfig: { glass: false, completeLabel: 'Complete' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StepperForm } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <StepperForm
          steps={demoSteps}
          glass={config.glass}
          completeLabel={config.completeLabel}
          onComplete={() => alert('Form completed!')}
        />
      </LivePreview>
      <DocSection title="Examples" columns={1}>
        <DemoCard title="Basic wizard" description="3-step signup flow" code={`<StepperForm\n  steps={[\n    { title: 'Account', content: <AccountForm /> },\n    { title: 'Profile', content: <ProfileForm /> },\n    { title: 'Review', content: <ReviewStep /> },\n  ]}\n  onComplete={handleSubmit}\n/>`}>
          <StepperForm
            steps={demoSteps}
            onComplete={() => {}}
          />
        </DemoCard>
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
      <Ctrl type="text" label="completeLabel" value={config.completeLabel} onChange={(v) => setConfig('completeLabel', v)} />
    </>
  ),

  code: ({ config }) => {
    const props = [
      'steps={[\n    { title: \'Step 1\', content: <StepOne /> },\n    { title: \'Step 2\', content: <StepTwo /> },\n  ]}',
      'onComplete={handleSubmit}',
    ]
    if (config.glass === true) props.push('glass')
    if (config.completeLabel !== 'Complete') props.push(`completeLabel="${config.completeLabel}"`)
    return `import { StepperForm } from '@goliapkg/gds'\n\n<StepperForm\n  ${props.join('\n  ')}\n/>`
  },

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['steps', 'Array of step definitions', '{ title: string, description?: string, content: ReactNode }[]', '—'],
        ['onComplete', 'Called when final step is completed', '() => void', '—'],
        ['completeLabel', 'Label for complete button', 'string', "'Complete'"],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt5.push(stepperFormItem)

export { patternItemsExt5 }
