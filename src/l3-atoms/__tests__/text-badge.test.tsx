import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextBadge } from '../text-badge'

describe('TextBadge', () => {
  it('renders label text', () => {
    render(<TextBadge label="NEW" />)
    expect(screen.getByText('NEW')).toBeTruthy()
  })

  it('has data-component and data-variant', () => {
    const { container } = render(<TextBadge label="BETA" variant="warning" />)
    const el = container.querySelector('[data-component="text-badge"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('data-variant')).toBe('warning')
  })

  it('defaults variant to accent', () => {
    const { container } = render(<TextBadge label="PRO" />)
    const el = container.querySelector('[data-component="text-badge"]')
    expect(el?.getAttribute('data-variant')).toBe('accent')
  })
})
