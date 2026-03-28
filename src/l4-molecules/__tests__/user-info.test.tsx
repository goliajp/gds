import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UserInfo } from '../user-info'

describe('UserInfo', () => {
  it('renders name', () => {
    render(<UserInfo name="Alice Zhang" />)
    expect(screen.getByText('Alice Zhang')).toBeDefined()
  })

  it('renders role when provided', () => {
    render(<UserInfo name="Bob" role="Engineer" />)
    expect(screen.getByText('Engineer')).toBeDefined()
  })

  it('has data-component attribute', () => {
    const { container } = render(<UserInfo name="Charlie" />)
    expect(container.querySelector('[data-component="user-info"]')).not.toBeNull()
  })

  it('uses sm size variant', () => {
    const { container } = render(<UserInfo name="Alice" size="sm" />)
    const name = container.querySelector('.text-xs.font-medium')
    expect(name).not.toBeNull()
  })

  it('uses default size variant', () => {
    const { container } = render(<UserInfo name="Alice" size="default" />)
    const name = container.querySelector('.text-sm.font-medium')
    expect(name).not.toBeNull()
  })

  it('does not render role when not provided', () => {
    render(<UserInfo name="Alice" />)
    // only the name text should appear
    expect(screen.queryByText('Engineer')).toBeNull()
  })

  it('renders role with sm size class', () => {
    const { container } = render(<UserInfo name="Alice" role="Admin" size="sm" />)
    const roleEl = container.querySelector('.text-\\[10px\\]')
    expect(roleEl).not.toBeNull()
  })

  it('renders avatar src when provided', () => {
    const { container } = render(<UserInfo name="Alice" avatar="https://example.com/pic.jpg" />)
    const img = container.querySelector('img')
    expect(img?.getAttribute('src')).toBe('https://example.com/pic.jpg')
  })
})
