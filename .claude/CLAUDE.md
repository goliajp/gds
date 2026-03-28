# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

Always reply in Chinese (中文).

## Project Overview

GDS (GOLIA Design System) — standalone React component library with an interactive dev-center for documentation and playground.

- `src/` — library source (tokens, systems, primitives → patterns)
- `dev-center/` — interactive component browser & playground (150+ demos)

## Commands

```bash
bun install                        # install dependencies
bun dev                            # start dev-center (Vite, port 5175)
bun test                           # run vitest
bun run test:watch                 # vitest in watch mode
bun run test:coverage              # coverage report (80% threshold)
bunx vitest run src/l3-atoms/__tests__/button.test.tsx  # run single test
bun run lint                       # eslint check
bun run lint:fix                   # eslint auto-fix
bun run typecheck                  # tsc --noEmit
bun run build                      # build library (vite lib + tsc declarations)
bun run check                      # all checks (test + typecheck + lint)
```

## Architecture

### Layer System

```
src/
├── l0-tokens/     — CSS variables, color derivation, scales, motion, glass, gestures
├── l1-systems/    — Theme engine (Jotai atoms), hooks, state management
├── l2-primitives/ — Stateless visual blocks
├── l3-atoms/      — Simple composed elements (CVA variants)
├── l4-molecules/  — Multi-part, stateful components
├── l5-organisms/  — Complex features (DataTable, Calendar...)
├── l6-charts/     — Recharts-based data visualization
├── l7-patterns/   — Page-level layouts
└── utils/         — Anti-corruption layer (cx, a11y, dom, types, motion, glass)
```

### Layer Dependency Constraints

Each layer has strict import rules (enforced via ESLint):

| Layer | Allowed External Dependencies |
|-------|-------------------------------|
| L0 | tailwindcss only |
| L1 | react, jotai |
| L2 | react, clsx, tailwind-merge (via cx), class-variance-authority |
| L3-L4 | + lucide-react |
| L5 | + lucide-react |
| L6 | recharts (no cva, no lucide) |
| L7 | react, clsx, tailwind-merge only |

### Anti-Corruption Layer (utils/)

Direct imports of `clsx`, `tailwind-merge`, `class-variance-authority` are **forbidden** in component code. Use wrappers:

- `cx()` from `@gds/utils/cx` — replaces direct clsx/tailwind-merge
- `VariantProps` from `@gds/utils/types` — replaces direct CVA type import
- `focusCls` from `@gds/utils/a11y` — standard focus ring class

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
