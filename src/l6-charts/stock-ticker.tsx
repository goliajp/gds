// stock-ticker — scrolling ticker tape with price and change indicators
import { cx } from '../utils/cx'

type TickerItem = { change: number; price: number; symbol: string }
type StockTickerProps = { className?: string; items: TickerItem[] }

function TickerEntry({ item }: { item: TickerItem }) {
  const isPositive = item.change > 0
  const isNegative = item.change < 0
  const arrow = isPositive ? '\u25B2' : isNegative ? '\u25BC' : ''
  const sign = isPositive ? '+' : ''

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 px-3 text-sm select-none">
      <span className="font-bold text-fg">{item.symbol}</span>
      <span className="text-fg-muted tabular-nums">{'\u00A5'}{item.price.toLocaleString()}</span>
      <span className={cx('text-xs font-medium tabular-nums', isPositive && 'text-success', isNegative && 'text-danger', !isPositive && !isNegative && 'text-fg-muted')}>
        {arrow}{sign}{item.change}%
      </span>
    </span>
  )
}

export function StockTicker({ className, items }: StockTickerProps) {
  return (
    <div className={cx('flex overflow-hidden border-y border-border bg-bg-secondary select-none', className)} data-component="stock-ticker">
      <div className="flex shrink-0 animate-marquee items-center gap-2 py-1.5">
        {items.map((item) => <TickerEntry item={item} key={item.symbol} />)}
      </div>
      <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-2 py-1.5">
        {items.map((item) => <TickerEntry item={item} key={item.symbol} />)}
      </div>
    </div>
  )
}

export type { StockTickerProps, TickerItem }
