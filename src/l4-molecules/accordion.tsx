// accordion — expandable sections with single/multiple mode
import type { ReactNode } from 'react'
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

export type AccordionProps = {
  children: ReactNode
  type?: AccordionType
  defaultExpanded?: string[]
  className?: string
}

export function Accordion({ children, type = 'single', defaultExpanded = [], className }: AccordionProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded)

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const isOpen = prev.includes(id)
      if (isOpen) return prev.filter((x) => x !== id)
      if (type === 'single') return [id]
      return [...prev, id]
    })
  }

  return (
    <div className={cx('divide-y divide-border', className)} data-component="accordion">
      <AccordionContext.Provider value={{ expanded, toggle }}>
        {children}
      </AccordionContext.Provider>
    </div>
  )
}

export type AccordionItemProps = {
  id: string
  title: string
  children: ReactNode
  disabled?: boolean
  className?: string
}

export function AccordionItem({ id, title, children, disabled, className }: AccordionItemProps) {
  const { expanded, toggle } = useContext(AccordionContext)
  const isOpen = expanded.includes(id)

  return (
    <div className={cx(className)} data-state={isOpen ? 'open' : 'closed'}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => toggle(id)}
        className={cx(
          'flex w-full items-center justify-between gds-pad-y-lg text-left text-sm font-medium text-fg transition-colors',
          focusCls,
          disabled === true && 'pointer-events-none opacity-40',
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
          className={cx('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
        >
          <path d="M3.5 5.5l3.5 3 3.5-3" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-3 gds-text-body text-fg-muted">{children}</div>
      )}
    </div>
  )
}
