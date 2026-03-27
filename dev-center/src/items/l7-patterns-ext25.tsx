import { HRDashboard, PayrollDashboard } from '@gds/l7-patterns'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt25: DevCenterItem[] = []

const payrollDashboardItem: DevCenterItem = {
  id: 'payroll-dashboard',
  label: 'PayrollDashboard',
  layer: 'l7',
  type: 'interactive',
  tags: ['payroll', 'dashboard', 'finance', 'layout', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { PayrollDashboard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-[600px]">
          <PayrollDashboard
            metrics={
              <>
                <div className="rounded-lg border border-border p-3 text-center text-sm"><div className="text-fg-muted">Total Payroll</div><div className="text-lg font-bold text-fg">\u00a55.2M</div></div>
                <div className="rounded-lg border border-border p-3 text-center text-sm"><div className="text-fg-muted">Employees</div><div className="text-lg font-bold text-fg">42</div></div>
                <div className="rounded-lg border border-border p-3 text-center text-sm"><div className="text-fg-muted">Avg Salary</div><div className="text-lg font-bold text-fg">\u00a5420K</div></div>
              </>
            }
            chart={<div className="h-24 text-xs text-fg-muted">Chart Area</div>}
            transactions={<div className="h-24 text-xs text-fg-muted">Recent Transactions</div>}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { PayrollDashboard } from '@goliapkg/gds'\n\n<PayrollDashboard\n  metrics={<MetricCards />}\n  chart={<PayrollChart />}\n  transactions={<TransactionList />}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['metrics', 'Top row metrics content', 'ReactNode', '—'],
        ['chart', 'Chart area content', 'ReactNode', '—'],
        ['transactions', 'Transactions list content', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt25.push(payrollDashboardItem)

const hrDashboardItem: DevCenterItem = {
  id: 'hr-dashboard',
  label: 'HRDashboard',
  layer: 'l7',
  type: 'interactive',
  tags: ['hr', 'dashboard', 'employees', 'layout', 'pattern'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { HRDashboard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-[600px]">
          <HRDashboard
            stats={
              <>
                <div className="rounded-lg border border-border p-3 text-center text-sm"><div className="text-fg-muted">Total</div><div className="text-lg font-bold text-fg">42</div></div>
                <div className="rounded-lg border border-border p-3 text-center text-sm"><div className="text-fg-muted">Active</div><div className="text-lg font-bold text-success">38</div></div>
                <div className="rounded-lg border border-border p-3 text-center text-sm"><div className="text-fg-muted">Onboarding</div><div className="text-lg font-bold text-warning">4</div></div>
              </>
            }
            onboarding={<div className="h-24 text-xs text-fg-muted">Onboarding List</div>}
            departments={<div className="h-24 text-xs text-fg-muted">Department Breakdown</div>}
          />
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { HRDashboard } from '@goliapkg/gds'\n\n<HRDashboard\n  stats={<StatCards />}\n  onboarding={<OnboardingList />}\n  departments={<DepartmentBreakdown />}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['stats', 'Top row stat cards content', 'ReactNode', '—'],
        ['onboarding', 'Onboarding list content', 'ReactNode', '—'],
        ['departments', 'Department breakdown content', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
patternItemsExt25.push(hrDashboardItem)

export { patternItemsExt25 }
