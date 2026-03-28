import { WizardLayout } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt29: DevCenterItem[] = []

const wizardLayoutItem: DevCenterItem = {
  id: 'wizard-layout',
  label: 'WizardLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['wizard', 'stepper', 'layout', 'steps', 'form', 'pattern'],
  defaultConfig: { currentStep: '1' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { WizardLayout } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="h-64 border border-border rounded-lg overflow-hidden">
          <WizardLayout
            steps={['Account', 'Profile', 'Review', 'Submit']}
            currentStep={Number(config.currentStep)}
            actions={
              <div className="flex gap-2">
                <button className="rounded border border-border px-3 py-1 text-xs text-fg-muted">Back</button>
                <button className="rounded bg-accent px-3 py-1 text-xs text-white">Continue</button>
              </div>
            }
          >
            <div className="flex items-center justify-center h-full text-fg-muted text-sm">
              Step {Number(config.currentStep) + 1} content
            </div>
          </WizardLayout>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="currentStep" value={config.currentStep} options={['0', '1', '2', '3']} onChange={(v) => setConfig('currentStep', v)} />
  ),

  code: ({ config }) =>
    `import { WizardLayout } from '@goliapkg/gds'\n\n<WizardLayout\n  steps={['Account', 'Profile', 'Review', 'Submit']}\n  currentStep={${config.currentStep}}\n  actions={<Button>Continue</Button>}\n>\n  {content}\n</WizardLayout>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['steps', 'Array of step labels', 'string[]', '—'],
        ['currentStep', 'Current active step index (0-based)', 'number', '—'],
        ['children', 'Step content', 'ReactNode', '—'],
        ['actions', 'Action bar content (bottom)', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt29.push(wizardLayoutItem)

export { patternItemsExt29 }
