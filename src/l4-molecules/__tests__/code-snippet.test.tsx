import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CodeSnippet } from '../code-snippet'

describe('CodeSnippet', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<CodeSnippet code="hello" />)
    expect(container.querySelector('[data-component="code-snippet"]')).not.toBeNull()
  })

  it('renders code content', () => {
    render(<CodeSnippet code="const x = 1" />)
    expect(screen.getByText('const x = 1')).toBeDefined()
  })

  it('shows line numbers by default', () => {
    const code = ['line1', 'line2'].join('\n')
    const { container } = render(<CodeSnippet code={code} />)
    // line number spans with select-none class exist inside pre
    const pre = container.querySelector('pre')
    const lineNumSpans = pre?.querySelectorAll('.select-none')
    expect(lineNumSpans !== undefined && lineNumSpans !== null && lineNumSpans.length === 2).toBe(true)
  })

  it('hides line numbers when showLineNumbers is false', () => {
    const code = ['line1', 'line2'].join('\n')
    const { container } = render(<CodeSnippet code={code} showLineNumbers={false} />)
    const pre = container.querySelector('pre')
    const lineNumSpans = pre?.querySelectorAll('.select-none')
    expect(lineNumSpans === undefined || lineNumSpans === null || lineNumSpans.length === 0).toBe(true)
  })

  it('shows language header when language is provided', () => {
    render(<CodeSnippet code="x = 1" language="python" />)
    expect(screen.getByText('python')).toBeDefined()
  })

  it('does not show language header when language is undefined', () => {
    const { container } = render(<CodeSnippet code="x = 1" />)
    // no header with border-b class
    const header = container.querySelector('.border-b')
    expect(header).toBeNull()
  })

  it('renders copy button when copyable is true (default)', () => {
    render(<CodeSnippet code="copy me" />)
    expect(screen.getByLabelText('Copy code')).toBeDefined()
  })

  it('does not render copy button when copyable is false', () => {
    render(<CodeSnippet code="no copy" copyable={false} />)
    expect(screen.queryByLabelText('Copy code')).toBeNull()
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<CodeSnippet code="glass" glass />)
    const el = container.querySelector('[data-component="code-snippet"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies non-glass classes when glass is false', () => {
    const { container } = render(<CodeSnippet code="no glass" />)
    const el = container.querySelector('[data-component="code-snippet"]')
    expect(el?.className).toContain('bg-bg-secondary')
  })

  it('applies custom className', () => {
    const { container } = render(<CodeSnippet code="cls" className="my-cls" />)
    const el = container.querySelector('[data-component="code-snippet"]')
    expect(el?.className).toContain('my-cls')
  })

  it('renders multiple lines including empty ones', () => {
    const code = ['a', '', 'b'].join('\n')
    const { container } = render(<CodeSnippet code={code} showLineNumbers={false} />)
    const lines = container.querySelectorAll('pre code .flex-1')
    expect(lines.length).toBe(3)
  })
})
