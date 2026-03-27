// a11y utilities — used by all layers from L2+
// values reference L0 tokens via Tailwind classes

// focus-visible ring for all interactive elements
// uses --gds-focus-ring-color (= --gds-accent), 2px ring, 1px offset
export const focusCls =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg'

// screen reader only — visually hidden but accessible to assistive tech
export const srOnly =
  'absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]'
