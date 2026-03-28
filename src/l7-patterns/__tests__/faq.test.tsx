import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FAQ } from '../faq'

const items = [
  { question: 'What is GDS?', answer: 'A design system.' },
  { question: 'Is it free?', answer: 'Yes, open source.' },
]

describe('FAQ', () => {
  it('renders all questions', () => {
    render(<FAQ items={items} />)
    expect(screen.getByText('What is GDS?')).toBeDefined()
    expect(screen.getByText('Is it free?')).toBeDefined()
  })

  it('expands answer on click', () => {
    render(<FAQ items={items} />)
    fireEvent.click(screen.getByText('What is GDS?'))
    expect(screen.getByText('A design system.')).toBeDefined()
  })

  it('has data-component attribute', () => {
    const { container } = render(<FAQ items={items} />)
    const el = container.querySelector('[data-component="faq"]')
    expect(el).toBeDefined()
    expect(el).not.toBeNull()
  })

  it('renders custom title', () => {
    render(<FAQ items={items} title="Help Center" />)
    expect(screen.getByText('Help Center')).toBeDefined()
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<FAQ items={items} glass />)
    const el = container.querySelector('[data-component="faq"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(<FAQ items={items} />)
    const el = container.querySelector('[data-component="faq"]')
    expect(el?.className).toContain('bg-surface')
  })
})
