import { cx } from '@goliapkg/gds'
import { useState } from 'react'

type Section = { heading: string; points: string[] }

type Research = {
  id: string
  title: string
  question: string
  sections: Section[]
  sources?: string[]
}

const RESEARCHES: Research[] = [
  {
    id: 'mobile-friendly-ui-conventions',
    title: '成熟 UI 框架的 mobile 设计规范',
    question: '成熟的 UI 框架如果是 mobile 友好的，一般会做一些什么设计规范？',
    sections: [
      {
        heading: '触摸目标最小尺寸',
        points: [
          'Apple HIG：最小 44×44 pt',
          'Material Design：最小 48×48 dp',
          'WCAG 2.5.5：AAA 级 44×44 CSS px，AA 级 24×24',
          '相邻目标间 ≥ 8 pt/dp 空隙，避免误触',
        ],
      },
      {
        heading: 'Safe area 处理（notch / home indicator）',
        points: [
          'CSS：env(safe-area-inset-top/right/bottom/left) 读取系统预留',
          'HTML meta：viewport-fit=cover 让页面能延伸到 safe area',
          'iOS 底部 home indicator 区域不放可交互元素',
          '顶部刘海区不放关键信息',
        ],
      },
      {
        heading: 'Viewport 单位选择',
        points: [
          'vh 在移动浏览器不可靠——地址栏伸缩会改 100vh 值',
          'svh (small viewport)：最小视口高度，地址栏展开时的可视区',
          'dvh (dynamic)：跟随浏览器 chrome 动态变化',
          'lvh (large)：最大视口高度',
          '现代做法：100dvh > 100svh > 100vh',
        ],
      },
      {
        heading: '输入模式 hint',
        points: [
          'inputmode="numeric|tel|email|url|search|decimal"：控制虚拟键盘布局',
          'autocomplete tokens：name / email / tel / address-line1 / cc-number 等触发系统填充',
          'enterkeyhint="done|go|next|search|send"：改软键盘 enter 键文案',
          '密码字段配合 autocomplete="current-password" 走系统 keychain',
        ],
      },
      {
        heading: '手势约定',
        points: [
          'iOS 左边缘滑动 → 返回上一屏（UINavigationController 默认）',
          'Pull-to-refresh → 列表顶部下拉刷新',
          'List item 左右滑 → 次要操作（归档、删除），主操作点击整行',
          '底部 sheet：向下滑关闭；居中 modal：通常要明确关闭按钮',
          '长按 → 上下文菜单 / 拖拽开始',
        ],
      },
      {
        heading: 'Responsive 断点',
        points: [
          'Tailwind：sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536',
          'Material Design 3：compact <600 · medium 600–839 · expanded 840–1199 · large 1200–1599 · extra-large ≥1600',
          'Bootstrap 5：xs <576 · sm ≥576 · md ≥768 · lg ≥992 · xl ≥1200 · xxl ≥1400',
          'Apple Size Classes：Regular / Compact 两档，按"能容纳多少"而非 px',
        ],
      },
      {
        heading: 'Motion 偏好',
        points: [
          'prefers-reduced-motion: reduce → 禁用或简化动画（尊重系统辅助）',
          'Material Design 3：emphasized / standard / decelerated 三种 easing',
          'iOS：系统默认 spring 动画，速度和阻尼有规范',
          '移动 CPU 有限：复杂 spring + 多元素同时动画必须测真机',
        ],
      },
      {
        heading: '布局自适应（非 CSS 响应式）',
        points: [
          'Mobile：底部 tab bar（3–5 项），避免顶部 hamburger + 深层导航',
          'Tablet：Material NavigationRail / Apple Split View（主列表 + 详情）',
          'Desktop：持久侧栏 + 多列',
          'Dialog：mobile 常变全屏 / bottom sheet，desktop 才是居中 modal',
          'Drawer：mobile 从底部弹出更自然，desktop 从侧边',
        ],
      },
      {
        heading: '字号与密度',
        points: [
          'iOS Dynamic Type：用户在系统里调整字号，app 要跟随',
          'Material Type Scale：displayLarge → labelSmall 共 15 档',
          'Fluid typography：clamp(min, preferred, max) 实现平滑缩放',
          '密度档位：Material density -1/0/+1、Ant compact/default/large',
        ],
      },
      {
        heading: 'Hover 与指针类型',
        points: [
          '移动端没有 hover 态——所有 hover 触发必须有 tap / long-press 等价',
          '@media (hover: hover)：只在支持 hover 的设备上应用 hover 样式',
          '@media (pointer: coarse)：针对触摸设备放大 hit area',
          '@media (pointer: fine)：精确指针（鼠标 / 触控笔）时恢复小尺寸',
        ],
      },
      {
        heading: '可访问性（mobile 特有）',
        points: [
          'VoiceOver / TalkBack 支持：语义化 HTML + ARIA labels',
          '高对比度模式：prefers-contrast: more',
          '颜色反转 / Smart Invert (iOS)：避免用仅颜色传达信息',
          'Focus visible on touch：键盘用户存在，focus ring 不能因为 mobile 就删掉',
        ],
      },
    ],
    sources: [
      'Apple Human Interface Guidelines',
      'Material Design 3 (m3.material.io)',
      'WCAG 2.1 / 2.5.5 Target Size',
      'Tailwind CSS v4 docs',
      'MDN Web Docs：inputmode, autocomplete, safe-area-inset, viewport units',
      'iOS Safari 博文 2022 dvh/svh/lvh',
    ],
  },
  {
    id: 'ai-coding-ui-frameworks',
    title: 'AI 写 UI 的框架与论文现状',
    question:
      '现在的 AI coding（Claude Code / Codex 等）有没有专门的 UI 框架？怎么设计？有相关论文吗？',
    sections: [
      {
        heading: 'shadcn/ui —— AI 生成 UI 的事实标准',
        points: [
          '不是传统 npm 库，是把 TS 源码直接拷进你的 codebase（ownership 模型）',
          'AI 友好核心：组件代码是可读 TS，LLM 能直接看、改、扩展——没有 Material UI 那种 theme override / styled-component 黑箱',
          '统一 API + 已知模式让 LLM 输出可预测',
          'Vercel v0 把它推成了 AI 生成 UI 的默认标准',
          'Registry 机制：把设计系统（组件 + color tokens + 字体）结构化地"喂"给 AI',
        ],
      },
      {
        heading: 'v0 (Vercel) —— 代表性 AI UI 生成器',
        points: [
          '聊天式生成 React 组件，输出 Tailwind + shadcn/ui',
          '支持自定义 Design System（Registry）：注入组件、颜色 tokens、字体给 AI 做上下文',
          '可从 Figma 导入设计稿转 React',
          '定位：prototyping / 组件 scaffolding，不做完整后端应用',
        ],
      },
      {
        heading: 'AI Elements (Vercel) —— 注意区分',
        points: [
          'AI Elements 是"给开发者构建 AI 应用用"，不是"给 AI 生成 UI 用"',
          '25+ 个 React 组件，基于 shadcn/ui，配合 Vercel AI SDK',
          '专门处理 conversation thread / message / code block / reasoning panel / response action 等 AI 场景原语',
          '和 v0 不同：v0 是生成器，AI Elements 是给 AI chat 界面用的组件库',
        ],
      },
      {
        heading: 'Anthropic frontend-design Skill',
        points: [
          'Claude Code 官方 skill，截至 2026-03 已 277k+ 安装',
          '核心观察："distributional convergence" / "AI slop"——LLM 默认输出训练数据中心化的安全选择',
          '方法：coding 前先给 Claude 一套设计框架——purpose / audience / 美学方向（brutalist / maximalist / luxury / retro-futuristic / playful 等）',
          '具体建议：typography 避开 Arial/Inter 等 generic 字体；color 用 CSS variables + dominant color + sharp accent；motion 集中在 high-impact 时刻（比如 staggered page load），不要 scattered micro-interaction',
          '本质：用"明确的美学立场"对抗 LLM 的平庸中位回归',
        ],
      },
      {
        heading: 'MCP：跨 AI 注入设计系统上下文',
        points: [
          'shadcn 官方 Registry MCP：一条命令把任意 registry 变成 MCP 兼容，AI 能查组件 / tokens / 项目配置',
          'AIDesigner MCP：跨 Claude Code / Cursor / Codex / Copilot / Windsurf，读 stack + tokens 生成贴合现有栈的 UI',
          'Figma MCP：Figma × Codex + Figma × Claude Code 双向桥接',
          '共同核心：Claude Code 原本"靠猜"组件 API / theme tokens，MCP 把真实项目配置注入 AI 的 context',
          '成本观察：AI 从零生成 UI 要烧 100k-500k tokens，MCP + registry 能大幅降低',
        ],
      },
      {
        heading: '学术论文：生成式 UI 代表工作',
        points: [
          'Generative UI: LLMs are Effective UI Generators (Google, arxiv 2604.09577) —— 证明 LLM 配合合适工具能为"任何 prompt"产出高质量定制 UI，不只是 markdown wall of text',
          'Generative Interfaces for Language Models (arxiv 2508.19227) —— 用 FSM 建模交互流 / state 转移 / 组件依赖，可控可解释',
          'SpecifyUI (arxiv 2509.07334) —— SPEC：结构化 + 参数化 + 分层的中间表示，把 UI 规范和元素层次编码给 LLM',
          'Towards Human-AI Synergy in UI Design / PrototypeFlow (arxiv 2412.20071) —— 多模态输入 + 意图澄清 + 主题设计模块协同',
          'ReDemon UI (arxiv 2507.10099) —— reactive synthesis by demonstration，从交互样例反推 UI 逻辑',
          'On Mitigating Code LLM Hallucinations with API Documentation (arxiv 2407.09726) —— API 文档写法显著影响 LLM 生成代码的 hallucination 率',
        ],
      },
      {
        heading: '跨工具 + 跨论文的共通设计模式',
        points: [
          '上下文注入 > 纯 prompt 工程：MCP / Registry / Skill 都在做"把真实项目结构喂给 AI"',
          '结构化中间表示：SPEC / FSM / 组件依赖图，让 LLM 操作可控对象而不是自由文本',
          '约束输出空间：限制 AI 能生成的形式（schema、allowed component set、token 清单），显著降低幻觉',
          'Copy-paste ownership > 依赖黑箱：AI 能直接看改组件代码（shadcn），比包一层 theme override 可靠得多',
          '先立美学 / 再写代码：Anthropic skill 的核心发现——先框定风格方向，再让 AI 生成，避开"AI slop"',
          '一种 API 只做一件事：LLM 不擅长低层条件分支，把 branching 封到 API 内部，LLM 只做高层编排',
        ],
      },
    ],
    sources: [
      'shadcn/ui — ui.shadcn.com (+ docs, blog)',
      'Vercel v0 — vercel.com/blog/ai-powered-prototyping-with-design-systems, v0.app/docs',
      'Vercel AI Elements — github.com/vercel/ai-elements, elements.ai-sdk.dev',
      'Anthropic frontend-design skill — claude.com/plugins/frontend-design, claude.com/blog/improving-frontend-design-through-skills',
      'shadcn Registry MCP — ui.shadcn.com/docs/mcp',
      'AIDesigner MCP — a2a-mcp.org/entry/aidesigner-mcp',
      'Generative UI (Google) — arxiv 2604.09577, generativeui.github.io',
      'Generative Interfaces for Language Models — arxiv 2508.19227',
      'SpecifyUI — arxiv 2509.07334',
      'Towards Human-AI Synergy in UI Design — arxiv 2412.20071',
      'ReDemon UI — arxiv 2507.10099',
      'Mitigating Code LLM Hallucinations with API Documentation — arxiv 2407.09726',
    ],
  },
]

