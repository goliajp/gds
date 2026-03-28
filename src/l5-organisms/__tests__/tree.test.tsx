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

  it('collapses expanded node on second click', async () => {
    const user = userEvent.setup()
    render(<Tree nodes={nodes} />)
    await user.click(screen.getByText('src'))
    expect(screen.getByText('index.ts')).toBeDefined()
    await user.click(screen.getByText('src'))
    expect(screen.queryByText('index.ts')).toBeNull()
  })

  it('renders with defaultExpanded', () => {
    render(<Tree nodes={nodes} defaultExpanded={['src']} />)
    expect(screen.getByText('index.ts')).toBeDefined()
    expect(screen.getByText('app.tsx')).toBeDefined()
  })

  it('highlights selected node', () => {
    const { container } = render(<Tree nodes={nodes} selected="readme" />)
    const selectedBtn = container.querySelector('[data-state="selected"]')
    expect(selectedBtn).not.toBeNull()
    expect(selectedBtn?.textContent).toContain('README.md')
  })

  it('renders custom icon when provided', () => {
    const nodesWithIcon = [
      { id: 'file', label: 'file.ts', icon: <span data-testid="custom-icon">I</span> },
    ]
    render(<Tree nodes={nodesWithIcon} />)
    expect(screen.getByTestId('custom-icon')).toBeDefined()
  })

  it('renders disabled node', () => {
    const nodesWithDisabled = [
      { id: 'locked', label: 'locked.txt', disabled: true },
    ]
    const { container } = render(<Tree nodes={nodesWithDisabled} />)
    const button = container.querySelector('button')!
    expect(button.disabled).toBe(true)
    expect(button.className).toContain('opacity-50')
  })

  it('does not call onSelect when disabled node is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const nodesWithDisabled = [
      { id: 'locked', label: 'locked.txt', disabled: true },
    ]
    render(<Tree nodes={nodesWithDisabled} onSelect={onSelect} />)
    // disabled button won't fire click
    await user.click(screen.getByText('locked.txt'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Tree nodes={nodes} className="my-tree" />)
    const root = container.querySelector('[data-component="tree"]')
    expect(root?.className).toContain('my-tree')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Tree nodes={nodes} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('tree')
  })
})
