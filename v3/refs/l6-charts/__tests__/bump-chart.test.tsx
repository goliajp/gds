import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BumpChart } from '../bump-chart'

const data = [
  { name: 'W1', alpha: 1, beta: 3 },
  { name: 'W2', alpha: 2, beta: 1 },
  { name: 'W3', alpha: 3, beta: 2 },
]

describe('BumpChart', () => {
  it('renders without crash', () => {
    const { container } = render(
      <BumpChart data={data} series={['alpha', 'beta']} />
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <BumpChart data={data} series={['alpha', 'beta']} />
    )
    expect(
      container.querySelector('[data-component="bump-chart"]')
    ).not.toBeNull()
  })

  it('respects height prop', () => {
    const { container } = render(
      <BumpChart data={data} height={500} series={['alpha']} />
    )
    const rc = container.querySelector('.recharts-responsive-container')
    expect(rc?.getAttribute('style')).toContain('500')
  })

  it('applies glass class', () => {
    const { container } = render(
      <BumpChart data={data} glass series={['alpha']} />
    )
    const el = container.querySelector('[data-component="bump-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })
})
