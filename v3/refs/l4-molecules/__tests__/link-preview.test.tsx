import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LinkPreview } from '../link-preview'

describe('LinkPreview', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <LinkPreview title="Test" url="https://example.com" />
    )
    expect(
      container.querySelector('[data-component="link-preview"]')
    ).not.toBeNull()
  })

  it('renders title and links to url', () => {
    const { getByText, container } = render(
      <LinkPreview title="Example" url="https://example.com" />
    )
    expect(getByText('Example')).toBeDefined()
    const anchor = container.querySelector('a')!
    expect(anchor.getAttribute('href')).toBe('https://example.com')
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders description when provided', () => {
    const { getByText } = render(
      <LinkPreview title="T" url="https://x.com" description="A description" />
    )
    expect(getByText('A description')).toBeDefined()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<LinkPreview title="T" url="https://x.com" />)
    const spans = container.querySelectorAll('.line-clamp-2')
    expect(spans.length).toBe(0)
  })

  it('renders domain when provided', () => {
    const { getByText } = render(
      <LinkPreview title="T" url="https://x.com" domain="example.com" />
    )
    expect(getByText('example.com')).toBeDefined()
  })

  it('does not render domain when not provided', () => {
    const { container } = render(<LinkPreview title="T" url="https://x.com" />)
    const domainSpans = container.querySelectorAll('.text-\\[10px\\]')
    expect(domainSpans.length).toBe(0)
  })

  it('renders image when provided', () => {
    const { container } = render(
      <LinkPreview
        title="T"
        url="https://x.com"
        image="https://img.com/pic.jpg"
      />
    )
    const img = container.querySelector('img')!
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe('https://img.com/pic.jpg')
    expect(img.getAttribute('alt')).toBe('T')
  })

  it('does not render image when not provided', () => {
    const { container } = render(<LinkPreview title="T" url="https://x.com" />)
    expect(container.querySelector('img')).toBeNull()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(
      <LinkPreview title="T" url="https://x.com" glass />
    )
    const anchor = container.querySelector('a')!
    expect(anchor.className).toContain('gds-glass')
  })

  it('does not apply glass class when glass is false', () => {
    const { container } = render(
      <LinkPreview title="T" url="https://x.com" glass={false} />
    )
    const anchor = container.querySelector('a')!
    expect(anchor.className).not.toContain('gds-glass')
  })

  it('merges custom className', () => {
    const { container } = render(
      <LinkPreview title="T" url="https://x.com" className="my-cls" />
    )
    const anchor = container.querySelector('a')!
    expect(anchor.className).toContain('my-cls')
  })
})
