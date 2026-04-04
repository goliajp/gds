import { Badge, Button } from '@goliapkg/gds/primitives'
import { useState } from 'react'

// --- types ---

type CycleType = 'micro' | 'explore' | 'reflect' | 'deep' | 'think' | 'learn'
type Status = 'ok' | 'skip' | 'err'

type AuditEntry = {
  id: number
  date: string
  time: string
  type: CycleType
  status: Status
  duration: string
  cost: string
  input: string
  summary: string
  tags: string[]
  files: string[]
}

// --- constants ---

const CYCLE_TYPES = [
  'ALL',
  'MICRO',
  'EXPLORE',
  'REFLECT',
  'DEEP',
  'THINK',
  'LEARN',
  'ERR',
  'SKIP',
] as const

const TYPE_COLORS: Record<CycleType, string> = {
  micro: 'bg-accent/20 text-accent border-accent/30',
  explore: 'bg-success/20 text-success border-success/30',
  reflect: 'bg-warning/20 text-warning border-warning/30',
  deep: 'bg-danger/20 text-danger border-danger/30',
  think: 'bg-info/20 text-info border-info/30',
  learn: 'bg-palette-5/20 text-palette-5 border-palette-5/30',
}

const STATUS_COLORS: Record<Status, string> = {
  ok: 'text-success',
  skip: 'text-fg-muted',
  err: 'text-danger',
}

// heatmap square colors by intensity
const HEAT_COLORS = [
  'bg-fg/5',
  'bg-accent/20',
  'bg-accent/35',
  'bg-accent/50',
  'bg-success/30',
  'bg-success/50',
  'bg-warning/40',
  'bg-danger/40',
]

// --- mock data ---

