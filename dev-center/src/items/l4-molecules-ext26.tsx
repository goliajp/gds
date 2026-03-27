import { AuditEntry, CurrencyDisplay } from '@gds/l4-molecules'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const moleculeItemsAA: DevCenterItem[] = []

const currencyDisplayItem: DevCenterItem = {
  id: 'currency-display',
  label: 'CurrencyDisplay',
  layer: 'l4',
  type: 'interactive',
  tags: ['currency', 'money', 'amount', 'trend', 'finance', 'payroll', 'molecule'],
  defaultConfig: { amount: '500000', change: '12', period: 'vs last month' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { CurrencyDisplay } from '@goliapkg/gds'" />
      <LivePreview>
        <CurrencyDisplay
          amount={Number(config.amount)}
          change={Number(config.change)}
          period={config.period}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="amount" value={config.amount} options={['100000', '500000', '1200000']} onChange={(v) => setConfig('amount', v)} />
      <Ctrl type="pills" label="change" value={config.change} options={['-5', '0', '12', '25']} onChange={(v) => setConfig('change', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { CurrencyDisplay } from '@goliapkg/gds'\n\n<CurrencyDisplay\n  amount={${config.amount}}\n  change={${config.change}}\n  period="${config.period}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['amount', 'Numeric amount to display', 'number', '—'],
        ['currency', 'Currency symbol', 'string', '\u00a5'],
        ['change', 'Percentage change (shows arrow)', 'number', '—'],
        ['period', 'Period label text', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAA.push(currencyDisplayItem)

const auditEntryItem: DevCenterItem = {
  id: 'audit-entry',
  label: 'AuditEntry',
  layer: 'l4',
  type: 'interactive',
  tags: ['audit', 'log', 'event', 'timeline', 'hr', 'molecule'],
  defaultConfig: { variant: 'default' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { AuditEntry } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-96 space-y-1">
          <AuditEntry timestamp="09:15" user="Alice" action="approved" target="Payslip #42" variant={config.variant} />
          <AuditEntry timestamp="09:30" user="Bob" action="deleted" target="Draft Invoice" variant="danger" />
          <AuditEntry timestamp="10:00" user="Charlie" action="created" target="New Contract" variant="success" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="variant" value={config.variant} options={['default', 'success', 'warning', 'danger']} onChange={(v) => setConfig('variant', v)} />
  ),

  code: ({ config }) =>
    `import { AuditEntry } from '@goliapkg/gds'\n\n<AuditEntry\n  timestamp="09:15"\n  user="Alice"\n  action="approved"\n  target="Payslip #42"\n  variant="${config.variant}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['timestamp', 'Time/date string', 'string', '—'],
        ['user', 'User who performed action', 'string', '—'],
        ['action', 'Action performed', 'string', '—'],
        ['target', 'Target entity', 'string', '—'],
        ['variant', 'Color variant for action text', "'default' | 'success' | 'warning' | 'danger'", 'default'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
moleculeItemsAA.push(auditEntryItem)

export { moleculeItemsAA }
