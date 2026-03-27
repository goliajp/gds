import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup } from '../radio-group'

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
]

describe('RadioGroup', () => {
  it('has role="radiogroup"', () => {
    render(<RadioGroup options={options} />)
    expect(screen.getByRole('radiogroup')).toBeDefined()
  })

  it('renders options with role="radio"', () => {
    render(<RadioGroup options={options} />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('marks selected option with aria-checked=true', () => {
    render(<RadioGroup options={options} value="blue" />)
    const radios = screen.getAllByRole('radio')
    expect(radios[0].getAttribute('aria-checked')).toBe('false')
    expect(radios[1].getAttribute('aria-checked')).toBe('true')
    expect(radios[2].getAttribute('aria-checked')).toBe('false')
  })

  it('calls onChange with value on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioGroup onChange={onChange} options={options} value="red" />)
    await user.click(screen.getByText('Green'))
    expect(onChange).toHaveBeenCalledWith('green')
  })

  it('applies horizontal direction', () => {
    const { container } = render(
      <RadioGroup direction="horizontal" options={options} />,
    )
    const group = container.querySelector('[data-component="radio-group"]')
    expect(group?.className).toContain('flex-row')
  })

  it('applies vertical direction by default', () => {
    const { container } = render(<RadioGroup options={options} />)
    const group = container.querySelector('[data-component="radio-group"]')
    expect(group?.className).toContain('flex-col')
  })

  it('disables all options when group is disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioGroup disabled onChange={onChange} options={options} />)
    await user.click(screen.getByText('Blue'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has data-component="radio-group"', () => {
    const { container } = render(<RadioGroup options={options} />)
    expect(container.querySelector('[data-component="radio-group"]')).not.toBeNull()
  })
})
