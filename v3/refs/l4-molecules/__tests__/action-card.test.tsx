import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ActionCard } from '../action-card'

describe('ActionCard', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <ActionCard title="Create" onClick={() => {}} />
    )
    expect(
      container.querySelector('[data-component="action-card"]')
    ).not.toBeNull()
  })

  it('renders title and description', () => {
    render(
      <ActionCard
        title="Deploy"
        description="Push to production"
        onClick={() => {}}
      />
    )
    expect(screen.getByText('Deploy')).toBeDefined()
    expect(screen.getByText('Push to production')).toBeDefined()
  })

  it('calls onClick when clicked', () => {
    const fn = vi.fn()
    render(<ActionCard title="Run" onClick={fn} />)
    fireEvent.click(screen.getByText('Run'))
    expect(fn).toHaveBeenCalledOnce()
  })

  it('renders icon when provided', () => {
    render(
      <ActionCard
        title="Create"
        onClick={() => {}}
        icon={<span data-testid="icon">+</span>}
      />
    )
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('does not render icon container when icon is undefined', () => {
    const { container } = render(
      <ActionCard title="Create" onClick={() => {}} />
    )
    const spans = container.querySelectorAll(
      '[data-component="action-card"] > span'
    )
    expect(spans.length).toBe(0)
  })

  it('does not render description when not provided', () => {
    render(<ActionCard title="Deploy" onClick={() => {}} />)
    expect(screen.queryByText('Push to production')).toBeNull()
  })

  it('calls onClick on Enter key', () => {
    const fn = vi.fn()
    const { container } = render(<ActionCard title="Run" onClick={fn} />)
    const el = container.querySelector('[data-component="action-card"]')!
    fireEvent.keyDown(el, { key: 'Enter' })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('calls onClick on Space key', () => {
    const fn = vi.fn()
    const { container } = render(<ActionCard title="Run" onClick={fn} />)
    const el = container.querySelector('[data-component="action-card"]')!
    fireEvent.keyDown(el, { key: ' ' })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('does not call onClick on other keys', () => {
    const fn = vi.fn()
    const { container } = render(<ActionCard title="Run" onClick={fn} />)
    const el = container.querySelector('[data-component="action-card"]')!
    fireEvent.keyDown(el, { key: 'a' })
    expect(fn).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ActionCard title="T" onClick={() => {}} className="my-cls" />
    )
    const el = container.querySelector('[data-component="action-card"]')
    expect(el?.className).toContain('my-cls')
  })
})
