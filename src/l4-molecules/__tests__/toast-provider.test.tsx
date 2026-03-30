import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ToastProvider } from '../toast-provider'
import { toast } from '../toast-store'

afterEach(() => {
  act(() => {
    toast.dismissAll()
  })
})

describe('toast store', () => {
  it('toast.success() adds a toast item', () => {
    render(<ToastProvider />)
    act(() => {
      toast.success('Saved successfully')
    })
    expect(screen.getByText('Saved successfully')).toBeDefined()
  })

  it('toast.error() adds a toast item', () => {
    render(<ToastProvider />)
    act(() => {
      toast.error('Something went wrong')
    })
    expect(screen.getByText('Something went wrong')).toBeDefined()
  })

  it('toast.warning() adds a toast item', () => {
    render(<ToastProvider />)
    act(() => {
      toast.warning('Careful!')
    })
    expect(screen.getByText('Careful!')).toBeDefined()
  })

  it('toast.info() adds a toast item', () => {
    render(<ToastProvider />)
    act(() => {
      toast.info('FYI')
    })
    expect(screen.getByText('FYI')).toBeDefined()
  })

  it('toast.show() adds a default toast', () => {
    render(<ToastProvider />)
    act(() => {
      toast.show('Hello')
    })
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('returns a string id', () => {
    const id = toast.success('test')
    expect(typeof id).toBe('string')
    expect(id.startsWith('gds-toast-')).toBe(true)
  })

  it('toast.dismiss(id) removes specific toast', () => {
    render(<ToastProvider />)
    let id = ''
    act(() => {
      toast.success('First')
      id = toast.success('Second')
      toast.success('Third')
    })
    expect(screen.getByText('Second')).toBeDefined()
    act(() => {
      toast.dismiss(id)
    })
    expect(screen.queryByText('Second')).toBeNull()
    expect(screen.getByText('First')).toBeDefined()
    expect(screen.getByText('Third')).toBeDefined()
  })

  it('toast.dismissAll() clears all toasts', () => {
    render(<ToastProvider />)
    act(() => {
      toast.success('A')
      toast.error('B')
      toast.warning('C')
    })
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('B')).toBeDefined()
    expect(screen.getByText('C')).toBeDefined()
    act(() => {
      toast.dismissAll()
    })
    expect(screen.queryByText('A')).toBeNull()
    expect(screen.queryByText('B')).toBeNull()
    expect(screen.queryByText('C')).toBeNull()
  })
})

describe('ToastProvider', () => {
  it('renders with data-component attribute', () => {
    render(<ToastProvider />)
    act(() => {
      toast.success('Hello')
    })
    expect(document.querySelector('[data-component="toast-provider"]')).not.toBeNull()
  })

  it('renders nothing when no toasts', () => {
    render(<ToastProvider />)
    expect(document.querySelector('[data-component="toast-provider"]')).toBeNull()
  })

  it('renders toast description', () => {
    render(<ToastProvider />)
    act(() => {
      toast.success('Title', { description: 'Extra info' })
    })
    expect(screen.getByText('Extra info')).toBeDefined()
  })

  it('maxVisible limits displayed toasts', () => {
    render(<ToastProvider maxVisible={2} />)
    act(() => {
      toast.success('One')
      toast.success('Two')
      toast.success('Three')
      toast.success('Four')
    })
    // maxVisible=2 shows only the last 2
    expect(screen.queryByText('One')).toBeNull()
    expect(screen.queryByText('Two')).toBeNull()
    expect(screen.getByText('Three')).toBeDefined()
    expect(screen.getByText('Four')).toBeDefined()
  })

  it('action button onClick fires callback and dismisses toast', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ToastProvider />)
    act(() => {
      toast.success('Action toast', {
        action: { label: 'Undo', onClick },
      })
    })
    const undoButton = screen.getByText('Undo')
    expect(undoButton).toBeDefined()
    await user.click(undoButton)
    expect(onClick).toHaveBeenCalledOnce()
    // toast should be dismissed after action
    expect(screen.queryByText('Action toast')).toBeNull()
  })

  it('dismiss button removes a toast', async () => {
    const user = userEvent.setup()
    render(<ToastProvider />)
    act(() => {
      toast.success('Dismissable')
    })
    const dismissBtn = screen.getByLabelText('Dismiss')
    await user.click(dismissBtn)
    expect(screen.queryByText('Dismissable')).toBeNull()
  })

  describe('auto-dismiss', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('auto-dismisses after duration', () => {
      render(<ToastProvider />)
      act(() => {
        toast.success('Bye soon', { duration: 1000 })
      })
      expect(screen.getByText('Bye soon')).toBeDefined()
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(screen.queryByText('Bye soon')).toBeNull()
    })

    it('uses default duration of 5000ms', () => {
      render(<ToastProvider />)
      act(() => {
        toast.success('Default timer')
      })
      expect(screen.getByText('Default timer')).toBeDefined()
      act(() => {
        vi.advanceTimersByTime(4999)
      })
      expect(screen.getByText('Default timer')).toBeDefined()
      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(screen.queryByText('Default timer')).toBeNull()
    })

    it('dismissAll clears pending auto-dismiss timers', () => {
      render(<ToastProvider />)
      act(() => {
        toast.success('Timer1', { duration: 3000 })
        toast.success('Timer2', { duration: 3000 })
      })
      expect(screen.getByText('Timer1')).toBeDefined()
      expect(screen.getByText('Timer2')).toBeDefined()
      act(() => {
        toast.dismissAll()
      })
      expect(screen.queryByText('Timer1')).toBeNull()
      expect(screen.queryByText('Timer2')).toBeNull()
      // advancing timers after dismissAll should not cause errors
      act(() => {
        vi.advanceTimersByTime(5000)
      })
    })
  })

  it('handles multiple rapid toasts without losing any', () => {
    render(<ToastProvider />)
    act(() => {
      toast.success('Rapid1')
      toast.error('Rapid2')
      toast.warning('Rapid3')
      toast.info('Rapid4')
      toast.show('Rapid5')
    })
    expect(screen.getByText('Rapid1')).toBeDefined()
    expect(screen.getByText('Rapid2')).toBeDefined()
    expect(screen.getByText('Rapid3')).toBeDefined()
    expect(screen.getByText('Rapid4')).toBeDefined()
    expect(screen.getByText('Rapid5')).toBeDefined()
  })

  it('toast.info() maps to default variant', () => {
    render(<ToastProvider />)
    act(() => {
      toast.info('Info message')
    })
    // toast.info maps to 'default' variant — verify it renders (same as toast.show)
    expect(screen.getByText('Info message')).toBeDefined()
  })
})
