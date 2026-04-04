import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ImagePreview } from '../image-preview'

describe('ImagePreview', () => {
  it('renders thumbnail image', () => {
    render(<ImagePreview src="/test.png" alt="Test" />)
    const img = screen.getByTestId('thumbnail')
    expect(img.getAttribute('src')).toBe('/test.png')
    expect(img.getAttribute('alt')).toBe('Test')
  })

  it('opens lightbox on click', async () => {
    const user = userEvent.setup()
    render(<ImagePreview src="/test.png" alt="Test" />)
    await user.click(screen.getByLabelText('Preview Test'))
    expect(screen.getByTestId('lightbox')).toBeDefined()
  })

  it('closes lightbox on escape', async () => {
    const user = userEvent.setup()
    render(<ImagePreview src="/test.png" alt="Test" />)
    await user.click(screen.getByLabelText('Preview Test'))
    expect(screen.getByTestId('lightbox')).toBeDefined()
    await user.keyboard('{Escape}')
    expect(screen.queryByTestId('lightbox')).toBeNull()
  })

  it('renders portal to document body', async () => {
    const user = userEvent.setup()
    render(<ImagePreview src="/test.png" alt="Test" />)
    await user.click(screen.getByLabelText('Preview Test'))
    // lightbox should be direct child of body (via portal)
    const lightbox = screen.getByTestId('lightbox')
    expect(lightbox.parentElement).toBe(document.body)
  })

  it('closes lightbox on close button click', async () => {
    const user = userEvent.setup()
    render(<ImagePreview src="/test.png" alt="Test" />)
    await user.click(screen.getByLabelText('Preview Test'))
    expect(screen.getByTestId('lightbox')).toBeDefined()
    await user.click(screen.getByLabelText('Close preview'))
    expect(screen.queryByTestId('lightbox')).toBeNull()
  })

  it('closes lightbox on backdrop click', async () => {
    const user = userEvent.setup()
    render(<ImagePreview src="/test.png" alt="Test" />)
    await user.click(screen.getByLabelText('Preview Test'))
    const lightbox = screen.getByTestId('lightbox')
    // click on backdrop itself
    fireEvent.click(lightbox)
    expect(screen.queryByTestId('lightbox')).toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ImagePreview src="/test.png" className="my-preview" />
    )
    const root = container.querySelector('[data-component="image-preview"]')
    expect(root?.className).toContain('my-preview')
  })

  it('applies thumbnailClassName', () => {
    render(
      <ImagePreview src="/test.png" alt="Test" thumbnailClassName="my-thumb" />
    )
    const img = screen.getByTestId('thumbnail')
    expect(img.className).toContain('my-thumb')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ImagePreview src="/test.png" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
