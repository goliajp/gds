import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AvatarList } from '../avatar-list'

const users = [
  { name: 'Alice', role: 'Engineer', status: 'online' as const },
  { name: 'Bob', role: 'Designer', status: 'away' as const },
  { name: 'Charlie' },
]

describe('AvatarList', () => {
  it('renders all users', () => {
    const { container, getByText } = render(<AvatarList users={users} />)
    expect(container.querySelector('[data-component="avatar-list"]')).not.toBeNull()
    expect(getByText('Alice')).toBeDefined()
    expect(getByText('Bob')).toBeDefined()
    expect(getByText('Charlie')).toBeDefined()
  })

  it('shows roles by default', () => {
    const { getByText } = render(<AvatarList users={users} />)
    expect(getByText('Engineer')).toBeDefined()
    expect(getByText('Designer')).toBeDefined()
  })

  it('compact mode hides roles', () => {
    const { queryByText } = render(<AvatarList users={users} compact />)
    expect(queryByText('Engineer')).toBeNull()
    expect(queryByText('Designer')).toBeNull()
  })

  it('calls onSelect when user is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { getByText } = render(<AvatarList users={users} onSelect={onSelect} />)
    await user.click(getByText('Alice'))
    expect(onSelect).toHaveBeenCalledWith('Alice')
  })
})
