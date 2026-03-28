import { NotificationDot, PageNav } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAE: DevCenterItem[] = []

const notificationDotItem: DevCenterItem = {
  id: 'notification-dot',
  label: 'NotificationDot',
  layer: 'l4',
  type: 'interactive',
  tags: ['notification', 'badge', 'count', 'dot', 'molecule'],
  defaultConfig: { count: '5', max: '99', variant: 'danger' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { NotificationDot } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="flex items-center gap-8">
          <NotificationDot count={Number(config.count)} max={Number(config.max)} variant={config.variant}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-border text-fg-muted">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2a6 6 0 016 6c0 3.5 1 5 1 5H3s1-1.5 1-5a6 6 0 016-6zM8.5 17a1.5 1.5 0 003 0" />
              </svg>
            </div>
          </NotificationDot>
          <NotificationDot count={150} variant="accent">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-border text-fg-muted">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h12M4 8h12M4 12h8" />
              </svg>
            </div>
          </NotificationDot>
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="count" value={config.count} onChange={(v) => setConfig('count', v)} />
      <Ctrl type="text" label="max" value={config.max} onChange={(v) => setConfig('max', v)} />
      <Ctrl type="pills" label="variant" value={config.variant} options={['danger', 'accent']} onChange={(v) => setConfig('variant', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { NotificationDot } from '@goliapkg/gds'\n\n<NotificationDot count={${config.count}}${config.max !== '99' ? ` max={${config.max}}` : ''}${config.variant !== 'danger' ? ` variant="${config.variant}"` : ''}>\n  <Icon />\n</NotificationDot>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Element to wrap', 'ReactNode', '—'],
        ['count', 'Notification count', 'number', '0'],
        ['max', 'Maximum display count', 'number', '99'],
        ['variant', 'Badge color', "'danger' | 'accent'", "'danger'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAE.push(notificationDotItem)

const pageNavItem: DevCenterItem = {
  id: 'page-nav',
  label: 'PageNav',
  layer: 'l4',
  type: 'interactive',
  tags: ['page', 'nav', 'previous', 'next', 'navigation', 'molecule'],
  defaultConfig: { prevLabel: 'Previous', nextLabel: 'Next' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { PageNav } from '@goliapkg/gds'" />
      <LivePreview>
        <PageNav
          prev={{ label: config.prevLabel }}
          next={{ label: config.nextLabel }}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="prevLabel" value={config.prevLabel} onChange={(v) => setConfig('prevLabel', v)} />
      <Ctrl type="text" label="nextLabel" value={config.nextLabel} onChange={(v) => setConfig('nextLabel', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { PageNav } from '@goliapkg/gds'\n\n<PageNav\n  prev={{ label: '${config.prevLabel}' }}\n  next={{ label: '${config.nextLabel}' }}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['prev', 'Previous page link', '{ label: string, href?: string, onClick?: () => void }', '—'],
        ['next', 'Next page link', '{ label: string, href?: string, onClick?: () => void }', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAE.push(pageNavItem)

export { moleculeItemsAE }