const MOCK_ENTRIES: AuditEntry[] = [
  {
    id: 1,
    date: '2026-04-04',
    time: '11:31:11',
    type: 'micro',
    status: 'ok',
    duration: '4.6s',
    cost: '$0.003',
    input: 'ctx',
    summary: '上下文窗口检查 — 当前 token 用量 42k/200k，剩余容量充足，无需压缩',
    tags: ['context-mgmt'],
    files: [],
  },
  {
    id: 2,
    date: '2026-04-04',
    time: '11:28:45',
    type: 'explore',
    status: 'ok',
    duration: '1.2m',
    cost: '$0.018',
    input: 'code',
    summary:
      '探索 src/l5-organisms/data-table 目录结构，发现 column-def 与 row-selection 存在循环引用风险',
    tags: ['architecture', 'data-table'],
    files: ['src/l5-organisms/data-table/index.ts', 'src/l5-organisms/data-table/column-def.ts'],
  },
  {
    id: 3,
    date: '2026-04-04',
    time: '11:25:03',
    type: 'reflect',
    status: 'ok',
    duration: '2.1m',
    cost: '$0.024',
    input: 'decision',
    summary:
      '反思：是否应该将 EmailComposer 从 L5 提升到 L7？结论：保持 L5，因为它不涉及页面级布局编排',
    tags: ['layer-decision'],
    files: ['src/l5-organisms/email-composer.tsx'],
  },
  {
    id: 4,
    date: '2026-04-04',
    time: '11:21:37',
    type: 'deep',
    status: 'ok',
    duration: '3.2m',
    cost: '$0.041',
    input: 'analysis',
    summary:
      '深度分析 CVA variant 组合爆炸问题 — Button 当前有 5 variant x 4 size x 3 state = 60 种组合，测试覆盖率 87%，建议增加 compound variant 测试',
    tags: ['testing', 'cva'],
    files: ['src/l2-primitives/button.tsx', 'src/l2-primitives/__tests__/button.test.tsx'],
  },
  {
    id: 5,
    date: '2026-04-04',
    time: '11:18:22',
    type: 'micro',
    status: 'ok',
    duration: '2.1s',
    cost: '$0.001',
    input: 'fmt',
    summary: 'prettier 格式化 3 个文件，修复尾逗号和缩进问题',
    tags: ['formatting'],
    files: [],
  },
  {
    id: 6,
    date: '2026-04-04',
    time: '11:15:08',
    type: 'learn',
    status: 'ok',
    duration: '1.8m',
    cost: '$0.022',
    input: 'paper',
    summary:
      '学习 continual learning agents 论文笔记 — elastic weight consolidation (EWC) 可防止灾难性遗忘，适用于增量知识更新场景',
    tags: ['ml-theory'],
    files: ['facts/continual-learning-agents.md'],
  },
  {
    id: 7,
    date: '2026-04-04',
    time: '11:11:55',
    type: 'micro',
    status: 'skip',
    duration: '0.8s',
    cost: '$0.000',
    input: 'lint',
    summary: '跳过 lint — 无变更文件',
    tags: [],
    files: [],
  },
  {
    id: 8,
    date: '2026-04-04',
    time: '11:08:41',
    type: 'explore',
    status: 'ok',
    duration: '52s',
    cost: '$0.009',
    input: 'deps',
    summary: '扫描 package.json 依赖版本 — recharts 2.15 有 SSR hydration bug，建议锁定 2.14.3',
    tags: ['dependencies', 'recharts'],
    files: ['package.json'],
  },
  {
    id: 9,
    date: '2026-04-04',
    time: '11:04:19',
    type: 'think',
    status: 'ok',
    duration: '1.4m',
    cost: '$0.016',
    input: 'design',
    summary:
      '思考 contextual depth system 的 CSS 变量降级策略 — 当嵌套层级 > 3 时是否应该 clamp 而非继续递减？可能导致文字过小',
    tags: ['depth-system', 'css'],
    files: ['src/l0-tokens/depth.css'],
  },
  {
    id: 10,
    date: '2026-04-04',
    time: '11:01:02',
    type: 'micro',
    status: 'ok',
    duration: '3.8s',
    cost: '$0.002',
    input: 'test',
    summary: '运行 vitest — 444 files, 3771 tests, 全部通过，耗时 8.2s',
    tags: ['testing'],
    files: [],
  },
  {
    id: 11,
    date: '2026-04-04',
    time: '10:57:33',
    type: 'reflect',
    status: 'ok',
    duration: '2.8m',
    cost: '$0.031',
    input: 'review',
    summary:
      '回顾今日决策链：anti-corruption layer 设计模式被验证有效 — tiptap 升级 v3 时只需修改 utils/tiptap.ts，350+ 组件文件零改动',
    tags: ['anti-corruption', 'architecture'],
    files: ['src/utils/tiptap.ts'],
  },
  {
    id: 12,
    date: '2026-04-04',
    time: '10:53:15',
    type: 'deep',
    status: 'err',
    duration: '4.1m',
    cost: '$0.048',
    input: 'perf',
    summary:
      '性能分析失败 — Chrome DevTools profiler 在 headless 模式下无法采集 GPU 指标，需要切换到有头浏览器模式',
    tags: ['performance', 'tooling'],
    files: [],
  },
  {
    id: 13,
    date: '2026-04-04',
    time: '10:48:52',
    type: 'explore',
    status: 'ok',
    duration: '1.5m',
    cost: '$0.014',
    input: 'code',
    summary:
      '探索 glass morphism 在 Safari 17.4 的 backdrop-filter 渲染差异 — 确认 -webkit-backdrop-filter 仍需要 prefix',
    tags: ['glass', 'safari', 'compat'],
    files: ['src/l0-tokens/glass.css'],
  },
  {
    id: 14,
    date: '2026-04-04',
    time: '10:44:28',
    type: 'micro',
    status: 'ok',
    duration: '1.9s',
    cost: '$0.001',
    input: 'git',
    summary: 'git status — develop branch, clean working tree, 4 commits ahead of origin',
    tags: ['git'],
    files: [],
  },
  {
    id: 15,
    date: '2026-04-04',
    time: '10:41:07',
    type: 'learn',
    status: 'ok',
    duration: '2.3m',
    cost: '$0.027',
    input: 'doc',
    summary:
      '学习 Tailwind v4 的 @theme 指令语义 — 与 v3 的 theme.extend 完全不同，需要在 CSS 文件内声明而非 JS config',
    tags: ['tailwind-v4', 'migration'],
    files: ['docs/css-integration.md'],
  },
  {
    id: 16,
    date: '2026-04-04',
    time: '10:37:44',
    type: 'think',
    status: 'ok',
    duration: '58s',
    cost: '$0.008',
    input: 'plan',
    summary:
      '规划下午任务：1) 完成 DataTable virtualization  2) 修复 Toast z-index 层叠  3) 写 AppShell responsive 测试',
    tags: ['planning'],
    files: [],
  },
  {
    id: 17,
    date: '2026-04-04',
    time: '10:33:21',
    type: 'reflect',
    status: 'ok',
    duration: '1.6m',
    cost: '$0.019',
    input: 'pattern',
    summary:
      '反思 forwardRef 使用模式 — React 19 已原生支持 ref as prop，但为向后兼容 v18 consumer 仍保留 forwardRef wrapper',
    tags: ['react-19', 'compat'],
    files: [],
  },
  {
    id: 18,
    date: '2026-04-04',
    time: '10:29:58',
    type: 'micro',
    status: 'ok',
    duration: '5.2s',
    cost: '$0.004',
    input: 'build',
    summary: 'vite build 完成 — 产物 824KB gzipped，tree-shaking 正常，无 side-effect 泄漏',
    tags: ['build'],
    files: ['dist/'],
  },
]

