import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ColorPicker } from '../color-picker'

describe('ColorPicker', () => {
  it('renders preset swatches', () => {
    const presets = ['#ff0000', '#00ff00', '#0000ff']
    const { container } = render(
      <ColorPicker value="#ff0000" onChange={() => {}} presets={presets} />,
    )
    const buttons = container.querySelectorAll('button[aria-label^="Select color"]')
    expect(buttons.length).toBe(3)
  })

  it('selects color on swatch click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ColorPicker value="#ff0000" onChange={onChange} presets={['#ff0000', '#00ff00']} />,
    )
    const green = screen.getByLabelText('Select color #00ff00')
    await user.click(green)
    expect(onChange).toHaveBeenCalledWith('#00ff00')
  })

  it('shows hex input by default', () => {
    render(<ColorPicker value="#ff0000" onChange={() => {}} />)
    expect(screen.getByLabelText('Hex color input')).toBeDefined()
  })

  it('validates hex input and calls onChange for valid hex', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ColorPicker value="#000000" onChange={onChange} />)
    const input = screen.getByLabelText('Hex color input')
    await user.clear(input)
    await user.type(input, 'abcdef')
    expect(onChange).toHaveBeenCalledWith('#abcdef')
  })

  it('does not respond to clicks when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ColorPicker value="#ff0000" onChange={onChange} presets={['#00ff00']} disabled />,
    )
    const btn = screen.getByLabelText('Select color #00ff00')
    await user.click(btn)
    expect(onChange).not.toHaveBeenCalled()
  })
})
