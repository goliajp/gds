import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VisuallyHidden } from '../visually-hidden'

describe('VisuallyHidden', () => {
  it('renders without crash', () => {
    render(<VisuallyHidden>hidden text</VisuallyHidden>)
    expect(screen.getByText('hidden text')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    render(<VisuallyHidden>content</VisuallyHidden>)
    expect(screen.getByText('content').getAttribute('data-component')).toBe(
      'visually-hidden'
    )
  })

  it('renders as span by default', () => {
    render(<VisuallyHidden>content</VisuallyHidden>)
    expect(screen.getByText('content').tagName).toBe('SPAN')
  })

  it('renders as div when as="div"', () => {
    render(<VisuallyHidden as="div">content</VisuallyHidden>)
    expect(screen.getByText('content').tagName).toBe('DIV')
  })

  it('merges className', () => {
    render(<VisuallyHidden className="custom-class">content</VisuallyHidden>)
    expect(screen.getByText('content').className).toContain('custom-class')
  })
})
