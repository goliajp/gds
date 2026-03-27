// settings-layout — sidebar nav + content area for settings pages
import type { ReactNode } from 'react'
import { useState } from 'react'

import { cx } from '../utils/cx'

type SettingsSection = {
  content: ReactNode
  id: string
  label: string
}

type SettingsLayoutProps = {
  className?: string
  defaultSection?: string
  sections: SettingsSection[]
}

export function SettingsLayout({ className, defaultSection, sections }: SettingsLayoutProps) {
  const [activeId, setActiveId] = useState(defaultSection ?? sections[0]?.id ?? '')
  const activeSection = sections.find((s) => s.id === activeId)

  return (
    <div
      className={cx('flex gap-6', className)}
      data-component="settings-layout"
    >
      <nav className="w-48 shrink-0">
        <ul className="flex flex-col gap-0.5" role="list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={cx(
                  'w-full rounded-md px-3 py-2 text-left gds-text-body transition-colors',
                  section.id === activeId
                    ? 'bg-accent/10 font-medium text-accent'
                    : 'text-fg-muted hover:bg-bg-tertiary hover:text-fg',
                )}
                onClick={() => setActiveId(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="min-w-0 flex-1">
        {activeSection !== undefined ? activeSection.content : null}
      </div>
    </div>
  )
}

export type { SettingsLayoutProps, SettingsSection }
