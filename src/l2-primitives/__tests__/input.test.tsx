import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from '../input'

describe('Input', () => {
  it('renders without crash', () => {
    render(<Input placeholder="test" />)
    expect(screen.getByPlaceholderText('test')).toBeTruthy()
  })

  it('forwards ref to input element', () => {
    let el: HTMLInputElement | null = null
    render(<Input ref={(node) => { el = node }} />)
    expect(el).toBeInstanceOf(HTMLInputElement)
  })

  it('has data-component="input" without icons', () => {
    render(<Input data-testid="inp" />)
    expect(screen.getByTestId('inp').getAttribute('data-component')).toBe('input')
  })

  it('has data-component="input" with icons (on wrapper)', () => {
    render(<Input icon={<span>L</span>} data-testid="inp" />)
    const wrapper = screen.getByTestId('inp').parentElement
    expect(wrapper?.getAttribute('data-component')).toBe('input')
  })

  it('merges className', () => {
    render(<Input className="custom-cls" data-testid="inp" />)
    expect(screen.getByTestId('inp').className).toContain('custom-cls')
  })

  it('renders plain input when no icons', () => {
    render(<Input data-testid="inp" />)
    expect(screen.getByTestId('inp').tagName).toBe('INPUT')
    expect(screen.getByTestId('inp').parentElement?.getAttribute('data-component')).toBeNull()
  })

  it('wraps in relative div when icon present', () => {
    render(<Input icon={<span>icon</span>} data-testid="inp" />)
    const wrapper = screen.getByTestId('inp').parentElement
    expect(wrapper?.tagName).toBe('DIV')
    expect(wrapper?.className).toContain('relative')
  })

  it('wraps in relative div when rightIcon present', () => {
    render(<Input rightIcon={<span>R</span>} data-testid="inp" />)
    const wrapper = screen.getByTestId('inp').parentElement
    expect(wrapper?.tagName).toBe('DIV')
  })

  it('applies error variant', () => {
    render(<Input error data-testid="inp" />)
    expect(screen.getByTestId('inp').className).toContain('border-danger')
  })

  it('applies sm size variant', () => {
    render(<Input inputSize="sm" data-testid="inp" />)
    expect(screen.getByTestId('inp').className).toContain('gds-h-sm')
  })

  it('applies default size variant', () => {
    render(<Input data-testid="inp" />)
    expect(screen.getByTestId('inp').className).toContain('gds-h')
  })

  it('applies glass styles', () => {
    render(<Input glass data-testid="inp" />)
    expect(screen.getByTestId('inp').className).toContain('gds-glass')
  })

  it('passes through native input props', () => {
    render(<Input type="password" disabled data-testid="inp" />)
    const el = screen.getByTestId('inp') as HTMLInputElement
    expect(el.type).toBe('password')
    expect(el.disabled).toBe(true)
  })

  // --- v2 feature tests ---

  it('renders prefix text', () => {
    render(<Input prefix="https://" data-testid="inp" />)
    expect(screen.getByText('https://')).toBeDefined()
  })

  it('renders suffix text', () => {
    render(<Input suffix=".com" data-testid="inp" />)
    expect(screen.getByText('.com')).toBeDefined()
  })

  it('renders both prefix and suffix', () => {
    render(<Input prefix="https://" suffix=".com" data-testid="inp" />)
    expect(screen.getByText('https://')).toBeDefined()
    expect(screen.getByText('.com')).toBeDefined()
  })

  it('renders copy button when copyable is true', () => {
    render(<Input copyable value="test" data-testid="inp" />)
    expect(screen.getByLabelText('Copy to clipboard')).toBeDefined()
  })

  it('copies value to clipboard when copy button is clicked', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    render(<Input copyable value="hello" data-testid="inp" />)
    await user.click(screen.getByLabelText('Copy to clipboard'))
    expect(writeText).toHaveBeenCalledWith('hello')
    vi.unstubAllGlobals()
  })

  it('does not crash when copyable with undefined value', () => {
    render(<Input copyable data-testid="inp" />)
    // copy button should be visible but clicking should be safe
    expect(screen.getByLabelText('Copy to clipboard')).toBeDefined()
  })

  it('renders action element', () => {
    render(<Input action={<button type="button">Go</button>} data-testid="inp" />)
    expect(screen.getByText('Go')).toBeDefined()
  })

  it('shows clearable button when value is present', () => {
    const onClear = vi.fn()
    render(<Input clearable value="hello" onClear={onClear} data-testid="inp" />)
    expect(screen.getByLabelText('Clear')).toBeDefined()
  })

  it('does not show clearable button when value is empty', () => {
    render(<Input clearable value="" onClear={vi.fn()} data-testid="inp" />)
    expect(screen.queryByLabelText('Clear')).toBeNull()
  })

  it('shows loading spinner', () => {
    const { container } = render(<Input loading data-testid="inp" />)
    expect(container.querySelector('.animate-spin')).not.toBeNull()
  })

  it('applies error styling with prefix/suffix wrapper', () => {
    const { container } = render(<Input prefix="$" error data-testid="inp" />)
    const wrapper = container.querySelector('[data-component="input"]')
    expect(wrapper?.className).toContain('border-danger')
  })
})
