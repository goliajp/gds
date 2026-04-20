type Entry = { label: string; body: string }

const ENTRIES: Entry[] = [
  {
    label: 'Positioning',
    body: `GDS v4 是给 AI 做 webapp 用的设计系统框架。
直接消费者是 AI agent（拿 GDS 产代码），不是人类开发者。
人类的角色是写约束、审产出，不亲自写应用代码。`,
  },
  {
    label: 'Method · 克制',
    body: `通过限制 AI 可选项来限制 AI 犯错空间。
一个功能只有一种写法；没有"灵活自由"；没有"想怎么组合都行"。
Radix / Base UI 追求柔性适应 —— v4 反之，追求禁掉错误可能性。
类比 Apple HIG 那种"不给你做坏的自由"。`,
  },
  {
    label: 'Requirement #1',
    body: '天生支持 mobile web 和 pad',
  },
  {
    label: 'Requirement #2',
    body: '做 GDS 要充分考虑让 AI 当成 skills 来用',
  },
  {
    label: 'Working Mode',
    body: `哲学 / API / scope 由人决定，AI 不主动给候选清单（会把决策悄悄让渡给 AI）。
AI 的本职：审计 + 按已定规范补样板 + 找 orphan / 列不一致。
拒绝 bulk 生成——一次一个组件，人确认一个。
principle 是 audit 用的要求，不是反推"因此必须 / 禁"的前提。
现阶段是积累内容，怎么呈现是以后的事。`,
  },
  {
    label: 'PM Parallel',
    body: `GDS v1 / v2 / v3 反复遇到同一个困难：Claude Code 协同效率随代码量增加大幅下降。
v4 从一开始把项目管理基础设施和业务代码同步构筑，而不是"先写完业务再补管理"。
哪些 artifacts 算 PM 基础设施、"同步"指什么、如何衡量 PM 跟得上业务 —— 待定义。`,
  },
  {
    label: '⚠ Warning · RN-web 陷阱',
    body: `React Native for Web 在 web 应用层的采纳是失败的 —— 几乎没有团队选它来写 web 应用（除了本来就要跨 RN+web 的少数）。web 开发者选 React + HTML + Tailwind / shadcn / Material 等，不选 RNW 的 View/Text primitive。

但它的抽象（View + Text + Image 两三个 primitive / role-based rendering / AST-like 跨 target）又很有魅力，v4 设计时反复不自觉往那条路靠。

**疑问**：RN-web 在人类开发者市场失败，原因是 web 开发者熟悉 HTML + Tailwind、嫌 RNW 抽象不自然。但 v4 的消费者是 AI —— AI 对 HTML + Tailwind 的训练语料也远超 RN 抽象。**复刻 RNW 模式可能让 AI 产出反而更差**（AI 见过更多 <div className="..."> 的样本）。

这条是警告，不是结论。每次设计决策上卡在"要不要往 RN 方向走"时，回来看这条。`,
  },
]

export function PrinciplesView() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-fg text-2xl font-bold">Principles</h1>
        <p className="text-fg-muted max-w-2xl text-sm leading-relaxed">
          GDS v4 的 PM 原料累积堆 ——
          定位、方法、要求、工作方式、流程观察都在这里。未整理，仅作开发过程中的审计参考。新条目直接往下加，怎么组织、怎么呈现是以后的事。
        </p>
      </div>

      <ol className="space-y-3">
        {ENTRIES.map((e, i) => (
          <li className="border-border bg-bg-secondary rounded-lg border p-5" key={i}>
            <div className="text-accent mb-2 font-mono text-xs tracking-wider uppercase">
              {e.label}
            </div>
            <p className="text-fg text-sm leading-relaxed whitespace-pre-line">{e.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
