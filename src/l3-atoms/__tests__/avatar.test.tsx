import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, AvatarGroup } from '../avatar'

describe('Avatar', () => {
  it('renders initials from a single-word name', () => {
    render(<Avatar name="Alice" />)
    expect(screen.getByText('AL')).toBeDefined()
  })

  it('renders initials from a multi-word name', () => {
    render(<Avatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeDefined()
  })

  it('renders ? when no name is given', () => {
    render(<Avatar />)
    expect(screen.getByText('?')).toBeDefined()
  })

  it('renders an img when src is provided', () => {
    render(<Avatar name="Alice" src="/photo.jpg" />)
    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe('/photo.jpg')
    expect(img.getAttribute('alt')).toBe('Alice')
  })

  it('renders a status indicator when status is set', () => {
    const { container } = render(<Avatar name="A" status="online" />)
    const root = container.querySelector('[data-component="avatar"]')
    // status indicator is the last child span of the root
    const children = root?.querySelectorAll(':scope > span')
    expect(children?.length).toBe(2) // initials span + status span
  })

  it('applies size variant classes', () => {
    const { container } = render(<Avatar name="A" size="lg" />)
    const el = container.querySelector('[data-component="avatar"]')
    expect(el?.className).toContain('h-10')
    expect(el?.className).toContain('w-10')
  })

  it('has data-component="avatar"', () => {
    const { container } = render(<Avatar name="A" />)
    expect(container.querySelector('[data-component="avatar"]')).not.toBeNull()
  })
})

describe('AvatarGroup', () => {
  it('renders all children when max is not set', () => {
    render(
      <AvatarGroup>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
      </AvatarGroup>,
    )
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('B')).toBeDefined()
    expect(screen.getByText('C')).toBeDefined()
  })

  it('shows overflow counter when max is exceeded', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>,
    )
    expect(screen.getByText('+2')).toBeDefined()
  })

  it('has data-component="avatar-group"', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar name="A" />
      </AvatarGroup>,
    )
    expect(container.querySelector('[data-component="avatar-group"]')).not.toBeNull()
  })
})
