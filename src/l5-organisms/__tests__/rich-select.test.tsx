import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RichSelect } from '../rich-select'

const options = [
  { value: 'apple', label: 'Apple', description: 'A fruit', badge: 'popular' },
  { value: 'banana', label: 'Banana', description: 'Yellow fruit' },
  { value: 'cherry', label: 'Cherry' },
]

describe('RichSelect', () => {
  it('renders placeholder when no value', () => {
    render(<RichSelect options={options} value={null} onChange={vi.fn()} placeholder="Pick one" />)
    expect(screen.getByText('Pick one')).toBeDefined()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<RichSelect options={options} value={null} onChange={vi.fn()} />)
    const trigger = container.querySelector('button')!
    await user.click(trigger)
    expect(screen.getByRole('listbox')).toBeDefined()
    expect(screen.getByText('Apple')).toBeDefined()
    expect(screen.getByText('Banana')).toBeDefined()
  })

  it('shows option details (description + badge)', async () => {
    const user = userEvent.setup()
    const { container } = render(<RichSelect options={options} value={null} onChange={vi.fn()} />)
    await user.click(container.querySelector('button')!)
    expect(screen.getByText('A fruit')).toBeDefined()
    expect(screen.getByText('popular')).toBeDefined()
  })

  it('selects option on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(<RichSelect options={options} value={null} onChange={onChange} />)
    await user.click(container.querySelector('button')!)
    await user.click(screen.getByText('Banana'))
    expect(onChange).toHaveBeenCalledWith('banana')
  })

  it('has data-component attribute', () => {
    const { container } = render(<RichSelect options={options} value={null} onChange={vi.fn()} />)
    expect(container.querySelector('[data-component="rich-select"]')).not.toBeNull()
  })
})
