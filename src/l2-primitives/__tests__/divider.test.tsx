import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Divider } from '../divider'

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider data-testid="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
    expect(container.querySelector('[data-component="divider"]')).not.toBeNull()
  })

  it('renders vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const el = container.querySelector('[data-component="divider"]')
    expect(el?.className).toContain('flex-col')
  })

  it('renders icon in horizontal mode', () => {
    render(<Divider icon={<span data-testid="icon">+</span>} />)
    expect(screen.getByTestId('icon')).toBeTruthy()
  })

  it('merges className', () => {
    render(<Divider className="my-custom" data-testid="divider" />)
    expect(screen.getByTestId('divider').className).toContain('my-custom')
  })
})
