import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Price } from '../price'

describe('Price', () => {
  it('renders with data-component', () => {
    const { container } = render(<Price value={100} />)
    expect(container.querySelector('[data-component="price"]')).not.toBeNull()
  })

  it('formats positive value with default currency', () => {
    const { container } = render(<Price value={1234} />)
    const el = container.querySelector('[data-component="price"]')
    expect(el?.textContent).toBe('\u00a51,234')
  })

  it('formats negative value with minus sign', () => {
    const { container } = render(<Price value={-500} />)
    const el = container.querySelector('[data-component="price"]')
    expect(el?.textContent).toBe('-\u00a5500')
  })
})
