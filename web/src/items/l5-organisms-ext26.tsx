import { EmployeeCard, PayslipCard } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt26: DevCenterItem[] = []

const sampleDeductions = [
  { label: 'Income Tax', amount: 45000 },
  { label: 'Health Insurance', amount: 18000 },
  { label: 'Pension', amount: 27000 },
]

const payslipCardItem: DevCenterItem = {
  id: 'payslip-card',
  label: 'PayslipCard',
  layer: 'l5',
  type: 'interactive',
  tags: ['payslip', 'salary', 'payroll', 'finance', 'card', 'organism'],
  defaultConfig: { gross: '500000' },

  stage: ({ config }) => {
    const gross = Number(config.gross)
    const totalDed = sampleDeductions.reduce((s, d) => s + d.amount, 0)
    return (
      <div>
        <ImportLine text="import { PayslipCard } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-72">
            <PayslipCard period="2026-03" gross={gross} deductions={sampleDeductions} net={gross - totalDed} />
          </div>
        </LivePreview>
      </div>
    )
  },

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="gross" value={config.gross} options={['350000', '500000', '800000']} onChange={(v) => setConfig('gross', v)} />
  ),

  code: () =>
    `import { PayslipCard } from '@goliapkg/gds'\n\n<PayslipCard\n  period="2026-03"\n  gross={500000}\n  deductions={[\n    { label: 'Income Tax', amount: 45000 },\n    { label: 'Insurance', amount: 18000 },\n  ]}\n  net={437000}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['period', 'Pay period label', 'string', '—'],
        ['gross', 'Gross amount', 'number', '—'],
        ['deductions', 'Deduction line items', '{ label: string; amount: number }[]', '—'],
        ['net', 'Net pay amount', 'number', '—'],
        ['currency', 'Currency symbol', 'string', '\u00a5'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt26.push(payslipCardItem)

const employeeCardItem: DevCenterItem = {
  id: 'employee-card',
  label: 'EmployeeCard',
  layer: 'l5',
  type: 'interactive',
  tags: ['employee', 'profile', 'hr', 'card', 'avatar', 'organism'],
  defaultConfig: { status: 'active' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { EmployeeCard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <EmployeeCard
            name="Tanaka Yuki"
            role="Senior Engineer"
            department="Engineering"
            status={config.status}
            email="tanaka@golia.jp"
            phone="+81-90-1234-5678"
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="pills" label="status" value={config.status} options={['active', 'inactive', 'onboarding']} onChange={(v) => setConfig('status', v)} />
  ),

  code: ({ config }) =>
    `import { EmployeeCard } from '@goliapkg/gds'\n\n<EmployeeCard\n  name="Tanaka Yuki"\n  role="Senior Engineer"\n  department="Engineering"\n  status="${config.status}"\n  email="tanaka@golia.jp"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'Employee name', 'string', '—'],
        ['avatar', 'Avatar image URL', 'string', '—'],
        ['role', 'Job title', 'string', '—'],
        ['department', 'Department name', 'string', '—'],
        ['status', 'Employment status', "'active' | 'inactive' | 'onboarding'", '—'],
        ['email', 'Email address', 'string', '—'],
        ['phone', 'Phone number', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt26.push(employeeCardItem)

export { organismItemsExt26 }