export function ResearchesView() {
  const [selectedId, setSelectedId] = useState<string>(RESEARCHES[0]!.id)
  const selected = RESEARCHES.find((r) => r.id === selectedId)

  return (
    <div className="flex h-full flex-col gap-6 md:flex-row">
      <aside className="md:border-border md:w-72 md:shrink-0 md:overflow-y-auto md:border-r md:pr-4">
        <div className="text-accent mb-3 font-mono text-xs tracking-wider uppercase">
          Researches
        </div>
        <ol className="space-y-1">
          {RESEARCHES.map((r, i) => (
            <li key={r.id}>
              <button
                className={cx(
                  'flex w-full items-center rounded px-3 py-2 text-left text-sm transition-colors',
                  selectedId === r.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg'
                )}
                onClick={() => setSelectedId(r.id)}
                title={r.title}
                type="button"
              >
                <span className="text-fg-muted mr-2 shrink-0 font-mono text-xs">#{i + 1}</span>
                <span className="truncate">{r.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <article className="min-w-0 flex-1 space-y-6 md:overflow-y-auto md:pr-2">
        {selected ? <ResearchContent research={selected} /> : null}
      </article>
    </div>
  )
}

function ResearchContent({ research }: { research: Research }) {
  return (
    <>
      <header className="space-y-2">
        <h2 className="text-fg text-xl font-bold">{research.title}</h2>
        <p className="text-fg-muted text-sm italic">Q：{research.question}</p>
      </header>

      {research.sections.map((s) => (
        <section className="space-y-2" key={s.heading}>
          <h3 className="text-fg text-base font-semibold">{s.heading}</h3>
          <ul className="text-fg-secondary list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      ))}

      {research.sources && research.sources.length > 0 ? (
        <aside className="border-border border-t pt-4">
          <h4 className="text-fg-muted mb-2 font-mono text-xs tracking-wider uppercase">
            Sources（AI 整理，审计请人工确认）
          </h4>
          <ul className="text-fg-muted space-y-1 text-xs">
            {research.sources.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </>
  )
}
