import { Badge, Button } from '@goliapkg/gds/primitives'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

import { ThemeToggle } from '../components/theme-toggle'

// --- types ---

type AccountStatus = 'active' | 'limited'

type ClaudeAccount = {
  name: string
  email: string
  status: AccountStatus
  usage5h: number
  usage7d: number
  reset5h: string
  reset7d: string
  cost: number
  sessions: number
}

type ProjectUsage = {
  name: string
  tokens: string
  tokensRaw: number
  sessions: number
}

type DailyUsage = {
  date: string
  value: number
}

type AccountTrend = {
  name: string
  email: string
  color: string
  data: DailyUsage[]
}

// --- sidebar items ---

type SidebarItem = {
  label: string
  icon: string
  active?: boolean
  indent?: boolean
}

type SidebarSection = {
  title: string
  items: SidebarItem[]
}

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'DEVICES',
    items: [
      { label: 'HL-Desk', icon: '🖥' },
      { label: 'HL-Note', icon: '💻' },
      { label: 'TK-Desk', icon: '🖥' },
      { label: 'TK-Note', icon: '💻' },
      { label: 'Hetzner 1', icon: '⚡' },
      { label: 'Hetzner 2', icon: '⚡' },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Services', icon: '◎' },
      { label: 'Domains', icon: '◉' },
      { label: 'Certificates', icon: '🔒' },
    ],
  },
  {
    title: 'DEVELOPMENT',
    items: [
      { label: 'Projects', icon: '▦' },
      { label: 'CI / CD', icon: '⟳' },
    ],
  },
  {
    title: 'ANALYTICS',
    items: [
      { label: 'Claude Code', icon: '⬡', active: true },
      { label: 'Wiki', icon: '📖' },
    ],
  },
]

// --- mock data ---

const ACCOUNTS: ClaudeAccount[] = [
  {
    name: 'Claude 1',
    email: 'lihao@golia.jp',
    status: 'active',
    usage5h: 25,
    usage7d: 68,
    reset5h: '2026-04-04 17:14',
    reset7d: '2026-04-07 09:00',
    cost: 7174.5,
    sessions: 95,
  },
  {
    name: 'Claude 2',
    email: 'admin@golia.jp',
    status: 'active',
    usage5h: 1,
    usage7d: 24,
    reset5h: '2026-04-04 16:42',
    reset7d: '2026-04-08 12:00',
    cost: 787.1,
    sessions: 40,
  },
  {
    name: 'Claude 3',
    email: 'takagi@golia.jp',
    status: 'active',
    usage5h: 0,
    usage7d: 12,
    reset5h: '2026-04-04 15:58',
    reset7d: '2026-04-09 06:00',
    cost: 1544.9,
    sessions: 44,
  },
]

const PROJECT_USAGE: ProjectUsage[] = [
  { name: 'insight', tokens: '1.2M', tokensRaw: 1200000, sessions: 7 },
  { name: 'dada', tokens: '653K', tokensRaw: 653000, sessions: 6 },
  { name: 'goliajp', tokens: '561K', tokensRaw: 561000, sessions: 3 },
  { name: 'devops', tokens: '525K', tokensRaw: 525000, sessions: 25 },
  { name: 'gds', tokens: '256K', tokensRaw: 256000, sessions: 8 },
  { name: 'mailrs', tokens: '208K', tokensRaw: 208000, sessions: 3 },
  { name: 'claude-code-2.1.88', tokens: '199K', tokensRaw: 199000, sessions: 1 },
  { name: 'sisi', tokens: '174K', tokensRaw: 174000, sessions: 63 },
]

const ACCOUNT_USAGE = [
  { name: 'Claude 1', tokens: '2.9M', tokensRaw: 2900000, sessions: 95 },
  { name: 'Claude 3', tokens: '789K', tokensRaw: 789000, sessions: 44 },
  { name: 'Claude 2', tokens: '467K', tokensRaw: 467000, sessions: 40 },
]

// generate 30 days of trend data
function generateTrend(base: number, variance: number): DailyUsage[] {
  const days: DailyUsage[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(2026, 3, 4)
    d.setDate(d.getDate() - i)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const jitter = Math.random() * variance * 2 - variance
    days.push({
      date: `${month}-${day}`,
      value: Math.max(0, Math.min(100, base + jitter)),
    })
  }
  return days
}

