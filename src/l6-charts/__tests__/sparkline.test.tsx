import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Sparkline } from '../sparkline'

const data = [{ v: 1 }, { v: 3 }, { v: 2 }, { v: 5 }]

describe('Sparkline', () => {
  it('renders without crash', () => {
    const { container } = render(<Sparkline data={data} dataKey="v" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Sparkline data={data} dataKey="v" />)
    expect(container.querySelector('[data-component="sparkline"]')).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<Sparkline className="custom-class" data={data} dataKey="v" />)
    const el = container.querySelector('[data-component="sparkline"]')
    expect(el?.className).toContain('custom-class')
  })
})
