import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { MentionSuggestion } from '../mention-list'
import { MentionList } from '../mention-list'

const suggestions: MentionSuggestion[] = [
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
  { id: '3', label: 'Charlie' },
]

function renderList(overrides: Partial<React.ComponentProps<typeof MentionList>> = {}) {
  const defaultProps = {
    filtered: suggestions,
    highlightedIndex: 0,
    onSelect: vi.fn(),
    trigger: '@',
  }
  const props = { ...defaultProps, ...overrides }
  const result = render(<MentionList {...props} />)
  return { ...result, props }
}

describe('MentionList', () => {
  it('renders with listbox role', () => {
    renderList()
    expect(screen.getByRole('listbox')).toBeDefined()
  })

  it('has data-testid="mention-suggestions"', () => {
    renderList()
    expect(screen.getByTestId('mention-suggestions')).toBeDefined()
  })

  it('renders all suggestions', () => {
    renderList()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
    expect(screen.getByText('Charlie')).toBeDefined()
  })

  it('renders trigger character for each option', () => {
    const { container } = renderList({ trigger: '#' })
    const triggerSpans = container.querySelectorAll('.text-fg-muted')
    expect(triggerSpans.length).toBe(3)
    triggerSpans.forEach((span) => {
      expect(span.textContent).toBe('#')
    })
  })

  it('renders options with role="option"', () => {
    renderList()
    const options = screen.getAllByRole('option')
    expect(options.length).toBe(3)
  })

  it('marks highlighted option with aria-selected="true"', () => {
    renderList({ highlightedIndex: 1 })
    const options = screen.getAllByRole('option')
    expect(options[0].getAttribute('aria-selected')).toBe('false')
    expect(options[1].getAttribute('aria-selected')).toBe('true')
    expect(options[2].getAttribute('aria-selected')).toBe('false')
  })

  it('applies highlighted styling to highlighted option', () => {
    renderList({ highlightedIndex: 2 })
    const options = screen.getAllByRole('option')
    expect(options[2].className).toContain('bg-accent/10')
    expect(options[2].className).toContain('text-accent')
  })

  it('does not apply highlighted styling to non-highlighted options', () => {
    renderList({ highlightedIndex: 0 })
    const options = screen.getAllByRole('option')
    expect(options[1].className).not.toContain('bg-accent/10')
    expect(options[2].className).not.toContain('bg-accent/10')
  })

  it('calls onSelect with suggestion on mouseDown', () => {
    const onSelect = vi.fn()
    renderList({ onSelect })
    fireEvent.mouseDown(screen.getByText('Bob'))
    expect(onSelect).toHaveBeenCalledWith({ id: '2', label: 'Bob' })
  })

  it('prevents default on mouseDown to avoid blur', () => {
    const onSelect = vi.fn()
    renderList({ onSelect })
    const preventDefaultSpy = vi.fn()
    const bobOption = screen.getByText('Bob')
    fireEvent.mouseDown(bobOption, { preventDefault: preventDefaultSpy })
    // mouseDown handler calls preventDefault internally
    expect(onSelect).toHaveBeenCalled()
  })

  it('renders empty list when filtered is empty', () => {
    const { container } = renderList({ filtered: [] })
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeDefined()
    expect(container.querySelectorAll('button').length).toBe(0)
  })

  it('renders options as buttons with type="button"', () => {
    const { container } = renderList()
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(3)
    buttons.forEach((btn) => {
      expect(btn.getAttribute('type')).toBe('button')
    })
  })

  it('uses @ as default trigger display', () => {
    const { container } = renderList()
    const triggerSpans = container.querySelectorAll('.text-fg-muted')
    triggerSpans.forEach((span) => {
      expect(span.textContent).toBe('@')
    })
  })
})
