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

  it('applies top position with border-b', () => {
    const { container } = render(<ActionBar position="top"><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('top-0')
    expect(bar?.className).toContain('border-b')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(<ActionBar glass={false}><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('bg-surface')
  })

  it('applies justify-between', () => {
    const { container } = render(<ActionBar justify="between"><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('justify-between')
  })

  it('applies justify-start', () => {
    const { container } = render(<ActionBar justify="start"><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('justify-start')
  })

  it('applies justify-center', () => {
    const { container } = render(<ActionBar justify="center"><button>Save</button></ActionBar>)
    const bar = container.querySelector('[data-component="action-bar"]')
    expect(bar?.className).toContain('justify-center')
  })
})
