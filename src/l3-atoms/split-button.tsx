// split-button — primary action + dropdown menu trigger
import type { ReactNode } from 'react'
import { forwardRef, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'
import { useClickOutside, useEscapeKey } from '../utils/hooks'

type SplitButtonVariant = 'danger' | 'primary' | 'secondary'
type SplitButtonSize = 'default' | 'lg' | 'sm'

type SplitButtonItem = {
  id: string
  label: string
  danger?: boolean
}

type SplitButtonProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> & {
  children: ReactNode
  variant?: SplitButtonVariant
  size?: SplitButtonSize
  items: SplitButtonItem[]
  onSelect: (id: string) => void
  onClick?: () => void
  disabled?: boolean
}

const variantClasses: Record<SplitButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent/90',
  secondary: 'bg-bg-secondary text-fg border border-border hover:bg-bg-tertiary',
  danger: 'bg-danger text-white hover:bg-danger/90',
}

const dividerClasses: Record<SplitButtonVariant, string> = {
  primary: 'border-l-white/20',
  secondary: 'border-l-border',
  danger: 'border-l-white/20',
}

const sizeClasses: Record<SplitButtonSize, { main: string, trigger: string }> = {
  sm: { main: 'px-2.5 py-1 text-xs', trigger: 'px-1.5 py-1' },
  default: { main: 'px-3 py-1.5 text-sm', trigger: 'px-2 py-1.5' },
  lg: { main: 'px-4 py-2 text-sm', trigger: 'px-2.5 py-2' },
}

const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  function SplitButton({ children, variant = 'primary', size = 'default', items, onSelect, onClick, disabled, className, ...props }, ref) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    useClickOutside(containerRef, open, () => setOpen(false))
    useEscapeKey(open, () => setOpen(false))

    const v = variant ?? 'primary'
    const s = size ?? 'default'

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cx('relative inline-flex', className)}
        data-component="split-button"
        data-variant={v}
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        <div className="inline-flex">
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cx(
              'inline-flex select-none items-center font-medium transition-colors rounded-l-md',
              variantClasses[v],
              sizeClasses[s].main,
              focusCls,
              disabled === true && 'pointer-events-none opacity-50',
            )}
          >
            {children}
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="More actions"
            className={cx(
              'inline-flex select-none items-center border-l font-medium transition-colors rounded-r-md',
              variantClasses[v],
              dividerClasses[v],
              sizeClasses[s].trigger,
              focusCls,
              disabled === true && 'pointer-events-none opacity-50',
            )}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] animate-popup gds-radius-popover border border-border bg-surface py-1 gds-shadow-lg">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id)
                  setOpen(false)
                }}
                className={cx(
                  'flex w-full items-center gds-pad-x gds-pad-y-sm gds-text-body transition-colors',
                  focusCls,
                  item.danger === true
                    ? 'text-danger hover:bg-danger/10'
                    : 'text-fg hover:bg-bg-tertiary',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  },
)

export { SplitButton }
export type { SplitButtonItem, SplitButtonProps, SplitButtonSize, SplitButtonVariant }
