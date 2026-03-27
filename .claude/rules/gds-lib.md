# GDS (GOLIA Design System) Library Code Standards

This file governs code in `admin/src/components/ui/` — the design system library layer. These rules are STRICTER than general business code rules.

## TypeScript Strictness

### Types
- **`type` only** — never use `interface`
- **No `enum`** — use `type` union + `const` object:
  ```ts
  // wrong
  enum Size { Sm, Default, Lg }

  // right
  type Size = 'sm' | 'default' | 'lg'
  ```
- **No `any`** — use `unknown` + type guards, or generic `<T>`
- **No type assertions** (`as`) — use type narrowing instead
- **Export all types** — consumers may need them for wrapper components

### Expressions
- **No ternary** — use `if/else` or early return for logic, `&&` for conditional rendering only
- **`??` over `||`** — always use nullish coalescing, never falsy coalescing
- **No implicit boolean coercion** — write `x !== undefined` not `if (x)`
- **No nested ternary** — absolutely forbidden

### Functions
- **Named exports only** — no default exports from lib files
- **`forwardRef` for all DOM-wrapping components** — consumers may need ref access
- **Pure functions** — no side effects in component body (no fetch, no localStorage)
- **No `useEffect` in primitives** — effects belong in business layer, not lib

### Naming
- Component files: `kebab-case.tsx` (e.g., `date-picker.tsx`)
- Component exports: `PascalCase` (e.g., `DatePicker`)
- Variant exports: `camelCase` + `Variants` suffix (e.g., `buttonVariants`)
- Type exports: `PascalCase` + `Props` suffix (e.g., `ButtonProps`)
- No abbreviations in public API — `variant` not `v`, `disabled` not `dis`

## CVA (class-variance-authority)

- **All components with visual variants MUST use `cva()`**
- Export the variants object for playground introspection
- Use `VariantProps<typeof xxxVariants>` for prop types
- `defaultVariants` must be specified — no implicit defaults
- Base classes go in cva() first argument, not in the component JSX

```ts
// correct pattern
const buttonVariants = cva(
  'inline-flex items-center ...base classes...',
  {
    variants: { variant: { ... }, size: { ... } },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

type ButtonProps = VariantProps<typeof buttonVariants> & { ... }

export { buttonVariants }
```

## Styling

- **Only semantic tokens** — never raw Tailwind colors (`bg-blue-500`)
- **`cx()` for class merging** — import from `@torajs/react/common/utils/tailwind/cx`
- **`focusCls` on all interactive elements** — from `@/utils/a11y`
- **`select-none`** — on all non-content elements (buttons, labels, chrome)
- **`cursor-pointer`** — via `role` or element type, not manually
- **Responsive** — components must work at all breakpoints without custom media queries
- **No inline styles** — use Tailwind classes or CSS variables

## Component API Design

- **Props extend native HTML attributes** — `& React.ButtonHTMLAttributes<...>`
- **`className` prop always supported** — for consumer overrides
- **Spread remaining props** — `{...props}` on the root DOM element
- **No internal state for visual-only components** — controlled from outside
- **Composition over configuration** — prefer slots/children over complex prop APIs:
  ```tsx
  // prefer
  <Card>
    <CardHeader title="..." />
    {children}
  </Card>

  // over
  <Card title="..." headerAction={...} footerContent={...} />
  ```

## File Structure

```
components/ui/
├── button.tsx        — cva + forwardRef + exported variants
├── badge.tsx         — cva + exported variants
├── input.tsx         — cva + forwardRef + exported variants
├── select.tsx        — forwardRef
├── tabs.tsx          — controlled component
├── card.tsx          — composition (Card + CardHeader)
├── tooltip.tsx       — positioning logic
├── dialog.tsx        — modal + escape + backdrop
├── dropdown.tsx      — floating menu
└── index.ts          — barrel export (future)
```

## Testing Expectations (future)

- Every component must have a playground section showing all variants
- Every prop must be exercisable from the playground configurator
- Visual regression tests (screenshot comparison) before releasing to npm
