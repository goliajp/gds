import { Badge, Button, Progress } from '@goliapkg/gds/primitives'
import { Card } from '@goliapkg/gds/molecules'
import { Check, Circle, FlaskConical, Beaker } from 'lucide-react'

import { ThemeToggle } from '../components/theme-toggle'

// ---------------------------------------------------------------------------
// types
// ---------------------------------------------------------------------------

type SubVersionStatus = 'completed' | 'in-progress' | 'planned'

type SubVersion = {
  id: string
  label: string
  goals?: string
  experiments?: number
  progress: number
  status: SubVersionStatus
}

type GoalItem = {
  id: string
  label: string
  description?: string
  completed: boolean
}

type CompletedVersion = {
  version: string
  topic: string
  milestone: string
}

// ---------------------------------------------------------------------------
// mock data
// ---------------------------------------------------------------------------

const TABS = ['Dashboard', 'Roadmap', 'Experiments'] as const

const V8_SUB_VERSIONS: SubVersion[] = [
  { id: 'v8.0', label: '基础收发', progress: 100, status: 'completed' },
  { id: 'v8.1', label: '断裂点探索', experiments: 6, progress: 100, status: 'completed' },
  {
    id: 'v8.2',
    label: 'extraction 可靠性',
    goals: '11/11 goals',
    experiments: 2,
    progress: 100,
    status: 'completed',
  },
  {
    id: 'v8.3',
    label: '全面考核',
    goals: '3/10 goals',
    experiments: 4,
    progress: 30,
    status: 'in-progress',
  },
  { id: 'v8.4', label: '群聊 + 多人', progress: 0, status: 'planned' },
]

const V83_GOALS: GoalItem[] = [
  {
    id: 'EXP-030',
    label: 'IM 对话质量',
    description: '20 轮测试，评分回忆/准确率/回复相关性/重复性',
    completed: false,
  },
  { id: 'EXP-031', label: '多轮对话连贯性 — 长对话中主题切换与回溯能力', completed: true },
  {
    id: 'EXP-032',
    label: '跨 session 记忆',
    description: 'session A 种事实，session B 回忆测试',
    completed: false,
  },
  {
    id: 'EXP-033',
    label: 'extraction 实战表现',
    description: '分析最近 50 条 IM 消息的实际提取率',
    completed: false,
  },
  {
    id: 'EXP-034',
    label: '实体关系图谱准确度 — 自动构建的关系网络与人工标注对比',
    completed: true,
  },
  {
    id: 'EXP-035',
    label: '认知画像可靠性',
    description: '调参前后对话风格差异的首选',
    completed: false,
  },
  {
    id: 'EXP-036',
    label: '24h 稳定性',
    description: '连续运行，监控内存/连接/session 状态',
    completed: false,
  },
  { id: 'EXP-037', label: '错误恢复能力 — 模拟网络断连/API 超时后的自动恢复', completed: true },
  {
    id: 'EXP-038',
    label: '自我身份一致性',
    description: 'Dada 能否准确描述自己定位，属于哪',
    completed: false,
  },
  {
    id: 'GOAL-FINAL',
    label: '综合体检报告',
    description: '每项打分(A/B/C/D/F)，总评，瓶颈分析',
    completed: false,
  },
]

const COMPLETED_VERSIONS: CompletedVersion[] = [
  {
    version: 'v1',
    topic: '数据模型',
    milestone:
      '### Achievements\n- **Fact/Derivation Data Architecture**: Built the foundational data model separating immutable facts from recomputable derivations, enabling audit trails and correction patterns across all subsystems.',
  },
  {
    version: 'v2',
    topic: '仿生意识',
    milestone:
      '### Achievements\n- **Heartbeat + Stimulus-Impulse-Filter Pipeline**: Implemented biomorphic awareness loop with configurable heartbeat intervals, stimulus detection, impulse generation, and multi-layer filtering for context-aware responses.',
  },
  {
    version: 'v3',
    topic: '工具调用 + 语义记忆',
    milestone:
      '### Achievements\n- **Ollama Native Tool Calling**: Integrated local LLM tool-use capabilities with structured JSON schema validation, enabling Dada to invoke external tools (search, calendar, file operations) through natural language.',
  },
  {
    version: 'v4',
    topic: '统一事件模型',
    milestone:
      '### Achievements\n- **Unified Event Model (Subject-Predicate-Value)**: Consolidated all system events into a single SPV triple format, enabling cross-subsystem event correlation, temporal queries, and causal chain reconstruction.',
  },
  {
    version: 'v5',
    topic: '增量学习',
    milestone:
      '### Achievements\n- **Six-Layer Biomorphic Processing Pipeline**: Designed and implemented perception → attention → comprehension → reflection → consolidation → expression pipeline for continuous learning from conversation streams.',
  },
]

