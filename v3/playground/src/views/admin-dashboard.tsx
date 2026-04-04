import { useState } from 'react'
import { Badge, Button, IconButton } from '@goliapkg/gds/primitives'
import { Avatar, CountBadge } from '@goliapkg/gds/atoms'
import { Card, CardContent, Tabs } from '@goliapkg/gds/molecules'
import { Sparkline } from '@goliapkg/gds/charts'
import {
  Bell,
  Calendar,
  Users,
  FileText,
  FolderKanban,
  Clock,
  ClipboardList,
  Wallet,
  CreditCard,
  Receipt,
  Building2,
  GitBranch,
  BookOpen,
  Search,
  HardDrive,
  MessageSquare,
  Mail,
  Settings,
  LayoutDashboard,
  Home,
  ExternalLink,
} from 'lucide-react'
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// -- mock data --

const TREND_DATA = [
  { month: '2026-01', revenue: 475343, expense: 1974965, profit: -1499622 },
  { month: '2026-02', revenue: 475343, expense: 1974965, profit: -1499622 },
  { month: '2026-03', revenue: 475343, expense: 1974965, profit: -1499623 },
]

const SPARKLINE_REVENUE = [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 475343 }, { v: 475343 }, { v: 0 }]
const SPARKLINE_EXPENSE = [
  { v: 1974965 },
  { v: 1974965 },
  { v: 1974965 },
  { v: 1974965 },
  { v: 0 },
  { v: 0 },
]
const SPARKLINE_PER_CAPITA = [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }]

const YOY_TABLE = [
  { label: '累计收入', y2026: '¥1,426,029', y2025: '—', change: '—' },
  { label: '累计支出', y2026: '¥5,924,896', y2025: '—', change: '—' },
  { label: '累计净利', y2026: '¥-4,498,867', y2025: '—', change: '—' },
]

type SidebarEntry = {
  icon: React.ElementType
  label: string
  count?: number
  active?: boolean
  dot?: boolean
}

const SIDEBAR_SECTIONS: { title: string; items: SidebarEntry[] }[] = [
  {
    title: '我的',
    items: [{ icon: Home, label: '我的' }],
  },
  {
    title: '业务',
    items: [
      { icon: LayoutDashboard, label: '仪表盘', active: true },
      { icon: Calendar, label: '日历' },
      { icon: Users, label: '员工', count: 6 },
      { icon: FileText, label: '合同', count: 4 },
      { icon: FolderKanban, label: '项目' },
      { icon: Clock, label: '工时' },
      { icon: ClipboardList, label: '行政手续' },
    ],
  },
  {
    title: '财务',
    items: [
      { icon: Wallet, label: '薪资', count: 0 },
      { icon: CreditCard, label: '财务' },
      { icon: Receipt, label: '经费', count: 0 },
      { icon: Building2, label: '固定资产' },
    ],
  },
  {
    title: '开発',
    items: [
      { icon: GitBranch, label: 'Git' },
      { icon: BookOpen, label: '知识库' },
    ],
  },
  {
    title: '系统',
    items: [
      { icon: Search, label: '搜索' },
      { icon: HardDrive, label: '数字资产', count: 16 },
      { icon: MessageSquare, label: '消息' },
      { icon: Mail, label: '邮件', count: 10 },
      { icon: Settings, label: '设置', dot: true },
    ],
  },
]

const QUICK_LINKS = [
  { label: '项目', href: '#' },
  { label: '工时', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'freee', href: '#' },
  { label: '邮件', href: '#' },
]

// -- helpers --

function formatYen(n: number): string {
  if (n === 0) return '¥0'
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString('ja-JP')
  if (n < 0) return `¥-${formatted}`
  return `¥${formatted}`
}

// -- sub-components --

function Sidebar() {
  return (
    <aside className="border-border bg-bg-secondary flex w-[70px] shrink-0 flex-col border-r py-2">
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.title} className="mb-1">
          {SIDEBAR_SECTIONS.indexOf(section) > 0 && (
            <div className="border-border mx-2 my-1 border-t" />
          )}
          {section.items.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className={`relative mx-1 flex h-auto w-[62px] flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[10px] transition-colors ${
                  item.active
                    ? 'bg-accent/15 text-accent'
                    : 'text-fg-muted hover:bg-bg-tertiary hover:text-fg'
                }`}
              >
                <div className="relative">
                  <Icon size={16} />
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-accent text-on-accent absolute -top-1.5 -right-2.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-0.5 text-[8px] font-bold">
                      {item.count}
                    </span>
                  )}
                  {item.dot === true && (
                    <span className="bg-success absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full" />
                  )}
                </div>
                <span className="leading-tight select-none">{item.label}</span>
              </Button>
            )
          })}
        </div>
      ))}
    </aside>
  )
}

