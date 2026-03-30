// settings-layout — sidebar nav + content area for settings pages
import type { KeyboardEvent, ReactNode } from 'react'
import { useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'

type SettingsSection = {
  content: ReactNode
  id: string
  label: string
}

type SettingsLayoutProps = {
  activeSection?: string
  animated?: boolean
  className?: string
  defaultSection?: string
  navWidth?: number
  onSectionChange?: (sectionId: string) => void
  sections: SettingsSection[]
  stickyNav?: boolean
}

export function SettingsLayout({
  activeSection: controlledActiveId,
  animated = true,
  className,
  defaultSection,
  navWidth = 192,
  onSectionChange,
  sections,
  stickyNav = true,
}: SettingsLayoutProps) {
  const isControlled = controlledActiveId !== undefined && onSectionChange !== undefined
  const [internalId, setInternalId] = useState(defaultSection ?? sections[0]?.id ?? '')
  const activeId = isControlled ? controlledActiveId : internalId
  const currentSection = sections.find((s) => s.id === activeId)
  const navItemsRef = useRef<Map<string, HTMLButtonElement>>(new Map())
  const animationKey = useRef(0)

  const handleSelect = useCallback(
    (sectionId: string) => {
      if (isControlled) {
        onSectionChange(sectionId)
      } else {
        setInternalId(sectionId)
      }
      if (onSectionChange !== undefined && !isControlled) {
        onSectionChange(sectionId)
      }
      animationKey.current += 1
    },
    [isControlled, onSectionChange],
  )

  const handleNavKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
        return
      }
      e.preventDefault()
      const currentIndex = sections.findIndex((s) => s.id === activeId)
      if (currentIndex < 0) {
        return
      }
      let nextIndex = currentIndex
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0
      }
      if (e.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1
      }
      const nextSection = sections[nextIndex]
      if (nextSection === undefined) {
        return
      }
      handleSelect(nextSection.id)
      const btn = navItemsRef.current.get(nextSection.id)
      if (btn !== undefined) {
        btn.focus()
      }
    },
    [activeId, handleSelect, sections],
  )

  const setNavItemRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el !== null) {
      navItemsRef.current.set(id, el)
    } else {
      navItemsRef.current.delete(id)
    }
  }, [])

  return (
    <div
      className={cx('flex gap-6', className)}
      data-component="settings-layout"
    >
      <nav
        className="shrink-0"
        style={{
          width: navWidth,
          ...(stickyNav ? { position: 'sticky' as const, top: 0, alignSelf: 'flex-start' } : {}),
        }}
      >
        <ul
          className="flex flex-col gap-0.5"
          role="list"
          onKeyDown={handleNavKeyDown}
        >
          {sections.map((section) => (
            <li key={section.id}>
              <button
                ref={(el) => setNavItemRef(section.id, el)}
                type="button"
                className={cx(
                  'w-full rounded-md px-3 py-2 text-left gds-text-body transition-colors',
                  section.id === activeId
                    ? 'bg-accent/10 font-medium text-accent'
                    : 'text-fg-muted hover:bg-bg-tertiary hover:text-fg',
                )}
                onClick={() => handleSelect(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div
        key={animated ? `${activeId}-${animationKey.current}` : undefined}
        className={cx('min-w-0 flex-1', animated && 'animate-fade-in')}
      >
        {currentSection !== undefined ? currentSection.content : null}
      </div>
    </div>
  )
}

export type { SettingsLayoutProps, SettingsSection }
