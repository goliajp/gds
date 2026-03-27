import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { AvatarBadge, CursorFollow } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsI: DevCenterItem[] = []

// avatar-badge
const avatarBadgeItem: DevCenterItem = {
  id: 'avatar-badge',
  label: 'AvatarBadge',
  layer: 'l3',
  type: 'interactive',
  tags: ['avatar', 'badge', 'notification', 'count', 'atom'],
  defaultConfig: { name: 'Alice Wang', count: 5, maxCount: 99, size: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { AvatarBadge } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-6">
          <AvatarBadge
            name={config.name}
            count={config.count}
            maxCount={config.maxCount}
            size={config.size}
          />
          <AvatarBadge name="Bob" count={0} size={config.size} />
          <AvatarBadge name="Carol" count={150} maxCount={99} size={config.size} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="name" value={config.name} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="number" label="count" value={config.count} min={0} max={200} onChange={(v) => setConfig('count', v)} />
      <Ctrl type="number" label="maxCount" value={config.maxCount} min={1} max={999} onChange={(v) => setConfig('maxCount', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['xs', 'sm', 'default', 'lg']} onChange={(v) => setConfig('size', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { AvatarBadge } from '@goliapkg/gds'\n\n<AvatarBadge\n  name="${config.name}"\n  count={${config.count}}\n  maxCount={${config.maxCount}}\n  size="${config.size}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'Display name (initials)', 'string', '—'],
        ['src', 'Avatar image URL', 'string', '—'],
        ['size', 'Avatar size', "'xs' | 'sm' | 'default' | 'lg'", "'default'"],
        ['status', 'Online status indicator', "'online' | 'away' | 'busy' | 'offline'", '—'],
        ['count', 'Notification count', 'number', '—'],
        ['maxCount', 'Max before showing N+', 'number', '99'],
      ]} />
    </div>
  ),
}
atomItemsI.push(avatarBadgeItem)

// cursor-follow
const cursorFollowItem: DevCenterItem = {
  id: 'cursor-follow',
  label: 'CursorFollow',
  layer: 'l3',
  type: 'interactive',
  tags: ['cursor', 'follow', 'mouse', 'interactive', 'effect', 'atom'],
  defaultConfig: { smooth: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CursorFollow } from '@goliapkg/gds'" />
      <LivePreview>
        <CursorFollow
          className="h-48 w-full rounded-lg border border-white/[0.06] bg-white/[0.02]"
          smooth={config.smooth}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/80 text-[9px] font-bold text-accent-fg">
            +
          </div>
        </CursorFollow>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="check" label="smooth" value={config.smooth} onChange={(v) => setConfig('smooth', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CursorFollow } from '@goliapkg/gds'\n\n<CursorFollow smooth={${config.smooth}}>\n  <div className="h-6 w-6 rounded-full bg-accent" />\n</CursorFollow>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Element that follows the cursor', 'ReactNode', '—'],
        ['offset', 'Position offset { x, y }', '{ x?: number; y?: number }', '{ x: 0, y: 0 }'],
        ['smooth', 'Lerp smoothing on movement', 'boolean', 'true'],
        ['className', 'Container CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsI.push(cursorFollowItem)

export { atomItemsI }
