export function HomeView() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-fg text-2xl font-bold">GDS v4</h1>
        <p className="text-fg-muted max-w-2xl">
          Fresh slate. No baggage. One component at a time, verified end-to-end before the next.
        </p>
      </div>

      <div className="border-border bg-bg-secondary rounded-lg border p-5">
        <p className="text-fg-muted text-sm">
          This page is intentionally empty — drop Tailwind classes here to start prototyping. When
          the first v4 component lands, it will be imported from the workspace root and replace this
          block.
        </p>
      </div>
    </div>
  )
}
