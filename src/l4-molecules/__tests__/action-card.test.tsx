import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ActionCard } from '../action-card'

describe('ActionCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<ActionCard title="Create" onClick={() => {}} />)
    expect(container.querySelector('[data-component="action-card"]')).not.toBeNull()
  })

  it('renders title and description', () => {
    render(<ActionCard title="Deploy" description="Push to production" onClick={() => {}} />)
    expect(screen.getByText('Deploy')).toBeDefined()
    expect(screen.getByText('Push to production')).toBeDefined()
  })

  it('calls onClick when clicked', () => {
    const fn = vi.fn()
    render(<ActionCard title="Run" onClick={fn} />)
    fireEvent.click(screen.getByText('Run'))
    expect(fn).toHaveBeenCalledOnce()
  })
})
