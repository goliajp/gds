# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

Always reply in Chinese (中文).

## Project Overview

GDS (GOLIA Design System) v1 — production-grade React component library with 370+ components, 93%+ branch coverage, and strict 8-layer architecture. Includes an interactive dev-center for documentation and playground.

- `src/` — library source (8 layers: tokens → systems → primitives → atoms → molecules → organisms → charts → patterns)
- `dev-center/` — interactive component browser & playground (150+ demos)
- `utils/` — anti-corruption layer wrapping external dependencies

## Commands

```bash
bun install                        # install dependencies
bun dev                            # start dev-center (Vite, port 5175)
bun test                           # run vitest (393 files, 3400+ cases)
bun run test:watch                 # vitest in watch mode
bun run test:coverage              # coverage report (93%+ branches, all layers >90%)
bunx vitest run src/l3-atoms/__tests__/button.test.tsx  # run single test
bun run lint                       # eslint check (layer constraints enforced)
bun run lint:fix                   # eslint auto-fix
bun run typecheck                  # tsc --noEmit (strict, zero any)
bun run build                      # build library (multi-entry vite + tsc declarations)
bun run check                      # all checks (test + typecheck + lint)
```

## Architecture

### Layer System

```
src/
├── l0-tokens/     — CSS variables, color derivation, scales, motion, glass, gestures
├── l1-systems/    — Theme engine (Jotai atoms), hooks, 5-axis state management
├── l2-primitives/ — 31 stateless visual blocks (Button, Input, Badge...)
├── l3-atoms/      — 71 simple composed elements (Avatar, Checkbox, Tooltip...)
├── l4-molecules/  — 109 multi-part, stateful components (Card, Dialog, Tabs...)
├── l5-organisms/  — 73 complex features (DataTable, Calendar, Kanban...)
├── l6-charts/     — 31 Recharts-based data visualization
├── l7-patterns/   — 55 page-level layouts (Dashboard, Admin, Hero...)
└── utils/         — Anti-corruption layer (cx, a11y, dom, types, motion, glass, portal)
```

### Layer Dependency Constraints (ESLint enforced)

Each layer has strict import rules. ESLint `no-restricted-imports` blocks both cross-layer violations and unauthorized external deps.

| Layer | Allowed External Dependencies |
|-------|-------------------------------|
| L0 | tailwindcss only |
| L1 | react, jotai |
| L2 | react, clsx, tailwind-merge (via cx), class-variance-authority |
| L3-L5 | + lucide-react |
| L6 | recharts (no cva, no lucide) |
| L7 | react, clsx, tailwind-merge only |

**Cross-layer rule:** Ln can only import from Lm where m < n. ESLint blocks reverse imports.

### Anti-Corruption Layer (utils/)

Direct imports of external packages are **forbidden** in component code. Use wrappers:

- `cx()` from `@gds/utils/cx` — replaces direct clsx/tailwind-merge
- `VariantProps` from `@gds/utils/types` — replaces direct CVA type import
- `focusCls` from `@gds/utils/a11y` — standard focus ring class
- `renderPortal()` from `@gds/utils/portal` — replaces direct react-dom createPortal

### Subpath Exports

Consumers can import by layer for optimal tree-shaking:

```tsx
import { Button } from '@goliapkg/gds/primitives'
import { Card } from '@goliapkg/gds/molecules'
import { BarChart } from '@goliapkg/gds/charts'
```

### Path Alias

`@gds/*` → `./src/*` (configured in tsconfig.json and dev-center/vite.config.ts)

### Contextual Depth System

Container components add `gds-ctx` CSS class. Each nesting level auto-reduces spacing, radius, shadow, and text size via CSS custom properties. Use `gds-pad`, `gds-gap`, `gds-radius`, `gds-shadow`, `gds-text`, `gds-heading` utilities instead of fixed Tailwind classes.

## Component Pattern

Every library component follows this structure:

1. **CVA variants** — `cva()` with `defaultVariants`, exported as `xxxVariants`
2. **Props type** — `VariantProps<typeof xxxVariants> & HTMLAttributes`, exported as `XxxProps`
3. **forwardRef** — all DOM-wrapping components use `forwardRef`
4. **cx()** for class merging, **focusCls** on interactive elements
5. **glass/motion** — optional `glass?: boolean` and `motion` props
6. **data-component** — all components have `data-component="name"` for AI/test targeting
7. **...props spread** — remaining HTML attributes forwarded to root DOM element
8. **Keyboard support** — all `role="button"` elements have `onKeyDown` for Enter/Space

## Quality Standards

- **93%+ branch coverage**, all 9 layers above 90%
- **393 test files**, 3400+ test cases
- **Zero `any`** in production code
- **Zero `@ts-ignore`** — no type suppression
- **a11y**: focus trap in all overlays (Dialog, Sheet, Drawer), keyboard support on all interactive elements
- **SSR safe**: all `window`/`document` access guarded or inside effects

## Coding Standards

See `.claude/rules/` for detailed rules. Key points:

- **`type` only** — never `interface` or `enum`
- **No `any`** — use `unknown` + type guards
- **No ternary** — use `if/else` or early return; `&&` for JSX conditional rendering only
- **`??` over `||`** — always nullish coalescing
- **Named exports only** — no default exports
- **Semantic tokens only** — never raw Tailwind colors
- **Files: kebab-case**, Exports: PascalCase, Variants: camelCase + `Variants`

## Git Convention

- Branching: git-flow-avh (`master` = production, `develop` = integration)
- Commit: `feat:`, `fix:`, `refactor:`, `test:`, `chore:` — all lowercase, no trailing period
