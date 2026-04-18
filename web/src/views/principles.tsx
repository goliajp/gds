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
          收集中的塑形哲学。未整理、未分类，只作开发过程中的审计参考。新的条目直接往下加。
        </p>
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
