// faq — frequently asked questions section with expandable answers
import { forwardRef } from 'react'

import { Accordion, AccordionItem } from '../l4-molecules/accordion'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type FAQItem = {
  question: string
  answer: string
}

export type FAQProps = {
  items: FAQItem[]
  title?: string
  glass?: boolean
  className?: string
}

export const FAQ = forwardRef<HTMLDivElement, FAQProps>(function FAQ(
  { items, title = 'FAQ', glass, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        'gds-ctx gds-radius-card gds-pad-x-lg gds-pad-y-lg border',
        glass === true
          ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
          : 'border-border bg-surface',
        className
      )}
      data-component="faq"
    >
      <h2 className="gds-heading text-fg mb-4 font-semibold">{title}</h2>
      <Accordion type="single">
        {items.map((item, i) => (
          <AccordionItem key={i} id={`faq-${i}`} title={item.question}>
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
})
