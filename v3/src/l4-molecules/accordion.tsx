// accordion — expandable sections with single/multiple mode
import type { KeyboardEvent, ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type AccordionType = 'multiple' | 'single'

type AccordionContextValue = {
  expanded: string[]
  toggle: (id: string) => void
}

const AccordionContext = createContext<AccordionContextValue>({
  expanded: [],
  toggle: () => {},
})

type AccordionProps = {
  children: ReactNode
  type?: AccordionType
  defaultExpanded?: string[]
  className?: string
}

function Accordion({
  children,
  type = 'single',
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded)

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const isOpen = prev.includes(id)
      if (isOpen) return prev.filter((x) => x !== id)
      if (type === 'single') return [id]
      return [...prev, id]
    })
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (
      e.key !== 'ArrowUp' &&
      e.key !== 'ArrowDown' &&
      e.key !== 'Home' &&
      e.key !== 'End'
    ) {
      return
    }
    const triggers = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        'button[aria-expanded]'
      )
    )
    const current = triggers.indexOf(e.target as HTMLButtonElement)
    if (current < 0) return

    e.preventDefault()
    let nextIndex = current
    if (e.key === 'ArrowDown') {
      nextIndex = (current + 1) % triggers.length
    } else if (e.key === 'ArrowUp') {
      nextIndex = (current - 1 + triggers.length) % triggers.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = triggers.length - 1
    }
    triggers[nextIndex]?.focus()
  }

  return (
    <div
      className={cx('divide-border divide-y', className)}
      data-component="accordion"
      onKeyDown={handleKeyDown}
    >
      <AccordionContext.Provider value={{ expanded, toggle }}>
        {children}
      </AccordionContext.Provider>
    </div>
  )
}

type AccordionItemProps = {
  id: string
  title: string
  children: ReactNode
  disabled?: boolean
  className?: string
}

function AccordionItem({
  id,
  title,
  children,
  disabled,
  className,
}: AccordionItemProps) {
  const { expanded, toggle } = useContext(AccordionContext)
  const isOpen = expanded.includes(id)

  return (
    <div className={cx(className)} data-state={isOpen ? 'open' : 'closed'}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => toggle(id)}
        className={cx(
          'gds-pad-y-lg text-fg flex w-full items-center justify-between text-left gds-text-body font-medium transition-colors',
          focusCls,
          disabled === true && 'pointer-events-none opacity-40'
        )}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cx(
            'shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <path d="M3.5 5.5l3.5 3 3.5-3" />
        </svg>
      </button>
      {isOpen && (
        <div className="gds-text-body text-fg-muted pb-3">{children}</div>
      )}
    </div>
  )
}

export { Accordion, AccordionItem }
export type { AccordionItemProps, AccordionProps }
