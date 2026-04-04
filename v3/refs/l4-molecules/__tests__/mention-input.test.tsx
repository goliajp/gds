import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MentionInput } from '../mention-input'

const suggestions = [
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
  { id: '3', label: 'Charlie' },
]

function Wrapper({
  initialValue = '',
  ...props
}: { initialValue?: string } & Partial<
  React.ComponentProps<typeof MentionInput>
>) {
  const [val, setVal] = React.useState(initialValue)
  return (
    <MentionInput
      value={val}
      onChange={setVal}
      suggestions={suggestions}
      {...props}
    />
  )
}

describe('MentionInput', () => {
  it('renders with placeholder', () => {
    render(<Wrapper placeholder="Type here..." />)
    expect(screen.getByPlaceholderText('Type here...')).toBeDefined()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Wrapper />)
    expect(
      container.querySelector('[data-component="mention-input"]')
    ).not.toBeNull()
  })

  it('shows suggestions on trigger character', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })
    expect(screen.getByTestId('mention-suggestions')).toBeDefined()
  })

  it('filters suggestions by query', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@al' } })

    const dropdown = screen.getByTestId('mention-suggestions')
    expect(dropdown.textContent).toContain('Alice')
    expect(dropdown.textContent).not.toContain('Bob')
  })

  it('selects mention on click', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })

    const aliceOption = screen.getByText('Alice')
    fireEvent.mouseDown(aliceOption)

    expect((input as HTMLInputElement).value).toBe('@Alice ')
  })

  it('closes on escape', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })

    expect(screen.getByTestId('mention-suggestions')).toBeDefined()

    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByTestId('mention-suggestions')).toBeNull()
  })

  it('hides suggestions when no trigger is present', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello world' } })
    expect(screen.queryByTestId('mention-suggestions')).toBeNull()
  })

  it('navigates down with ArrowDown key', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })

    // initially index 0 (Alice) is highlighted
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    // now index 1 (Bob) highlighted
    const options = screen.getAllByRole('option')
    expect(options[1].getAttribute('aria-selected')).toBe('true')
  })

  it('navigates up with ArrowUp key wraps to last', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })

    // from index 0, ArrowUp wraps to last (Charlie, index 2)
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    const options = screen.getAllByRole('option')
    expect(options[2].getAttribute('aria-selected')).toBe('true')
  })

  it('ArrowDown wraps from last to first', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })

    // go to last item
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    // now at index 2 (Charlie), one more wraps to 0 (Alice)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    const options = screen.getAllByRole('option')
    expect(options[0].getAttribute('aria-selected')).toBe('true')
  })

  it('selects highlighted item with Enter', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })

    // navigate to Bob
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect((input as HTMLInputElement).value).toBe('@Bob ')
  })

  it('does not show suggestions when trigger is mid-word', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    // trigger not preceded by space
    fireEvent.change(input, { target: { value: 'hello@alice' } })
    expect(screen.queryByTestId('mention-suggestions')).toBeNull()
  })

  it('shows suggestions when trigger after space', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello @' } })
    expect(screen.getByTestId('mention-suggestions')).toBeDefined()
  })

  it('hides suggestions when space typed after trigger query', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@alice ' } })
    // space after trigger query means mention is done
    expect(screen.queryByTestId('mention-suggestions')).toBeNull()
  })

  it('applies disabled styling', () => {
    const { container } = render(<Wrapper disabled />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('opacity-50')
    expect(
      container.querySelector('[data-component="mention-input"]')
    ).not.toBeNull()
  })

  it('applies custom className', () => {
    render(<Wrapper className="my-input" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('my-input')
  })

  it('closes suggestions on outside click', () => {
    render(
      <div>
        <Wrapper />
        <button data-testid="outside">Outside</button>
      </div>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@' } })
    expect(screen.getByTestId('mention-suggestions')).toBeDefined()

    // click outside
    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByTestId('mention-suggestions')).toBeNull()
  })

  it('does not fire keydown handlers when suggestions are hidden', () => {
    const onChange = vi.fn()
    render(
      <MentionInput
        value="hello"
        onChange={onChange}
        suggestions={suggestions}
      />
    )
    const input = screen.getByRole('textbox')
    // ArrowDown with no suggestions open should not prevent default
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    // no crash, no side effects
  })

  it('uses custom trigger character', () => {
    function CustomTriggerWrapper() {
      const [val, setVal] = React.useState('')
      return (
        <MentionInput
          value={val}
          onChange={setVal}
          suggestions={suggestions}
          trigger="#"
        />
      )
    }
    render(<CustomTriggerWrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '#' } })
    expect(screen.getByTestId('mention-suggestions')).toBeDefined()
  })

  it('does not show suggestions when trigger query has no matches', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '@zzzzz' } })
    // no filtered results, so suggestion panel should not appear
    expect(screen.queryByTestId('mention-suggestions')).toBeNull()
  })

  it('selects mention in middle of text', () => {
    render(<Wrapper />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello @' } })

    const bobOption = screen.getByText('Bob')
    fireEvent.mouseDown(bobOption)

    expect((input as HTMLInputElement).value).toBe('hello @Bob ')
  })
})
