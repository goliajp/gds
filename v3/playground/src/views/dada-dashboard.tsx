import { Badge, Progress } from '@goliapkg/gds/primitives'
import { ProgressRing } from '@goliapkg/gds/atoms'
import { Card, CardContent, CardHeader, DataCard, Tabs } from '@goliapkg/gds/molecules'
import { PieChart, BarChart } from '@goliapkg/gds/charts'
import { useState } from 'react'

import { ThemeToggle } from '../components/theme-toggle'

// --- types ---

type VersionStatus = 'done' | 'active' | 'planned'

type Version = {
  id: string
  title: string
  status: VersionStatus
  goals?: string
  subs?: number
}

type SubVersion = {
  id: string
  parent: string
  topic: string
  goals: number | null
  experiments: number | null
  progress: number
  status: '完成' | '进行中' | '计划'
}

type GoalItem = {
  id: string
  label: string
  done: boolean
}

type IncrementalLevel = {
  level: number
  name: string
  done: boolean
}

// --- mock data ---

const VERSIONS: Version[] = [
  { id: 'v1', title: '数据模型', status: 'done' },
  { id: 'v2', title: '仿生意识', status: 'done' },
  { id: 'v3', title: '工具调用 + 语义记忆', status: 'done' },
  { id: 'v4', title: '统一事件模型', status: 'done' },
  { id: 'v5', title: '增量学习', status: 'done' },
  { id: 'v6', title: '自我身份', status: 'done' },
  { id: 'v7', title: '权限行使', status: 'done', goals: '15/15' },
  { id: 'v8', title: '渠道接入', status: 'active', goals: '14/21', subs: 5 },
  { id: 'v9', title: '多渠道 + 上下文', status: 'planned', subs: 4 },
  { id: 'v10', title: '自主存在', status: 'planned' },
]

const PIE_DATA = [
  { name: '完成', value: 7, fill: 'var(--color-success)' },
  { name: '进行中', value: 1, fill: 'var(--color-accent)' },
  { name: '计划', value: 2, fill: 'var(--color-fg-muted)' },
]

const GOALS_BAR_DATA = [
  { version: 'v7', goals: 15 },
  { version: 'v8.2', goals: 11 },
  { version: 'v8.3', goals: 5 },
  { version: 'incremental-learning', goals: 3 },
]

const INCREMENTAL_LEVELS: IncrementalLevel[] = [
  { level: 1, name: 'Lv.1 纠错感知', done: true },
  { level: 2, name: 'Lv.2 增量质量追踪', done: true },
  { level: 3, name: 'Lv.3 纠错自动应用', done: true },
  { level: 4, name: 'Lv.4 自适应提取', done: false },
  { level: 5, name: 'Lv.5 行为偏好学习', done: false },
  { level: 6, name: 'Lv.6 知识自省验证', done: false },
]

const CURRENT_GOALS: GoalItem[] = [
  { id: 'EXP-030', label: 'IM 对话质量 — 20 轮测试对话，流畅度评分 ≥ 4/5', done: false },
  { id: 'EXP-031', label: '消息收发延迟 — P95 < 2s', done: true },
  { id: 'EXP-032', label: '跨 session 记忆一致性 — 10 组上下文回溯测试', done: false },
  { id: 'EXP-033', label: '多轮意图追踪 — 5 轮以上意图保持率 ≥ 80%', done: false },
  { id: 'EXP-034', label: '情绪感知回应 — 情绪标注准确率 ≥ 70%', done: false },
  { id: 'EXP-035', label: '工具调用成功率 — 自动选择正确工具 ≥ 90%', done: true },
  { id: 'EXP-036', label: '长文本摘要质量 — ROUGE-L ≥ 0.45', done: false },
  { id: 'EXP-037', label: '权限边界测试 — 越权尝试拦截率 100%', done: true },
  { id: 'EXP-038', label: '并发消息处理 — 10 并发无丢失无乱序', done: false },
  { id: 'EXP-039', label: '渠道切换连续性 — IM → Email → IM 上下文不丢失', done: false },
]