// ---------------------------------------------------------------------------
// sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: SubVersionStatus }) {
  if (status === 'completed') {
    return <Badge variant="success">完成</Badge>
  }
  if (status === 'in-progress') {
    return <Badge variant="info">进行中</Badge>
  }
  return <Badge variant="default">计划</Badge>
}

function SubVersionRow({ sv }: { sv: SubVersion }) {
  const meta: string[] = []
  if (sv.goals !== undefined) {
    meta.push(sv.goals)
  }
  if (sv.experiments !== undefined) {
    meta.push(`${sv.experiments} exp`)
  }

  return (
    <tr className="border-border/50 border-b last:border-b-0">
      <td className="py-2.5 pr-4">
        <div className="flex items-center gap-2">
          <span className="text-accent text-xs font-bold">{sv.id}</span>
          <span className="text-fg text-xs">{sv.label}</span>
          {meta.length > 0 && <span className="text-fg-muted text-[10px]">{meta.join(' ')}</span>}
        </div>
      </td>
      <td className="w-48 py-2.5 pr-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Progress
              size="sm"
              value={sv.progress}
              variant={sv.status === 'completed' ? 'success' : 'default'}
            />
          </div>
          {sv.status === 'completed' && <Check className="text-success h-3.5 w-3.5" />}
          {sv.status === 'in-progress' && (
            <span className="text-fg-muted text-[10px]">{sv.progress}%</span>
          )}
        </div>
      </td>
      <td className="w-20 py-2.5 text-right">
        <StatusBadge status={sv.status} />
      </td>
    </tr>
  )
}

