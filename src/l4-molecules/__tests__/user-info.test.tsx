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
})
