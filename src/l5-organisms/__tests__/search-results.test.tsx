import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SearchResults } from '../search-results'

const results = [
  { id: '1', title: 'React Components', description: 'Build UI with React', category: 'Docs' },
  { id: '2', title: 'React Hooks Guide' },
]

describe('SearchResults', () => {
  it('renders with data-component', () => {
    const { container } = render(<SearchResults results={results} query="react" />)
    expect(container.querySelector('[data-component="search-results"]')).not.toBeNull()
  })

  it('renders result titles', () => {
    render(<SearchResults results={results} query="react" />)
    expect(screen.getByText('Docs')).toBeDefined()
  })

  it('shows total count', () => {
    render(<SearchResults results={results} query="react" total={42} />)
    expect(screen.getByText('42 results found')).toBeDefined()
  })

  it('calls onSelect when result is clicked', () => {
    const handler = vi.fn()
    render(<SearchResults results={results} query="react" onSelect={handler} />)
    fireEvent.click(screen.getByText('Docs').closest('[role="button"]')!)
    expect(handler).toHaveBeenCalledWith('1')
  })
})
