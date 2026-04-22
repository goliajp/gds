# GDS Design Philosophy

9 principles that govern every component, pattern, and decision in the GOLIA Design System. When principles conflict, lower-numbered principles take priority.

## 01 — Clarity over decoration

Data is the product. Remove anything that competes with content for attention.

- Dense tables over card grids. Every row counts, every column earns its place.
- Whitespace is intentional structure, not filler.
- No gratuitous color, no gradients, no decorative borders. Semantic color only where attention is needed (success, warning, danger, accent).
- When in doubt, show less chrome, more data.

## 02 — Consistency breeds trust

Same action → same appearance → same position → everywhere.

- One component per concept. No one-off overrides, no "just this once" variants.
- All tokens, spacing, and interaction patterns come from the system — never ad hoc.
- If a new pattern is needed, add it to the system first, then use it.

## 03 — Keyboard-first

Every action reachable by keyboard. No exceptions.

- All interactive elements have visible focus indicators (`focusCls`).
- Global shortcuts (⌘K command palette, ⌘, settings) + context shortcuts (N new, E edit, D delete).
- `?` key reveals all available shortcuts in current context.
- Tab order follows visual layout. Focus trapping in modals/dialogs.

## 04 — Dark-native

Design for dark mode first. Light mode is a derived adaptation.

- All color decisions, contrast ratios, and visual hierarchy optimized for dark backgrounds.
- Light mode maps from dark tokens, not the other way around.
- Test in dark mode first. If it works in dark, verify in light — never reverse.

## 05 — Immediate feedback

Every interaction → visible response within 100ms.

- Optimistic updates: reflect the change instantly, reconcile with server async.
- Dangerous actions: execute immediately + show undo toast. No confirmation dialogs blocking flow.
- Loading states: skeleton shimmer for initial load, inline spinner for mutations.
- Never block the UI thread with synchronous operations.

## 06 — Motion as expression

Animation is a communication channel, not decoration.

- Every component accepts `motion` prop for enter/exit/state-change animations.
- Built-in motion vocabulary: `fade`, `slide`, `scale`, `spring`, `stagger`, `ripple`, `magnetic`.
- Spring physics (tension + friction) over CSS duration-based easing.
- `prefers-reduced-motion`: disable animation entirely — "no animation" is the fastest variant, not a degraded experience.
- Animation must never block interaction. User can act during any transition.

**When building components:**
- Add `motion` prop to all interactive/display components.
- Default: subtle fade/scale (100-200ms). No motion on atoms (badge, dot, separator).
- List items: stagger entrance. Modals: scale+fade. Toasts: slide from edge.

## 07 — AI-native

The design system serves human users and AI agents equally.

- Components expose semantic structure (not just visual DOM) via `data-*` attributes, ARIA labels, and typed props.
- All data-bearing components (DataTable, Form, KvTable) produce structured output that LLMs can parse without scraping.
- AI can invoke any action that a keyboard user can: command palette commands, form submissions, navigation.
- Component documentation is machine-readable: typed props, variant enums, usage examples in the playground serve as training data for AI agents.

**When building components:**
- Export all types. Use descriptive prop names (not abbreviations).
- Add `data-component`, `data-variant`, `data-state` attributes for machine parsing.
- Ensure playground items have complete `docs()`, `code()`, and `controls()` — these are the AI's reference manual.

## 08 — Glass as material

Glass (frosted translucency) is a material system, not a style toggle.

- Every visual component accepts a `glass` boolean prop.
- Glass = `backdrop-filter: blur()` + semi-transparent background + subtle border.
- Intensity adapts: light glass for inline elements, heavier glass for overlays/modals.
- Automatic fallback: when `backdrop-filter` is unsupported or GPU-constrained, degrade to solid semi-transparent background.
- Dark mode glass: lower opacity, more blur. Light mode glass: higher opacity, less blur.

**When building components:**
- Add `glass?: boolean` prop. When true, apply glass classes via CVA variant or conditional `cx()`.
- Glass variant must not break readability — ensure sufficient contrast.
- Test glass on both solid backgrounds and busy/colorful backgrounds.

## 09 — Mobile-native

Mobile is a parallel design target, not a responsive afterthought.

- Touch targets: minimum 44×44px for all interactive elements on mobile.
- Gesture navigation: swipe to dismiss sheets/drawers, pull to refresh, pinch to zoom where applicable.
- Viewport adaptation: components reflow or switch layout mode (e.g., DataTable → card list on mobile, tabs → bottom nav).
- No hover-dependent functionality. Everything triggered by hover must have a tap/press equivalent.
- Bottom-sheet pattern for mobile modals. Drawer from bottom, not sides.

**When building components:**
- Use `min-h-[44px] min-w-[44px]` on touch targets (buttons, links, checkboxes).
- Provide mobile-specific variants where layout must fundamentally change.
- Test with touch simulation. Ensure no hover-only features.

## 10 — Contextual depth system

Components auto-scale spacing, radius, shadow, and typography based on nesting depth. Zero configuration — just compose.

- Container components (Card, Dialog, Sheet, Panel, Popover, Dropdown, Accordion, Tabs content) internally add `gds-ctx` CSS class.
- Each nesting level of `gds-ctx` reduces CSS custom properties automatically.
- Leaf components (Button, Input, Badge, Text) consume current depth values without adding `gds-ctx`.
- Developers never set depth manually. They compose components normally and the CSS handles the rest.

**Depth scale:**

| Depth | gap | padding | radius | shadow | text | heading | fg-alpha |
|-------|-----|---------|--------|--------|------|---------|----------|
| root  | 24px | 20px | 12px | md | 13px | 16px | 1.0 |
| 0 (.gds-ctx) | 16px | 16px | 10px | sm | 12px | 14px | 0.95 |
| 1 (nested) | 12px | 12px | 8px | none | 11px | 13px | 0.88 |
| 2 | 8px | 8px | 6px | none | 10px | 12px | 0.80 |
| 3+ | 6px | 6px | 4px | none | 10px | 11px | 0.72 |

**CSS utilities available:**
- `gds-pad`, `gds-pad-x`, `gds-pad-y` — depth-aware padding
- `gds-gap` — depth-aware gap (use with flex/grid)
- `gds-radius` — depth-aware border-radius
- `gds-shadow` — depth-aware box-shadow
- `gds-text` — depth-aware base font size
- `gds-heading` — depth-aware heading font size

**When building container components:**
- Add `gds-ctx` to the root element's className.
- Use `gds-pad`, `gds-gap`, `gds-radius`, `gds-shadow` instead of fixed Tailwind classes.
- Use `flex flex-col gds-gap` instead of `space-y-*` for auto-scaling child spacing.
- Fixed size overrides (`p-5`, `p-2`) are still valid for explicit padding modes (like Card's `padding="lg"`).

**Depth reset escape hatch:**
- `gds-ctx-reset` resets depth back to level 0 (useful for deep nesting like EmailThread > message > attachment).

**When building leaf components:**
- Do NOT add `gds-ctx`. Leaf components inherit the current depth.
- Use `gds-text` for body text, `gds-heading` for headings, if you want depth-aware sizing.
- Fixed Tailwind text sizes (`text-xs`, `text-sm`) are fine when absolute sizing is needed.

**Currently depth-aware components:** Card, Dialog, Panel, Sheet, AppShell, InboxLayout.
