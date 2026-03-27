import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Hero } from '../hero'

describe('Hero', () => {
  it('renders title', () => {
    render(<Hero title="Welcome" />)
    expect(screen.getByText('Welcome')).toBeDefined()
  })

  it('renders subtitle when provided', () => {
    render(<Hero title="Welcome" subtitle="Build something great" />)
    expect(screen.getByText('Build something great')).toBeDefined()
  })

  it('renders actions slot', () => {
    render(<Hero title="Welcome" actions={<button>Get Started</button>} />)
    expect(screen.getByText('Get Started')).toBeDefined()
  })

  it('applies left align layout', () => {
    const { container } = render(<Hero title="Welcome" align="left" media={<div>img</div>} />)
    const el = container.querySelector('[data-component="hero"]')
    expect(el?.getAttribute('data-variant')).toBe('left')
    expect(el?.className).toContain('flex')
  })
})
