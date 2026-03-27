// tab-group — tabs with content panels in one composed component
import type { ReactNode } from 'react'
import { useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { Tabs } from './tabs'

export type TabGroupTab = {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}

export type TabGroupProps = {
  tabs: TabGroupTab[]
  defaultTab?: string
  glass?: boolean
  className?: string
}

export function TabGroup({ tabs, defaultTab, glass, className }: TabGroupProps) {
  const initialTab = defaultTab ?? (tabs.length > 0 ? tabs[0].id : '')
  const [activeTab, setActiveTab] = useState(initialTab)

  const enabledTabs = tabs.filter((t) => t.disabled !== true)
  const tabItems = tabs.map((t) => ({
    id: t.id,
    label: t.label,
  }))

  const handleChange = (id: string) => {
    const tab = tabs.find((t) => t.id === id)
    if (tab !== undefined && tab.disabled !== true) {
      setActiveTab(id)
    }
  }

  const activeContent = tabs.find((t) => t.id === activeTab)

  return (
    <div
      className={cx(
        'gds-ctx gds-radius-card border border-border overflow-hidden',
        glass !== undefined && glass !== false
          ? cx('border-white/10 bg-bg/60', glassClass(glass))
          : '',
        className,
      )}
      data-component="tab-group"
    >
      <Tabs
        tabs={tabItems}
        active={activeTab}
        onChange={handleChange}
        size="sm"
      />
      <div className="gds-pad">
        {activeContent !== undefined ? activeContent.content : null}
      </div>
    </div>
  )
}
