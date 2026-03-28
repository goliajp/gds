import { CronSchedule, PermissionMatrix } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt33: DevCenterItem[] = []

const permissionMatrixItem: DevCenterItem = {
  id: 'permission-matrix',
  label: 'PermissionMatrix',
  layer: 'l5',
  type: 'interactive',
  tags: ['permission', 'role', 'matrix', 'checkbox', 'grid', 'organism'],
  defaultConfig: { readonly: false },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PermissionMatrix } from '@goliapkg/gds'" />
      <LivePreview>
        <PermissionMatrix
          roles={['Admin', 'Editor', 'Viewer']}
          permissions={['Read', 'Write', 'Delete', 'Settings']}
          values={[
            [true, true, true],
            [true, true, false],
            [true, false, false],
            [true, false, false],
          ]}
          readonly={config.readonly}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="check" label="readonly" value={config.readonly} onChange={(v) => setConfig('readonly', v)} />
  ),

  code: ({ config }) =>
    `import { PermissionMatrix } from '@goliapkg/gds'\n\n<PermissionMatrix\n  roles={['Admin', 'Editor', 'Viewer']}\n  permissions={['Read', 'Write', 'Delete']}\n  values={[[true, true, true], [true, true, false], [true, false, false]]}${config.readonly ? '\n  readonly' : '\n  onChange={(perm, role, val) => update(perm, role, val)}'}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['roles', 'Column headers', 'string[]', '—'],
        ['permissions', 'Row labels', 'string[]', '—'],
        ['values', '2D boolean grid [perm][role]', 'boolean[][]', '—'],
        ['onChange', 'Checkbox change callback', '(perm, role, value) => void', '—'],
        ['readonly', 'Show check/dash instead of checkboxes', 'boolean', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt33.push(permissionMatrixItem)

const cronScheduleItem: DevCenterItem = {
  id: 'cron-schedule',
  label: 'CronSchedule',
  layer: 'l5',
  type: 'interactive',
  tags: ['cron', 'schedule', 'time', 'expression', 'organism'],
  defaultConfig: { expression: '0 3 * * *' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CronSchedule } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="space-y-3">
          <CronSchedule expression={config.expression} />
          <CronSchedule expression="0 9 * * 1" />
          <CronSchedule expression="* * * * *" />
          <CronSchedule expression="0 0 1 * *" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="text" label="expression" value={config.expression} onChange={(v) => setConfig('expression', v)} />
  ),

  code: ({ config }) =>
    `import { CronSchedule } from '@goliapkg/gds'\n\n<CronSchedule expression="${config.expression}" />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['expression', 'Cron expression (5 fields)', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt33.push(cronScheduleItem)

export { organismItemsExt33 }
