// tab-group — tabs with content panels in one composed component
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'

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
  lazy?: boolean
  keepMounted?: boolean
  activeTab?: string
  onTabChange?: (tabId: string) => void
  glass?: boolean
  className?: string
}

export function TabGroup({
  tabs,
  defaultTab,
  lazy = false,
  keepMounted = true,
  activeTab: controlledTab,
  onTabChange,
  glass,
  className,
}: TabGroupProps) {
  const isControlled = controlledTab !== undefined && onTabChange !== undefined
  const initialTab = defaultTab ?? (tabs.length > 0 ? tabs[0].id : '')
  const [internalTab, setInternalTab] = useState(initialTab)
  const currentTab = isControlled ? controlledTab : internalTab
  const renderedTabsRef = useRef<Set<string>>(new Set([currentTab]))

  if (lazy && keepMounted) {
    renderedTabsRef.current.add(currentTab)
  }

  const tabItems = tabs.map((t) => ({
    id: t.id,
    label: t.label,
  }))

  const handleChange = (id: string) => {
    const tab = tabs.find((t) => t.id === id)
    if (tab !== undefined && tab.disabled !== true) {
      if (isControlled) {
        onTabChange(id)
      } else {
        setInternalTab(id)
      }
    }
  }

  const renderContent = () => {
    if (lazy && keepMounted) {
      const rendered = renderedTabsRef.current
      return tabs
        .filter((t) => rendered.has(t.id))
        .map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            hidden={t.id !== currentTab}
            className="gds-pad"
          >
            {t.content}
          </div>
        ))
    }

    const activeContent = tabs.find((t) => t.id === currentTab)
    if (activeContent === undefined) {
      return null
    }
    return (
      <div role="tabpanel" className="gds-pad">
        {activeContent.content}
      </div>
    )
  }

  return (
    <div
      className={cx(
        'gds-ctx gds-radius-card border-border overflow-hidden border',
        glass !== undefined && glass !== false
          ? cx('bg-bg/60 border-white/10', glassClass(glass))
          : '',
        className
      )}
      data-component="tab-group"
    >
      <Tabs
        tabs={tabItems}
        active={currentTab}
        onChange={handleChange}
        size="sm"
      />
      {renderContent()}
    </div>
  )
}
