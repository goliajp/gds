import { CertBadge, EnvironmentBadge } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsZ: DevCenterItem[] = []

const certBadgeItem: DevCenterItem = {
  id: 'cert-badge',
  label: 'CertBadge',
  layer: 'l4',
  type: 'interactive',
  tags: ['ssl', 'certificate', 'security', 'badge', 'devops', 'molecule'],
  defaultConfig: { status: 'valid', domain: 'golia.jp' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CertBadge } from '@golia/gds'" />
      <LivePreview>
        <div className="flex flex-col gap-2">
          <CertBadge domain={config.domain} expiresAt="2026-12-01" status={config.status} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="status" value={config.status} options={['valid', 'expiring', 'expired']} onChange={(v) => setConfig('status', v)} />
      <Ctrl type="pills" label="domain" value={config.domain} options={['golia.jp', 'api.golia.jp', 'admin.golia.jp']} onChange={(v) => setConfig('domain', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CertBadge } from '@golia/gds'\n\n<CertBadge\n  domain="${config.domain}"\n  expiresAt="2026-12-01"\n  status="${config.status}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['domain', 'Domain name', 'string', '—'],
        ['expiresAt', 'Expiry date string', 'string', '—'],
        ['status', 'Certificate status', "'valid' | 'expiring' | 'expired'", '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsZ.push(certBadgeItem)

const environmentBadgeItem: DevCenterItem = {
  id: 'environment-badge',
  label: 'EnvironmentBadge',
  layer: 'l4',
  type: 'interactive',
  tags: ['environment', 'env', 'production', 'staging', 'badge', 'devops', 'molecule'],
  defaultConfig: { env: 'production', showDot: 'true' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { EnvironmentBadge } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-center gap-2">
          <EnvironmentBadge env={config.env} showDot={config.showDot === 'true'} />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="env" value={config.env} options={['production', 'staging', 'development', 'local']} onChange={(v) => setConfig('env', v)} />
      <Ctrl type="pills" label="showDot" value={config.showDot} options={['true', 'false']} onChange={(v) => setConfig('showDot', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { EnvironmentBadge } from '@golia/gds'\n\n<EnvironmentBadge\n  env="${config.env}"${config.showDot === 'false' ? '\n  showDot={false}' : ''}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['env', 'Environment type', "'production' | 'staging' | 'development' | 'local'", '—'],
        ['showDot', 'Show colored dot indicator', 'boolean', 'true'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsZ.push(environmentBadgeItem)

export { moleculeItemsZ }