function TopBar() {
  const [activeTab, setActiveTab] = useState('admin')
  return (
    <div className="border-border bg-bg flex h-10 shrink-0 items-center border-b px-3">
      <Tabs
        tabs={[
          { id: 'devops', label: 'GOLIA DevOps' },
          { id: 'admin', label: 'GOLIA Admin' },
        ]}
        active={activeTab}
        onChange={setActiveTab}
        size="sm"
        variant="pills"
      />
    </div>
  )
}

function Toolbar() {
  return (
    <div className="border-border bg-bg flex h-10 shrink-0 items-center gap-3 border-b px-4">
      <Badge variant="success">生产环境</Badge>
      <div className="flex-1" />
      <div className="border-border text-fg-muted flex items-center gap-1 rounded-md border px-2 py-1 text-xs">
        <Search size={12} />
        <span>搜索 画</span>
      </div>
      <div className="flex items-center gap-2">
        <Avatar name="LI HAO" size="xs" />
        <span className="text-fg text-xs font-medium">LI HAO</span>
      </div>
      <IconButton variant="ghost" size="sm" icon={<Bell size={16} />} />
    </div>
  )
}

function StatsBar() {
  return (
    <div className="border-border bg-bg-secondary flex h-9 shrink-0 items-center gap-4 border-b px-4 text-xs">
      <div className="flex items-center gap-3">
        <span className="text-fg-muted">
          员工 <span className="text-fg font-semibold">6</span>
        </span>
        <span className="text-border">|</span>
        <span className="text-fg-muted">
          合同 <span className="text-fg font-semibold">4</span>
        </span>
        <span className="text-border">|</span>
        <span className="text-fg-muted">
          月收 <span className="text-fg font-semibold">¥1,200,000</span>
        </span>
        <span className="text-border">|</span>
        <span className="text-fg-muted">
          2026-04 <span className="text-fg font-semibold">¥0</span> /{' '}
          <span className="text-fg font-semibold">¥0</span>
        </span>
        <span className="text-border">|</span>
        <span className="text-fg-muted">
          YTD <span className="text-danger font-semibold">¥-4,498,867</span>
        </span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Tabs
          tabs={[
            { id: 'standard', label: '标准视图' },
            { id: 'admin', label: '管理视图' },
          ]}
          active="standard"
          onChange={() => {}}
          size="sm"
          variant="pills"
        />
      </div>
      <div className="flex items-center gap-2">
        {QUICK_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-accent hover:text-accent/80 flex items-center gap-0.5 text-xs"
          >
            {link.label}
            <ExternalLink size={10} />
          </a>
        ))}
      </div>
    </div>
  )
}

// -- metric card component --

type MetricCardProps = {
  title: string
  value: string
  sub?: string
  sub2?: string
  sparklineData?: Record<string, unknown>[]
  sparklineColor?: string
  valueColor?: string
}

function MetricCard({
  title,
  value,
  sub,
  sub2,
  sparklineData,
  sparklineColor,
  valueColor,
}: MetricCardProps) {
  return (
    <Card padding="sm" className="flex-1">
      <CardContent className="flex flex-col gap-1">
        <span className="text-fg-muted text-[11px]">{title}</span>
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className={`text-lg font-bold ${valueColor ?? 'text-fg'}`}>{value}</div>
            {sub !== undefined && <div className="text-fg-muted text-[10px]">{sub}</div>}
            {sub2 !== undefined && <div className="text-fg-muted text-[10px]">{sub2}</div>}
          </div>
          {sparklineData !== undefined && (
            <Sparkline
              data={sparklineData}
              dataKey="v"
              width={60}
              height={24}
              color={sparklineColor ?? 'var(--color-accent)'}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// -- section header --

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <h2 className="text-fg mt-4 mb-2 flex items-center gap-2 text-sm font-semibold first:mt-0">
      <span className="text-accent font-mono">{icon}</span>
      {title}
    </h2>
  )
}

// -- trend chart (multi-line with recharts) --

function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <ReLineChart data={TREND_DATA} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: 'var(--color-fg-muted)' }}
          tickFormatter={(v: string) => v.slice(5)}
          axisLine={{ stroke: 'var(--color-border)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'var(--color-fg-muted)' }}
          tickFormatter={(v: number) => {
            if (v === 0) return '0'
            if (Math.abs(v) >= 1000000) return `${(v / 1000000).toFixed(1)}M`
            return `${(v / 1000).toFixed(0)}K`
          }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            fontSize: 11,
            color: 'var(--color-fg)',
          }}
          formatter={(value: unknown) => formatYen(Number(value))}
          labelFormatter={(label: unknown) => String(label)}
        />
        <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-fg-muted)' }} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-info)"
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={false}
          name="収入"
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="var(--color-danger)"
          strokeWidth={2}
          dot={false}
          name="支出"
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="var(--color-success)"
          strokeWidth={2}
          dot={false}
          name="净利润"
        />
      </ReLineChart>
    </ResponsiveContainer>
  )
}

