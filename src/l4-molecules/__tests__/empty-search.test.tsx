import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmptySearch } from '../empty-search'

describe('EmptySearch', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<EmptySearch query="test" />)
    expect(container.querySelector('[data-component="empty-search"]')).not.toBeNull()
  })

  it('displays the query in the message', () => {
    render(<EmptySearch query="foobar" />)
    expect(screen.getByText((content) => content.includes('foobar'))).toBeDefined()
  })

  it('does not render suggestions when suggestions is undefined', () => {
    const { container } = render(<EmptySearch query="q" />)
    const suggestionContainer = container.querySelector('.flex-wrap')
    expect(suggestionContainer).toBeNull()
  })

  it('does not render suggestions when suggestions is empty array', () => {
    const { container } = render(<EmptySearch query="q" suggestions={[]} />)
    const suggestionContainer = container.querySelector('.flex-wrap')
    expect(suggestionContainer).toBeNull()
  })

  it('renders suggestions when provided', () => {
    render(<EmptySearch query="q" suggestions={['try this', 'or that']} />)
    expect(screen.getByText('try this')).toBeDefined()
    expect(screen.getByText('or that')).toBeDefined()
  })

  it('renders correct number of suggestion chips', () => {
    const { container } = render(<EmptySearch query="q" suggestions={['a', 'b', 'c']} />)
    const wrapper = container.querySelector('.flex-wrap')
    expect(wrapper?.children.length).toBe(3)
  })

  it('applies custom className', () => {
    const { container } = render(<EmptySearch query="q" className="my-cls" />)
    const el = container.querySelector('[data-component="empty-search"]')
    expect(el?.className).toContain('my-cls')
  })
})