const USAGE_TRENDS: AccountTrend[] = [
  {
    name: 'Claude 1',
    email: 'lihao@golia.jp',
    color: 'var(--color-accent)',
    data: generateTrend(28, 15),
  },
  {
    name: 'Claude 2',
    email: 'admin@golia.jp',
    color: 'var(--color-success)',
    data: generateTrend(24, 12),
  },
  {
    name: 'Claude 3',
    email: 'takagi@golia.jp',
    color: 'var(--color-info)',
    data: generateTrend(12, 8),
  },
]

// resource availability 72h data (3 accounts, each with availability timeline)
function generateAvailability(): { hour: string; values: number[] }[] {
  const result: { hour: string; values: number[] }[] = []
  for (let h = 0; h < 72; h++) {
    const d = new Date(2026, 3, 2, 0 + h)
    const label = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:00`
    result.push({
      hour: label,
      values: [
        Math.random() > 0.15 ? 100 : Math.floor(Math.random() * 60),
        Math.random() > 0.1 ? 100 : Math.floor(Math.random() * 40),
        Math.random() > 0.08 ? 100 : Math.floor(Math.random() * 50),
      ],
    })
  }
  return result
}

const AVAILABILITY = generateAvailability()

// --- sub-components ---

function Sidebar() {
  return (
    <aside className="border-border bg-bg flex w-52 shrink-0 flex-col border-r">
      {/* logo */}
      <div className="border-border flex h-12 items-center gap-2 border-b px-4">
        <div className="bg-accent flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white">
          G
        </div>
        <span className="text-fg text-xs font-bold tracking-tight">GOLIA DevOps</span>
      </div>

      {/* sections */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {SIDEBAR_SECTIONS.map((section) => (
          <div className="mb-3" key={section.title}>
            <div className="text-fg-muted mb-1 px-2 text-[9px] font-semibold tracking-widest">
              {section.title}
            </div>
            {section.items.map((item) => (
              <Button
                className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[11px] ${
                  item.active
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-fg-muted hover:text-fg hover:bg-fg/5'
                }`}
                key={item.label}
                size="sm"
                variant="ghost"
              >
                <span className="w-4 text-center text-[12px]">{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}

function TopBar({ clock }: { clock: string }) {
  return (
    <header className="border-border bg-bg flex h-10 shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center gap-1">
        <Button
          className="bg-accent/10 text-accent rounded px-2.5 py-1 text-[10px] font-semibold"
          variant="ghost"
        >
          GOLIA DevOps
        </Button>
        <Button
          className="text-fg-muted hover:text-fg rounded px-2.5 py-1 text-[10px] font-medium"
          variant="ghost"
        >
          GOLIA Admin
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-fg font-mono text-[11px] tabular-nums">{clock}</span>
        <ThemeToggle />
      </div>
    </header>
  )
}

function StatusBar() {
  return (
    <footer className="border-border bg-bg-secondary flex h-6 shrink-0 items-center justify-between border-t px-4 font-mono text-[10px]">
      <div className="text-fg-muted flex items-center gap-3">
        <span>v8.3.8</span>
        <span className="text-fg-muted">·</span>
        <span>6/6 devices</span>
        <span className="text-fg-muted">·</span>
        <span>17/18 services</span>
        <span className="text-fg-muted">·</span>
        <span>9 domains</span>
        <span className="text-fg-muted">·</span>
        <span>26 certs</span>
      </div>
      <span className="text-fg-muted">
        <span className="text-accent">©</span> collected 12:13:09
      </span>
    </footer>
  )
}

function AccountCard({ account }: { account: ClaudeAccount }) {
  return (
    <div className="border-border bg-bg-secondary rounded-lg border p-3">
      <div className="mb-2 flex items-center gap-2">
        <Badge className="text-[9px]" variant="success">
          {account.status}
        </Badge>
        <span className="text-fg text-xs font-semibold">{account.name}</span>
        <span className="text-fg-muted text-[10px]">{account.email}</span>
      </div>

      {/* 5h bar */}
      <div className="mb-1.5">
        <div className="mb-0.5 flex items-center justify-between">
          <span className="text-fg-muted text-[10px] font-medium">5H</span>
          <span className="text-fg font-mono text-[10px] tabular-nums">{account.usage5h}%</span>
        </div>
        <div className="bg-fg/10 h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full transition-all"
            style={{ width: `${account.usage5h}%` }}
          />
        </div>
        <div className="text-fg-muted mt-0.5 text-[9px]">5h reset: {account.reset5h}</div>
      </div>

      {/* 7d bar */}
      <div>
        <div className="mb-0.5 flex items-center justify-between">
          <span className="text-fg-muted text-[10px] font-medium">7D</span>
          <span className="text-fg font-mono text-[10px] tabular-nums">{account.usage7d}%</span>
        </div>
        <div className="bg-fg/10 h-1.5 w-full overflow-hidden rounded-full">
          <div
            className={`h-full rounded-full transition-all ${account.usage7d > 50 ? 'bg-warning' : 'bg-success'}`}
            style={{ width: `${account.usage7d}%` }}
          />
        </div>
        <div className="text-fg-muted mt-0.5 text-[9px]">7d reset: {account.reset7d}</div>
      </div>
    </div>
  )
}

function StatCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-border bg-bg-secondary rounded-lg border p-3">
      <div className="text-fg-muted mb-2 text-[9px] font-semibold tracking-widest">{title}</div>
      {children}
    </div>
  )
}

