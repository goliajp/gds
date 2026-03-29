import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CircularMenu } from '../circular-menu'

const items = [
  { id: 'a', label: 'Edit', icon: <span>E</span> },
  { id: 'b', label: 'Delete', icon: <span>D</span> },
]

describe('CircularMenu', () => {
  it('renders without crash', () => {
    const { container } = render(<CircularMenu items={items} trigger={<button>Open</button>} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<CircularMenu items={items} trigger={<button>Open</button>} />)
    expect(container.querySelector('[data-component="circular-menu"]')).not.toBeNull()
  })

  it('renders trigger element', () => {
    render(<CircularMenu items={items} trigger={<button>Open</button>} />)
    expect(screen.getByText('Open')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<CircularMenu className="custom" items={items} trigger={<button>T</button>} />)
    expect(container.querySelector('[data-component="circular-menu"]')?.className).toContain('custom')
  })
})
