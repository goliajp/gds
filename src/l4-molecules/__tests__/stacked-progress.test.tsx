import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StackedProgress } from '../stacked-progress'

const segments = [
  { label: 'A', value: 50 },
  { label: 'B', value: 30 },
  { label: 'C', value: 20 },
]

describe('StackedProgress', () => {
  it('renders with data-component', () => {
    const { container } = render(<StackedProgress segments={segments} />)
    expect(
      container.querySelector('[data-component="stacked-progress"]')
    ).not.toBeNull()
  })

  it('renders segment bars', () => {
    const { container } = render(<StackedProgress segments={segments} />)
    const bars = container.querySelector('.flex.h-3')!.children
    expect(bars.length).toBe(3)
  })

  it('shows labels by default', () => {
    const { getByText } = render(<StackedProgress segments={segments} />)
    expect(getByText('A')).toBeDefined()
    expect(getByText('B')).toBeDefined()
    expect(getByText('C')).toBeDefined()
  })

  it('shows percentage in labels', () => {
    const { getByText } = render(<StackedProgress segments={segments} />)
    expect(getByText('50.0%')).toBeDefined()
    expect(getByText('30.0%')).toBeDefined()
    expect(getByText('20.0%')).toBeDefined()
  })

  it('hides labels when showLabels is false', () => {
    const { queryByText } = render(
      <StackedProgress segments={segments} showLabels={false} />
    )
    expect(queryByText('A')).toBeNull()
  })

  it('uses custom color when provided', () => {
    const custom = [{ label: 'X', value: 100, color: '#ff0000' }]
    const { container } = render(<StackedProgress segments={custom} />)
    const bar = container.querySelector('.flex.h-3')!
      .firstElementChild as HTMLElement
    expect(bar.style.backgroundColor).toBe('#ff0000')
  })

  it('uses default colors when no custom color', () => {
    const { container } = render(
      <StackedProgress segments={[{ label: 'X', value: 100 }]} />
    )
    const bar = container.querySelector('.flex.h-3')!
      .firstElementChild as HTMLElement
    expect(bar.style.backgroundColor).toBe('var(--color-accent)')
  })

  it('skips segments with 0 value', () => {
    const withZero = [
      { label: 'A', value: 0 },
      { label: 'B', value: 100 },
    ]
    const { container } = render(<StackedProgress segments={withZero} />)
    const bars = container.querySelector('.flex.h-3')!.children
    expect(bars.length).toBe(1)
  })

  it('handles all-zero segments', () => {
    const allZero = [
      { label: 'A', value: 0 },
      { label: 'B', value: 0 },
    ]
    const { container } = render(<StackedProgress segments={allZero} />)
    const bars = container.querySelector('.flex.h-3')!.children
    expect(bars.length).toBe(0)
  })

  it('merges custom className', () => {
    const { container } = render(
      <StackedProgress segments={segments} className="extra" />
    )
    const el = container.querySelector('[data-component="stacked-progress"]')!
    expect(el.className).toContain('extra')
  })

  it('cycles default colors for many segments', () => {
    const many = Array.from({ length: 6 }, (_, i) => ({
      label: `S${i}`,
      value: 10,
    }))
    const { container } = render(<StackedProgress segments={many} />)
    const bars = container.querySelector('.flex.h-3')!.children
    expect(bars.length).toBe(6)
    // 6th segment should use color index 5 % 5 = 0 (first color again)
    const sixth = bars[5] as HTMLElement
    expect(sixth.style.backgroundColor).toBe('var(--color-accent)')
  })
})