const SUB_VERSIONS: SubVersion[] = [
  {
    id: 'v8.0',
    parent: 'v8',
    topic: '基础收发',
    goals: null,
    experiments: null,
    progress: 100,
    status: '完成',
  },
  {
    id: 'v8.1',
    parent: 'v8',
    topic: '消息格式化',
    goals: null,
    experiments: null,
    progress: 100,
    status: '完成',
  },
  {
    id: 'v8.2',
    parent: 'v8',
    topic: '双向同步',
    goals: 11,
    experiments: 4,
    progress: 100,
    status: '完成',
  },
  {
    id: 'v8.3',
    parent: 'v8',
    topic: '全面考核',
    goals: 10,
    experiments: 8,
    progress: 30,
    status: '进行中',
  },
  {
    id: 'v8.4',
    parent: 'v8',
    topic: '渠道扩展',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
  {
    id: 'v9.0',
    parent: 'v9',
    topic: '多渠道路由',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
  {
    id: 'v9.1',
    parent: 'v9',
    topic: '上下文融合',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
  {
    id: 'v9.2',
    parent: 'v9',
    topic: '优先级排序',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
  {
    id: 'v9.3',
    parent: 'v9',
    topic: '渠道偏好学习',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
  {
    id: 'v10.0',
    parent: 'v10',
    topic: '自主决策框架',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
  {
    id: 'v10.1',
    parent: 'v10',
    topic: '自主存在验证',
    goals: null,
    experiments: null,
    progress: 0,
    status: '计划',
  },
]

const IDENTITY_TIMELINE = [
  { version: 'v6', title: '自我身份', status: 'done' as const },
  { version: 'v7', title: '权限行使', status: 'done' as const },
  { version: 'v8', title: '渠道接入', status: 'active' as const },
  { version: 'v9', title: '多渠道 + 上下文', status: 'planned' as const },
  { version: 'v10', title: '自主存在', status: 'planned' as const },
]

const NAV_TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'experiments', label: 'Experiments' },
]

// --- helpers ---

const STATUS_DOT: Record<VersionStatus, string> = {
  done: 'bg-success',
  active: 'bg-accent',
  planned: 'bg-fg-muted/40',
}

const TABLE_STATUS_VARIANT: Record<string, 'success' | 'info' | 'default'> = {
  完成: 'success',
  进行中: 'info',
  计划: 'default',
}

// --- component ---

export function DadaDashboardView() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const completedGoals = CURRENT_GOALS.filter((g) => g.done).length

  return (
    <div className="bg-bg flex h-full flex-col overflow-hidden">
      {/* top bar */}
      <header className="border-border flex shrink-0 items-center justify-between border-b px-5 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-accent flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white">
              D
            </div>
            <span className="text-fg text-sm font-bold">Dada Lab</span>
            <span className="text-fg-muted text-xs">PM Center</span>
          </div>
          <Tabs
            active={activeTab}
            onChange={setActiveTab}
            size="sm"
            tabs={NAV_TABS}
            variant="underline"
          />
        </div>
        <ThemeToggle />
      </header>

      {/* scrollable content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          {/* page title */}
          <div className="mb-6">
            <h1 className="text-fg text-lg font-bold">Dada Research Dashboard</h1>
            <p className="text-fg-muted text-xs">Project tracking and analytics for GOLIA Lab</p>
          </div>

          {/* stats row */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <DataCard
              footer={<Progress size="sm" value={70} variant="success" />}
              title="大版本"
              value="7/10"
            />
            <DataCard
              footer={<span className="text-fg-muted text-[10px]">1 active · 9 planned</span>}
              title="子版本"
              value="3/13"
            />
            <DataCard
              footer={<Progress size="sm" value={76} variant="success" />}
              title="GOALS 完成"
              value="32/42"
            />
            <DataCard
              footer={<span className="text-fg-muted text-[10px]">across 3 versions</span>}
              title="实验记录"
              value="12"
            />
            <DataCard
              footer={<span className="text-fg-muted text-[10px]">of v10</span>}
              title="项目时长"
              value="v8"
            />
            <DataCard
              footer={<span className="text-fg-muted text-[10px]">v8 active</span>}
              title="研究主线"
              value="渠道接入"
            />
          </div>

          {/* 4-panel grid */}
          <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-4">
            {/* donut chart - version progress */}
            <Card>
              <CardHeader title="版本进度" />
              <CardContent>
                <PieChart
                  colors={['var(--color-success)', 'var(--color-accent)', 'var(--color-fg-muted)']}
                  data={PIE_DATA}
                  dataKey="value"
                  height={180}
                  innerRadius={50}
                  nameKey="name"
                />
                <p className="text-fg-muted mt-2 text-center text-[11px]">
                  <span className="text-success">完成 7</span>
                  {' · '}
                  <span className="text-accent">进行中 1</span>
                  {' · '}
                  <span className="text-fg-muted">计划 2</span>
                </p>
              </CardContent>
            </Card>

            {/* bar chart - goals per version */}
            <Card>
              <CardHeader title="Goals 完成度" />
              <CardContent>
                <BarChart
                  color="var(--color-accent)"
                  data={GOALS_BAR_DATA}
                  dataKey="goals"
                  height={200}
                  xKey="version"
                />
              </CardContent>
            </Card>

            {/* version overview list */}
            <Card>
              <CardHeader title="版本总览" />
              <CardContent className="space-y-1.5">
                {VERSIONS.map((v) => (
                  <div className="flex items-center gap-2 text-[11px]" key={v.id}>
                    <div className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[v.status]}`} />
                    <span className="text-fg-muted w-6 shrink-0 font-mono">{v.id}</span>
                    <span className="text-fg flex-1 truncate">{v.title}</span>
                    {v.goals !== undefined && (
                      <span className="text-fg-muted shrink-0 font-mono text-[10px]">
                        {v.goals}
                        {v.subs !== undefined && `, ${v.subs} sub`}
                      </span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* incremental learning levels */}
            <Card>
              <CardHeader title="增量学习等级" />
              <CardContent className="space-y-2">
                {INCREMENTAL_LEVELS.map((lv) => (
                  <div className="flex items-center gap-2 text-[11px]" key={lv.level}>
                    <span className="text-fg-muted w-3 shrink-0 text-right font-mono">
                      {lv.level}
                    </span>
                    {lv.done ? (
                      <svg
                        className="text-success h-3.5 w-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <div className="border-border h-3.5 w-3.5 shrink-0 rounded border" />
                    )}
                    <span className={lv.done ? 'text-fg' : 'text-fg-muted'}>{lv.name}</span>
                  </div>
                ))}
                <div className="border-border mt-3 border-t pt-3">
                  <p className="text-fg-muted mb-1.5 text-[10px]">3/6 levels completed</p>
                  <Progress size="sm" value={50} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* current task section */}
          <Card className="mb-6">
            <CardHeader
              action={
                <div className="flex items-center gap-3">
                  <ProgressRing size={40} strokeWidth={3} value={completedGoals * 10} />
                  <span className="text-fg-muted text-xs">
                    {completedGoals}/{CURRENT_GOALS.length} goals
                  </span>
                </div>
              }
              title="v8.3 全面考核 — Dada 体检报告"
            >
              <Badge className="mr-2" variant="info">
                进行中
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {CURRENT_GOALS.map((goal) => (
                  <div
                    className={`flex items-start gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                      goal.done ? 'bg-success/5' : 'hover:bg-fg/[0.03]'
                    }`}
                    key={goal.id}
                  >
                    {goal.done ? (
                      <svg
                        className="text-success mt-0.5 h-3.5 w-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <div className="border-border mt-0.5 h-3.5 w-3.5 shrink-0 rounded border" />
                    )}
                    <div className="flex-1">
                      <span className="text-accent mr-1.5 font-mono text-[10px]">{goal.id}</span>
                      <span className={goal.done ? 'text-fg-muted line-through' : 'text-fg'}>
                        {goal.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* sub-versions data table */}
          <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-4">
            <Card className="lg:col-span-3">
              <CardHeader title="全部子版本" />
              <CardContent className="overflow-x-auto">
                <table className="w-full border-collapse text-[11px]">
                  <thead>
                    <tr className="border-border text-fg-muted border-b">
                      <th className="px-2 py-1.5 text-left font-medium">ID</th>
                      <th className="px-2 py-1.5 text-left font-medium">PARENT</th>
                      <th className="px-2 py-1.5 text-left font-medium">TOPIC</th>
                      <th className="px-2 py-1.5 text-right font-medium">GOALS</th>
                      <th className="px-2 py-1.5 text-right font-medium">EXP</th>
                      <th className="min-w-[100px] px-2 py-1.5 text-left font-medium">PROGRESS</th>
                      <th className="px-2 py-1.5 text-left font-medium">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUB_VERSIONS.map((sv) => (
                      <tr
                        className="border-border hover:bg-fg/[0.03] border-b transition-colors"
                        key={sv.id}
                      >
                        <td className="text-accent px-2 py-1.5 font-mono whitespace-nowrap">
                          {sv.id}
                        </td>
                        <td className="text-fg-muted px-2 py-1.5 font-mono whitespace-nowrap">
                          {sv.parent}
                        </td>
                        <td className="text-fg px-2 py-1.5 whitespace-nowrap">{sv.topic}</td>
                        <td className="text-fg-muted px-2 py-1.5 text-right whitespace-nowrap tabular-nums">
                          {sv.goals ?? '—'}
                        </td>
                        <td className="text-fg-muted px-2 py-1.5 text-right whitespace-nowrap tabular-nums">
                          {sv.experiments ?? '—'}
                        </td>
                        <td className="px-2 py-1.5">
                          <div className="flex items-center gap-2">
                            <Progress
                              className="flex-1"
                              size="sm"
                              value={sv.progress}
                              variant={
                                sv.progress === 100
                                  ? 'success'
                                  : sv.progress > 0
                                    ? 'default'
                                    : 'default'
                              }
                            />
                            <span className="text-fg-muted w-7 text-right font-mono text-[10px] tabular-nums">
                              {sv.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap">
                          <Badge variant={TABLE_STATUS_VARIANT[sv.status] ?? 'default'}>
                            {sv.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* identity & permission timeline */}
            <Card>
              <CardHeader title="身份与权限主线" />
              <CardContent>
                <div className="relative space-y-4 pl-4">
                  {/* timeline line */}
                  <div className="bg-border absolute top-1 bottom-2 left-[5px] w-px" />
                  {IDENTITY_TIMELINE.map((item) => (
                    <div className="relative flex items-center gap-3" key={item.version}>
                      {/* dot */}
                      <div
                        className={`absolute -left-4 h-2.5 w-2.5 rounded-full border-2 ${
                          item.status === 'done'
                            ? 'border-success bg-success'
                            : item.status === 'active'
                              ? 'border-accent bg-accent'
                              : 'border-border bg-bg-secondary'
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="text-fg-muted font-mono text-[10px]">{item.version}</span>
                        <span
                          className={`text-[11px] ${
                            item.status === 'done'
                              ? 'text-fg'
                              : item.status === 'active'
                                ? 'text-accent font-medium'
                                : 'text-fg-muted'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      {item.status === 'done' && (
                        <svg
                          className="text-success ml-auto h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* footer */}
          <footer className="text-fg-muted border-border border-t py-4 text-center text-[10px]">
            GOLIA Lab · Dada Research Project
          </footer>
        </div>
      </main>
    </div>
  )
}
