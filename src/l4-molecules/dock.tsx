import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type DockItem = {
  icon: ReactNode
  id: string
  label: string
}

type DockProps = React.HTMLAttributes<HTMLDivElement> & {
  glass?: boolean
  items: DockItem[]
  onSelect: (id: string) => void
}

export const Dock = forwardRef<HTMLDivElement, DockProps>(
  function Dock(
    { className, glass = true, items, onSelect, ...props },
    ref,
  ) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
      <div
        className={cx(
          'inline-flex items-end gap-1 gds-radius-card p-2',
          'border border-white/[0.06] bg-bg-secondary/80',
          glassClass(glass === true ? true : undefined),
          glass === true && 'border-white/10',
          className,
        )}
        data-component="dock"
        ref={ref}
        {...props}
      >
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index
          const isNeighbor =
            hoveredIndex !== null &&
            Math.abs(index - hoveredIndex) === 1

          let scale = 1
          if (isHovered) {
            scale = 1.3
          } else if (isNeighbor) {
            scale = 1.1
          }

          return (
            <div
              key={item.id}
              className="group relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* tooltip */}
              <span
                className={cx(
                  'pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-bg-secondary px-2 py-1 text-[10px] text-fg-muted shadow-lg',
                  'transition-opacity duration-150',
                  isHovered ? 'opacity-100' : 'opacity-0',
                )}
                data-testid={`dock-tooltip-${item.id}`}
              >
                {item.label}
              </span>

              {/* icon button */}
              <button
                className={cx(
                  'flex items-center justify-center rounded-lg p-2',
                  'transition-transform duration-200',
                  'hover:bg-white/[0.06]',
                )}
                data-testid={`dock-item-${item.id}`}
                onClick={() => onSelect(item.id)}
                style={{
                  transform: `scale(${scale})`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                type="button"
              >
                <span className="gds-icon-child">{item.icon}</span>
              </button>
            </div>
          )
        })}
      </div>
    )
  },
)

export type { DockItem, DockProps }
