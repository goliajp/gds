// tabs — horizontal tab bar with active indicator and optional counts
import { cva } from 'class-variance-authority'
import type { KeyboardEvent } from 'react'

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
  cx('relative inline-flex items-center transition-colors', focusCls),
  {
    variants: {
      size: {
        default: 'gds-pad-x gds-pad-y text-sm',
        sm: 'gds-pad-x-sm gds-pad-y-sm gds-text-body',
      },
      active: {
        true: '',
        false: '',
      },
      variant: {
        default: 'border-b-2',
        pills: 'gds-radius px-3 py-1.5',
        underline: 'border-b',
      },
    },
    compoundVariants: [
      { variant: 'default', active: true, class: 'border-accent text-accent' },
      { variant: 'default', active: false, class: 'border-transparent text-fg-muted hover:text-fg' },
      { variant: 'pills', active: true, class: 'bg-accent text-accent-fg' },
      { variant: 'pills', active: false, class: 'text-fg-muted hover:bg-fg-muted/10 hover:text-fg' },
      { variant: 'underline', active: true, class: 'border-accent text-accent' },
      { variant: 'underline', active: false, class: 'border-transparent text-fg-muted hover:text-fg' },
    ],
    defaultVariants: {
      size: 'default',
      active: false,
      variant: 'default',
    },
  },
)

export type TabsProps = {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  glass?: boolean
  size?: VariantProps<typeof tabVariants>['size']
  variant?: VariantProps<typeof tabVariants>['variant']
  scrollable?: boolean
  className?: string
}

export function Tabs({ tabs, active, onChange, glass, size = 'default', variant = 'default', scrollable = true, className }: TabsProps) {
  const isPills = variant === 'pills'

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') {
      return
    }
    e.preventDefault()
    const currentIndex = tabs.findIndex((t) => t.id === active)
    if (currentIndex < 0) return

    let nextIndex = currentIndex
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1
    }

    onChange(tabs[nextIndex].id)
    const tablist = e.currentTarget
    const buttons = tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    buttons[nextIndex]?.focus()
  }

  return (
    <div
      className={cx(
        'flex',
        !isPills && 'border-b border-border',
        isPills && 'gap-1.5',
        scrollable && 'overflow-x-auto scrollbar-hide',
        glass ? cx('rounded-t-lg border-white/10 bg-bg/60', glassClass(glass)) : '',
        className,
      )}
      data-component="tabs"
      role="tablist"
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={tabVariants({ size, active: isActive, variant })}
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
