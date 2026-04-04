import { Badge, Button, Dot, Progress } from '@goliapkg/gds/primitives'
import { Card } from '@goliapkg/gds/molecules'
import { useEffect, useState } from 'react'

import { ThemeToggle } from '../components/theme-toggle'

// ---------------------------------------------------------------------------
// mock data
// ---------------------------------------------------------------------------

const DEVICES = [
  { name: 'firefly', cpu: 12, mem: 45, disk: 67 },
  { name: 'golianas', cpu: 8, mem: 38, disk: 52 },
  { name: 'lx64', cpu: 23, mem: 61, disk: 44 },
  { name: 'mini', cpu: 5, mem: 29, disk: 71 },
  { name: 't01', cpu: 34, mem: 55, disk: 39 },
  { name: 't02', cpu: 18, mem: 42, disk: 58 },
]

const CLAUDE_ACCOUNTS = [
  {
    id: 1,
    email: 'claude-1@golia.jp',
    usage5h: 21,
    usage7d: 28,
    reset5h: '14:32',
    updated: '2 min ago',
  },
  {
    id: 2,
    email: 'claude-2@golia.jp',
    usage5h: 1,
    usage7d: 12,
    reset5h: '16:08',
    updated: '5 min ago',
  },
  {
    id: 3,
    email: 'claude-3@golia.jp',
    usage5h: 15,
    usage7d: 9,
    reset5h: '15:45',
    updated: '1 min ago',
  },
]

type ServiceRow = {
  name: string
  project: string
  device: string
  latency: number
  domains: string
  status: 'active' | 'error'
}

const SERVICES: ServiceRow[] = [
  {
    name: 'bitreits-web',
    project: 'bitreits',
    device: 'firefly',
    latency: 142,
    domains: 'bitreits.com',
    status: 'active',
  },
  {
    name: 'comfyui',
    project: 'ai-tools',
    device: 'lx64',
    latency: 187,
    domains: 'comfy.golia.jp',
    status: 'active',
  },
  {
    name: 'dadaya-web',
    project: 'dadaya',
    device: 'firefly',
    latency: 134,
    domains: 'dadaya.golia.jp',
    status: 'active',
  },
  {
    name: 'devops-server',
    project: 'devops',
    device: 'golianas',
    latency: 89,
    domains: 'devops.golia.jp',
    status: 'active',
  },
  {
    name: 'devops-web',
    project: 'devops',
    device: 'golianas',
    latency: 145,
    domains: 'devops.golia.jp',
    status: 'active',
  },
  {
    name: 'gds-web',
    project: 'gds',
    device: 'firefly',
    latency: 156,
    domains: 'gds.golia.jp',
    status: 'active',
  },
  {
    name: 'golia-web',
    project: 'golia',
    device: 'firefly',
    latency: 138,
    domains: 'golia.jp',
    status: 'active',
  },
  {
    name: 'grafana',
    project: 'infra',
    device: 'golianas',
    latency: 167,
    domains: 'grafana.golia.jp',
    status: 'active',
  },
  {
    name: 'jellyfin',
    project: 'media',
    device: 'golianas',
    latency: 178,
    domains: 'jf.golia.jp',
    status: 'active',
  },
  {
    name: 'madcawl-web',
    project: 'madcawl',
    device: 'firefly',
    latency: 141,
    domains: 'madcawl.com',
    status: 'active',
  },
  {
    name: 'mailrs-api',
    project: 'mailrs',
    device: 'lx64',
    latency: 92,
    domains: 'api.mailrs.dev',
    status: 'active',
  },
  {
    name: 'mailrs-web',
    project: 'mailrs',
    device: 'lx64',
    latency: 153,
    domains: 'mailrs.dev',
    status: 'active',
  },
  {
    name: 'minio',
    project: 'infra',
    device: 'golianas',
    latency: 134,
    domains: 's3.golia.jp',
    status: 'active',
  },
  {
    name: 'n8n',
    project: 'automation',
    device: 'mini',
    latency: 197,
    domains: 'n8n.golia.jp',
    status: 'error',
  },
  {
    name: 'portainer',
    project: 'infra',
    device: 'golianas',
    latency: 145,
    domains: 'portainer.golia.jp',
    status: 'active',
  },
  {
    name: 'prometheus',
    project: 'infra',
    device: 'golianas',
    latency: 112,
    domains: 'prom.golia.jp',
    status: 'active',
  },
  {
    name: 'traefik',
    project: 'infra',
    device: 'firefly',
    latency: 45,
    domains: 'traefik.golia.jp',
    status: 'active',
  },
  {
    name: 'vaultwarden',
    project: 'infra',
    device: 'mini',
    latency: 156,
    domains: 'vault.golia.jp',
    status: 'active',
  },
]

