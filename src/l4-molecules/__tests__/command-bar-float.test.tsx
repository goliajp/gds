import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CommandBarFloat } from '../command-bar-float'

const actions = [
  { id: 'add', label: 'Add', icon: <span>+</span>, onClick: vi.fn() },
]

describe('CommandBarFloat', () => {
  it('renders without crash', () => {
    const { container } = render(<CommandBarFloat actions={actions} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<CommandBarFloat actions={actions} />)
    expect(container.querySelector('[data-component="command-bar-float"]')).not.toBeNull()
  })

  it('renders toggle button', () => {
    const { container } = render(<CommandBarFloat actions={actions} />)
    const button = container.querySelector('button')
    expect(button).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<CommandBarFloat className="custom" actions={actions} />)
    expect(container.querySelector('[data-component="command-bar-float"]')?.className).toContain('custom')
  })
})
