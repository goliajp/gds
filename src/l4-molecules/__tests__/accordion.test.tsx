import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Accordion, AccordionItem } from '../accordion'

describe('Accordion', () => {
  it('renders without crash', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem id="a" title="Section A">Content A</AccordionItem>
      </Accordion>,
    )
    expect(container.querySelector('[data-component="accordion"]')).not.toBeNull()
  })

  it('renders items collapsed by default', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem id="a" title="Section A">Content A</AccordionItem>
      </Accordion>,
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
    expect(screen.queryByText('Content A')).toBeNull()
  })

  it('expands item on click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem id="a" title="Section A">Content A</AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByText('Section A'))
    expect(screen.getByText('Content A')).toBeDefined()
  })

  it('collapses item on second click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem id="a" title="Section A">Content A</AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByText('Section A'))
    expect(screen.getByText('Content A')).toBeDefined()
    await user.click(screen.getByText('Section A'))
    expect(screen.queryByText('Content A')).toBeNull()
  })

  it('single mode closes other items when one opens', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single">
        <AccordionItem id="a" title="Section A">Content A</AccordionItem>
        <AccordionItem id="b" title="Section B">Content B</AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByText('Section A'))
    expect(screen.getByText('Content A')).toBeDefined()
    await user.click(screen.getByText('Section B'))
    expect(screen.queryByText('Content A')).toBeNull()
    expect(screen.getByText('Content B')).toBeDefined()
  })

  it('multiple mode keeps other items open', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="multiple">
        <AccordionItem id="a" title="Section A">Content A</AccordionItem>
        <AccordionItem id="b" title="Section B">Content B</AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByText('Section A'))
    await user.click(screen.getByText('Section B'))
    expect(screen.getByText('Content A')).toBeDefined()
    expect(screen.getByText('Content B')).toBeDefined()
  })
})