const DOMAINS = [
  { domain: 'golia.jp', registrar: 'Onamae', expires: '2027-03-15' },
  { domain: 'madcawl.com', registrar: 'Cloudflare', expires: '2026-11-02' },
  { domain: 'bitreits.com', registrar: 'Cloudflare', expires: '2027-01-20' },
  { domain: 'dadaya.golia.jp', registrar: 'Onamae', expires: '2027-03-15' },
  { domain: 'mailrs.dev', registrar: 'Google Domains', expires: '2026-08-30' },
  { domain: 'gds.golia.jp', registrar: 'Onamae', expires: '2027-03-15' },
  { domain: 'comfy.golia.jp', registrar: 'Onamae', expires: '2027-03-15' },
  { domain: 'devops.golia.jp', registrar: 'Onamae', expires: '2027-03-15' },
  { domain: 'n8n.golia.jp', registrar: 'Onamae', expires: '2027-03-15' },
]

// availability chart data (72h timeline)
const AVAILABILITY = [
  {
    name: 'Claude 1',
    pct: 70.1,
    segments: [
      { start: 0, end: 25 },
      { start: 30, end: 55 },
      { start: 60, end: 85 },
      { start: 88, end: 100 },
    ],
  },
  {
    name: 'Claude 2',
    pct: 70.9,
    segments: [
      { start: 0, end: 20 },
      { start: 28, end: 60 },
      { start: 65, end: 90 },
      { start: 95, end: 100 },
    ],
  },
  {
    name: 'Claude 3',
    pct: 70.28,
    segments: [
      { start: 5, end: 35 },
      { start: 40, end: 70 },
      { start: 75, end: 100 },
    ],
  },
]

const TIMELINE_LABELS = [
  '3/31',
  '4/01',
  '4/02',
  '4/03',
  '4/04',
  '4/05',
  '4/06',
  '4/07',
  '4/08',
  '4/09',
  '4/10',
  '4/11',
]
const NOW_POSITION = 36 // percentage across the timeline

// sidebar nav
const SIDEBAR_OPS = ['DNS', 'IAM', 'Deploys', 'Schedule', 'Audit']
const SIDEBAR_DEV = [
  { label: 'GitHub', external: false },
  { label: 'Wiki', external: false },
  { label: 'Tools', external: false },
  { label: 'Starters', external: true },
]

// ---------------------------------------------------------------------------
// sub-components
// ---------------------------------------------------------------------------

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-fg-muted mb-1.5 px-3 text-[10px] font-semibold tracking-wider uppercase">
        {title}
      </div>
      {children}
    </div>
  )
}

function SidebarLink({
  label,
  active = false,
  external = false,
}: {
  label: string
  active?: boolean
  external?: boolean
}) {
  return (
    <Button
      className={`flex w-full items-center justify-between rounded-none px-3 py-1 text-xs ${
        active
          ? 'bg-accent/10 text-accent font-medium'
          : 'text-fg-muted hover:text-fg hover:bg-bg-secondary'
      }`}
      variant="ghost"
    >
      <span>{label}</span>
      {external && (
        <svg
          className="h-3 w-3 opacity-50"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      )}
    </Button>
  )
}

function UsageBar({
  label,
  value,
  className,
}: {
  label: string
  value: number
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span className="text-fg-muted w-5 text-[10px]">{label}</span>
      <div className="flex-1">
        <Progress
          size="sm"
          value={value}
          variant={value > 80 ? 'danger' : value > 50 ? 'warning' : 'default'}
        />
      </div>
      <span className="text-fg-muted w-7 text-right text-[10px]">{value}%</span>
    </div>
  )
}

