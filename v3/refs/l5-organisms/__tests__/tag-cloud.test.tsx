import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TagCloud } from '../tag-cloud'

const tags = [
  { label: 'react', count: 42 },
  { label: 'typescript', count: 38 },
  { label: 'rust', count: 15 },
]

describe('TagCloud', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<TagCloud tags={tags} />)
    expect(
      container.querySelector('[data-component="tag-cloud"]')
    ).not.toBeNull()
  })

  it('renders tag labels and counts', () => {
    render(<TagCloud tags={tags} />)
    expect(screen.getByText('react')).toBeDefined()
    expect(screen.getByText('42')).toBeDefined()
    expect(screen.getByText('typescript')).toBeDefined()
  })

  it('applies accent style to selected tags', () => {
    render(<TagCloud tags={tags} selected={['react']} />)
    const reactBtn = screen.getByText('react').closest('button')
    expect(reactBtn?.className).toContain('text-accent')
    const tsBtn = screen.getByText('typescript').closest('button')
    expect(tsBtn?.className).toContain('text-fg-muted')
  })

  it('calls onToggle when a tag is clicked', () => {
    const onToggle = vi.fn()
    render(<TagCloud tags={tags} onToggle={onToggle} />)
    fireEvent.click(screen.getByText('rust'))
    expect(onToggle).toHaveBeenCalledWith('rust')
  })
})