// generate heatmap data (random intensities for ~60 squares)
const HEATMAP = Array.from({ length: 62 }, () => Math.floor(Math.random() * HEAT_COLORS.length))

// --- derived stats ---

function computeStats(entries: AuditEntry[]) {
  const total = entries.length
  const byType = (t: CycleType) => entries.filter((e) => e.type === t).length
  return {
    total,
    micro: byType('micro'),
    explore: byType('explore'),
    reflect: byType('reflect'),
    deep: byType('deep'),
    think: byType('think'),
    learn: byType('learn'),
  }
}

// --- component ---

export function AuditLogView() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')

  const filtered =
    activeFilter === 'ALL'
      ? MOCK_ENTRIES
      : activeFilter === 'ERR'
        ? MOCK_ENTRIES.filter((e) => e.status === 'err')
        : activeFilter === 'SKIP'
          ? MOCK_ENTRIES.filter((e) => e.status === 'skip')
          : MOCK_ENTRIES.filter((e) => e.type === activeFilter.toLowerCase())

  const stats = computeStats(MOCK_ENTRIES)

  return (
    <div className="bg-bg flex h-full flex-col overflow-hidden">
      {/* top bar */}
      <header className="border-border flex shrink-0 flex-wrap items-center gap-3 border-b px-4 py-2.5">
        <h1 className="text-fg mr-2 font-mono text-sm font-bold tracking-tight">
          sisi <span className="text-fg-muted font-normal">/ audits</span>
        </h1>

        {/* filter tabs */}
        <div className="flex items-center gap-1">
          {CYCLE_TYPES.map((t) => (
            <Button
              className={`font-mono text-[10px] font-medium tracking-wider ${
                activeFilter === t ? 'bg-accent/20 text-accent' : ''
              }`}
              key={t}
              onClick={() => setActiveFilter(t)}
              size="sm"
              variant="ghost"
            >
              {t}
            </Button>
          ))}
        </div>

        {/* date range */}
        <span className="text-fg-muted ml-auto font-mono text-[11px]">2026-04-04</span>

        {/* stats summary */}
        <div className="text-fg-muted hidden gap-3 font-mono text-[10px] lg:flex">
          <span>
            <strong className="text-fg">{stats.total}</strong> cycles
          </span>
          <span>
            micro <strong className="text-accent">{stats.micro}</strong>
          </span>
          <span>
            explore <strong className="text-success">{stats.explore}</strong>
          </span>
          <span>
            reflect <strong className="text-warning">{stats.reflect}</strong>
          </span>
          <span>
            deep <strong className="text-danger">{stats.deep}</strong>
          </span>
          <span>
            think <strong className="text-info">{stats.think}</strong>
          </span>
          <span>
            learn <strong className="text-palette-5">{stats.learn}</strong>
          </span>
          <span>
            avg <strong className="text-fg">1.1m</strong>
          </span>
        </div>
      </header>

      {/* heatmap row */}
      <div className="border-border flex shrink-0 items-center gap-[3px] overflow-x-auto border-b px-4 py-2">
        {HEATMAP.map((intensity, i) => (
          <div
            className={`h-[8px] w-[8px] shrink-0 rounded-[1px] ${HEAT_COLORS[intensity]}`}
            key={i}
          />
        ))}
      </div>

      {/* table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse font-mono text-[11px]">
          <thead>
            <tr className="border-border text-fg-muted sticky top-0 z-10 border-b bg-[var(--color-bg)]">
              <th className="px-2 py-1.5 text-left font-medium">#</th>
              <th className="px-2 py-1.5 text-left font-medium">DATE</th>
              <th className="px-2 py-1.5 text-left font-medium">TIME</th>
              <th className="px-2 py-1.5 text-left font-medium">TYPE</th>
              <th className="px-2 py-1.5 text-left font-medium">ST</th>
              <th className="px-2 py-1.5 text-left font-medium">DUR</th>
              <th className="px-2 py-1.5 text-right font-medium">C</th>
              <th className="px-2 py-1.5 text-left font-medium">IN</th>
              <th className="min-w-[320px] px-2 py-1.5 text-left font-medium">SUMMARY</th>
              <th className="px-2 py-1.5 text-left font-medium">TAGS</th>
              <th className="px-2 py-1.5 text-left font-medium">FILES</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr
                className="border-border hover:bg-fg/[0.03] border-b transition-colors"
                key={entry.id}
              >
                {/* # */}
                <td className="text-fg-muted px-2 py-1.5 whitespace-nowrap tabular-nums">
                  {entry.id}
                </td>

                {/* date */}
                <td className="text-fg-muted px-2 py-1.5 whitespace-nowrap tabular-nums">
                  {entry.date}
                </td>

                {/* time */}
                <td className="text-fg px-2 py-1.5 whitespace-nowrap tabular-nums">{entry.time}</td>

                {/* type badge */}
                <td className="px-2 py-1.5 whitespace-nowrap">
                  <span
                    className={`inline-block rounded border px-1.5 py-0.5 text-[10px] leading-none font-medium ${TYPE_COLORS[entry.type]}`}
                  >
                    {entry.type}
                  </span>
                </td>

                {/* status */}
                <td className={`px-2 py-1.5 whitespace-nowrap ${STATUS_COLORS[entry.status]}`}>
                  {entry.status}
                </td>

                {/* duration */}
                <td className="text-fg px-2 py-1.5 whitespace-nowrap tabular-nums">
                  {entry.duration}
                </td>

                {/* cost */}
                <td className="text-fg-muted px-2 py-1.5 text-right whitespace-nowrap tabular-nums">
                  {entry.cost}
                </td>

                {/* input */}
                <td className="text-fg-muted px-2 py-1.5 whitespace-nowrap">{entry.input}</td>

                {/* summary */}
                <td className="text-fg px-2 py-1.5 leading-snug">{entry.summary}</td>

                {/* tags */}
                <td className="px-2 py-1.5">
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge className="text-[9px]" key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>

                {/* files */}
                <td className="px-2 py-1.5">
                  <div className="flex flex-col gap-0.5">
                    {entry.files.map((f) => (
                      <a className="text-accent text-[10px] hover:underline" href="#" key={f}>
                        {f}
                      </a>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-fg-muted py-12 text-center text-sm">
            No entries match the current filter.
          </div>
        )}
      </div>
    </div>
  )
}