function ResourceChart() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* timeline header */}
        <div className="mb-1 flex items-end pr-12 pl-16">
          <div className="relative flex-1">
            <div className="flex justify-between">
              {TIMELINE_LABELS.map((l) => (
                <span key={l} className="text-fg-muted text-[10px]">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* rows */}
        {AVAILABILITY.map((row) => (
          <div key={row.name} className="mb-1 flex items-center">
            <span className="text-fg-secondary w-16 shrink-0 text-xs">{row.name}</span>
            <div className="bg-bg-tertiary relative h-5 flex-1 overflow-hidden rounded">
              {row.segments.map((seg, i) => (
                <div
                  key={i}
                  className="bg-success/70 absolute top-0 h-full rounded"
                  style={{ left: `${seg.start}%`, width: `${seg.end - seg.start}%` }}
                />
              ))}
              {/* NOW marker */}
              <div
                className="bg-warning absolute top-0 h-full w-px"
                style={{ left: `${NOW_POSITION}%` }}
              />
            </div>
            <span className="text-fg-muted w-12 shrink-0 text-right text-[10px]">{row.pct}%</span>
          </div>
        ))}

        {/* NOW label */}
        <div className="flex items-center pr-12 pl-16">
          <div className="relative flex-1">
            <span
              className="text-warning absolute -translate-x-1/2 text-[9px] font-bold"
              style={{ left: `${NOW_POSITION}%` }}
            >
              NOW
            </span>
          </div>
        </div>
      </div>

      {/* summary */}
      <div className="text-fg-muted mt-3 text-xs">
        Today: 125 sessions · 188k tokens · 最新 Claude 1
      </div>
    </div>
  )
}

function ClockDisplay() {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return now.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  })

  // update clock every second
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="text-fg-muted font-mono text-xs">{time}</span>
}

// ---------------------------------------------------------------------------
// main view
// ---------------------------------------------------------------------------

const activeServicesCount = SERVICES.filter((s) => s.status === 'active').length

