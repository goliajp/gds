// tabs — horizontal tab bar with active indicator and optional counts
import { cva } from 'class-variance-authority'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

export type TabItem = {
  id: string
  label: string
  count?: number
}

export const tabVariants = cva(
  cx('relative inline-flex items-center border-b-2 transition-colors', focusCls),
  {
    variants: {
      size: {
        default: 'gds-pad-x gds-pad-y text-sm',
        sm: 'gds-pad-x-sm gds-pad-y-sm gds-text-body',
      },
      active: {
        true: 'border-accent text-accent',
        false: 'border-transparent text-fg-muted hover:text-fg',
      },
    },
    defaultVariants: {
      size: 'default',
      active: false,
    },
  },
)

export type TabsProps = {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  glass?: boolean
  size?: VariantProps<typeof tabVariants>['size']
  className?: string
}

export function Tabs({ tabs, active, onChange, glass, size = 'default', className }: TabsProps) {
  return (
    <div
      className={cx(
        'flex border-b border-border',
        glass ? cx('rounded-t-lg border-white/10 bg-bg/60', glassClass(glass)) : '',
        className,
      )}
      data-component="tabs"
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={tabVariants({ size, active: isActive })}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 gds-radius-badge bg-fg-muted/10 px-1.5 gds-text-caption">
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
