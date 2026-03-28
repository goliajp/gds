# @goliapkg/gds

**GOLIA Design System** — production-grade React UI component library built by [GOLIA](https://github.com/goliajp).

370+ components across 8 architectural layers, from design tokens to full-page patterns.

## Features

- **370+ components** across 8 layers (tokens → primitives → atoms → molecules → organisms → charts → patterns)
- **Strict layer architecture** — dependency constraints enforced by ESLint, anti-corruption wrappers for all external deps
- **93% branch coverage** — 393 test files, 3400+ test cases, all layers above 90%
- **AI-native** — semantic `data-component`/`data-variant`/`data-state` attributes, typed props, machine-readable docs
- **Contextual depth** — components auto-scale spacing, radius, shadow, typography based on nesting depth
- **Glass material** — frosted translucency as first-class material system via `glass` prop
- **Motion system** — spring physics animation vocabulary via `motion` prop
- **Dark-native** — designed for dark mode first, light mode derived
- **Keyboard-first** — every interactive element has keyboard support, visible focus indicators, focus trapping in overlays
- **5-axis theming** — density, elevation, glass, motion, shape — all controllable at runtime via Jotai atoms
- **Tree-shakeable** — per-layer subpath exports, ESM-only, `sideEffects: false`

## Install

```bash
bun add @goliapkg/gds
```

```tsx
import { Button, Card, CardHeader, CardContent } from '@goliapkg/gds'
import '@goliapkg/gds/tokens.css'

function App() {
  return (
    <Card glass>
      <CardHeader title="Hello GDS" />
      <CardContent>
        <Button variant="primary" motion="scale">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Subpath Imports

Import only what you need for optimal bundle size:

```tsx
// full library (re-exports everything)
import { Button, Dialog, DataTable } from '@goliapkg/gds'

// per-layer imports (tree-shaking friendly)
import { Button, Input } from '@goliapkg/gds/primitives'
import { Avatar, Switch } from '@goliapkg/gds/atoms'
import { Card, Dialog, Tabs } from '@goliapkg/gds/molecules'
import { DataTable, Calendar } from '@goliapkg/gds/organisms'
import { BarChart, LineChart } from '@goliapkg/gds/charts'
import { AdminLayout, Hero } from '@goliapkg/gds/patterns'
import { cx, focusCls, renderPortal } from '@goliapkg/gds/utils'
```

## Architecture

```
src/
├── l0-tokens/      design tokens: color math, sizing, radius, shadow, glass, motion, gestures
├── l1-systems/     theme engine (Jotai atoms), 5-axis dimensional state
├── l2-primitives/  31 stateless visual blocks (Button, Input, Badge, Spinner...)
├── l3-atoms/       71 simple composed elements (Avatar, Checkbox, Tooltip, Rating...)
├── l4-molecules/   109 multi-part components (Card, Dialog, Tabs, Select, ColorPicker...)
├── l5-organisms/   73 complex features (DataTable, Calendar, Kanban, CommandPalette...)
├── l6-charts/      31 Recharts-based visualizations (Bar, Line, Heatmap, Sankey...)
├── l7-patterns/    55 page-level layouts (Dashboard, Admin, Hero, LoginForm...)
└── utils/          anti-corruption layer (cx, a11y, dom, types, motion, glass, portal)
```

### Layer Dependency Rules

Each layer has strict import constraints enforced by ESLint:

| Layer | Can Import From | External Deps |
|-------|----------------|---------------|
| L0 tokens | — | tailwindcss |
| L1 systems | L0 | react, jotai |
| L2 primitives | L0, L1, utils | react, cva |
| L3 atoms | L0–L2, utils | + lucide-react |
| L4 molecules | L0–L3, utils | + lucide-react |
| L5 organisms | L0–L4, utils | + lucide-react |
| L6 charts | L0, utils | recharts |
| L7 patterns | L0–L5, utils | react |

Anti-corruption wrappers: `cx()` for clsx+tailwind-merge, `VariantProps` for CVA types, `renderPortal()` for react-dom. Direct imports of these packages are blocked by ESLint.

## Development

```bash
git clone git@github.com:goliajp/gds.git
cd gds
bun install
bun dev              # dev-center at localhost:5175
bun test             # run vitest
bun run test:coverage # coverage report (93%+ branches)
bun run check        # test + typecheck + lint
bun run build        # build library
```

## Quality

| Metric | Value |
|--------|-------|
| Test files | 393 |
| Test cases | 3,400+ |
| Branch coverage | 93%+ |
| Line coverage | 97%+ |
| TypeScript | strict, zero `any` |
| a11y | focus trap, keyboard nav, ARIA roles |
| SSR safe | all browser APIs guarded |

## For AI Agents

GDS is designed to be learned and applied by AI. Key entry points:

| What you need | Where to look |
|---------------|---------------|
| All exports | `src/index.ts` |
| Component pattern | any `src/l3-atoms/*.tsx` (canonical) |
| Design tokens | `src/l0-tokens/` |
| Layer rules | `src/l0-tokens/deps.ts` |
| Philosophy | `.claude/rules/gds-philosophy.md` |
| Standards | `.claude/rules/gds-lib.md` |
| Live demos | `dev-center/src/items/` (150+ demos) |

Every component: **CVA variants → typed Props → forwardRef → cx() → focusCls → data-component**. Learn one, apply to all.

## Tech Stack

- **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4** with semantic design tokens
- **CVA** for variant management
- **Jotai** for theme state
- **Recharts 3** for charts
- **Lucide** for icons
- **Vite 8** for build
- **Vitest** for testing

## License

[MIT](LICENSE) — GOLIA
