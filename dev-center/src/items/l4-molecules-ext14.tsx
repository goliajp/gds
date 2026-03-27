import { Ctrl } from '../components/ctrl'
import { DocTable, DocSection, ImportLine, LivePreview } from '../components/demo'

import { ListItem } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

const moleculeItemsO: DevCenterItem[] = []

const listItemItem: DevCenterItem = {
  id: 'list-item',
  label: 'ListItem',
  layer: 'l4',
  type: 'interactive',
  tags: ['list', 'item', 'menu', 'nav', 'settings', 'molecule'],
  defaultConfig: { active: false, disabled: false, showIcon: true, showDescription: true, showTrailing: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ListItem } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80 rounded-lg border border-border overflow-hidden">
          <ListItem
            title="Account Settings"
            description={config.showDescription ? 'Manage your profile and preferences' : undefined}
            icon={config.showIcon ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="5" r="3" /><path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" /></svg> : undefined}
            trailing={config.showTrailing ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l4 4-4 4" /></svg> : undefined}
            active={config.active}
            disabled={config.disabled}
            onClick={() => {}}
          />
          <ListItem
            title="Notifications"
            description={config.showDescription ? 'Configure alert preferences' : undefined}
            icon={config.showIcon ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6a4 4 0 0 1 8 0c0 4 2 5 2 5H2s2-1 2-5M6 13h4" /></svg> : undefined}
            trailing={config.showTrailing ? <span className="text-xs text-fg-muted">3</span> : undefined}
            onClick={() => {}}
          />
          <ListItem
            title="Security"
            description={config.showDescription ? 'Password and 2FA settings' : undefined}
            icon={config.showIcon ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="10" height="7" rx="1" /><path d="M5 7V5a3 3 0 0 1 6 0v2" /></svg> : undefined}
            onClick={() => {}}
          />
        </div>
      </LivePreview>

      <DocSection title="API">
        <DocTable rows={[
          ['title', 'string', '—', 'Primary text content'],
          ['description', 'string', '—', 'Secondary text below title'],
          ['icon', 'ReactNode', '—', 'Leading icon element'],
          ['trailing', 'ReactNode', '—', 'Trailing element (badge, arrow, etc.)'],
          ['onClick', '() => void', '—', 'Click handler (makes item interactive)'],
          ['active', 'boolean', 'false', 'Active/selected state with accent border'],
          ['disabled', 'boolean', 'false', 'Disabled state with reduced opacity'],
          ['className', 'string', '—', 'Additional CSS classes'],
        ]} />
      </DocSection>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="active" value={config.active} onChange={(v) => setConfig('active', v)} />
      <Ctrl type="check" label="disabled" value={config.disabled} onChange={(v) => setConfig('disabled', v)} />
      <Ctrl type="check" label="showIcon" value={config.showIcon} onChange={(v) => setConfig('showIcon', v)} />
      <Ctrl type="check" label="showDescription" value={config.showDescription} onChange={(v) => setConfig('showDescription', v)} />
      <Ctrl type="check" label="showTrailing" value={config.showTrailing} onChange={(v) => setConfig('showTrailing', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { ListItem } from '@goliapkg/gds'\n\n<ListItem\n  title="Account Settings"${config.showDescription ? '\n  description="Manage your profile"' : ''}${config.showIcon ? '\n  icon={<UserIcon />}' : ''}${config.showTrailing ? '\n  trailing={<ChevronRight />}' : ''}${config.active ? '\n  active' : ''}${config.disabled ? '\n  disabled' : ''}\n  onClick={() => {}}\n/>`,
}
moleculeItemsO.push(listItemItem)

export { moleculeItemsO }