// -- yoy comparison table --

function YoyTable() {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-fg text-xs font-semibold">年度同比</h3>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="text-fg-muted border-border border-b text-left">
            <th className="pr-3 pb-1 font-medium">指标</th>
            <th className="pr-3 pb-1 font-medium">2026 YTD</th>
            <th className="pr-3 pb-1 font-medium">2025 YTD</th>
            <th className="pb-1 font-medium">变化</th>
          </tr>
        </thead>
        <tbody>
          {YOY_TABLE.map((row) => (
            <tr key={row.label} className="border-border border-b last:border-0">
              <td className="text-fg-muted py-1 pr-3">{row.label}</td>
              <td
                className={`py-1 pr-3 font-mono ${
                  row.y2026.includes('-') ? 'text-danger' : 'text-fg'
                }`}
              >
                {row.y2026}
              </td>
              <td className="text-fg-muted py-1 pr-3">{row.y2025}</td>
              <td className="text-fg-muted py-1">{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-fg-muted mt-2 text-[10px]">
        <CountBadge count={0} variant="accent" />{' '}
        <span className="ml-1">人员利用率 0.0%，计费 0h / 总计 0h</span>
      </div>
    </div>
  )
}

// -- main view --

export function AdminDashboardView() {
  return (
    <div className="bg-bg flex h-screen flex-col">
      <TopBar />
      <Toolbar />
      <StatsBar />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          {/* $ 財務指標 */}
          <SectionHeader icon="$" title="財務指標" />
          <div className="flex gap-3">
            <MetricCard
              title="月収入"
              value="¥0"
              sparklineData={SPARKLINE_REVENUE}
              sparklineColor="var(--color-info)"
            />
            <MetricCard
              title="月支出"
              value="¥0"
              sparklineData={SPARKLINE_EXPENSE}
              sparklineColor="var(--color-danger)"
            />
            <MetricCard title="净利润" value="¥0" sub="利润率 0.0%" />
            <MetricCard title="现金跑道" value="充裕" sub="月均支出 ¥1,974,965" />
            <MetricCard title="年合同额 (ACV)" value="¥14,400,000" sub="4 活跃合同" />
          </div>

          {/* @ 人力资源 */}
          <SectionHeader icon="@" title="人力资源" />
          <div className="flex gap-3">
            <MetricCard title="在职人数" value="6" sub="留存率 86%" />
            <MetricCard title="平均在职时长" value="11个月" />
            <MetricCard title="离职率" value="0.0%" sub="过去12月 0 人离职" />
            <MetricCard title="人员利用率" value="0.0%" sub="0h / 0h" />
          </div>

          {/* # 项目交付 */}
          <SectionHeader icon="#" title="项目交付" />
          <div className="flex gap-3">
            <MetricCard title="进行中项目" value="0" sub="完成率 0% (0/0)" />
            <MetricCard title="冲刺进度" value="—" sub="无已完成冲刺" />
            <MetricCard title="交付准时率" value="—" sub="无含截止日的已完成任务" />
            <MetricCard
              title="人均收入"
              value="¥0"
              sub="6 人"
              sparklineData={SPARKLINE_PER_CAPITA}
              sparklineColor="var(--color-accent)"
            />
          </div>

          {/* ~ 12 个月趋势 */}
          <SectionHeader icon="~" title="12 个月趋势" />
          <div className="flex gap-3">
            <Card padding="sm" className="flex-[2]">
              <CardContent>
                <TrendChart />
              </CardContent>
            </Card>
            <Card padding="sm" className="flex-1">
              <CardContent>
                <YoyTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
