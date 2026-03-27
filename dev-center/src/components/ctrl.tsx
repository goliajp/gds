// ctrl — interactive control widget for inspector panel

import { Input } from '@gds/l2-primitives'
import { SegmentedControl, Switch } from '@gds/l3-atoms'
import { cx } from '@gds/utils/cx'

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
        <SegmentedControl
          size="sm"
          value={props.value}
          options={props.options.map(opt => ({ value: opt, label: opt }))}
          onChange={props.onChange}
        />
      )}

      {props.type === 'select' && (
        <select
          className={cx(
            'rounded border border-white/[0.08] bg-white/[0.03]',
            'px-2 py-1 text-xs text-fg outline-none focus:border-accent/50',
          )}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        >
          {props.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {props.type === 'text' && (
        <Input
          inputSize="sm"
          className="w-36"
          value={props.value}
          placeholder={props.placeholder}
          onChange={e => props.onChange(e.target.value)}
        />
      )}

      {props.type === 'number' && (
        <input
          type="number"
          className={cx(
            'w-20 rounded border border-white/[0.08] bg-white/[0.03]',
            'px-2 py-1 text-xs text-fg outline-none focus:border-accent/50',
          )}
          value={props.value}
          min={props.min}
          max={props.max}
          onChange={e => props.onChange(Number(e.target.value))}
        />
      )}

      {props.type === 'check' && (
        <Switch
          size="sm"
          checked={props.value}
          onChange={props.onChange}
        />
      )}
    </div>
  )
}

export type { CtrlProps }
