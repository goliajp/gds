import { TransactionList } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt27: DevCenterItem[] = []

const sampleTransactions = [
  { id: '1', date: '2026-03-25', description: 'Salary Payment', amount: 520000 },
  { id: '2', date: '2026-03-24', description: 'Office Rent', amount: -180000 },
  { id: '3', date: '2026-03-23', description: 'Client Invoice #042', amount: 350000 },
  { id: '4', date: '2026-03-22', description: 'Cloud Hosting', amount: -45000 },
  { id: '5', date: '2026-03-21', description: 'Software License', amount: -12000 },
]

const transactionListItem: DevCenterItem = {
  id: 'transaction-list',
  label: 'TransactionList',
  layer: 'l5',
  type: 'interactive',
  tags: ['transaction', 'finance', 'payment', 'list', 'organism'],
  defaultConfig: { count: '5' },

  stage: ({ config }) => {
    const count = Number(config.count)
    return (
      <div>
        <ImportLine text="import { TransactionList } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-80 rounded-lg border border-border">
            <TransactionList transactions={sampleTransactions.slice(0, count)} />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="count" value={config.count} options={['2', '3', '5']} onChange={(v) => setConfig('count', v)} />
  ),

  code: () =>
    `import { TransactionList } from '@goliapkg/gds'\n\n<TransactionList\n  transactions={[\n    { id: '1', date: '2026-03-25', description: 'Salary', amount: 520000 },\n    { id: '2', date: '2026-03-24', description: 'Rent', amount: -180000 },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['transactions', 'Array of transaction objects', '{ id, date, description, amount, currency? }[]', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt27.push(transactionListItem)

export { organismItemsExt27 }
