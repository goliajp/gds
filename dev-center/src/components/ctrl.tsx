// ctrl — interactive control widget for inspector panel

type CtrlBase = {
  label: string
}

type PillsCtrl = CtrlBase & {
  type: 'pills'
  value: string
  options: string[]
  onChange: (v: string) => void
}

type SelectCtrl = CtrlBase & {
  type: 'select'
  value: string
  options: string[]
  onChange: (v: string) => void
}

type TextCtrl = CtrlBase & {
  type: 'text'
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

type NumberCtrl = CtrlBase & {
  type: 'number'
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}

type CheckCtrl = CtrlBase & {
  type: 'check'
  value: boolean
  onChange: (v: boolean) => void
}

type CtrlProps = PillsCtrl | SelectCtrl | TextCtrl | NumberCtrl | CheckCtrl

export function Ctrl(props: CtrlProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="shrink-0 text-xs text-fg-muted">{props.label}</span>

      {props.type === 'pills' && (
        <div className="flex gap-0.5">
          {props.options.map(opt => (
            <button
              key={opt}
              className={[
                'rounded px-2 py-0.5 text-xs transition-colors',
                opt === props.value
                  ? 'bg-accent text-accent-fg'
                  : 'bg-white/[0.05] text-fg-muted hover:text-fg',
              ].join(' ')}
              onClick={() => props.onChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {props.type === 'select' && (
        <select
          className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-xs text-fg outline-none focus:border-accent/50"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        >
          {props.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {props.type === 'text' && (
        <input
          className="w-36 rounded border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-xs text-fg outline-none focus:border-accent/50"
          value={props.value}
          placeholder={props.placeholder}
          onChange={e => props.onChange(e.target.value)}
        />
      )}

      {props.type === 'number' && (
        <input
          type="number"
          className="w-20 rounded border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-xs text-fg outline-none focus:border-accent/50"
          value={props.value}
          min={props.min}
          max={props.max}
          onChange={e => props.onChange(Number(e.target.value))}
        />
      )}

      {props.type === 'check' && (
        <button
          className={[
            'relative h-6 w-11 rounded-full transition-colors',
            props.value ? 'bg-accent' : 'bg-white/10',
          ].join(' ')}
          onClick={() => props.onChange(!props.value)}
        >
          <span className={[
            'absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
            props.value ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')} />
        </button>
      )}
    </div>
  )
}

export type { CtrlProps }
