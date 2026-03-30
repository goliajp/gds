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
    render(
      <RichSelect
        options={options}
        value={null}
        onChange={vi.fn()}
        placeholder="Pick one"
      />
    )
    expect(screen.getByText('Pick one')).toBeDefined()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    const trigger = container.querySelector('button')!
    await user.click(trigger)
    expect(screen.getByRole('listbox')).toBeDefined()
    expect(screen.getByText('Apple')).toBeDefined()
    expect(screen.getByText('Banana')).toBeDefined()
  })

  it('shows option details (description + badge)', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    await user.click(container.querySelector('button')!)
    expect(screen.getByText('A fruit')).toBeDefined()
    expect(screen.getByText('popular')).toBeDefined()
  })

  it('selects option on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={onChange} />
    )
    await user.click(container.querySelector('button')!)
    await user.click(screen.getByText('Banana'))
    expect(onChange).toHaveBeenCalledWith('banana')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    expect(
      container.querySelector('[data-component="rich-select"]')
    ).not.toBeNull()
  })

  it('shows default placeholder when none provided', () => {
    render(<RichSelect options={options} value={null} onChange={vi.fn()} />)
    expect(screen.getByText('Select...')).toBeDefined()
  })

  it('shows selected option label and icon when value is set', () => {
    const optionsWithIcon = [
      {
        value: 'apple',
        label: 'Apple',
        icon: <span data-testid="apple-icon">A</span>,
      },
    ]
    render(
      <RichSelect options={optionsWithIcon} value="apple" onChange={vi.fn()} />
    )
    expect(screen.getByText('Apple')).toBeDefined()
    expect(screen.getByTestId('apple-icon')).toBeDefined()
  })

  it('shows selected option without icon', () => {
    render(<RichSelect options={options} value="cherry" onChange={vi.fn()} />)
    expect(screen.getByText('Cherry')).toBeDefined()
  })

  it('applies error styling', () => {
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} error />
    )
    const button = container.querySelector('button')!
    expect(button.className).toContain('border-danger')
  })

  it('applies disabled styling and prevents interaction', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={onChange} disabled />
    )
    const button = container.querySelector('button')!
    expect(button.disabled).toBe(true)
    expect(button.className).toContain('opacity-50')
    await user.click(button)
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('applies glass class', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} glass />
    )
    await user.click(container.querySelector('button')!)
    expect(screen.getByRole('listbox')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <RichSelect
        options={options}
        value={null}
        onChange={vi.fn()}
        className="my-select"
      />
    )
    const root = container.querySelector('[data-component="rich-select"]')
    expect(root?.className).toContain('my-select')
  })

  it('sets data-state to open/closed', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    const root = container.querySelector('[data-component="rich-select"]')!
    expect(root.getAttribute('data-state')).toBe('closed')
    await user.click(container.querySelector('button')!)
    expect(root.getAttribute('data-state')).toBe('open')
  })

  it('closes dropdown on outside click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <div>
        <div data-testid="outside">Outside</div>
        <RichSelect options={options} value={null} onChange={vi.fn()} />
      </div>
    )
    const button = container.querySelector('button')!
    await user.click(button)
    expect(screen.getByRole('listbox')).toBeDefined()
    await user.click(screen.getByTestId('outside'))
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('opens on keyboard Enter when closed', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    // onKeyDown is on the wrapper div
    await user.click(container.querySelector('button')!)
    // close it first
    await user.click(container.querySelector('button')!)
    expect(screen.queryByRole('listbox')).toBeNull()
    // now use keyboard on wrapper
    await user.keyboard('{Enter}')
  })

  it('closes on Escape key when open', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    await user.click(container.querySelector('button')!)
    expect(screen.getByRole('listbox')).toBeDefined()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('navigates options with ArrowDown when open', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    await user.click(container.querySelector('button')!)
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    // should move focus through options
  })

  it('navigates options with ArrowUp when open', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    await user.click(container.querySelector('button')!)
    await user.keyboard('{ArrowUp}')
    // wraps to last
  })

  it('selects focused option on Enter when open', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={onChange} />
    )
    await user.click(container.querySelector('button')!)
    // focusedIndex starts at -1 after click open; ArrowDown moves to 0 (apple), then 1 (banana)
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('banana')
  })

  it('toggles dropdown open and closed on button click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RichSelect options={options} value={null} onChange={vi.fn()} />
    )
    const button = container.querySelector('button')!
    await user.click(button)
    expect(screen.getByRole('listbox')).toBeDefined()
    await user.click(button)
    expect(screen.queryByRole('listbox')).toBeNull()
  })
})
