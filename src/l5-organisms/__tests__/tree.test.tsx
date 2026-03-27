import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tree } from '../tree'

const nodes = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'index', label: 'index.ts' },
      { id: 'app', label: 'app.tsx' },
    ],
  },
  { id: 'readme', label: 'README.md' },
]

describe('Tree', () => {
  it('renders without crash', () => {
    const { container } = render(<Tree nodes={nodes} />)
    expect(container.querySelector('[data-component="tree"]')).not.toBeNull()
  })

  it('has data-component and role attributes', () => {
    const { container } = render(<Tree nodes={nodes} />)
    const el = container.querySelector('[data-component="tree"]')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('role')).toBe('tree')
  })

  it('renders top-level node labels', () => {
    render(<Tree nodes={nodes} />)
    expect(screen.getByText('src')).toBeDefined()
    expect(screen.getByText('README.md')).toBeDefined()
  })

  it('expands children when parent is clicked', async () => {
    const user = userEvent.setup()
    render(<Tree nodes={nodes} />)
    expect(screen.queryByText('index.ts')).toBeNull()
    await user.click(screen.getByText('src'))
    expect(screen.getByText('index.ts')).toBeDefined()
    expect(screen.getByText('app.tsx')).toBeDefined()
  })

  it('calls onSelect when node is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Tree nodes={nodes} onSelect={onSelect} />)
    await user.click(screen.getByText('README.md'))
    expect(onSelect).toHaveBeenCalledWith('readme')
  })
})
