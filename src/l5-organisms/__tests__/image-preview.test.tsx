import { render, screen } from '@testing-library/react'
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
})
