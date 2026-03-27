import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ActionBar } from '../action-bar'

describe('ActionBar', () => {
  it('renders children', () => {
    render(<ActionBar><button>Save</button></ActionBar>)
    expect(screen.getByText('Save')).toBeDefined()
  })

  it('applies bottom position by default', () => {
    const { container } = render(<ActionBar><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('bottom-0')
    expect(bar?.className).toContain('border-t')
  })

  it('applies justify-end by default', () => {
    const { container } = render(<ActionBar><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('justify-end')
  })

  it('applies glass class by default', () => {
    const { container } = render(<ActionBar><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('gds-glass')
  })
})
