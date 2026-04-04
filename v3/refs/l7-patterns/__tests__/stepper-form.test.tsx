import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { StepperForm } from '../stepper-form'

const steps = [
  { title: 'Account', content: <div>Account form</div> },
  { title: 'Profile', content: <div>Profile form</div> },
  { title: 'Review', content: <div>Review details</div> },
]

describe('StepperForm', () => {
  it('renders first step content', () => {
    render(<StepperForm steps={steps} />)
    expect(screen.getByText('Account form')).toBeDefined()
  })

  it('advances on next click', () => {
    render(<StepperForm steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Profile form')).toBeDefined()
  })

  it('goes back on previous click', () => {
    render(<StepperForm steps={steps} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Previous'))
    expect(screen.getByText('Account form')).toBeDefined()
  })

  it('calls onComplete on last step', () => {
    const onComplete = vi.fn()
    render(<StepperForm steps={steps} onComplete={onComplete} />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Complete'))
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('applies data-component attribute', () => {
    const { container } = render(<StepperForm steps={steps} />)
    expect(
      container.querySelector('[data-component="stepper-form"]')
    ).not.toBeNull()
  })

  it('disables previous button on first step', () => {
    render(<StepperForm steps={steps} />)
    const prevBtn = screen.getByText('Previous')
    expect(prevBtn).toHaveAttribute('disabled')
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<StepperForm steps={steps} glass />)
    const el = container.querySelector('[data-component="stepper-form"]')
    expect(el?.className).toContain('backdrop-blur-xl')
  })

  it('uses custom completeLabel', () => {
    render(<StepperForm steps={steps} completeLabel="Finish" />)
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Finish')).toBeDefined()
  })
})
