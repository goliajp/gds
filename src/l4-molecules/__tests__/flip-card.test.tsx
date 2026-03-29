import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FlipCard } from '../flip-card'

describe('FlipCard', () => {
  it('renders without crash', () => {
    const { container } = render(<FlipCard front={<span>Front</span>} back={<span>Back</span>} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<FlipCard front={<span>Front</span>} back={<span>Back</span>} />)
    expect(container.querySelector('[data-component="flip-card"]')).not.toBeNull()
  })

  it('renders front and back content', () => {
    render(<FlipCard front={<span>Front Side</span>} back={<span>Back Side</span>} />)
    expect(screen.getByText('Front Side')).toBeDefined()
    expect(screen.getByText('Back Side')).toBeDefined()
  })

  it('starts in front state', () => {
    const { container } = render(<FlipCard front={<span>F</span>} back={<span>B</span>} />)
    expect(container.querySelector('[data-state="front"]')).not.toBeNull()
  })
})
