// tree — recursive collapsible tree view
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type TreeNode = {
  id: string
  label: string
  icon?: ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export type TreeProps = {
  nodes: TreeNode[]
  onSelect?: (id: string) => void
  selected?: string
  defaultExpanded?: string[]
  className?: string
}

function ChevronSvg({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={cx('h-3 w-3 shrink-0 text-fg-muted transition-transform', expanded && 'rotate-90')}
      viewBox="0 0 12 12"
      fill="currentColor"
    >
      <path d="M4 2L8 6L4 10V2Z" />
    </svg>
  )
}

function TreeNodeItem({
  node,
  depth,
  selected,
  expanded,
  onToggle,
  onSelect,
}: {
  node: TreeNode
  depth: number
  selected?: string
  expanded: Set<string>
  onToggle: (id: string) => void
  onSelect?: (id: string) => void
}) {
  const hasChildren = node.children !== undefined && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id
  const isDisabled = node.disabled === true

  const handleClick = () => {
    if (isDisabled) return
    if (hasChildren) {
      onToggle(node.id)
    }
    if (onSelect !== undefined) {
      onSelect(node.id)
    }
  }

  return (
    <div>
      <button
        className={cx(
          'flex w-full items-center gds-gap-sm gds-radius-button gds-pad-x-sm gds-pad-y-sm text-sm select-none',
          isSelected ? 'bg-accent/10 text-accent' : 'text-fg hover:bg-bg-secondary',
          isDisabled && 'cursor-not-allowed opacity-50',
          focusCls,
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        disabled={isDisabled}
        data-state={isSelected ? 'selected' : undefined}
      >
        {hasChildren ? (
          <ChevronSvg expanded={isExpanded} />
        ) : (
          <span className="h-3 w-3 shrink-0" />
        )}
        {node.icon !== undefined && (
          <span className="shrink-0 text-fg-muted">{node.icon}</span>
        )}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && isExpanded && (
        <div>
          {node.children?.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selected={selected}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const Tree = forwardRef<HTMLDivElement, TreeProps>(
  function Tree({ nodes, onSelect, selected, defaultExpanded, className }, ref) {
    const [expanded, setExpanded] = useState<Set<string>>(
      () => new Set(defaultExpanded ?? []),
    )

    const handleToggle = useCallback((id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }, [])

    return (
      <div
        ref={ref}
        className={cx('flex flex-col gds-gap-xs', className)}
        data-component="tree"
        role="tree"
      >
        {nodes.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            depth={0}
            selected={selected}
            expanded={expanded}
            onToggle={handleToggle}
            onSelect={onSelect}
          />
        ))}
      </div>
    )
  },
)