export function DevOpsOverviewView() {
  const [activeTab, setActiveTab] = useState('devops')

  return (
    <div className="flex h-full" data-component="devops-overview">
      {/* sidebar */}
      <aside className="border-border bg-bg flex w-[130px] shrink-0 flex-col border-r">
        <div className="border-border flex items-center gap-1.5 border-b px-3 py-3">
          <div className="bg-accent flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white">
            G
          </div>
          <span className="text-fg text-xs font-bold">GOLIA DevOps</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {/* overview (active) */}
          <div className="bg-accent/10 text-accent mb-3 px-3 py-1 text-xs font-medium">
            Overview
          </div>

          <SidebarSection title="DEVICES">
            {DEVICES.map((d) => (
              <div
                key={d.name}
                className="text-fg-muted flex items-center gap-1.5 px-3 py-0.5 text-xs"
              >
                <Dot color="success" size="sm" />
                <span>{d.name}</span>
              </div>
            ))}
          </SidebarSection>

          <SidebarSection title="OPERATIONS">
            {SIDEBAR_OPS.map((item) => (
              <SidebarLink key={item} label={item} />
            ))}
          </SidebarSection>

          <SidebarSection title="DEVELOPMENT">
            {SIDEBAR_DEV.map((item) => (
              <SidebarLink key={item.label} label={item.label} external={item.external} />
            ))}
          </SidebarSection>

          <SidebarSection title="ANALYTICS">
            <SidebarLink label="Claude Code" />
          </SidebarSection>
        </div>
      </aside>

      {/* main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* top bar with tabs */}
        <header className="border-border bg-bg flex h-10 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-1">
            <Button
              className={`px-3 py-2 text-xs font-medium ${
                activeTab === 'devops' ? 'border-accent text-accent border-b-2' : 'text-fg-muted'
              }`}
              onClick={() => setActiveTab('devops')}
              variant="ghost"
            >
              GOLIA DevOps
            </Button>
            <Button
              className={`px-3 py-2 text-xs font-medium ${
                activeTab === 'admin' ? 'border-accent text-accent border-b-2' : 'text-fg-muted'
              }`}
              onClick={() => setActiveTab('admin')}
              variant="ghost"
            >
              GOLIA Admin
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <ClockDisplay />
            <ThemeToggle />
          </div>
        </header>

        {/* scrollable content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-[1200px] space-y-6">
            {/* CLAUDE ACCOUNTS */}
            <section>
              <h2 className="text-fg-muted mb-3 text-[11px] font-semibold tracking-wider uppercase">
                CLAUDE ACCOUNTS {CLAUDE_ACCOUNTS.length}
              </h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {CLAUDE_ACCOUNTS.map((acc) => (
                  <Card key={acc.id} padding="sm">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">active</Badge>
                        <span className="text-fg text-xs font-semibold">Claude {acc.id}</span>
                        <span className="text-fg-muted text-[10px]">{acc.email}</span>
                      </div>
                      <div className="text-fg-secondary text-[11px] font-medium">OK</div>
                      <UsageBar label="5H" value={acc.usage5h} />
                      <UsageBar label="7D" value={acc.usage7d} />
                      <div className="text-fg-muted flex items-center justify-between text-[10px]">
                        <span>reset 5h: {acc.reset5h}</span>
                        <span>updated {acc.updated}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* RESOURCE AVAILABILITY */}
            <section>
              <h2 className="text-fg-muted mb-3 text-[11px] font-semibold tracking-wider uppercase">
                RESOURCE AVAILABILITY (72H)
              </h2>
              <Card padding="sm">
                <ResourceChart />
              </Card>
            </section>

            {/* DEVICES */}
            <section>
              <h2 className="text-fg-muted mb-3 text-[11px] font-semibold tracking-wider uppercase">
                DEVICES {DEVICES.length}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {DEVICES.map((d) => (
                  <Card key={d.name} padding="sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">active</Badge>
                        <span className="text-fg text-xs font-bold">{d.name}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-fg-muted w-8 text-[10px]">CPU</span>
                          <div className="flex-1">
                            <Progress
                              size="sm"
                              value={d.cpu}
                              variant={d.cpu > 80 ? 'danger' : d.cpu > 50 ? 'warning' : 'default'}
                            />
                          </div>
                          <span className="text-fg-muted w-7 text-right text-[10px]">{d.cpu}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-fg-muted w-8 text-[10px]">MEM</span>
                          <div className="flex-1">
                            <Progress
                              size="sm"
                              value={d.mem}
                              variant={d.mem > 80 ? 'danger' : d.mem > 50 ? 'warning' : 'default'}
                            />
                          </div>
                          <span className="text-fg-muted w-7 text-right text-[10px]">{d.mem}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-fg-muted w-8 text-[10px]">DISK</span>
                          <div className="flex-1">
                            <Progress
                              size="sm"
                              value={d.disk}
                              variant={d.disk > 80 ? 'danger' : d.disk > 50 ? 'warning' : 'default'}
                            />
                          </div>
                          <span className="text-fg-muted w-7 text-right text-[10px]">
                            {d.disk}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* SERVICES */}
            <section>
              <h2 className="text-fg-muted mb-3 text-[11px] font-semibold tracking-wider uppercase">
                SERVICES {activeServicesCount}/{SERVICES.length}
              </h2>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Service
                        </th>
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Project
                        </th>
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Device
                        </th>
                        <th className="text-fg-muted px-3 py-2 text-right text-[10px] font-semibold uppercase">
                          Latency (ms)
                        </th>
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Domains
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICES.map((svc) => (
                        <tr
                          key={svc.name}
                          className="border-border hover:bg-bg-secondary border-b transition-colors last:border-b-0"
                        >
                          <td className="px-3 py-1.5">
                            <div className="flex items-center gap-2">
                              <Badge variant={svc.status === 'active' ? 'success' : 'danger'}>
                                {svc.status}
                              </Badge>
                              <span className="text-fg font-medium">{svc.name}</span>
                            </div>
                          </td>
                          <td className="text-fg-secondary px-3 py-1.5">{svc.project}</td>
                          <td className="text-fg-secondary px-3 py-1.5">{svc.device}</td>
                          <td className="text-fg-secondary px-3 py-1.5 text-right font-mono">
                            {svc.latency}
                          </td>
                          <td className="text-fg-muted px-3 py-1.5">{svc.domains}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            {/* DOMAINS */}
            <section>
              <h2 className="text-fg-muted mb-3 text-[11px] font-semibold tracking-wider uppercase">
                DOMAINS {DOMAINS.length}
              </h2>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Domain
                        </th>
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Registrar
                        </th>
                        <th className="text-fg-muted px-3 py-2 text-left text-[10px] font-semibold uppercase">
                          Expires
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {DOMAINS.map((d) => (
                        <tr
                          key={d.domain}
                          className="border-border hover:bg-bg-secondary border-b transition-colors last:border-b-0"
                        >
                          <td className="text-fg px-3 py-1.5 font-medium">{d.domain}</td>
                          <td className="text-fg-secondary px-3 py-1.5">{d.registrar}</td>
                          <td className="text-fg-muted px-3 py-1.5 font-mono">{d.expires}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>
          </div>
        </main>

        {/* status bar */}
        <footer className="border-border bg-bg border-t px-4 py-1.5">
          <div className="text-fg-muted text-[10px]">
            v8.3.8 · {DEVICES.length}/{DEVICES.length} devices · {activeServicesCount}/
            {SERVICES.length} services · {DOMAINS.length} domains · 26 certs
          </div>
        </footer>
      </div>
    </div>
  )
}
