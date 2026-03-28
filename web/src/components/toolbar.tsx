type ToolbarProps = {
  search: string
  onSearch: (q: string) => void
}

export function Toolbar({ search, onSearch }: ToolbarProps) {
  return (
    <header
      className="flex h-12 shrink-0 items-center gap-4 border-b border-border/30 px-5"
      style={{
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        background: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      {/* logo */}
      <div className="flex items-center gap-2">
        <img alt="GDS" className="h-6 w-6 rounded-md" src="https://cdn.golia.jp/logo-icon.png" />
        <span className="text-sm font-bold text-fg">
          GDS <span className="font-normal text-fg-muted/40">Dev Center</span>
        </span>
      </div>

      {/* spacer */}
      <div className="flex-1" />

      {/* search */}
      <input
        className="w-56 rounded-md border border-border bg-bg px-2.5 py-1 text-xs text-fg placeholder:text-fg-muted/40 outline-none"
        placeholder="Search..."
        value={search}
        onChange={e => onSearch(e.target.value)}
      />

      {/* dark mode toggle */}
      <button
        className="flex h-7 w-7 items-center justify-center rounded-md text-fg-muted hover:bg-bg-tertiary hover:text-fg"
        onClick={() => {
          document.documentElement.classList.toggle('light')
        }}
        title="Toggle theme"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  )
}
