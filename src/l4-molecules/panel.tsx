// panel — collapsible panel with header bar
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  glass?: boolean
  headerAction?: ReactNode
  title: string
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cx(
        'text-fg-muted h-3.5 w-3.5 shrink-0 transition-transform duration-200',
        open && 'rotate-90'
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  {
    children,
    className,
    collapsible = true,
    defaultOpen = true,
    glass,
    headerAction,
    title,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const expanded = collapsible ? isOpen : true

  return (
    <div
      className={cx(
        'gds-ctx gds-radius-popover border-border bg-surface border',
        glassClass(glass),
        glass === true && 'border-white/10 bg-white/5',
        className
      )}
      data-component="panel"
      data-state={expanded ? 'open' : 'closed'}
      ref={ref}
      {...props}
    >
      <div className="border-border gds-pad-x gds-pad-y-sm flex items-center border-b">
        {collapsible ? (
          <button
            className={cx(
              'text-fg flex flex-1 items-center gap-2 text-left text-sm font-medium',
              focusCls
            )}
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            <ChevronIcon open={expanded} />
            <span>{title}</span>
          </button>
        ) : (
          <span className="text-fg flex-1 text-sm font-medium">{title}</span>
        )}
        {headerAction !== undefined && (
          <div className="ml-2 shrink-0">{headerAction}</div>
        )}
      </div>
      {expanded && <div className="gds-pad-x gds-pad-y">{children}</div>}
    </div>
  )
})

export type { PanelProps }
