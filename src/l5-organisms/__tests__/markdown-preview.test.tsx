import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MarkdownPreview } from '../markdown-preview'

describe('MarkdownPreview', () => {
  it('renders heading', () => {
    const { container } = render(<MarkdownPreview content="# Hello World" />)
    const h1 = container.querySelector('h1')
    expect(h1).not.toBeNull()
    expect(h1?.textContent).toBe('Hello World')
  })

  it('renders all heading levels', () => {
    const content = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6'
    const { container } = render(<MarkdownPreview content={content} />)
    expect(container.querySelector('h1')?.textContent).toBe('H1')
    expect(container.querySelector('h2')?.textContent).toBe('H2')
    expect(container.querySelector('h3')?.textContent).toBe('H3')
    expect(container.querySelector('h4')?.textContent).toBe('H4')
    expect(container.querySelector('h5')?.textContent).toBe('H5')
    expect(container.querySelector('h6')?.textContent).toBe('H6')
  })

  it('renders bold and italic', () => {
    const { container } = render(<MarkdownPreview content="**bold** and *italic*" />)
    const strong = container.querySelector('strong')
    const em = container.querySelector('em')
    expect(strong?.textContent).toBe('bold')
    expect(em?.textContent).toBe('italic')
  })

  it('renders inline code', () => {
    const { container } = render(<MarkdownPreview content="Use `const` keyword" />)
    const code = container.querySelector('code')
    expect(code).not.toBeNull()
    expect(code?.textContent).toBe('const')
  })

  it('renders code block', () => {
    const content = '```\nconst x = 1\n```'
    const { container } = render(<MarkdownPreview content={content} />)
    const pre = container.querySelector('pre')
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toContain('const x = 1')
  })

  it('renders list items', () => {
    const content = '- first\n- second\n- third'
    const { container } = render(<MarkdownPreview content={content} />)
    const items = container.querySelectorAll('li')
    expect(items.length).toBe(3)
    expect(items[0].textContent).toBe('first')
  })

  it('renders list items with asterisk', () => {
    const content = '* first\n* second'
    const { container } = render(<MarkdownPreview content={content} />)
    const items = container.querySelectorAll('li')
    expect(items.length).toBe(2)
  })

  it('renders link', () => {
    const { container } = render(<MarkdownPreview content="[Google](https://google.com)" />)
    const link = container.querySelector('a')
    expect(link).not.toBeNull()
    expect(link?.textContent).toBe('Google')
    expect(link?.getAttribute('href')).toBe('https://google.com')
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders horizontal rule markup', () => {
    const content = 'above\n---\nbelow'
    const { container } = render(<MarkdownPreview content={content} />)
    const root = container.querySelector('[data-component="markdown-preview"]')!
    // the hr is rendered via dangerouslySetInnerHTML
    expect(root.innerHTML).toContain('border-border')
  })

  it('renders blockquote', () => {
    const { container } = render(<MarkdownPreview content="> This is a quote" />)
    const blockquote = container.querySelector('blockquote')
    expect(blockquote).not.toBeNull()
    expect(blockquote?.textContent).toBe('This is a quote')
  })

  it('renders paragraph', () => {
    const { container } = render(<MarkdownPreview content="Just a paragraph" />)
    const p = container.querySelector('p')
    expect(p).not.toBeNull()
    expect(p?.textContent).toBe('Just a paragraph')
  })

  it('skips empty lines and renders separate paragraphs', () => {
    const content = 'first\n\nsecond'
    const { container } = render(<MarkdownPreview content={content} />)
    const root = container.querySelector('[data-component="markdown-preview"]')!
    expect(root.innerHTML).toContain('first')
    expect(root.innerHTML).toContain('second')
  })

  it('closes list when followed by non-list content', () => {
    const content = '- item\nParagraph after list'
    const { container } = render(<MarkdownPreview content={content} />)
    const ul = container.querySelector('ul')
    const p = container.querySelector('p')
    expect(ul).not.toBeNull()
    expect(p).not.toBeNull()
    expect(p?.textContent).toBe('Paragraph after list')
  })

  it('closes list before heading', () => {
    const content = '- item\n# Heading'
    const { container } = render(<MarkdownPreview content={content} />)
    expect(container.querySelector('ul')).not.toBeNull()
    expect(container.querySelector('h1')).not.toBeNull()
  })

  it('closes list before horizontal rule', () => {
    const content = '- item\n---'
    const { container } = render(<MarkdownPreview content={content} />)
    expect(container.querySelector('ul')).not.toBeNull()
    expect(container.querySelector('hr')).not.toBeNull()
  })

  it('closes list before blockquote', () => {
    const content = '- item\n> quote'
    const { container } = render(<MarkdownPreview content={content} />)
    expect(container.querySelector('ul')).not.toBeNull()
    expect(container.querySelector('blockquote')).not.toBeNull()
  })

  it('closes list before code block', () => {
    const content = '- item\n```\ncode\n```'
    const { container } = render(<MarkdownPreview content={content} />)
    expect(container.querySelector('ul')).not.toBeNull()
    expect(container.querySelector('pre')).not.toBeNull()
  })

  it('handles dangling code block (no closing ```)', () => {
    const content = '```\ncode without closing'
    const { container } = render(<MarkdownPreview content={content} />)
    const pre = container.querySelector('pre')
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toContain('code without closing')
  })

  it('handles dangling list (no closing)', () => {
    const content = '- item1\n- item2'
    const { container } = render(<MarkdownPreview content={content} />)
    const ul = container.querySelector('ul')
    expect(ul).not.toBeNull()
    const items = container.querySelectorAll('li')
    expect(items.length).toBe(2)
  })

  it('escapes HTML in regular text so script tags are not executable', () => {
    const content = '<script>alert("xss")</script>Hello'
    const { container } = render(<MarkdownPreview content={content} />)
    const root = container.querySelector('[data-component="markdown-preview"]')!
    // script tags should be escaped — rendered as text, not as executable DOM elements
    expect(root.querySelector('script')).toBeNull()
    expect(root.textContent).toContain('Hello')
  })

  it('sanitizes on* event attributes', () => {
    const content = '<div onclick="alert(1)">Click me</div>'
    const { container } = render(<MarkdownPreview content={content} />)
    expect(container.innerHTML).not.toContain('onclick')
  })

  it('escapes HTML in regular text', () => {
    const { container } = render(<MarkdownPreview content="<b>not bold</b>" />)
    // should be escaped, not rendered as HTML
    expect(container.querySelector('b')).toBeNull()
    expect(container.textContent).toContain('<b>not bold</b>')
  })

  it('applies glass styling when glass is true', () => {
    const { container } = render(<MarkdownPreview content="Hello" glass />)
    const el = container.querySelector('[data-component="markdown-preview"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass styling when glass is false', () => {
    const { container } = render(<MarkdownPreview content="Hello" />)
    const el = container.querySelector('[data-component="markdown-preview"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('applies custom className', () => {
    const { container } = render(<MarkdownPreview content="Hello" className="my-md" />)
    const el = container.querySelector('[data-component="markdown-preview"]')
    expect(el?.className).toContain('my-md')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<MarkdownPreview content="Hello" ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('markdown-preview')
  })

  it('has data-component attribute', () => {
    const { container } = render(<MarkdownPreview content="Hello" />)
    expect(container.querySelector('[data-component="markdown-preview"]')).not.toBeNull()
  })
})
