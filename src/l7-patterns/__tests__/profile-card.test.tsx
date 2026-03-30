import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProfileCard } from '../profile-card'

describe('ProfileCard', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ProfileCard name="Alice" />)
    expect(
      container.querySelector('[data-component="profile-card"]')
    ).not.toBeNull()
  })

  it('renders name', () => {
    render(<ProfileCard name="Alice Smith" />)
    expect(screen.getByText('Alice Smith')).toBeDefined()
  })

  it('renders avatar with src', () => {
    const { container } = render(
      <ProfileCard name="Alice" avatar="https://example.com/a.jpg" />
    )
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
      />
    )
    expect(screen.getByText('42')).toBeDefined()
    expect(screen.getByText('Posts')).toBeDefined()
    expect(screen.getByText('1.2k')).toBeDefined()
    expect(screen.getByText('Followers')).toBeDefined()
  })

  it('renders role when provided', () => {
    render(<ProfileCard name="Alice" role="Designer" />)
    expect(screen.getByText('Designer')).toBeDefined()
  })

  it('does not render role when not provided', () => {
    const { container } = render(<ProfileCard name="Alice" />)
    const texts = container.querySelectorAll('p')
    // only the name paragraph should exist
    expect(texts.length).toBe(1)
  })

  it('renders actions when provided', () => {
    render(<ProfileCard name="Alice" actions={<button>Follow</button>} />)
    expect(screen.getByText('Follow')).toBeDefined()
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<ProfileCard name="Alice" glass />)
    const el = container.querySelector('[data-component="profile-card"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(<ProfileCard name="Alice" />)
    const el = container.querySelector('[data-component="profile-card"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('does not render stats section with empty array', () => {
    const { container } = render(<ProfileCard name="Alice" stats={[]} />)
    container.querySelectorAll(
      '[data-component="profile-card"] > div:last-child span'
    )
    // no stat values rendered
    expect(container.textContent).not.toContain('Posts')
  })
})
