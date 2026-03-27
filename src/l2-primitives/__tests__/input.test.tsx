import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
})
