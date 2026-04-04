import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { FormStep } from '../step-form'
import { StepForm } from '../step-form'

const steps: FormStep[] = [
  { label: 'Account', content: <div>Account form</div> },
  {
    label: 'Profile',
    description: 'Your profile info',
    content: <div>Profile form</div>,
  },
  { label: 'Review', content: <div>Review form</div> },
]

describe('StepForm', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <StepForm onComplete={vi.fn()} steps={steps} />
    )
    expect(
      container.querySelector('[data-component="step-form"]')
    ).not.toBeNull()
  })

  it('renders all step labels', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    expect(screen.getByText('Account')).toBeDefined()
    expect(screen.getByText('Profile')).toBeDefined()
    expect(screen.getByText('Review')).toBeDefined()
  })

  it('shows first step content initially', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    expect(screen.getByText('Account form')).toBeDefined()
  })

  it('does not show Back button on first step', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    expect(screen.queryByText('Back')).toBeNull()
  })

  it('shows Next button on first step', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    expect(screen.getByText('Next')).toBeDefined()
  })

  it('advances to next step when Next is clicked', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Profile form')).toBeDefined()
  })

  it('shows Back button on non-first step', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Back')).toBeDefined()
  })

  it('goes back to previous step when Back is clicked', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Back'))
    expect(screen.getByText('Account form')).toBeDefined()
  })

  it('shows Finish button on last step', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Finish')).toBeDefined()
  })

  it('calls onComplete when Finish is clicked on last step', () => {
    const onComplete = vi.fn()
    render(<StepForm onComplete={onComplete} steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Finish'))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('renders step indicators with correct styling for completed/current/future steps', () => {
    const { container } = render(
      <StepForm onComplete={vi.fn()} steps={steps} />
    )
    // advance to step 2 (index 1)
    fireEvent.click(screen.getByText('Next'))

    const indicators = container.querySelectorAll('.flex.h-6.w-6')
    // step 0 (completed) should have bg-accent
    expect(indicators[0]?.className).toContain('bg-accent')
    // step 1 (current) should have border-accent
    expect(indicators[1]?.className).toContain('border-accent')
    // step 2 (future) should have border-border
    expect(indicators[2]?.className).toContain('border-border')
  })

  it('renders check svg for completed steps', () => {
    const { container } = render(
      <StepForm onComplete={vi.fn()} steps={steps} />
    )
    fireEvent.click(screen.getByText('Next'))
    // first step indicator should contain an svg (checkmark)
    const indicators = container.querySelectorAll('.flex.h-6.w-6')
    expect(indicators[0]?.querySelector('svg')).not.toBeNull()
  })

  it('renders step number for non-completed steps', () => {
    render(<StepForm onComplete={vi.fn()} steps={steps} />)
    // on first step, step 2 (index 1) should show "2"
    expect(screen.getByText('2')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
  })

  it('renders connector lines between steps', () => {
    const { container } = render(
      <StepForm onComplete={vi.fn()} steps={steps} />
    )
    // connector lines are h-px w-8 divs, should be present for steps after the first
    const connectors = container.querySelectorAll('.h-px.w-8')
    expect(connectors.length).toBe(2) // between step 0-1, and 1-2
  })

  it('applies custom className', () => {
    const { container } = render(
      <StepForm className="my-form" onComplete={vi.fn()} steps={steps} />
    )
    const root = container.querySelector('[data-component="step-form"]')
    expect(root?.className).toContain('my-form')
  })

  it('forwards ref', () => {
    let divRef: HTMLDivElement | null = null
    render(
      <StepForm
        onComplete={vi.fn()}
        ref={(el) => {
          divRef = el
        }}
        steps={steps}
      />
    )
    expect(divRef).not.toBeNull()
    expect((divRef as unknown as HTMLElement)?.tagName).toBe('DIV')
  })
})
