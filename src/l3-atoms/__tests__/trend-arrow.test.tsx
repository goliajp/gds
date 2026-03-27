import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TrendArrow } from '../trend-arrow'

describe('TrendArrow', () => {
  it('renders up direction with success color', () => {
    const { container } = render(<TrendArrow direction="up" />)
    const el = container.querySelector('[data-component="trend-arrow"]')
    expect(el?.getAttribute('data-direction')).toBe('up')
    expect(el?.className).toContain('text-success')
  })

  it('renders down direction with danger color', () => {
    const { container } = render(<TrendArrow direction="down" />)
    const el = container.querySelector('[data-component="trend-arrow"]')
    expect(el?.getAttribute('data-direction')).toBe('down')
    expect(el?.className).toContain('text-danger')
  })

  it('renders flat direction with muted color', () => {
    const { container } = render(<TrendArrow direction="flat" />)
    const el = container.querySelector('[data-component="trend-arrow"]')
    expect(el?.getAttribute('data-direction')).toBe('flat')
    expect(el?.className).toContain('text-fg-muted')
  })
})
