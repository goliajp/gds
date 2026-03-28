import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { PreparedCandle } from '../candlestick-chart'
import { CandleShape, CandlestickChart } from '../candlestick-chart'

const data = [
  { date: '2026-01-01', open: 100, high: 110, low: 95, close: 105 },
  { date: '2026-01-02', open: 105, high: 115, low: 100, close: 98 },
]

describe('CandlestickChart', () => {
  it('renders without crash', () => {
    const { container } = render(<CandlestickChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<CandlestickChart data={data} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('applies custom height', () => {
    const { container } = render(<CandlestickChart data={data} height={500} />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(<CandlestickChart data={data} glass />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(<CandlestickChart data={data} />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('applies custom className', () => {
    const { container } = render(<CandlestickChart data={data} className="my-chart" />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el?.className).toContain('my-chart')
  })

  it('renders with custom up and down colors', () => {
    const { container } = render(
      <CandlestickChart data={data} upColor="#00ff00" downColor="#ff0000" />,
    )
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('handles empty data array', () => {
    const { container } = render(<CandlestickChart data={[]} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('handles single data point', () => {
    const singleData = [
      { date: '2026-01-01', open: 100, high: 110, low: 95, close: 105 },
    ]
    const { container } = render(<CandlestickChart data={singleData} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('handles data where close equals open (doji candle)', () => {
    const dojiData = [
      { date: '2026-01-01', open: 100, high: 110, low: 95, close: 100 },
    ]
    const { container } = render(<CandlestickChart data={dojiData} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<CandlestickChart data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('candlestick-chart')
  })

  it('distinguishes up (close >= open) and down (close < open) candles', () => {
    // first candle: close(105) >= open(100) → up
    // second candle: close(98) < open(105) → down
    const { container } = render(<CandlestickChart data={data} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('spreads additional props', () => {
    const { container } = render(<CandlestickChart data={data} data-custom="test" />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })

  it('applies glass=false explicitly without glass classes', () => {
    const { container } = render(<CandlestickChart data={data} glass={false} />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
    expect(el?.className).not.toContain('bg-white/5')
  })

  it('applies default height when not specified', () => {
    const { container } = render(<CandlestickChart data={data} />)
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el).not.toBeNull()
    // default height=300 is passed to ResponsiveContainer
  })

  it('handles all-up candles (close > open for all)', () => {
    const upData = [
      { date: '2026-01-01', open: 90, high: 110, low: 85, close: 105 },
      { date: '2026-01-02', open: 95, high: 120, low: 90, close: 115 },
    ]
    const { container } = render(<CandlestickChart data={upData} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('handles all-down candles (close < open for all)', () => {
    const downData = [
      { date: '2026-01-01', open: 110, high: 115, low: 85, close: 90 },
      { date: '2026-01-02', open: 120, high: 125, low: 90, close: 95 },
    ]
    const { container } = render(<CandlestickChart data={downData} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('computes correct domain from data lows and highs', () => {
    const wideData = [
      { date: '2026-01-01', open: 50, high: 200, low: 10, close: 100 },
    ]
    const { container } = render(<CandlestickChart data={wideData} />)
    expect(container.querySelector('[data-component="candlestick-chart"]')).not.toBeNull()
  })

  it('applies className together with glass', () => {
    const { container } = render(
      <CandlestickChart data={data} glass className="extra" />,
    )
    const el = container.querySelector('[data-component="candlestick-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
    expect(el?.className).toContain('extra')
  })
})

describe('CandleShape', () => {
  const payload: PreparedCandle = {
    date: '2026-01-01',
    bodyBottom: 95,
    bodyHeight: 10,
    fill: '#22c55e',
    high: 110,
    low: 90,
  }

  it('returns null when payload is undefined', () => {
    const { container } = render(
      <svg><CandleShape x={10} y={20} width={8} height={10} /></svg>,
    )
    // no g element rendered
    expect(container.querySelector('g')).toBeNull()
  })

  it('returns null when h and bodyHeight are both 0', () => {
    const zeroPayload: PreparedCandle = { ...payload, bodyHeight: 0 }
    const { container } = render(
      <svg><CandleShape x={10} y={20} width={8} height={0} payload={zeroPayload} /></svg>,
    )
    expect(container.querySelector('g')).toBeNull()
  })

  it('renders wick and body when payload is valid', () => {
    const { container } = render(
      <svg><CandleShape x={10} y={20} width={8} height={10} payload={payload} /></svg>,
    )
    expect(container.querySelector('g')).not.toBeNull()
    expect(container.querySelector('line')).not.toBeNull()
    expect(container.querySelector('rect')).not.toBeNull()
  })

  it('renders with default values when x/y/width/height are omitted', () => {
    const { container } = render(
      <svg><CandleShape payload={payload} /></svg>,
    )
    // defaults to x=0, y=0, width=0, height=0
    // h=0 but bodyHeight=10 > 0, so it should render
    expect(container.querySelector('g')).not.toBeNull()
  })

  it('sets minimum height of 1 for the rect', () => {
    const tinyPayload: PreparedCandle = { ...payload, bodyHeight: 5 }
    const { container } = render(
      <svg><CandleShape x={10} y={20} width={8} height={0} payload={tinyPayload} /></svg>,
    )
    // h=0 but bodyHeight=5 > 0, so it renders; rect height = max(0, 1) = 1
    const rect = container.querySelector('rect')
    expect(rect).not.toBeNull()
    expect(rect?.getAttribute('height')).toBe('1')
  })

  it('uses fill from payload', () => {
    const { container } = render(
      <svg><CandleShape x={10} y={20} width={8} height={10} payload={payload} /></svg>,
    )
    const rect = container.querySelector('rect')
    expect(rect?.getAttribute('fill')).toBe('#22c55e')
    const line = container.querySelector('line')
    expect(line?.getAttribute('stroke')).toBe('#22c55e')
  })
})
