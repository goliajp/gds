# CLAUDE.md

See `.claude/rules/` for shared Claude Code rules (language, coding style, testing, git workflow, security, data architecture, RFC workflow, plus the TypeScript subset). Those files are synced byte-for-byte from `dotclaude/` and apply to every managed project. The GDS library standards and the 10 design principles are **also synced** from `dotclaude/gds/` — they live at `rules/gds/gds-lib.md` and `rules/gds/gds-philosophy.md`, shared with the goliajp admin project (which maintains its own `rules/gds-overrides.md` for torajs-specific import paths).

## Project Overview

GDS (GOLIA Design System) v2 — production-grade React component library with 390+ components, 93%+ branch coverage, and strict 8-layer architecture. v2 adds full email/productivity app support (RichTextEditor, EmailThread, EmailComposer, AppShell) for mailrs integration.

- `src/` — library source (8 layers: tokens → systems → primitives → atoms → molecules → organisms → charts → patterns)
- `web/` — official website: component browser, playground & documentation (150+ demos)
- `utils/` — anti-corruption layer wrapping external dependencies (cx, a11y, portal, tiptap, sanitize)

## Commands

```bash
bun install                        # install dependencies
bun dev                            # start website (Vite, port 5175)
bun test                           # run vitest (444 files, 3771+ cases)
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
├── l4-molecules/  — 112 multi-part, stateful components (Card, Dialog, Tabs, Toast API...)
├── l5-organisms/  — 77 complex features (DataTable, RichTextEditor, EmailThread, EmailComposer...)
├── l6-charts/     — 37 data visualizations (Bar, Line, Heatmap, Gantt, Flame, Realtime...)
├── l7-patterns/   — 59 page-level layouts (Dashboard, Admin, AppShell, InboxLayout...)
└── utils/         — Anti-corruption layer (cx, a11y, dom, types, motion, glass, portal, tiptap, sanitize)
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
- `useEditor`, `EditorContent`, `StarterKit`, `Ext*` from `@gds/utils/tiptap` — replaces direct @tiptap/* (v2)
- `sanitizeEmailHtml()`, `sanitizeHtml()` from `@gds/utils/sanitize` — replaces direct dompurify (v2)

### CSS Integration (Tailwind v4)

**CRITICAL:** GDS CSS files must be imported via CSS `@import` inside the consumer's Tailwind entry file, NOT via JS `import` in main.tsx. `theme.css` contains Tailwind's `@theme` directive which is only processed within the Tailwind compilation pipeline.

```css
/* app/src/index.css — correct */
@import 'tailwindcss';
@import '@goliapkg/gds/tokens.css';
@import '@goliapkg/gds/theme.css';
@import '@goliapkg/gds/fonts.css';
```

```typescript
// main.tsx — only import the app CSS entry point
import '@/index.css'
```

Do NOT import GDS CSS files directly in JS:
```typescript
// WRONG — @theme in theme.css won't be processed by Tailwind
import '@goliapkg/gds/tokens.css'
import '@goliapkg/gds/theme.css'
```

### Subpath Exports

Consumers can import by layer for optimal tree-shaking:

```tsx
import { Button } from '@goliapkg/gds/primitives'
import { Card } from '@goliapkg/gds/molecules'
import { BarChart } from '@goliapkg/gds/charts'
```

### Path Alias

`@gds/*` → `./src/*` (configured in tsconfig.json and web/vite.config.ts)

### Contextual Depth System

Container components add `gds-ctx` CSS class. Each nesting level auto-reduces spacing, radius, shadow, and text size via CSS custom properties. Use `gds-pad`, `gds-gap`, `gds-radius`, `gds-shadow`, `gds-text`, `gds-heading` utilities instead of fixed Tailwind classes. Use `gds-ctx-reset` to reset depth back to level 0 (escape hatch for deep nesting like EmailThread > message > attachment).

### v2 New Components

| Component | Layer | Purpose |
|-----------|-------|---------|
| `RichTextEditor` | L5 | Tiptap 3.x WYSIWYG (full/minimal modes), image upload, 15 toolbar items |
| `EmailThread` | L5 | Email conversation view, HTML sanitization, attachments, AI analysis panel |
| `EmailComposer` | L5 | Block-based email composition, To/Cc/Bcc, rich text, attachments, Ctrl+Enter |
| `EmailComposerField` | L4 | Recipient chip input with async autocomplete, email validation |
| `AppShell` | L7 | Root application layout: sidebar + content + statusBar + mobileNav |
| `Pane` / `PaneGroup` | L7 | Flex layout primitives, responsive stacking |
| `InboxLayout` | L7 | 3-pane inbox with drag-resize divider, mobile single-pane |
| `ToastProvider` / `toast` | L4 | Imperative toast API: `toast.success('msg')`, Sonner-compatible |
| `SidebarItem` | L7 | Structured nav item with collapsed tooltip + badge |

### v2 Theme Presets

```tsx
import { themePresets } from '@goliapkg/gds'

// email/productivity apps (mailrs-proven)
configureTheme({ ...themePresets.email, mode: 'system' })

// data-dense dashboards
configureTheme({ ...themePresets.dashboard, mode: 'dark' })
```

### v2 Optional Peer Dependencies

RichTextEditor requires `@tiptap/*` + `lowlight`. EmailThread requires `dompurify`. These are optional — only install if using those components. All accessed via anti-corruption layer (`utils/tiptap.ts`, `utils/sanitize.ts`).

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
- **444 test files**, 3771+ test cases
- **Zero `any`** in production code
- **Zero `@ts-ignore`** — no type suppression
- **a11y**: focus trap in all overlays (Dialog, Sheet, Drawer), keyboard support on all interactive elements
- **SSR safe**: all `window`/`document` access guarded or inside effects

## Coding Standards

GDS library code (`src/`) follows stricter rules than general project code. See `.claude/rules/gds/gds-lib.md` for the full set (no `interface`/`enum`/`any`/`as`/ternary/nested ternary, named exports only, kebab-case files, PascalCase exports, `camelCase + Variants` variant exports, CVA mandatory with `defaultVariants`, anti-corruption layer enforced). Design principles are in `.claude/rules/gds/gds-philosophy.md`.
