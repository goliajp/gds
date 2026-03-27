import { QuickStat, UserInfo } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAF: DevCenterItem[] = []

const userInfoItem: DevCenterItem = {
  id: 'user-info',
  label: 'UserInfo',
  layer: 'l4',
  type: 'interactive',
  tags: ['user', 'avatar', 'name', 'role', 'profile', 'molecule'],
  defaultConfig: { name: 'Alice Zhang', role: 'Engineer', size: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { UserInfo } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-col gap-4">
          <UserInfo name={config.name} role={config.role} size={config.size} />
          <UserInfo name="Bob Chen" role="Designer" size="sm" />
          <UserInfo name="Carol Wu" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="name" value={config.name} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="text" label="role" value={config.role} onChange={(v) => setConfig('role', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { UserInfo } from '@golia/gds'\n\n<UserInfo name="${config.name}"${config.role ? ` role="${config.role}"` : ''}${config.size !== 'default' ? ` size="${config.size}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'User display name', 'string', '—'],
        ['avatar', 'Avatar image URL', 'string', '—'],
        ['role', 'Role/title text', 'string', '—'],
        ['size', 'Display size', "'sm' | 'default'", "'default'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAF.push(userInfoItem)

const quickStatItem: DevCenterItem = {
  id: 'quick-stat',
  label: 'QuickStat',
  layer: 'l4',
  type: 'interactive',
  tags: ['stat', 'kpi', 'metric', 'value', 'trend', 'molecule'],
  defaultConfig: { value: '1,234', label: 'Total Users', trend: 12 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { QuickStat } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-start gap-8">
          <QuickStat value={config.value} label={config.label} trend={config.trend} />
          <QuickStat value="$42.5k" label="Revenue" trend={-3} />
          <QuickStat value={89} label="Health Score" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="value" value={config.value} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="text" label="label" value={config.label} onChange={(v) => setConfig('label', v)} />
      <Ctrl type="number" label="trend" value={config.trend} min={-100} max={100} onChange={(v) => setConfig('trend', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { QuickStat } from '@golia/gds'\n\n<QuickStat value="${config.value}" label="${config.label}"${config.trend !== 0 ? ` trend={${config.trend}}` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Display value', 'string | number', '—'],
        ['label', 'Description label', 'string', '—'],
        ['icon', 'Icon element', 'ReactNode', '—'],
        ['trend', 'Trend percentage', 'number', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAF.push(quickStatItem)

export { moleculeItemsAF }
