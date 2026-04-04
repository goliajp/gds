// kv-table — key-value display table for entity details
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { cx } from '../utils/cx'

export type KvTableItem = {
  key: string
  value: ReactNode
  copyable?: boolean
}

export type KvTableProps = {
  items: KvTableItem[]
  columns?: 1 | 2
  striped?: boolean
  className?: string
}

export const KvTable = forwardRef<HTMLDivElement, KvTableProps>(
  function KvTable({ items, columns = 1, striped, className }, ref) {
    const isTwoCol = columns === 2

    return (
      <div
        ref={ref}
        className={cx(
          'gds-text-body',
          isTwoCol && 'grid grid-cols-2 gap-x-6',
          className
        )}
        data-component="kv-table"
        data-variant={isTwoCol ? '2col' : '1col'}
      >
        {items.map((item, i) => (
          <KvRow
            key={item.key}
            item={item}
            striped={striped === true && i % 2 === 1}
          />
        ))}
      </div>
    )
  }
)

function KvRow({ item, striped }: { item: KvTableItem; striped: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text =
      typeof item.value === 'string' ? item.value : String(item.value)
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cx(
        'group gds-pad-x gds-pad-y-sm flex items-baseline justify-between gap-4',
        striped && 'bg-bg-tertiary/40'
      )}
    >
      <dt className="text-fg-muted shrink-0 font-medium">{item.key}</dt>
      <dd className="text-fg flex items-center gap-1.5 text-right">
        <span>{item.value}</span>
        {item.copyable === true && (
          <button
            onClick={handleCopy}
            className="text-fg-muted/50 hover:text-fg-muted invisible group-hover:visible"
            aria-label={`Copy ${item.key}`}
          >
            {copied ? '✓' : '⎘'}
          </button>
        )}
      </dd>
    </div>
  )
}
