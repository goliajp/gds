import { SettingsLayout } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt16: DevCenterItem[] = []

const settingsLayoutItem: DevCenterItem = {
  id: 'settings-layout',
  label: 'SettingsLayout',
  layer: 'l7',
  type: 'interactive',
  tags: ['settings', 'layout', 'sidebar', 'nav', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { SettingsLayout } from '@goliapkg/gds'" />
      <LivePreview className="!items-start">
        <div className="w-full max-w-lg">
          <SettingsLayout sections={[
            { id: 'general', label: 'General', content: <div className="text-fg gds-text-body">General settings content — name, email, language.</div> },
            { id: 'security', label: 'Security', content: <div className="text-fg gds-text-body">Security settings — password, 2FA, sessions.</div> },
            { id: 'billing', label: 'Billing', content: <div className="text-fg gds-text-body">Billing settings — plan, payment method, invoices.</div> },
          ]} />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { SettingsLayout } from '@goliapkg/gds'\n\n<SettingsLayout sections={[\n  { id: 'general', label: 'General', content: <GeneralSettings /> },\n  { id: 'security', label: 'Security', content: <SecuritySettings /> },\n]} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['sections', 'Settings sections', '{ id, label, content: ReactNode }[]', '—'],
        ['defaultSection', 'Initially active section id', 'string', 'first section'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt16.push(settingsLayoutItem)

export { patternItemsExt16 }
