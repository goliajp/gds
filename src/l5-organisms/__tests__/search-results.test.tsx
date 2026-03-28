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

  it('shows singular result text for total=1', () => {
    render(<SearchResults results={results} query="react" total={1} />)
    expect(screen.getByText('1 result found')).toBeDefined()
  })

  it('does not show total when not provided', () => {
    render(<SearchResults results={results} query="react" />)
    expect(screen.queryByText(/result/)).toBeNull()
  })

  it('does not have button role when onSelect is not provided', () => {
    const { container } = render(<SearchResults results={results} query="react" />)
    expect(container.querySelector('[role="button"]')).toBeNull()
  })

  it('handles Enter key on result with onSelect', () => {
    const handler = vi.fn()
    render(<SearchResults results={results} query="react" onSelect={handler} />)
    const el = screen.getByText('Docs').closest('[role="button"]')!
    fireEvent.keyDown(el, { key: 'Enter' })
    expect(handler).toHaveBeenCalledWith('1')
  })

  it('handles Space key on result with onSelect', () => {
    const handler = vi.fn()
    render(<SearchResults results={results} query="react" onSelect={handler} />)
    const el = screen.getByText('Docs').closest('[role="button"]')!
    fireEvent.keyDown(el, { key: ' ' })
    expect(handler).toHaveBeenCalledWith('1')
  })

  it('renders description when provided', () => {
    const { container } = render(<SearchResults results={results} query="react" />)
    expect(container.textContent).toContain('Build UI with React')
  })

  it('does not render description when not provided', () => {
    const noDescResults = [{ id: '1', title: 'No Desc Item' }]
    const { container } = render(<SearchResults results={noDescResults} query="no" />)
    expect(container.textContent).toContain('No Desc Item')
  })

  it('does not render category badge when not provided', () => {
    const noCatResults = [{ id: '1', title: 'No Category' }]
    const { container } = render(<SearchResults results={noCatResults} query="no" />)
    expect(container.querySelector('[data-component="search-results"]')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SearchResults results={results} query="react" className="my-results" />,
    )
    const root = container.querySelector('[data-component="search-results"]')
    expect(root?.className).toContain('my-results')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<SearchResults results={results} query="react" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
