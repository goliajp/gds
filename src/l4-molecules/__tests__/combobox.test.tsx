import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Combobox } from '../combobox'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
]

describe('Combobox', () => {
  it('renders with placeholder', () => {
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} placeholder="Pick one" />,
    )
    expect(container.querySelector('[data-component="combobox"]')).not.toBeNull()
    expect(screen.getByText('Pick one')).toBeDefined()
  })

  it('shows selected option label when value is set', () => {
    render(
      <Combobox options={options} value="vue" onChange={() => {}} />,
    )
    expect(screen.getByText('Vue')).toBeDefined()
  })

  it('opens on click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} />,
    )
    const trigger = container.querySelector('button')!
    await user.click(trigger)
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Vue')).toBeDefined()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} disabled />,
    )
    const trigger = container.querySelector('button')!
    await user.click(trigger)
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('filters options by search', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, 'rea')
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.queryByText('Vue')).toBeNull()
    expect(screen.queryByText('Svelte')).toBeNull()
  })

  it('shows no results message when search has no matches', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, 'zzzzz')
    expect(screen.getByText('No results')).toBeDefined()
  })

  it('selects option on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    await user.click(screen.getByText('Vue'))
    expect(onChange).toHaveBeenCalledWith('vue')
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('closes on escape', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} />,
    )
    await user.click(container.querySelector('button')!)
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    await user.keyboard('{Escape}')
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('applies error state', () => {
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} error />,
    )
    const trigger = container.querySelector('button')!
    expect(trigger.className).toContain('border-danger')
  })

  it('navigates down with ArrowDown key', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, '{ArrowDown}')
    await user.type(searchInput, '{Enter}')
    expect(onChange).toHaveBeenCalledWith('vue')
  })

  it('navigates up with ArrowUp key wraps to last', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, '{ArrowUp}')
    await user.type(searchInput, '{Enter}')
    expect(onChange).toHaveBeenCalledWith('angular')
  })

  it('ArrowDown wraps from last to first', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, '{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}')
    await user.type(searchInput, '{Enter}')
    expect(onChange).toHaveBeenCalledWith('react')
  })

  it('selects first item with Enter key by default', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, '{Enter}')
    expect(onChange).toHaveBeenCalledWith('react')
  })

  it('highlights option on mouse enter', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} />,
    )
    await user.click(container.querySelector('button')!)
    const optionButtons = container.querySelectorAll('.max-h-60 button')
    await user.hover(optionButtons[2])
    expect(optionButtons[2].className).toContain('bg-bg-tertiary')
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} glass />,
    )
    const trigger = container.querySelector('button')!
    expect(trigger.className).toContain('gds-glass')
  })

  it('shows active style for selected value in dropdown', async () => {
    const user = userEvent.setup()
    render(
      <Combobox options={options} value="vue" onChange={() => {}} />,
    )
    const trigger = screen.getByText('Vue').closest('button')!
    await user.click(trigger)
    // in dropdown, Vue option should have active styling
    const vueButtons = screen.getAllByText('Vue')
    // the dropdown option (second one)
    const dropdownVue = vueButtons[vueButtons.length - 1].closest('button')
    expect(dropdownVue?.className).toContain('bg-accent/10')
  })

  it('applies disabled styling', () => {
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} disabled />,
    )
    const trigger = container.querySelector('button')!
    expect(trigger.className).toContain('opacity-50')
    expect(trigger).toBeDisabled()
  })

  it('resets highlightedIndex when search query changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, '{ArrowDown}{ArrowDown}')
    // type to change query, should reset to 0
    await user.type(searchInput, 's')
    await user.type(searchInput, '{Enter}')
    expect(onChange).toHaveBeenCalledWith('svelte')
  })

  it('uses custom searchPlaceholder', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox
        options={options}
        value={null}
        onChange={() => {}}
        searchPlaceholder="Type to search..."
      />,
    )
    await user.click(container.querySelector('button')!)
    expect(container.querySelector('input[placeholder="Type to search..."]')).not.toBeNull()
  })

  it('applies glass styling to dropdown panel', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} glass />,
    )
    await user.click(container.querySelector('button')!)
    const dropdown = container.querySelector('.animate-popup')
    expect(dropdown?.className).toContain('gds-glass')
  })

  it('does not select when Enter is pressed on empty filtered list', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Combobox options={options} value={null} onChange={onChange} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, 'zzzzz')
    await user.type(searchInput, '{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  // --- v2 feature tests ---

  it('shows create option when creatable and no matches', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onCreateOption = vi.fn().mockReturnValue({ value: 'new-one', label: 'New One' })
    const { container } = render(
      <Combobox
        options={options}
        value={null}
        onChange={onChange}
        creatable
        onCreateOption={onCreateOption}
      />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, 'xyznotfound')
    // should show create row
    expect(screen.getByText(/Create: xyznotfound/)).toBeDefined()
  })

  it('calls onCreateOption and selects when create row is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onCreateOption = vi.fn().mockReturnValue({ value: 'new-item', label: 'New Item' })
    const { container } = render(
      <Combobox
        options={options}
        value={null}
        onChange={onChange}
        creatable
        onCreateOption={onCreateOption}
      />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, 'brandnew')
    await user.click(screen.getByText(/Create: brandnew/))
    expect(onCreateOption).toHaveBeenCalledWith('brandnew')
    expect(onChange).toHaveBeenCalledWith('new-item')
  })

  it('uses fallback options when onSearch is provided but query is empty', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn().mockResolvedValue([])
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} onSearch={onSearch} />,
    )
    await user.click(container.querySelector('button')!)
    // with empty query, onSearch should not be called and options should be shown
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Vue')).toBeDefined()
  })

  it('shows loading state when externalLoading is true', () => {
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} loading />,
    )
    // trigger should be rendered (loading doesn't prevent render)
    expect(container.querySelector('[data-component="combobox"]')).not.toBeNull()
  })

  it('does not call onSearch with empty query', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn().mockResolvedValue([])
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} onSearch={onSearch} />,
    )
    await user.click(container.querySelector('button')!)
    // with empty query, onSearch should never be called
    expect(onSearch).not.toHaveBeenCalled()
    // default options should be shown
    expect(screen.getByText('React')).toBeDefined()
  })

  it('shows default options when reopened after close', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Combobox options={options} value={null} onChange={() => {}} />,
    )
    await user.click(container.querySelector('button')!)
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    await user.keyboard('{Escape}')
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
    // reopen should show all default options
    await user.click(container.querySelector('button')!)
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Vue')).toBeDefined()
    expect(screen.getByText('Svelte')).toBeDefined()
    expect(screen.getByText('Angular')).toBeDefined()
  })
})
