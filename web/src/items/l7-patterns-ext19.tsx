import { OnboardingCard } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt19: DevCenterItem[] = []

const onboardingCardItem: DevCenterItem = {
  id: 'onboarding-card',
  label: 'OnboardingCard',
  layer: 'l7',
  type: 'interactive',
  tags: ['onboarding', 'welcome', 'checklist', 'steps', 'progress', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { OnboardingCard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full max-w-sm">
          <OnboardingCard
            steps={[
              { label: 'Create account', completed: true },
              { label: 'Verify email', completed: true },
              { label: 'Set up profile', completed: false },
              { label: 'Invite team members', completed: false },
            ]}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { OnboardingCard } from '@goliapkg/gds'\n\n<OnboardingCard\n  title="Getting Started"\n  steps={[\n    { label: 'Create account', completed: true },\n    { label: 'Verify email', completed: true },\n    { label: 'Set up profile', completed: false },\n    { label: 'Invite team', completed: false },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['title', 'Card heading', 'string', "'Getting Started'"],
        ['steps', 'Array of onboarding steps', 'OnboardingStep[]', '—'],
        ['steps[].label', 'Step description', 'string', '—'],
        ['steps[].completed', 'Whether step is complete', 'boolean', '—'],
        ['steps[].action', 'Optional action button (hidden when completed)', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt19.push(onboardingCardItem)

export { patternItemsExt19 }
