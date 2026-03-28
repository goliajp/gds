import { useState } from 'react'

import { Ctrl } from '../components/ctrl'
import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import { Banner, QuickStat, UserCard } from '@gds/l4-molecules'

import type { DevCenterItem } from '../types'

function BannerDismissDemo() {
  const [visible, setVisible] = useState(true)
  if (!visible) {
    return (
      <button
        className="text-xs text-accent hover:underline"
        onClick={() => setVisible(true)}
        type="button"
      >
        Show banner again
      </button>
    )
  }
  return (
    <Banner
      variant="warning"
      message="Your trial expires in 3 days."
      dismissible
      onDismiss={() => setVisible(false)}
    />
  )
}

const moleculeItemsAH: DevCenterItem[] = [
  {
    id: 'banner',
    label: 'Banner',
    layer: 'l4',
    type: 'interactive',
    tags: ['alert', 'notification', 'feedback', 'message'],
    variants: ['info', 'success', 'warning', 'danger'],
    defaultConfig: { message: 'System maintenance scheduled for tonight.', dismissible: false, glass: false },

    stage: ({ config, variant }) => (
      <div>
        <ImportLine text="import { Banner } from '@goliapkg/gds'" />

        <LivePreview className="!p-0">
          <Banner
            variant={variant as any}
            message={config.message}
            dismissible={config.dismissible}
            onDismiss={config.dismissible ? () => {} : undefined}
            glass={config.glass}
          />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Semantic Colors" description="4 contextual variants" code={`<Banner variant="info" message="Info" />\n<Banner variant="success" message="Done" />`}>
            <div className="flex flex-col gap-2">
              <Banner variant="info" message="Informational message" />
              <Banner variant="success" message="Operation completed successfully" />
              <Banner variant="warning" message="Your session expires soon" />
              <Banner variant="danger" message="Critical error occurred" />
            </div>
          </DemoCard>
          <DemoCard title="Dismissible" description="With close button" code={`<Banner variant="warning" message="..." dismissible onDismiss={close} />`}>
            <BannerDismissDemo />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig, variant, setVariant }) => (
      <>
        <Ctrl label="variant" type="pills" value={variant} options={['info', 'success', 'warning', 'danger']} onChange={setVariant} />
        <Ctrl label="message" type="text" value={config.message} onChange={v => setConfig('message', v)} />
        <Ctrl label="dismissible" type="check" value={config.dismissible} onChange={v => setConfig('dismissible', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config, variant }) => {
      const lines = ["import { Banner } from '@goliapkg/gds'", '']
      const props: string[] = [`variant="${variant}"`, `message="${config.message}"`]
      if (config.dismissible === true) {
        props.push('dismissible')
        props.push('onDismiss={() => dismiss()}')
      }
      if (config.glass === true) props.push('glass')
      lines.push(`<Banner ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['message', 'Banner content', 'ReactNode', '—'],
          ['variant', 'Color variant', "'info' | 'success' | 'warning' | 'danger'", "'info'"],
          ['dismissible', 'Show dismiss button', 'boolean', 'false'],
          ['onDismiss', 'Dismiss callback', '() => void', '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Full-width strip for contextual page-level messages</p>
            <p>• Auto-includes semantic icon per variant</p>
            <p>• Uses role="status" for screen reader announcements</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'user-card',
    label: 'UserCard',
    layer: 'l4',
    type: 'interactive',
    tags: ['user', 'profile', 'card', 'contact'],
    defaultConfig: { name: 'Alice Chen', role: 'Engineer', department: 'Frontend', email: 'alice@golia.jp', status: 'online', glass: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { UserCard } from '@goliapkg/gds'" />

        <LivePreview>
          <UserCard
            name={config.name}
            role={config.role !== '' ? config.role : undefined}
            department={config.department !== '' ? config.department : undefined}
            email={config.email !== '' ? config.email : undefined}
            status={config.status !== 'none' ? config.status : undefined}
            glass={config.glass}
          />
        </LivePreview>

        <DocSection title="Variants" columns={2}>
          <DemoCard title="Full Info" description="All fields populated" code={`<UserCard name="Alice" role="Engineer" department="Frontend" email="alice@co.io" status="online" />`}>
            <UserCard name="Alice Chen" role="Engineer" department="Frontend" email="alice@golia.jp" status="online" />
          </DemoCard>
          <DemoCard title="Minimal" description="Name only" code={`<UserCard name="Bob" />`}>
            <div className="flex flex-col gap-3">
              <UserCard name="Bob Tanaka" />
              <UserCard name="Charlie Li" role="Designer" />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Status" columns={2}>
          <DemoCard title="Status Indicators" description="4 status states" code={`<UserCard name="..." status="online" />`}>
            <div className="flex flex-col gap-3">
              <UserCard name="Alice" role="PM" status="online" />
              <UserCard name="Bob" role="Dev" status="away" />
              <UserCard name="Carol" role="QA" status="busy" />
              <UserCard name="Dave" role="Ops" status="offline" />
            </div>
          </DemoCard>
          <DemoCard title="With Avatar URL" description="Photo instead of initials" code={`<UserCard name="Eve" avatar="https://..." />`}>
            <UserCard name="Eve Smith" role="CTO" avatar="https://i.pravatar.cc/80?u=gds-uc" status="online" email="eve@golia.jp" />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="name" type="text" value={config.name} onChange={v => setConfig('name', v)} />
        <Ctrl label="role" type="text" value={config.role} onChange={v => setConfig('role', v)} />
        <Ctrl label="department" type="text" value={config.department} onChange={v => setConfig('department', v)} />
        <Ctrl label="email" type="text" value={config.email} onChange={v => setConfig('email', v)} />
        <Ctrl label="status" type="pills" value={config.status} options={['none', 'online', 'away', 'busy', 'offline']} onChange={v => setConfig('status', v)} />
        <Ctrl label="glass" type="check" value={config.glass} onChange={v => setConfig('glass', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { UserCard } from '@goliapkg/gds'", '']
      const props: string[] = [`name="${config.name}"`]
      if (config.role !== '') props.push(`role="${config.role}"`)
      if (config.department !== '') props.push(`department="${config.department}"`)
      if (config.email !== '') props.push(`email="${config.email}"`)
      if (config.status !== 'none') props.push(`status="${config.status}"`)
      if (config.glass === true) props.push('glass')
      lines.push(`<UserCard ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['name', 'User display name', 'string', '—'],
          ['avatar', 'Avatar image URL', 'string', '—'],
          ['role', 'Job title / role', 'string', '—'],
          ['department', 'Department name', 'string', '—'],
          ['email', 'Email address', 'string', '—'],
          ['status', 'Online status indicator', "'online' | 'away' | 'busy' | 'offline'", '—'],
          ['glass', 'Glass morphism effect', 'boolean', 'false'],
          ['children', 'Extra content slot', 'ReactNode', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Initials auto-extracted from name for fallback avatar</p>
            <p>• Status dot positioned on avatar bottom-right</p>
            <p>• Uses depth-aware spacing via gds-gap, gds-pad, gds-radius</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'quick-stat',
    label: 'QuickStat',
    layer: 'l4',
    type: 'interactive',
    tags: ['metric', 'kpi', 'number', 'trend'],
    defaultConfig: { value: '2,847', label: 'Total Users', trend: 12 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { QuickStat } from '@goliapkg/gds'" />

        <LivePreview>
          <QuickStat
            value={config.value}
            label={config.label}
            trend={config.trend !== 0 ? config.trend : undefined}
          />
        </LivePreview>

        <DocSection title="Trends" columns={2}>
          <DemoCard title="Positive Trend" description="Green upward indicator" code={`<QuickStat value="2,847" label="Users" trend={12} />`}>
            <div className="flex gap-6">
              <QuickStat value="2,847" label="Total Users" trend={12} />
              <QuickStat value="$48.2K" label="Revenue" trend={8} />
            </div>
          </DemoCard>
          <DemoCard title="Negative Trend" description="Red downward indicator" code={`<QuickStat value="142" label="Issues" trend={-5} />`}>
            <div className="flex gap-6">
              <QuickStat value="142" label="Open Issues" trend={-5} />
              <QuickStat value="3.2s" label="Latency" trend={-15} />
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="No Trend">
          <DemoCard title="Static Value" description="Value without trend indicator" code={`<QuickStat value="99.9%" label="Uptime" />`}>
            <div className="flex gap-6">
              <QuickStat value="99.9%" label="Uptime" />
              <QuickStat value="24" label="Active Now" />
              <QuickStat value="1.2TB" label="Storage" />
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="value" type="text" value={config.value} onChange={v => setConfig('value', v)} />
        <Ctrl label="label" type="text" value={config.label} onChange={v => setConfig('label', v)} />
        <Ctrl label="trend" type="number" value={config.trend} min={-100} max={100} onChange={v => setConfig('trend', v)} />
      </>
    ),

    code: ({ config }) => {
      const lines = ["import { QuickStat } from '@goliapkg/gds'", '']
      const props: string[] = [`value="${config.value}"`, `label="${config.label}"`]
      if (config.trend !== 0) props.push(`trend={${config.trend}}`)
      lines.push(`<QuickStat ${props.join(' ')} />`)
      return lines.join('\n')
    },

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['value', 'Display value (formatted)', 'string | number', '—'],
          ['label', 'Metric label', 'string', '—'],
          ['trend', 'Percentage change (positive = green, negative = red)', 'number', '—'],
          ['icon', 'Optional leading icon', 'ReactNode', '—'],
          ['className', 'Additional CSS classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for dashboard KPI displays</p>
            <p>• Trend auto-prefixes + for positive values</p>
            <p>• Semantic colors: success for up, danger for down, muted for zero</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { moleculeItemsAH }
