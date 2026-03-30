import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NumberStepper } from '../number-stepper'

describe('NumberStepper', () => {
  it('renders without crash', () => {
    render(<NumberStepper direction="increment" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('forwards ref to button element', () => {
    let el: HTMLButtonElement | null = null
    render(
      <NumberStepper
        direction="increment"
        onClick={vi.fn()}
        ref={(node) => {
          el = node
        }}
      />
    )
    expect(el).toBeInstanceOf(HTMLButtonElement)
  })

  it('renders + for increment direction', () => {
    render(<NumberStepper direction="increment" onClick={vi.fn()} />)
    expect(screen.getByRole('button').textContent).toBe('+')
  })

  it('renders - for decrement direction', () => {
    render(<NumberStepper direction="decrement" onClick={vi.fn()} />)
    expect(screen.getByRole('button').textContent).toBe('-')
  })

  it('sets aria-label to "increment" for increment direction', () => {
    render(<NumberStepper direction="increment" onClick={vi.fn()} />)
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe(
      'increment'
    )
  })

  it('sets aria-label to "decrement" for decrement direction', () => {
    render(<NumberStepper direction="decrement" onClick={vi.fn()} />)
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe(
      'decrement'
    )
  })

  it('has type="button"', () => {
    render(<NumberStepper direction="increment" onClick={vi.fn()} />)
    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  it('has tabIndex=-1', () => {
    render(<NumberStepper direction="increment" onClick={vi.fn()} />)
    expect(screen.getByRole('button').tabIndex).toBe(-1)
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<NumberStepper direction="increment" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    render(<NumberStepper direction="increment" disabled onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(<NumberStepper direction="increment" disabled onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies left-rounded class for decrement', () => {
    render(<NumberStepper direction="decrement" onClick={vi.fn()} />)
    expect(screen.getByRole('button').className).toContain(
      'rounded-l-[inherit]'
    )
  })

  it('applies right-rounded class for increment', () => {
    render(<NumberStepper direction="increment" onClick={vi.fn()} />)
    expect(screen.getByRole('button').className).toContain(
      'rounded-r-[inherit]'
    )
  })
})
