import { Link } from 'react-router'

const DEMOS = [
  { path: '/audit-log', title: 'Audit Log', desc: 'AI 认知审计日志 — 密集表格 + 过滤器 + Badge' },
  { path: '/lesson-viewer', title: 'Lesson Viewer', desc: '课程阅读器 — 侧栏 + 步骤条 + 代码对比' },
  { path: '/devops', title: 'DevOps Overview', desc: '运维总览 — 设备监控 + 服务状态 + 资源图表' },
  {
    path: '/devops/analytics',
    title: 'DevOps Analytics',
    desc: 'Claude Code 分析 — KPI + 用量趋势',
  },
  { path: '/devops/wiki', title: 'DevOps Wiki', desc: '运维文档 — 分类导航 + Markdown 渲染' },
  { path: '/file-manager', title: 'File Manager', desc: '数字资产管理 — 文件列表 + 预览面板' },
  { path: '/admin-dashboard', title: 'Admin Dashboard', desc: '经营仪表盘 — 财务 + HR + 趋势图' },
  { path: '/dada/dashboard', title: 'Dada Dashboard', desc: '研究项目 — 统计 + 进度 + 实验跟踪' },
  { path: '/dada/roadmap', title: 'Dada Roadmap', desc: '版本路线图 — 进度条 + 里程碑' },
  { path: '/landing', title: 'Landing Page', desc: '公司官网 — 营销页面 + Light Mode' },
  { path: '/email', title: 'Email Client', desc: '邮件客户端 — 三栏布局 + 会话 + 富文本' },
]

export function HomeView() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-fg mb-2 text-xl font-bold">GDS v3 Playground</h1>
      <p className="text-fg-muted mb-8 text-sm">11 个真实业务场景，用 GDS 组件全量还原。</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d) => (
          <Link
            className="border-border hover:border-accent/50 hover:bg-bg-secondary rounded-lg border p-4 transition-colors"
            key={d.path}
            to={d.path}
          >
            <h3 className="text-fg mb-1 text-sm font-semibold">{d.title}</h3>
            <p className="text-fg-muted text-xs">{d.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
