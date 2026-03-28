# Contributing to GDS

Thank you for your interest in contributing to the GOLIA Design System.

## Development Setup

```bash
git clone git@github.com:goliajp/gds.git
cd gds
bun install
bun dev          # start website at localhost:5175
```

## Branch Strategy

This project uses **git-flow-avh**:

- `master` — production releases
- `develop` — integration branch (default)
- `feature/*` — new features, branch from develop
- `bugfix/*` — bug fixes, branch from develop
- `release/*` — release prep
- `hotfix/*` — urgent production fixes

```bash
git flow feature start my-feature
# ... work ...
git flow feature finish my-feature
```

## Commit Messages

```
<type>: <description>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`

- all lowercase, no trailing period
- no scope parentheses
- no co-author tags

## Before Submitting

Run the full check suite:

```bash
bun run check    # test + typecheck + lint
```

## Component Guidelines

Every component must follow the GDS library standards:

- **`type` only** — no `interface` or `enum`
- **CVA variants** — all visual variants use `cva()` with `defaultVariants`
- **forwardRef** — all DOM-wrapping components
- **cx()** for class merging — never import clsx/tailwind-merge directly
- **focusCls** on all interactive elements
- **Named exports only** — no default exports
- **Semantic tokens only** — no raw Tailwind colors

### Layer Rules

Components belong to a specific layer. Each layer has strict dependency constraints:

| Layer | Can Import From |
|-------|----------------|
| L0 (tokens) | tailwindcss only |
| L1 (systems) | L0, react, jotai |
| L2 (primitives) | L0-L1, react, clsx, tailwind-merge |
| L3 (atoms) | L0-L2, + cva, lucide-react |
| L4 (molecules) | L0-L3, same as L3 |
| L5 (organisms) | L0-L4, + react-dom |
| L6 (charts) | L0-L5, recharts |
| L7 (patterns) | L0-L6 |

### File Naming

- Component files: `kebab-case.tsx`
- Component exports: `PascalCase`
- Variant exports: `camelCase` + `Variants` suffix
- Type exports: `PascalCase` + `Props` suffix
- Tests: co-located as `__tests__/component-name.test.tsx`

## Adding a New Component

1. Create the component in the correct layer directory
2. Export from the layer's `index.ts`
3. Add a demo item in `web/src/items/`
4. Write tests (aim for 80%+ coverage)
5. Run `bun run check` before committing

## Design Principles

See [`.claude/rules/gds-philosophy.md`](.claude/rules/gds-philosophy.md) for the 10 design principles that govern every component decision. When principles conflict, lower-numbered principles take priority.
