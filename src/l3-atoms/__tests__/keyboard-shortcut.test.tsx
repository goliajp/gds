import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { KeyboardShortcut } from '../keyboard-shortcut'

describe('KeyboardShortcut', () => {
  it('triggers onTrigger when key combo is pressed', () => {
    const onTrigger = vi.fn()
    render(<KeyboardShortcut keys="ctrl+k" onTrigger={onTrigger} />)
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    expect(onTrigger).toHaveBeenCalledOnce()
  })

  it('does not trigger when wrong key is pressed', () => {
    const onTrigger = vi.fn()
    render(<KeyboardShortcut keys="ctrl+k" onTrigger={onTrigger} />)
    fireEvent.keyDown(window, { key: 'j', ctrlKey: true })
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('shows badge with Kbd elements when showBadge is true', () => {
    const onTrigger = vi.fn()
    const { container } = render(
      <KeyboardShortcut keys="ctrl+k" onTrigger={onTrigger} showBadge />,
    )
    const badge = container.querySelector('[data-component="keyboard-shortcut"]')
    expect(badge).not.toBeNull()
    const kbds = container.querySelectorAll('kbd')
    expect(kbds.length).toBe(2)
  })

  it('does not trigger when disabled', () => {
    const onTrigger = vi.fn()
    render(<KeyboardShortcut disabled keys="ctrl+k" onTrigger={onTrigger} />)
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('has data-component attribute when showBadge', () => {
    const { container } = render(
      <KeyboardShortcut keys="meta+p" onTrigger={() => {}} showBadge />,
    )
    expect(container.querySelector('[data-component="keyboard-shortcut"]')).not.toBeNull()
  })
})
