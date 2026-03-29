import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MorphingShape } from '../morphing-shape'

describe('MorphingShape', () => {
  it('renders without crash', () => {
    const { container } = render(<MorphingShape variant="circle" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<MorphingShape variant="circle" />)
    expect(container.querySelector('[data-component="morphing-shape"]')).not.toBeNull()
  })

  it('renders an SVG path element', () => {
    const { container } = render(<MorphingShape variant="star" />)
    expect(container.querySelector('path')).not.toBeNull()
  })

  it('sets data-variant attribute', () => {
    const { container } = render(<MorphingShape variant="blob" />)
    expect(container.querySelector('[data-variant="blob"]')).not.toBeNull()
  })
})
