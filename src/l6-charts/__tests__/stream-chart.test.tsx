import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StreamChart } from '../stream-chart'

const data = [
  { name: 'Jan', a: 10, b: 20, c: 30 },
  { name: 'Feb', a: 15, b: 25, c: 20 },
  { name: 'Mar', a: 20, b: 15, c: 35 },
]

describe('StreamChart', () => {
  it('renders chart container', () => {
    const { container } = render(
      <StreamChart data={data} keys={['a', 'b', 'c']} />
    )
    expect(
      container.querySelector('[data-component="stream-chart"]')
    ).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<StreamChart data={data} keys={['a', 'b']} />)
    expect(
      container.querySelector('[data-component="stream-chart"]')
    ).not.toBeNull()
  })

  it('respects height prop', () => {
    const { container } = render(
      <StreamChart data={data} height={400} keys={['a']} />
    )
    const rc = container.querySelector('.recharts-responsive-container')
    expect(rc?.getAttribute('style')).toContain('400')
  })

  it('applies glass class', () => {
    const { container } = render(<StreamChart data={data} glass keys={['a']} />)
    const el = container.querySelector('[data-component="stream-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })
})
