import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toolbar } from '../toolbar'

describe('Toolbar', () => {
  it('renders children', () => {
    render(
      <Toolbar>
        <button>Bold</button>
        <button>Italic</button>
      </Toolbar>
    )
    expect(screen.getByText('Bold')).toBeDefined()
    expect(screen.getByText('Italic')).toBeDefined()
  })

  it('applies top position by default', () => {
    const { container } = render(
      <Toolbar>
        <button>Bold</button>
      </Toolbar>
    )
    const bar = container.querySelector('[data-component="toolbar"]')
    expect(bar?.className).toContain('border-b')
    expect(bar?.getAttribute('data-position')).toBe('top')
  })

  it('applies floating with glass by default', () => {
    const { container } = render(
      <Toolbar position="floating">
        <button>Bold</button>
      </Toolbar>
    )
    const bar = container.querySelector('[data-component="toolbar"]')
    expect(bar?.className).toContain('rounded-full')
    expect(bar?.className).toContain('gds-glass')
  })

  it('sets data-component attribute', () => {
    const { container } = render(
      <Toolbar>
        <button>Bold</button>
      </Toolbar>
    )
    expect(container.querySelector('[data-component="toolbar"]')).toBeDefined()
  })

  it('applies bottom position', () => {
    const { container } = render(
      <Toolbar position="bottom">
        <button>Bold</button>
      </Toolbar>
    )
    const bar = container.querySelector('[data-component="toolbar"]')
    expect(bar?.className).toContain('border-t')
    expect(bar?.getAttribute('data-position')).toBe('bottom')
  })

  it('applies surface background for non-floating without glass', () => {
    const { container } = render(
      <Toolbar glass={false}>
        <button>Bold</button>
      </Toolbar>
    )
    const bar = container.querySelector('[data-component="toolbar"]')
    expect(bar?.className).toContain('bg-surface')
  })

  it('applies border for floating without glass', () => {
    const { container } = render(
      <Toolbar position="floating" glass={false}>
        <button>Bold</button>
      </Toolbar>
    )
    const bar = container.querySelector('[data-component="toolbar"]')
    expect(bar?.className).toContain('border')
    expect(bar?.className).toContain('bg-surface')
  })
})
