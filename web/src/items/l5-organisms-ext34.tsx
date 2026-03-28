import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Button } from '@gds/l2-primitives'
import { DataGrid, StepForm, Tour } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

// inline NumTable for demo (ported from admin source)
type NumColumn = {
  footer?: ReactNode
  format?: (value: null | number | undefined) => string
  key: string
  label: string
  width?: string
}

type NumTableProps = {
  className?: string
  columns: NumColumn[]
  emptyMessage?: string
  labelHeader: string
  labelKey: string
  rows: Record<string, any>[]
}

function formatDefault(val: null | number | undefined): string {
  if (val === null || val === undefined) return '\u2014'
  return val.toLocaleString()
}

const NumTable = forwardRef<HTMLDivElement, NumTableProps>(
  function NumTable({ className, columns, emptyMessage = '\u2014', labelHeader, labelKey, rows }, ref) {
    return (
      <div className={`overflow-x-auto rounded-lg border border-border ${className ?? ''}`} ref={ref}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-border bg-bg-secondary px-2.5 py-1.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-fg-muted">
                {labelHeader}
              </th>
              {columns.map((col) => (
                <th
                  className="border border-border bg-bg-secondary px-2.5 py-1.5 text-right text-xs font-semibold tracking-wide whitespace-nowrap text-fg-muted"
                  key={col.key}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="border border-border/60 px-4 py-8 text-center text-xs text-fg-muted" colSpan={columns.length + 1}>
                  {emptyMessage}
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr className="transition-colors hover:bg-bg-secondary/50" key={i}>
                <td className="border border-border/60 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-fg">
                  {row[labelKey]}
                </td>
                {columns.map((col) => {
                  const val = row[col.key]
                  const formatted = col.format !== undefined ? col.format(val) : formatDefault(val)
                  const isNeg = typeof val === 'number' && val < 0
                  return (
                    <td
                      className={`border border-border/60 px-2.5 py-1.5 text-right text-xs whitespace-nowrap tabular-nums ${isNeg ? 'text-danger' : 'text-fg'}`}
                      key={col.key}
                    >
                      {formatted}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
          {columns.some((c) => c.footer !== undefined) && (
            <tfoot>
              <tr>
                <td className="border border-border bg-bg-secondary px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-fg">
                  Total
                </td>
                {columns.map((col) => (
                  <td
                    className="border border-border bg-bg-secondary px-2.5 py-1.5 text-right text-xs font-semibold whitespace-nowrap text-fg tabular-nums"
                    key={col.key}
                  >
                    {col.footer ?? ''}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    )
  },
)

// inline GanttPanel simplified demo (no external dependency)
function GanttPanelDemo() {
  const phases = [
    { id: 'plan', name: 'Planning', color: 'var(--color-accent)', start: 0, end: 25 },
    { id: 'dev', name: 'Development', color: 'var(--color-success)', start: 20, end: 65 },
    { id: 'test', name: 'Testing', color: 'var(--color-warning)', start: 55, end: 85 },
    { id: 'launch', name: 'Launch', color: 'var(--color-danger)', start: 80, end: 100 },
  ]

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-fg">Project Alpha</span>
        <span className="text-[11px] text-fg-muted">4 phases / 12 tasks</span>
      </div>
      <div className="flex flex-col gap-2">
        {phases.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <span className="w-24 text-xs text-fg-muted">{p.name}</span>
            <div className="relative h-5 flex-1 rounded bg-bg-tertiary/30">
              <div
                className="absolute top-0 h-full rounded opacity-80"
                style={{
                  left: `${p.start}%`,
                  width: `${p.end - p.start}%`,
                  backgroundColor: p.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-fg-muted/40">
        <span>Mar 1</span>
        <span>Mar 15</span>
        <span>Apr 1</span>
        <span>Apr 15</span>
        <span>May 1</span>
      </div>
    </div>
  )
}

function TourDemo() {
  const [active, setActive] = useState(false)
  const steps = [
    { title: 'Welcome', description: 'This is a guided tour of the application.' },
    { title: 'Navigation', description: 'Use the sidebar to navigate between sections.' },
    { title: 'Settings', description: 'Customize your preferences in the settings panel.' },
  ]
  return (
    <div>
      <Button onClick={() => setActive(true)}>Start Tour</Button>
      <Tour
        steps={steps}
        active={active}
        onComplete={() => setActive(false)}
        onSkip={() => setActive(false)}
      />
    </div>
  )
}

const organismItemsExt34: DevCenterItem[] = [
  {
    id: 'data-grid',
    label: 'DataGrid',
    layer: 'l5',
    type: 'interactive',
    tags: ['table', 'grid', 'data', 'simple'],
    defaultConfig: { compact: false, striped: false, glass: false },

    stage: ({ config }) => {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'hours', label: 'Hours', align: 'right' as const },
        { key: 'status', label: 'Status' },
      ]
      const rows = [
        { name: 'Alice', role: 'Engineer', hours: 160, status: 'Active' },
        { name: 'Bob', role: 'Designer', hours: 128, status: 'Away' },
        { name: 'Charlie', role: 'PM', hours: 144, status: 'Active' },
        { name: 'Diana', role: 'QA', hours: 152, status: 'Active' },
      ]
      return (
        <div>
          <ImportLine text="import { DataGrid } from '@goliapkg/gds'" />

          <LivePreview className="!p-4">
            <DataGrid columns={columns} rows={rows} compact={config.compact} striped={config.striped} glass={config.glass} />
          </LivePreview>

          <DocSection title="Options" columns={2}>
            <DemoCard title="Striped Rows" description="Alternating row backgrounds" code={`<DataGrid columns={cols} rows={rows} striped />`}>
              <DataGrid columns={columns.slice(0, 3)} rows={rows.slice(0, 3)} striped />
            </DemoCard>
            <DemoCard title="Compact Mode" description="Reduced padding" code={`<DataGrid columns={cols} rows={rows} compact />`}>
              <DataGrid columns={columns.slice(0, 3)} rows={rows} compact />
            </DemoCard>
          </DocSection>

          <DocSection title="States">
            <DemoCard title="Empty" description="No data fallback" code={`<DataGrid columns={cols} rows={[]} />`}>
              <DataGrid columns={columns.slice(0, 3)} rows={[]} />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="compact" type="check" value={config.compact} onChange={v => setConfig('compact', v)} />
        <Ctrl label="striped" type="check" value={config.striped} onChange={v => setConfig('striped', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { DataGrid } from '@goliapkg/gds'", '']
      const props: string[] = ['columns={columns}', 'rows={rows}']
      if (config.compact === true) props.push('compact')
      if (config.striped === true) props.push('striped')
      if (config.glass === true) props.push('glass')
      lines.push('<DataGrid')
      for (const p of props) lines.push(`  ${p}`)
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['columns', 'Column definitions', 'DataGridColumn[]', '—'],
          ['rows', 'Row data (Record<string, ReactNode>[])', 'Record<string, ReactNode>[]', '—'],
          ['compact', 'Reduced cell padding', 'boolean', 'false'],
          ['striped', 'Alternating row backgrounds', 'boolean', 'false'],
          ['glass', 'Glass morphism surface', 'boolean', 'false'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">DataGridColumn</div>
          <DocTable rows={[
            ['key', 'Row data key to display', 'string', '—'],
            ['label', 'Column header text', 'string', '—'],
            ['align', 'Text alignment', "'left' | 'center' | 'right'", "'left'"],
            ['width', 'Column width CSS value', 'string', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Simpler than DataTable — no sorting, no custom cell renderers</p>
            <p>• Use for quick read-only data displays</p>
            <p>• "No data" placeholder when rows array is empty</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'num-table',
    label: 'NumTable',
    layer: 'l5',
    type: 'interactive',
    tags: ['table', 'financial', 'numeric', 'accounting'],
    defaultConfig: { showFooter: true },

    stage: ({ config }) => {
      const columns: NumColumn[] = [
        { key: 'q1', label: 'Q1', footer: config.showFooter === true ? '48,200' : undefined },
        { key: 'q2', label: 'Q2', footer: config.showFooter === true ? '52,100' : undefined },
        { key: 'q3', label: 'Q3', footer: config.showFooter === true ? '61,300' : undefined },
        { key: 'q4', label: 'Q4', footer: config.showFooter === true ? '58,900' : undefined },
      ]
      const rows = [
        { category: 'Revenue', q1: 28000, q2: 31500, q3: 35200, q4: 33400 },
        { category: 'Expenses', q1: -15800, q2: -17200, q3: -19400, q4: -18600 },
        { category: 'COGS', q1: -4000, q2: -3800, q3: -4500, q4: -4100 },
        { category: 'Net Income', q1: 8200, q2: 10500, q3: 11300, q4: 10700 },
      ]
      return (
        <div>
          <ImportLine text="// inline NumTable — financial data table pattern" />

          <LivePreview className="!p-4">
            <NumTable
              labelHeader="Category"
              labelKey="category"
              columns={columns}
              rows={rows}
            />
          </LivePreview>

          <DocSection title="Features" columns={2}>
            <DemoCard title="Negative Values" description="Danger color for negative numbers" code={`// negative numbers auto-colored red`}>
              <NumTable
                labelHeader="Item"
                labelKey="category"
                columns={[
                  { key: 'amount', label: 'Amount' },
                ]}
                rows={[
                  { category: 'Revenue', amount: 50000 },
                  { category: 'Refunds', amount: -3200 },
                  { category: 'Net', amount: 46800 },
                ]}
              />
            </DemoCard>
            <DemoCard title="Empty State" description="Placeholder when no rows" code={`<NumTable rows={[]} ... />`}>
              <NumTable
                labelHeader="Category"
                labelKey="category"
                columns={[{ key: 'value', label: 'Value' }]}
                rows={[]}
              />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="footer" type="check" value={config.showFooter} onChange={v => setConfig('showFooter', v)} />
      </>
    ),

    code: () => {
      const lines = [
        "// NumTable — financial/numeric table pattern",
        '',
        'const columns = [',
        "  { key: 'q1', label: 'Q1', footer: '48,200' },",
        "  { key: 'q2', label: 'Q2', footer: '52,100' },",
        ']',
        '',
        'const rows = [',
        "  { category: 'Revenue', q1: 28000, q2: 31500 },",
        "  { category: 'Expenses', q1: -15800, q2: -17200 },",
        ']',
        '',
        '<NumTable',
        '  labelHeader="Category"',
        '  labelKey="category"',
        '  columns={columns}',
        '  rows={rows}',
        '/>',
      ]
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['columns', 'Numeric column definitions', 'NumColumn[]', '—'],
          ['rows', 'Data rows', 'Record<string, any>[]', '—'],
          ['labelHeader', 'Header text for label column', 'string', '—'],
          ['labelKey', 'Row key for label column', 'string', '—'],
          ['emptyMessage', 'Text when no rows', 'string', '"—"'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">NumColumn</div>
          <DocTable rows={[
            ['key', 'Data row key', 'string', '—'],
            ['label', 'Column header', 'string', '—'],
            ['footer', 'Footer aggregate value', 'ReactNode', '—'],
            ['format', 'Custom formatter', '(val: number | null) => string', 'toLocaleString()'],
            ['width', 'Column width hint', 'string', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Optimized for numeric/financial data — right-aligned tabular-nums</p>
            <p>• Negative values auto-colored with danger semantic</p>
            <p>• null/undefined values display as em-dash</p>
            <p>• Footer row for aggregates (sums, averages, etc.)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'step-form',
    label: 'StepForm',
    layer: 'l5',
    type: 'interactive',
    tags: ['wizard', 'multi-step', 'form', 'stepper'],
    defaultConfig: { stepCount: '3' },

    stage: ({ config }) => {
      const allSteps = [
        { label: 'Account', content: <div className="text-sm text-fg-muted">Enter your account details: name, email, password.</div> },
        { label: 'Profile', description: 'Personal info', content: <div className="text-sm text-fg-muted">Fill in your profile: avatar, bio, location.</div> },
        { label: 'Preferences', content: <div className="text-sm text-fg-muted">Choose your theme, language, and notifications.</div> },
        { label: 'Review', content: <div className="text-sm text-fg-muted">Review your choices and confirm.</div> },
      ]
      const steps = allSteps.slice(0, Number(config.stepCount))
      return (
        <div>
          <ImportLine text="import { StepForm } from '@goliapkg/gds'" />

          <LivePreview className="!p-6">
            <StepForm steps={steps} onComplete={() => {}} />
          </LivePreview>

          <DocSection title="Features">
            <DemoCard title="Step Indicators" description="Visual progress with check marks for completed steps" code={`<StepForm\n  steps={steps}\n  onComplete={() => alert('Done!')}\n/>`}>
              <div className="text-[11px] text-fg-muted/60">
                Navigate with Back/Next buttons. Completed steps show a checkmark. Last step shows "Finish".
              </div>
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="steps" type="pills" value={config.stepCount} options={['2', '3', '4']} onChange={v => setConfig('stepCount', v)} />
      </>
    ),

    code: () => {
      const lines = ["import { StepForm } from '@goliapkg/gds'", '']
      lines.push('const steps = [')
      lines.push("  { label: 'Account', content: <AccountForm /> },")
      lines.push("  { label: 'Profile', content: <ProfileForm /> },")
      lines.push("  { label: 'Review', content: <ReviewStep /> },")
      lines.push(']')
      lines.push('')
      lines.push('<StepForm')
      lines.push('  steps={steps}')
      lines.push("  onComplete={() => console.log('done')}")
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['steps', 'Form step definitions', 'FormStep[]', '—'],
          ['onComplete', 'Called when last step "Finish" is clicked', '() => void', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">FormStep</div>
          <DocTable rows={[
            ['label', 'Step name in header', 'string', '—'],
            ['description', 'Optional step description', 'string', '—'],
            ['content', 'Step body content', 'ReactNode', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Step indicators show: numbered circle (pending), accent border (current), checkmark (completed)</p>
            <p>• Back button hidden on first step, Finish button on last step</p>
            <p>• Manages internal step state — onComplete fires at the end</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tour',
    label: 'Tour',
    layer: 'l5',
    type: 'interactive',
    tags: ['tour', 'guide', 'onboarding', 'spotlight'],
    defaultConfig: { dummy: '' },

    stage: () => (
      <div>
        <ImportLine text="import { Tour } from '@goliapkg/gds'" />

        <LivePreview>
          <TourDemo />
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Spotlight" description="Highlights target element with cutout mask" code={`{ title: 'Nav', description: '...', target: '#sidebar' }`}>
            <div className="text-[11px] text-fg-muted/60">
              Set target CSS selector to highlight specific elements. The tour card positions near the target with configurable placement.
            </div>
          </DemoCard>
          <DemoCard title="Navigation" description="Keyboard + button controls" code={`// Arrow keys, Escape, dot indicators`}>
            <div className="text-[11px] text-fg-muted/60">
              ArrowRight = next, ArrowLeft = back, Escape = skip. Dot indicators are clickable for random access.
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: () => (
      <>
        <div className="py-1.5 text-[10px] text-fg-muted/40">Click "Start Tour" in live preview</div>
      </>
    ),

    code: () => {
      const lines = ["import { Tour } from '@goliapkg/gds'", '']
      lines.push('const steps = [')
      lines.push("  { title: 'Welcome', description: 'Intro text...' },")
      lines.push("  { title: 'Feature', description: '...', target: '#feature-btn', placement: 'bottom' },")
      lines.push("  { title: 'Done', description: 'You are all set!' },")
      lines.push(']')
      lines.push('')
      lines.push('<Tour')
      lines.push('  steps={steps}')
      lines.push('  active={tourActive}')
      lines.push('  onComplete={() => setTourActive(false)}')
      lines.push('  onSkip={() => setTourActive(false)}')
      lines.push('/>')
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['steps', 'Tour step definitions', 'TourStep[]', '—'],
          ['active', 'Whether tour is visible', 'boolean', '—'],
          ['onComplete', 'Called when last step is finished', '() => void', '—'],
          ['onSkip', 'Called when user skips/closes tour', '() => void', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">TourStep</div>
          <DocTable rows={[
            ['title', 'Step heading', 'string', '—'],
            ['description', 'Step body text', 'string', '—'],
            ['target', 'CSS selector for spotlight element', 'string', '—'],
            ['placement', 'Card position relative to target', "'top' | 'bottom' | 'left' | 'right'", "'bottom'"],
            ['image', 'Optional illustration URL', 'string', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Renders full-screen overlay with SVG mask for spotlight cutout</p>
            <p>• Progress bar and dot navigation for step tracking</p>
            <p>• Keyboard accessible: arrows, escape, enter</p>
            <p>• Card auto-positions based on placement + target rect</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'gantt-panel',
    label: 'GanttPanel',
    layer: 'l5',
    type: 'interactive',
    tags: ['gantt', 'project', 'timeline', 'task', 'schedule'],
    defaultConfig: { dummy: '' },

    stage: () => (
      <div>
        <ImportLine text="// GanttPanel — project management timeline (inline demo)" />

        <LivePreview className="!p-4">
          <GanttPanelDemo />
        </LivePreview>

        <DocSection title="Features" columns={2}>
          <DemoCard title="Phase Bars" description="Color-coded project phases on a timeline" code={`<GanttPanel\n  projectName="Project"\n  phases={phases}\n  tasks={tasks}\n  members={members}\n/>`}>
            <div className="text-[11px] text-fg-muted/60">
              Each phase renders as a colored bar. Tasks within phases show progress, dependencies, and assignees.
            </div>
          </DemoCard>
          <DemoCard title="Toolbar" description="View mode, filters, search, add task" code={`// day | week | month view modes\n// filter by phase, assignee, status, priority`}>
            <div className="text-[11px] text-fg-muted/60">
              Built-in toolbar with zoom controls, filter dropdown, search input, and "Add Task" button.
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: () => (
      <>
        <div className="py-1.5 text-[10px] text-fg-muted/40">Simplified inline demo</div>
      </>
    ),

    code: () => [
      "// GanttPanel — full project management component",
      '',
      'const members = [',
      "  { id: 'm1', name: 'Alice', role: 'PM' },",
      "  { id: 'm2', name: 'Bob', role: 'Dev' },",
      ']',
      '',
      'const phases = [',
      "  { id: 'planning', name: 'Planning', color: 'var(--color-accent)' },",
      "  { id: 'dev', name: 'Development', color: 'var(--color-success)' },",
      ']',
      '',
      'const tasks = [',
      "  { id: 't1', title: 'Requirements', phaseId: 'planning',",
      "    start: '2026-03-01', end: '2026-03-10', progress: 100, status: 'done' },",
      ']',
      '',
      '<GanttPanel',
      '  projectName="My Project"',
      '  members={members}',
      '  phases={phases}',
      '  tasks={tasks}',
      '  onTaskUpdate={(task) => update(task)}',
      '/>',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['projectName', 'Project display name', 'string', '—'],
          ['members', 'Team members', 'ProjectMember[]', '—'],
          ['phases', 'Project phases with colors', 'ProjectPhase[]', '—'],
          ['tasks', 'All project tasks', 'ProjectTask[]', '—'],
          ['onTaskUpdate', 'Task edit callback', '(task: ProjectTask) => void', '—'],
          ['onTaskAdd', 'New task callback', '(task: Omit<ProjectTask, "id">) => void', '—'],
          ['onTaskDelete', 'Delete task callback', '(taskId: string) => void', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">ProjectTask</div>
          <DocTable rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['title', 'Task name', 'string', '—'],
            ['phaseId', 'Phase reference', 'string', '—'],
            ['start / end', 'ISO date strings', 'string', '—'],
            ['progress', 'Completion 0-100', 'number', '0'],
            ['status', 'Current status', "'not-started' | 'in-progress' | 'done' | 'blocked'", '—'],
            ['priority', 'Priority level', "'low' | 'medium' | 'high' | 'critical'", '—'],
            ['dependencies', 'Prerequisite task IDs', 'string[]', '—'],
            ['milestone', 'Diamond marker', 'boolean', 'false'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Built on GanttChart with toolbar, filters, search, and task detail panel</p>
            <p>• Supports day/week/month view modes with zoom controls</p>
            <p>• Summary stats: total tasks, % complete, overdue, blocked</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { organismItemsExt34 }
