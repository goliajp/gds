import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AvatarBadge } from '../avatar-badge'

describe('AvatarBadge', () => {
  it('renders avatar with name', () => {
    render(<AvatarBadge name="Alice" />)
    expect(screen.getByText('AL')).toBeDefined()
  })

  it('shows badge count when count > 0', () => {
    const { container } = render(<AvatarBadge name="Alice" count={5} />)
    expect(screen.getByText('5')).toBeDefined()
    expect(container.querySelector('[data-component="badge"]')).not.toBeNull()
  })

  it('hides badge when count is 0', () => {
    const { container } = render(<AvatarBadge name="Alice" count={0} />)
    expect(container.querySelector('[data-component="badge"]')).toBeNull()
  })

  it('shows maxCount overflow', () => {
    render(<AvatarBadge name="Alice" count={150} maxCount={99} />)
    expect(screen.getByText('99+')).toBeDefined()
  })
})
