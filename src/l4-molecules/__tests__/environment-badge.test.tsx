import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EnvironmentBadge } from '../environment-badge'

describe('EnvironmentBadge', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<EnvironmentBadge env="production" />)
    expect(container.querySelector('[data-component="environment-badge"]')).not.toBeNull()
  })

  it('renders environment name', () => {
    render(<EnvironmentBadge env="staging" />)
    expect(screen.getByText('staging')).toBeDefined()
  })

  it('hides dot when showDot is false', () => {
    const { container } = render(<EnvironmentBadge env="development" showDot={false} />)
    const badge = container.querySelector('[data-component="environment-badge"]') as HTMLElement
    const dots = badge.querySelectorAll('.rounded-full')
    expect(dots.length).toBe(0)
  })
})
