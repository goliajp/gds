import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WizardLayout } from '../wizard-layout'

describe('WizardLayout', () => {
  const steps = ['Info', 'Review', 'Submit']

  it('renders with data-component', () => {
    const { container } = render(<WizardLayout steps={steps} currentStep={0}>Content</WizardLayout>)
    expect(container.querySelector('[data-component="wizard-layout"]')).not.toBeNull()
  })

  it('renders children content', () => {
    render(<WizardLayout steps={steps} currentStep={1}><p>Step content</p></WizardLayout>)
    expect(screen.getByText('Step content')).toBeDefined()
  })

  it('renders action bar when actions provided', () => {
    render(
      <WizardLayout steps={steps} currentStep={0} actions={<button>Next</button>}>
        Content
      </WizardLayout>,
    )
    expect(screen.getByText('Next')).toBeDefined()
  })
})
