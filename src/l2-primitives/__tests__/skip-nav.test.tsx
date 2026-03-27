import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SkipNav } from '../skip-nav'

describe('SkipNav', () => {
  it('renders with sr-only positioning (off-screen by default)', () => {
    render(<SkipNav />)
    const link = screen.getByText('Skip to content')
    expect(link.className).toContain('-translate-y-full')
  })

  it('becomes visible on focus via translate class', () => {
    render(<SkipNav />)
    const link = screen.getByText('Skip to content')
    expect(link.className).toContain('focus:translate-y-0')
  })

  it('has correct href from targetId', () => {
    render(<SkipNav targetId="app-main" />)
    const link = screen.getByText('Skip to content')
    expect(link.getAttribute('href')).toBe('#app-main')
  })

  it('uses default href #main-content', () => {
    render(<SkipNav />)
    const link = screen.getByText('Skip to content')
    expect(link.getAttribute('href')).toBe('#main-content')
  })

  it('has data-component attribute', () => {
    render(<SkipNav />)
    const link = screen.getByText('Skip to content')
    expect(link.getAttribute('data-component')).toBe('skip-nav')
  })
})