function HorizontalBarChart({
  data,
  maxValue,
}: {
  data: { label: string; value: number; meta: string }[]
  maxValue: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {data.map((item) => (
        <div className="flex items-center gap-2" key={item.label}>
          <span className="text-fg-muted w-36 shrink-0 truncate text-right font-mono text-[10px]">
            {item.label}
          </span>
          <div className="bg-fg/5 h-4 flex-1 overflow-hidden rounded">
            <div
              className="bg-accent/30 flex h-full items-center rounded"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            >
              <span className="text-fg truncate px-1.5 font-mono text-[9px] font-medium">
                {item.meta}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TrendLine({ trend, height = 48 }: { trend: AccountTrend; height?: number }) {
  const { data, color } = trend
  const maxVal = 100
  const w = data.length * 12
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w
      const y = height - (d.value / maxVal) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="border-border border-b pb-2 last:border-b-0 last:pb-0">
      <div className="mb-1 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-fg text-[10px] font-semibold">{trend.name}</span>
        <span className="text-fg-muted text-[10px]">{trend.email}</span>
      </div>
      <div className="overflow-x-auto">
        <svg className="block" height={height + 16} viewBox={`0 0 ${w} ${height + 16}`} width={w}>
          {/* grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = height - (pct / maxVal) * height
            return (
              <line
                key={pct}
                stroke="currentColor"
                strokeOpacity={0.06}
                x1={0}
                x2={w}
                y1={y}
                y2={y}
              />
            )
          })}
          {/* line */}
          <polyline fill="none" points={points} stroke={color} strokeWidth={1.5} />
          {/* x-axis labels (first, mid, last) */}
          {[0, Math.floor(data.length / 2), data.length - 1].map((idx) => (
            <text
              className="text-fg-muted"
              fill="currentColor"
              fillOpacity={0.4}
              fontSize={8}
              key={idx}
              textAnchor="middle"
              x={(idx / (data.length - 1)) * w}
              y={height + 12}
            >
              {data[idx].date}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}

function AvailabilityTimeline() {
  const accountColors = ['bg-accent', 'bg-success', 'bg-info']
  const accountNames = ['Claude 1', 'Claude 2', 'Claude 3']

  return (
    <div className="flex flex-col gap-2">
      {accountNames.map((name, ai) => (
        <div key={name}>
          <div className="text-fg-muted mb-0.5 text-[9px] font-medium">{name}</div>
          <div className="flex gap-[1px]">
            {AVAILABILITY.map((slot, i) => {
              const val = slot.values[ai]
              const opacity = val === 100 ? 'opacity-80' : val > 50 ? 'opacity-40' : 'opacity-15'
              return (
                <div
                  className={`h-3 w-1 rounded-[1px] ${accountColors[ai]} ${opacity}`}
                  key={i}
                  title={`${slot.hour}: ${val}%`}
                />
              )
            })}
          </div>
        </div>
      ))}
      {/* x-axis labels */}
      <div className="text-fg-muted flex justify-between font-mono text-[8px]">
        <span>{AVAILABILITY[0].hour}</span>
        <span>{AVAILABILITY[Math.floor(AVAILABILITY.length / 2)].hour}</span>
        <span>{AVAILABILITY[AVAILABILITY.length - 1].hour}</span>
      </div>
    </div>
  )
}

// --- main view ---

export function DevOpsAnalyticsView() {
  const [clock, setClock] = useState('12:14:00')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setClock(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const projectMax = Math.max(...PROJECT_USAGE.map((p) => p.tokensRaw))
  const accountMax = Math.max(...ACCOUNT_USAGE.map((a) => a.tokensRaw))

  return (
    <div className="bg-bg flex h-full">
      {/* sidebar */}
      <Sidebar />

      {/* main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar clock={clock} />

        {/* content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* breadcrumb + title */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-fg text-sm font-bold">Claude Code Analytics</h1>
            <Link className="text-accent text-[11px] font-medium hover:underline" to="/devops">
              ← Overview
            </Link>
          </div>

          {/* accounts */}
          <section className="mb-4">
            <div className="text-fg-muted mb-2 text-[9px] font-semibold tracking-widest">
              CLAUDE ACCOUNTS
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {ACCOUNTS.map((acc) => (
                <AccountCard account={acc} key={acc.name} />
              ))}
            </div>
          </section>

          {/* KPI cards row */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* monthly ROI */}
            <StatCard title="MONTHLY ROI">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted text-[10px]">Subscription</span>
                  <span className="text-fg font-mono text-xs font-semibold">$600</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted text-[10px]">API equivalent</span>
                  <span className="text-fg font-mono text-xs font-semibold">$47,533</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted text-[10px]">Savings</span>
                  <span className="text-success font-mono text-xs font-bold">+99%</span>
                </div>
                <div className="text-fg-muted mt-1 text-[9px] italic">
                  based on 6d data + 30d projection
                </div>
              </div>
            </StatCard>

            {/* efficiency */}
            <StatCard title="EFFICIENCY">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-fg-muted text-[9px]">Tokens/min</div>
                  <div className="text-fg font-mono text-sm font-bold">0.2k</div>
                </div>
                <div>
                  <div className="text-fg-muted text-[9px]">Avg session</div>
                  <div className="text-fg font-mono text-sm font-bold">21k</div>
                </div>
                <div>
                  <div className="text-fg-muted text-[9px]">Cache hit rate</div>
                  <div className="text-fg font-mono text-sm font-bold">99%</div>
                </div>
                <div>
                  <div className="text-fg-muted text-[9px]">Sessions</div>
                  <div className="text-fg font-mono text-sm font-bold">179</div>
                </div>
              </div>
            </StatCard>

            {/* rate limit impact */}
            <StatCard title="RATE LIMIT IMPACT">
              <div className="flex flex-col items-center py-2">
                <div className="bg-success/15 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                  <svg
                    className="text-success h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-fg-muted mb-0.5 text-[10px]">samples limited (30D)</span>
                <span className="text-success text-[11px] font-semibold">
                  no rate limiting detected
                </span>
              </div>
            </StatCard>

            {/* cost per account */}
            <StatCard title="COST PER ACCOUNT">
              <div className="flex flex-col gap-1.5">
                {ACCOUNTS.sort((a, b) => b.cost - a.cost).map((acc) => (
                  <div className="flex items-center justify-between" key={acc.name}>
                    <span className="text-fg text-[11px] font-medium">{acc.name}</span>
                    <span className="text-fg-muted font-mono text-[10px] tabular-nums">
                      ${acc.cost.toLocaleString()} / {acc.sessions}s
                    </span>
                  </div>
                ))}
              </div>
            </StatCard>
          </div>

          {/* resource availability */}
          <section className="mb-4">
            <StatCard title="RESOURCE AVAILABILITY (72H)">
              <AvailabilityTimeline />
            </StatCard>
          </section>

          {/* 30D usage trend */}
          <section className="mb-4">
            <StatCard title="30D USAGE TREND (DAILY MAX 5H %)">
              <div className="flex flex-col gap-3">
                {USAGE_TRENDS.map((trend) => (
                  <TrendLine key={trend.name} trend={trend} />
                ))}
              </div>
            </StatCard>
          </section>

          {/* bottom row: project + account usage */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {/* token usage by project */}
            <StatCard title="TOKEN USAGE BY PROJECT (30D)">
              <HorizontalBarChart
                data={PROJECT_USAGE.map((p) => ({
                  label: p.name,
                  value: p.tokensRaw,
                  meta: `${p.tokens} · ${p.sessions} sessions`,
                }))}
                maxValue={projectMax}
              />
            </StatCard>

            {/* token usage by account */}
            <StatCard title="TOKEN USAGE BY ACCOUNT (30D)">
              <HorizontalBarChart
                data={ACCOUNT_USAGE.map((a) => ({
                  label: a.name,
                  value: a.tokensRaw,
                  meta: `${a.tokens} · ${a.sessions} sessions`,
                }))}
                maxValue={accountMax}
              />
            </StatCard>
          </div>
        </main>

        <StatusBar />
      </div>
    </div>
  )
}
