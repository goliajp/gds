import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CopyButton } from '../copy-button'

describe('CopyButton', () => {
  it('renders label text', () => {
    render(<CopyButton text="hello" label="Copy Code" />)
    expect(screen.getByText('Copy Code')).toBeInTheDocument()
  })

  it('calls clipboard writeText on click', async () => {
    const user = userEvent.setup()
    // spy on the clipboard available inside the component's window context
    const spy = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText: spy },
    })
    render(<CopyButton text="hello world" />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(spy).toHaveBeenCalledWith('hello world')
    vi.unstubAllGlobals()
  })

  it('shows copied feedback after click', async () => {
    const user = userEvent.setup()
    render(<CopyButton text="hello" copiedLabel="Done!" />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(screen.getByText('Done!')).toBeInTheDocument()
  })

  it('resets after timeout', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
    render(<CopyButton text="hello" />)
    const button = screen.getByRole('button')
    await act(async () => {
      fireEvent.click(button)
    })
    expect(screen.getByText('Copied!')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(1600)
    })
    expect(screen.getByText('Copy')).toBeInTheDocument()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })
})
