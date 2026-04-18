const POSITIONING = `GDS v4 是给 AI 做 webapp 用的设计系统框架。
直接消费者是 AI agent（拿 GDS 产代码），不是人类开发者。
人类的角色是写约束、审产出，不亲自写应用代码。

核心方法：克制——通过限制 AI 可选项来限制 AI 犯错空间。
下面的 principles 是克制要达成的具体目标。`

const PRINCIPLES: string[] = [
  '天生支持 mobile web 和 pad',
  '做 GDS 要充分考虑让 AI 当成 skills 来用',
]

export function PrinciplesView() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-fg text-2xl font-bold">Principles</h1>
        <p className="text-fg-muted max-w-2xl text-sm leading-relaxed">
          收集中的塑形哲学。未整理、未分类，只作开发过程中的审计参考。新条目直接往下加，怎么表达是以后的事。
        </p>
      </div>

      <div className="border-accent/40 bg-accent/5 rounded-lg border p-5">
        <div className="text-accent mb-2 font-mono text-xs tracking-wider uppercase">
          Positioning
        </div>
        <p className="text-fg text-sm leading-relaxed whitespace-pre-line">{POSITIONING}</p>
      </div>

      <ol className="space-y-3">
        {PRINCIPLES.map((p, i) => (
          <li className="border-border bg-bg-secondary flex gap-4 rounded-lg border p-4" key={i}>
            <span className="text-fg-muted shrink-0 font-mono text-sm">#{i + 1}</span>
            <p className="text-fg text-sm leading-relaxed">{p}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
