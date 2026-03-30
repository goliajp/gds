import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatComparison } from '../stat-comparison'

describe('StatComparison', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <StatComparison
        left={{ label: 'Before', value: 10 }}
        right={{ label: 'After', value: 20 }}
      />
    )
    expect(
      container.querySelector('[data-component="stat-comparison"]')
    ).not.toBeNull()
  })

  it('renders both labels and values', () => {
    render(
      <StatComparison
        left={{ label: 'Plan A', value: '$100' }}
        right={{ label: 'Plan B', value: '$200' }}
      />
    )
    expect(screen.getByText('Plan A')).toBeDefined()
    expect(screen.getByText('$100')).toBeDefined()
    expect(screen.getByText('Plan B')).toBeDefined()
    expect(screen.getByText('$200')).toBeDefined()
  })

  it('renders the "vs" divider', () => {
    render(
      <StatComparison
        left={{ label: 'A', value: 1 }}
        right={{ label: 'B', value: 2 }}
      />
    )
    expect(screen.getByText('vs')).toBeDefined()
  })

  it('highlights left side when highlight="left"', () => {
    const { container } = render(
      <StatComparison
        left={{ label: 'A', value: 1 }}
        right={{ label: 'B', value: 2 }}
        highlight="left"
      />
    )
    const sides = container.querySelectorAll(
      '[data-component="stat-comparison"] > div'
    )
    expect(sides[0]?.className).toContain('border-accent')
    expect(sides[1]?.className).not.toContain('border-accent')
  })

  it('highlights right side when highlight="right"', () => {
    const { container } = render(
      <StatComparison
        left={{ label: 'A', value: 1 }}
        right={{ label: 'B', value: 2 }}
        highlight="right"
      />
    )
    const sides = container.querySelectorAll(
      '[data-component="stat-comparison"] > div'
    )
    expect(sides[0]?.className).not.toContain('border-accent')
    expect(sides[1]?.className).toContain('border-accent')
  })

  it('no highlight when highlight="none"', () => {
    const { container } = render(
      <StatComparison
        left={{ label: 'A', value: 1 }}
        right={{ label: 'B', value: 2 }}
        highlight="none"
      />
    )
    const sides = container.querySelectorAll(
      '[data-component="stat-comparison"] > div'
    )
    expect(sides[0]?.className).not.toContain('border-accent')
    expect(sides[1]?.className).not.toContain('border-accent')
  })
})
