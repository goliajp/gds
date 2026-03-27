import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MagneticButton } from '../magnetic-button'

describe('MagneticButton', () => {
  it('renders children', () => {
    render(<MagneticButton>Click me</MagneticButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('resets transform on mouse leave', () => {
    const { container } = render(<MagneticButton>Content</MagneticButton>)
    const el = container.querySelector('[data-component="magnetic-button"]') as HTMLElement
    fireEvent.mouseLeave(el)
    expect(el.style.transform).toBe('translate(0px, 0px)')
  })

  it('has data-component attribute', () => {
    const { container } = render(<MagneticButton>Content</MagneticButton>)
    expect(container.querySelector('[data-component="magnetic-button"]')).toBeInTheDocument()
  })
})
