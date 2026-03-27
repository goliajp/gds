# @golia/gds

**GOLIA Design System** — enterprise-grade React UI component library built by [GOLIA株式会社](https://github.com/goliajp).

Powering all GOLIA React web applications with a unified, AI-friendly component system.

## Features

- **370+ components** across 8 architectural layers (tokens → patterns)
- **AI-native** — semantic `data-*` attributes, typed props, machine-readable documentation. AI agents can learn the system from types and playground demos alone
- **Contextual depth** — components auto-scale spacing, radius, shadow, and typography based on nesting depth. Zero configuration
- **Glass material** — frosted translucency as a first-class material system with `glass` prop
- **Motion system** — spring physics animation vocabulary with `motion` prop
- **Dark-native** — designed for dark mode first, light mode derived
- **Keyboard-first** — every action reachable by keyboard, visible focus indicators everywhere
- **5-axis theming** — density, elevation, glass, motion, shape — all controllable at runtime via Jotai atoms
- **Gesture support** — drag, swipe, pinch-zoom, long-press, pull-to-refresh built into the token layer

## Architecture

```
src/
├── l0-tokens/      design tokens: color math, sizing, radius, shadow, glass, motion, gestures
├── l1-systems/     theme engine (Jotai), 5-axis dimensional state
├── l2-primitives/  ~30 stateless visual blocks (Button, Input, Badge...)
├── l3-atoms/       ~60 simple composed elements (Avatar, Checkbox, Tooltip...)
├── l4-molecules/   ~70 multi-part components (Card, Dialog, Tabs, Select...)
├── l5-organisms/   ~60 complex features (DataTable, Calendar, Kanban...)
├── l6-charts/      31 Recharts-based visualizations (Bar, Line, Heatmap, Sankey...)
├── l7-patterns/    ~55 page-level layouts (Dashboard, Admin, Settings...)
└── utils/          anti-corruption layer (cx, a11y, dom, types)
```

Each layer has **strict dependency constraints** enforced by ESLint — higher layers import from lower layers, never the reverse.

## Quick Start

```bash
bun add @golia/gds
```

```tsx
import { Button, Card, CardHeader, CardContent } from '@golia/gds'
import '@golia/gds/tokens.css'

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

## Development

```bash
git clone git@github.com:goliajp/gds.git
cd gds
bun install
bun dev              # dev-center at localhost:5175
bun test             # run tests
bun run test:coverage # coverage report (80% threshold)
bun run check        # test + typecheck + lint
```

## For AI Agents

GDS is designed to be learned and applied by AI. Key entry points:

| What you need | Where to look |
|---------------|---------------|
| All exported components & types | `src/index.ts` |
| Component API patterns | `src/l3-atoms/button/button.tsx` (canonical example) |
| Design tokens & CSS variables | `src/l0-tokens/` |
| Layer dependency rules | `src/l0-tokens/deps.ts` |
| Design principles | `.claude/rules/gds-philosophy.md` |
| Coding standards | `.claude/rules/gds-lib.md` |
| Live examples | `dev-center/src/items/` (150+ demos) |

Every component follows the same pattern: **CVA variants → typed Props → forwardRef → cx() class merging**. Learn one, apply to all.

## Tech Stack

- **React 19** + **TypeScript 5** (strict mode)
- **Tailwind CSS 4** with semantic design tokens
- **CVA** (class-variance-authority) for variant management
- **Jotai** for theme state
- **Recharts 3** for data visualization
- **Lucide** for icons
- **Vite 8** for dev server and build
- **Vitest 4** for testing (happy-dom, 80% coverage threshold)

## License

[MIT](LICENSE) — GOLIA株式会社
