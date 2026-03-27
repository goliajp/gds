import {
  useResetTheme,
  useResolvedMode,
  useSetThemeDensity,
  useSetThemeElevation,
  useSetThemeGlass,
  useSetThemeMode,
  useSetThemeMotion,
  useSetThemePrimaryColor,
  useSetThemeShape,
  useTheme,
} from '@gds/l1-systems/use-theme'

const presetColors = [
  { label: 'Blue', color: '#3b82f6' },
  { label: 'Teal', color: '#14b8a6' },
  { label: 'Violet', color: '#8b5cf6' },
  { label: 'Rose', color: '#f43f5e' },
  { label: 'Amber', color: '#f59e0b' },
  { label: 'Emerald', color: '#10b981' },
  { label: 'Cyan', color: '#06b6d4' },
  { label: 'Orange', color: '#f97316' },
]

const modes = ['dark', 'light', 'system'] as const
const shapes = ['sharp', 'default', 'rounded'] as const
const densities = ['compact', 'default', 'comfortable'] as const
const elevations = ['flat', 'subtle', 'raised'] as const
const glasses = ['off', 'subtle', 'full'] as const
const motions = ['off', 'reduced', 'full'] as const

export function ThemeToolbar() {
  const theme = useTheme()
  const resolvedMode = useResolvedMode()
  const setMode = useSetThemeMode()
  const setPrimaryColor = useSetThemePrimaryColor()
  const setShape = useSetThemeShape()
  const setDensity = useSetThemeDensity()
  const setElevation = useSetThemeElevation()
  const setGlass = useSetThemeGlass()
  const setMotion = useSetThemeMotion()
  const reset = useResetTheme()

  return (
    <div className="dc-theme-toolbar flex shrink-0 items-center gap-3 overflow-x-auto px-4 py-2">
      {/* color */}
      <Label>Color</Label>
      <div className="flex items-center gap-1 shrink-0">
        {presetColors.map(p => (
          <button
            key={p.color}
            className="h-5 w-5 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              background: p.color,
              borderColor: theme.primaryColor === p.color ? 'white' : 'transparent',
            }}
            title={p.label}
            onClick={() => setPrimaryColor(p.color)}
          />
        ))}
        <label className="relative ml-1">
          <input
            type="color"
            value={theme.primaryColor}
            onChange={e => setPrimaryColor(e.target.value)}
            className="absolute inset-0 h-5 w-5 cursor-pointer opacity-0"
          />
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-xs text-fg-muted" title="Custom">+</div>
        </label>
      </div>

      <Div />
      <Label>Mode</Label>
      <Pills options={modes} value={theme.mode} onChange={setMode} display={v => v === 'system' ? `sys(${resolvedMode})` : v} />

      <Div />
      <Label>Shape</Label>
      <Pills options={shapes} value={theme.shape} onChange={setShape} />

      <Div />
      <Label>Density</Label>
      <Pills options={densities} value={theme.density} onChange={setDensity} />

      <Div />
      <Label>Elevation</Label>
      <Pills options={elevations} value={theme.elevation} onChange={setElevation} />

      <Div />
      <Label>Glass</Label>
      <Pills options={glasses} value={theme.glass} onChange={setGlass} />

      <Div />
      <Label>Motion</Label>
      <Pills options={motions} value={theme.motion} onChange={setMotion} />

      <Div />
      <button
        className="shrink-0 rounded px-2 py-1 text-xs text-fg-muted/30 hover:text-fg-muted/60 hover:bg-white/[0.03] transition-colors"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  )
}

function Label({ children }: { children: string }) {
  return <span className="text-xs text-fg-muted/30 shrink-0">{children}</span>
}

function Div() {
  return <div className="h-4 w-px bg-white/[0.06] shrink-0" />
}

function Pills<T extends string>({ options, value, onChange, display }: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  display?: (v: T) => string
}) {
  return (
    <div className="flex gap-px rounded-md bg-white/[0.03] p-0.5 shrink-0">
      {options.map(opt => (
        <button
          key={opt}
          className={[
            'rounded px-2 py-0.5 text-xs transition-colors whitespace-nowrap',
            opt === value
              ? 'bg-accent text-accent-fg'
              : 'text-fg-muted/40 hover:text-fg-muted/70',
          ].join(' ')}
          onClick={() => onChange(opt)}
        >
          {display !== undefined ? display(opt) : opt}
        </button>
      ))}
    </div>
  )
}
