import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NotificationDot } from '../notification-dot'

describe('NotificationDot', () => {
  it('renders children', () => {
    render(<NotificationDot count={3}><span>Icon</span></NotificationDot>)
    expect(screen.getByText('Icon')).toBeDefined()
  })

  it('hides badge when count is 0', () => {
    const { container } = render(<NotificationDot count={0}><span>Icon</span></NotificationDot>)
    expect(container.querySelector('.absolute')).toBeNull()
  })

  it('shows max+ when count exceeds max', () => {
    render(<NotificationDot count={150} max={99}><span>Icon</span></NotificationDot>)
    expect(screen.getByText('99+')).toBeDefined()
  })
})
