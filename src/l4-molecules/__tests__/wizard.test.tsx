import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Wizard } from '../wizard'

const steps = [
  { title: 'Step 1', content: <div>Content 1</div> },
  { title: 'Step 2', content: <div>Content 2</div> },
  { title: 'Step 3', content: <div>Content 3</div> },
]

describe('Wizard', () => {
  it('has data-component="wizard"', () => {
    const { container } = render(<Wizard steps={steps} />)
    expect(container.querySelector('[data-component="wizard"]')).not.toBeNull()
  })

  it('renders step numbers', () => {
    render(<Wizard steps={steps} />)
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('2')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
  })

  it('shows first step content by default', () => {
    render(<Wizard steps={steps} />)
    expect(screen.getByText('Content 1')).toBeDefined()
    expect(screen.getByText('Step 1')).toBeDefined()
  })

  it('calls onStepChange when clicking a step', async () => {
    const user = userEvent.setup()
    const onStepChange = vi.fn()
    render(<Wizard steps={steps} currentStep={0} onStepChange={onStepChange} />)
    await user.click(screen.getByText('2'))
    expect(onStepChange).toHaveBeenCalledWith(1)
  })
})
