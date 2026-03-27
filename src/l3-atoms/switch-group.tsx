// switch-group — list of labeled switches for settings pages
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { Switch } from './switch'

type SwitchGroupItem = {
  checked: boolean
  description?: string
  id: string
  label: string
}

type SwitchGroupProps = {
  className?: string
  disabled?: boolean
  items: SwitchGroupItem[]
  onChange: (id: string, checked: boolean) => void
}

export const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
  function SwitchGroup({ className, disabled = false, items, onChange }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-3', className)}
        data-component="switch-group"
        role="group"
      >
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 gds-pad-x gds-pad-y-sm">
            <div className="min-w-0 flex-1">
              <div className="gds-text-body font-medium text-fg">{item.label}</div>
              {item.description !== undefined && (
                <div className="mt-0.5 gds-text-caption text-fg-muted">{item.description}</div>
              )}
            </div>
            <Switch
              checked={item.checked}
              disabled={disabled}
              onChange={(checked) => onChange(item.id, checked)}
            />
          </div>
        ))}
      </div>
    )
  },
)

export type { SwitchGroupItem, SwitchGroupProps }
