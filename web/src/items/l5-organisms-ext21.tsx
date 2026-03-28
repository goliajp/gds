import { EmailListItem, ServiceCard } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt21: DevCenterItem[] = []

const serviceCardItem: DevCenterItem = {
  id: 'service-card',
  label: 'ServiceCard',
  layer: 'l5',
  type: 'interactive',
  tags: ['service', 'server', 'status', 'health', 'devops', 'organism'],
  defaultConfig: { status: 'healthy' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ServiceCard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-72">
          <ServiceCard
            name="api.golia.jp"
            description="Main API server (axum)"
            status={config.status as 'healthy' | 'warning' | 'error' | 'offline'}
            metrics={[{ label: 'CPU', value: '3%' }, { label: 'MEM', value: '256MB' }, { label: 'Uptime', value: '14d' }]}
            tags={['rust', 'axum', 'production']}
            url="https://api.golia.jp"
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="status" value={config.status} options={['healthy', 'warning', 'error', 'offline']} onChange={(v) => setConfig('status', v)} />
  ),

  code: ({ config }) =>
    `import { ServiceCard } from '@goliapkg/gds'\n\n<ServiceCard\n  name="api.golia.jp"\n  description="Main API server"\n  status="${config.status}"\n  metrics={[{ label: 'CPU', value: '3%' }]}\n  tags={['rust', 'production']}\n  url="https://api.golia.jp"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'Service name', 'string', '—'],
        ['description', 'Service description', 'string', '—'],
        ['status', 'Health status', "'healthy' | 'warning' | 'error' | 'offline'", '—'],
        ['metrics', 'Key-value metric pairs', '{ label: string, value: string }[]', '—'],
        ['tags', 'Tag labels', 'string[]', '—'],
        ['url', 'Service URL (shown as link)', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt21.push(serviceCardItem)

const emailListItemItem: DevCenterItem = {
  id: 'email-list-item',
  label: 'EmailListItem',
  layer: 'l5',
  type: 'interactive',
  tags: ['email', 'inbox', 'list', 'message', 'mail', 'organism'],
  defaultConfig: { unread: 'true', starred: 'false' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { EmailListItem } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-full max-w-lg border border-border rounded-lg overflow-hidden">
          <EmailListItem
            sender="Suzuki Ichiro"
            subject="Q4 Budget Review"
            preview="Please review the attached Q4 budget proposal before Friday..."
            timestamp="2h ago"
            unread={config.unread === 'true'}
            starred={config.starred === 'true'}
            onClick={() => {}}
          />
          <div className="border-t border-border" />
          <EmailListItem
            sender="HR Team"
            subject="Holiday Schedule Update"
            preview="Updated national holiday calendar for 2026"
            timestamp="5h ago"
            onClick={() => {}}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="unread" value={config.unread} options={['true', 'false']} onChange={(v) => setConfig('unread', v)} />
      <Ctrl type="pills" label="starred" value={config.starred} options={['true', 'false']} onChange={(v) => setConfig('starred', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { EmailListItem } from '@goliapkg/gds'\n\n<EmailListItem\n  sender="Suzuki Ichiro"\n  subject="Q4 Budget Review"\n  preview="Please review..."\n  timestamp="2h ago"\n  ${config.unread === 'true' ? 'unread\n  ' : ''}${config.starred === 'true' ? 'starred\n  ' : ''}onClick={handleClick}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['sender', 'Sender name', 'string', '—'],
        ['senderAvatar', 'Avatar text (defaults to first letter)', 'string', '—'],
        ['subject', 'Email subject line', 'string', '—'],
        ['preview', 'Body preview text', 'string', '—'],
        ['timestamp', 'Time label', 'string', '—'],
        ['unread', 'Unread state (bold + dot)', 'boolean', 'false'],
        ['starred', 'Starred indicator', 'boolean', 'false'],
        ['selected', 'Selected/highlighted state', 'boolean', 'false'],
        ['onClick', 'Click handler', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt21.push(emailListItemItem)

export { organismItemsExt21 }
