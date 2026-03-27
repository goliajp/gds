import { ContactCard } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt23: DevCenterItem[] = []

const contactCardItem: DevCenterItem = {
  id: 'contact-card',
  label: 'ContactCard',
  layer: 'l5',
  type: 'interactive',
  tags: ['contact', 'card', 'avatar', 'profile', 'organism'],
  defaultConfig: { name: 'Alice Smith', role: 'Engineer', email: 'alice@example.com', phone: '' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { ContactCard } from '@golia/gds'" />
      <LivePreview>
        <div className="w-60">
          <ContactCard
            name={config.name}
            role={config.role !== '' ? config.role : undefined}
            email={config.email !== '' ? config.email : undefined}
            phone={config.phone !== '' ? config.phone : undefined}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="name" value={config.name} options={['Alice Smith', 'Bob Lee', 'Carol Danvers']} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="pills" label="role" value={config.role} options={['', 'Engineer', 'Designer', 'Manager']} onChange={(v) => setConfig('role', v)} />
      <Ctrl type="pills" label="email" value={config.email} options={['', 'alice@example.com']} onChange={(v) => setConfig('email', v)} />
      <Ctrl type="pills" label="phone" value={config.phone} options={['', '+81-90-1234-5678']} onChange={(v) => setConfig('phone', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { ContactCard } from '@golia/gds'\n\n<ContactCard\n  name="${config.name}"${config.role !== '' ? `\n  role="${config.role}"` : ''}${config.email !== '' ? `\n  email="${config.email}"` : ''}${config.phone !== '' ? `\n  phone="${config.phone}"` : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'Contact name', 'string', '—'],
        ['avatar', 'Avatar image URL', 'string', '—'],
        ['email', 'Email address', 'string', '—'],
        ['phone', 'Phone number', 'string', '—'],
        ['role', 'Job title or role', 'string', '—'],
        ['actions', 'Action buttons', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt23.push(contactCardItem)

export { organismItemsExt23 }
