import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProfileCard } from '../profile-card'

describe('ProfileCard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ProfileCard name="Alice" />)
    expect(container.querySelector('[data-component="profile-card"]')).not.toBeNull()
  })

  it('renders name', () => {
    render(<ProfileCard name="Alice Smith" />)
    expect(screen.getByText('Alice Smith')).toBeDefined()
  })

  it('renders avatar with src', () => {
    const { container } = render(<ProfileCard name="Alice" avatar="https://example.com/a.jpg" />)
    const avatar = container.querySelector('[data-component="avatar"] img')
    expect(avatar).not.toBeNull()
    expect((avatar as HTMLImageElement).src).toBe('https://example.com/a.jpg')
  })

  it('renders stats', () => {
    render(
      <ProfileCard
        name="Alice"
        stats={[
          { label: 'Posts', value: '42' },
          { label: 'Followers', value: '1.2k' },
        ]}
      />,
    )
    expect(screen.getByText('42')).toBeDefined()
    expect(screen.getByText('Posts')).toBeDefined()
    expect(screen.getByText('1.2k')).toBeDefined()
    expect(screen.getByText('Followers')).toBeDefined()
  })
})