function GoalCard({ goal }: { goal: GoalItem }) {
  return (
    <div
      className={`border-border/50 flex items-start gap-2.5 rounded-md border px-3 py-2.5 ${
        goal.completed ? 'opacity-60' : ''
      }`}
    >
      {goal.completed ? (
        <Check className="text-success mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <Circle className="text-fg-muted mt-0.5 h-4 w-4 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-xs ${
              goal.completed ? 'text-fg-muted line-through' : 'text-fg'
            }`}
          >
            {goal.id}:
          </span>
          <span className={`text-xs ${goal.completed ? 'text-fg-muted line-through' : 'text-fg'}`}>
            {goal.label}
          </span>
        </div>
        {goal.description !== undefined && !goal.completed && (
          <p className="text-fg-muted mt-0.5 text-[11px] leading-relaxed">{goal.description}</p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// main view
// ---------------------------------------------------------------------------

export function DadaRoadmapView() {
  const completedCount = V8_SUB_VERSIONS.filter((s) => s.status === 'completed').length
  const totalCount = V8_SUB_VERSIONS.length
  const completedGoals = V83_GOALS.filter((g) => g.completed).length
  const totalGoals = V83_GOALS.length

  // overall v8 progress
  const v8TotalGoals = 21
  const v8CompletedGoals = 14
  const v8Pct = Math.round((v8CompletedGoals / v8TotalGoals) * 100)

  return (
    <div className="bg-bg text-fg flex min-h-screen flex-col">
      {/* top bar */}
      <header className="border-border bg-bg/80 flex h-12 shrink-0 items-center justify-between border-b px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Beaker className="text-accent h-5 w-5" />
            <span className="text-fg text-sm font-bold">Dada Lab</span>
            <span className="text-fg-muted text-xs">PM Center</span>
          </div>
          <nav className="flex items-center gap-1">
            {TABS.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                size="sm"
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === 'Roadmap'
                    ? 'bg-accent/10 text-accent'
                    : 'text-fg-muted hover:text-fg hover:bg-bg-secondary'
                }`}
              >
                {tab}
              </Button>
            ))}
          </nav>
        </div>
        <ThemeToggle />
      </header>

      {/* main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* page heading */}
          <div className="mb-8">
            <h1 className="text-fg text-xl font-bold">Roadmap</h1>
            <p className="text-fg-muted mt-1 text-sm">
              v1 — v10: from data model to autonomous existence
            </p>
          </div>

          {/* incremental-learning (empty) */}
          <Card className="mb-6">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="info">IN PROGRESS</Badge>
                  <code className="text-accent text-xs font-semibold">incremental-learning</code>
                  <span className="text-fg-muted text-xs">增量学习</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-fg-muted text-xs">0/0 sub-versions</span>
                  <span className="text-fg-muted text-xs font-medium">0%</span>
                </div>
              </div>

              {/* sub-version table header */}
              <div className="border-border/50 mt-4 border-t pt-3">
                <div className="flex text-[10px] font-semibold tracking-wider uppercase">
                  <span className="text-fg-muted flex-1">SUB-VERSION</span>
                  <span className="text-fg-muted w-48 pr-4">PROGRESS</span>
                  <span className="text-fg-muted w-20 text-right">STATUS</span>
                </div>
                <div className="text-fg-muted mt-6 text-center text-xs italic">
                  No sub-versions yet
                </div>
              </div>
            </div>
          </Card>

          {/* v8 渠道接入 */}
          <Card className="mb-6">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="info">IN PROGRESS</Badge>
                  <span className="text-accent text-sm font-bold">v8</span>
                  <span className="text-fg text-sm">渠道接入</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-fg-muted text-xs">
                    {completedCount}/{totalCount} sub-versions
                  </span>
                  <span className="text-fg-muted text-xs">
                    {v8CompletedGoals}/{v8TotalGoals} goals
                  </span>
                  <span className="text-fg text-xs font-bold">{v8Pct}%</span>
                </div>
              </div>

              {/* overall progress */}
              <div className="mt-3">
                <Progress size="default" value={v8Pct} />
              </div>

              {/* sub-version table */}
              <div className="border-border/50 mt-4 border-t pt-3">
                <div className="flex text-[10px] font-semibold tracking-wider uppercase">
                  <span className="text-fg-muted flex-1">SUB-VERSION</span>
                  <span className="text-fg-muted w-48 pr-4">PROGRESS</span>
                  <span className="text-fg-muted w-20 text-right">STATUS</span>
                </div>
                <table className="mt-2 w-full">
                  <tbody>
                    {V8_SUB_VERSIONS.map((sv) => (
                      <SubVersionRow key={sv.id} sv={sv} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* v8.3 goals */}
          <Card className="mb-6">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <FlaskConical className="text-accent h-4 w-4" />
                <span className="text-fg text-sm font-bold">V8.3 GOALS</span>
                <span className="text-fg-muted text-xs">
                  ({completedGoals}/{totalGoals})
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                {V83_GOALS.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          </Card>

          {/* completed versions */}
          <Card className="mb-6">
            <div className="p-4">
              <div className="mb-4 flex items-center gap-3">
                <Badge variant="success">COMPLETED</Badge>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-border/50 border-b">
                    <th className="text-fg-muted pb-2 text-left text-[10px] font-semibold tracking-wider uppercase">
                      VERSION
                    </th>
                    <th className="text-fg-muted pb-2 text-left text-[10px] font-semibold tracking-wider uppercase">
                      TOPIC
                    </th>
                    <th className="text-fg-muted pb-2 text-left text-[10px] font-semibold tracking-wider uppercase">
                      MILESTONE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPLETED_VERSIONS.map((v) => (
                    <tr key={v.version} className="border-border/50 border-b last:border-b-0">
                      <td className="w-16 py-3 pr-4 align-top">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-accent h-auto p-0 text-xs font-bold hover:underline"
                        >
                          {v.version}
                        </Button>
                      </td>
                      <td className="w-36 py-3 pr-4 align-top">
                        <span className="text-fg text-xs">{v.topic}</span>
                      </td>
                      <td className="py-3 align-top">
                        <p className="text-fg-muted line-clamp-2 text-xs leading-relaxed">
                          {v.milestone}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* footer */}
          <footer className="text-fg-muted py-8 text-center text-[11px]">
            GOLIA Lab · Dada Research Project
          </footer>
        </div>
      </main>
    </div>
  )
}
