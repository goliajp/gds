import { NavItem, UserMenu } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsY: DevCenterItem[] = []

const navItemItem: DevCenterItem = {
  id: 'nav-item',
  label: 'NavItem',
  layer: 'l4',
  type: 'interactive',
  tags: ['nav', 'navigation', 'sidebar', 'menu', 'molecule'],
  defaultConfig: { active: 'false', badge: '0', collapsed: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { NavItem } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-56 border border-border rounded-lg bg-surface">
          <NavItem label="Dashboard" active={config.active === 'true'} badge={Number(config.badge ?? 0) > 0 ? Number(config.badge ?? 0) : undefined} collapsed={config.collapsed === 'true'} />
          <NavItem label="Settings" collapsed={config.collapsed === 'true'} />
          <NavItem label="Inbox" badge={3} collapsed={config.collapsed === 'true'} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="active" value={config.active} options={['false', 'true']} onChange={(v) => setConfig('active', v)} />
      <Ctrl type="pills" label="badge" value={config.badge} options={['0', '3', '12', '100']} onChange={(v) => setConfig('badge', v)} />
      <Ctrl type="pills" label="collapsed" value={config.collapsed} options={['false', 'true']} onChange={(v) => setConfig('collapsed', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { NavItem } from '@goliapkg/gds'\n\n<NavItem\n  label="Dashboard"${config.active === 'true' ? '\n  active' : ''}${Number(config.badge ?? 0) > 0 ? `\n  badge={${config.badge}}` : ''}${config.collapsed === 'true' ? '\n  collapsed' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['label', 'Navigation item label', 'string', '—'],
        ['icon', 'Leading icon', 'ReactNode', '—'],
        ['active', 'Active/selected state', 'boolean', 'false'],
        ['badge', 'Badge count number', 'number', '—'],
        ['collapsed', 'Show only icon (sidebar collapsed)', 'boolean', 'false'],
        ['onClick', 'Click handler', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsY.push(navItemItem)

const userMenuItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'logout', label: 'Logout', danger: true },
]

const userMenuItem: DevCenterItem = {
  id: 'user-menu',
  label: 'UserMenu',
  layer: 'l4',
  type: 'interactive',
  tags: ['user', 'avatar', 'menu', 'dropdown', 'molecule'],
  defaultConfig: { name: 'Alice Smith', role: 'Admin' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { UserMenu } from '@goliapkg/gds'" />
      <LivePreview>
        <UserMenu
          name={config.name}
          role={config.role !== '' ? config.role : undefined}
          items={userMenuItems}
          onSelect={(id) => alert(`Selected: ${id}`)}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="name" value={config.name} options={['Alice Smith', 'Bob Lee']} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="pills" label="role" value={config.role} options={['', 'Admin', 'Editor', 'Viewer']} onChange={(v) => setConfig('role', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { UserMenu } from '@goliapkg/gds'\n\n<UserMenu\n  name="${config.name}"${config.role !== '' ? `\n  role="${config.role}"` : ''}\n  items={[{ id: 'profile', label: 'Profile' }, ...]}\n  onSelect={(id) => handleSelect(id)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'User display name', 'string', '—'],
        ['avatar', 'Avatar image URL', 'string', '—'],
        ['role', 'User role shown in dropdown', 'string', '—'],
        ['items', 'Menu items array', 'UserMenuItem[]', '—'],
        ['onSelect', 'Called with item id on click', '(id: string) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsY.push(userMenuItem)

export { moleculeItemsY }
