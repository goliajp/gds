import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Ribbon } from '../ribbon'

describe('Ribbon', () => {
  it('has data-component="ribbon"', () => {
    const { container } = render(<Ribbon label="NEW"><div>content</div></Ribbon>)
    expect(container.querySelector('[data-component="ribbon"]')).not.toBeNull()
  })

  it('renders the label text', () => {
    render(<Ribbon label="SALE"><div>content</div></Ribbon>)
    expect(screen.getByText('SALE')).toBeDefined()
  })

  it('renders children', () => {
    render(<Ribbon label="BETA"><div>child content</div></Ribbon>)
    expect(screen.getByText('child content')).toBeDefined()
  })
})
