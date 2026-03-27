import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Textarea } from '../textarea'

describe('Textarea', () => {
  it('renders without crash', () => {
    render(<Textarea data-testid="ta" />)
    expect(screen.getByTestId('ta')).toBeTruthy()
  })

  it('forwards ref to textarea element', () => {
    let el: HTMLTextAreaElement | null = null
    render(<Textarea ref={(node) => { el = node }} />)
    expect(el).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('has data-component="textarea"', () => {
    render(<Textarea data-testid="ta" />)
    expect(screen.getByTestId('ta').getAttribute('data-component')).toBe('textarea')
  })

  it('merges className', () => {
    render(<Textarea className="custom-cls" data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('custom-cls')
  })

  it('applies error variant', () => {
    render(<Textarea error data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('border-danger')
  })

  it('defaults to resize-y (vertical)', () => {
    render(<Textarea data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('resize-y')
  })

  it('applies resize="none"', () => {
    render(<Textarea resize="none" data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('resize-none')
  })

  it('applies resize="both"', () => {
    render(<Textarea resize="both" data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('resize')
  })

  it('applies autoGrow with field-sizing', () => {
    render(<Textarea autoGrow data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('[field-sizing:content]')
  })

  it('applies glass styles', () => {
    render(<Textarea glass data-testid="ta" />)
    expect(screen.getByTestId('ta').className).toContain('gds-glass')
  })

  it('passes through native props', () => {
    render(<Textarea rows={5} disabled data-testid="ta" />)
    const el = screen.getByTestId('ta') as HTMLTextAreaElement
    expect(Number(el.rows)).toBe(5)
    expect(el.disabled).toBe(true)
  })
})
