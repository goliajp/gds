import { MailComposer, MonitorGrid } from '@gds/l7-patterns'
import { ServiceCard } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt21: DevCenterItem[] = []

const monitorGridItem: DevCenterItem = {
  id: 'monitor-grid',
  label: 'MonitorGrid',
  layer: 'l7',
  type: 'interactive',
  tags: ['monitor', 'grid', 'server', 'devops', 'dashboard', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { MonitorGrid } from '@golia/gds'" />
      <LivePreview>
        <MonitorGrid>
          <ServiceCard name="api.golia.jp" status="healthy" metrics={[{ label: 'CPU', value: '3%' }]} />
          <ServiceCard name="admin.golia.jp" status="healthy" metrics={[{ label: 'CPU', value: '8%' }]} />
          <ServiceCard name="db-primary" status="warning" metrics={[{ label: 'CONN', value: '95/100' }]} />
        </MonitorGrid>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { MonitorGrid } from '@golia/gds'\nimport { ServiceCard } from '@golia/gds'\n\n<MonitorGrid>\n  <ServiceCard name="api.golia.jp" status="healthy" />\n  <ServiceCard name="db-primary" status="warning" />\n</MonitorGrid>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['children', 'Grid content (ServiceCard, etc.)', 'ReactNode', '—'],
        ['columns', 'Fixed column count (overrides responsive)', 'number', 'auto (1-4)'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt21.push(monitorGridItem)

const mailComposerItem: DevCenterItem = {
  id: 'mail-composer',
  label: 'MailComposer',
  layer: 'l7',
  type: 'interactive',
  tags: ['mail', 'email', 'compose', 'form', 'send', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { MailComposer } from '@golia/gds'" />
      <LivePreview>
        <div className="w-full max-w-md">
          <MailComposer
            defaultTo="team@golia.jp"
            onSend={(data) => alert(`Sent to: ${data.to}\nSubject: ${data.subject}`)}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { MailComposer } from '@golia/gds'\n\n<MailComposer\n  defaultTo="team@golia.jp"\n  onSend={(data) => sendEmail(data)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['onSend', 'Called with { to, subject, body } on form submit', '(data: MailComposerData) => void', '—'],
        ['defaultTo', 'Pre-filled recipient email', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt21.push(mailComposerItem)

export { patternItemsExt21 }
