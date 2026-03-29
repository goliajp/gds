# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.2.0] - 2026-03-29

### Added

- **DataTable major upgrade** — modular architecture (7 files), 35+ props:
  - Pagination: page, pageSize, pageSizeOptions, totalRows
  - Selection: selectable, selectedKeys, onToggleSelect, onToggleSelectAll
  - Global filter: globalFilter, globalFilterValue, highlightMatches
  - Column filters: columnFilters, onColumnFilterChange
  - Expandable rows: expandedKeys, onToggleExpand, renderExpanded
  - Batch actions: batchActions
  - Column toggle: columnToggle
  - CSV export: exportCsv, exportFilename
  - Density: compact/default/comfortable
  - Row features: striped, bordered, stickyHeader, rowNumbers, highlightOnHover
  - Actions column, aggregate footer, caption, footer
  - Column: label, align, format, hidden, muted, searchable, filterable, aggregate
- Dialog: `md` width alias (same as `default`, for admin compatibility)
- Table sub-components: Thead, Tbody, Tfoot, Tr, Th, Td, ThNum, TdNum, TdMuted, TdFoot, TableCaption, TableFooter
- DialogFooter sub-component

### Backward Compatibility

- Column.header → Column.label (both accepted via alias)
- data prop → rows (both accepted via alias)
- emptyText → emptyMessage (both accepted via alias)
- Column.render supports both (row) and (value, row, index) signatures

## [1.1.0] - 2026-03-29

### Added

- Divider: `label` prop, `variant` (dashed/dotted/solid), `dividerVariants` export
- Input: `clearable`, `loading`, `onClear` props
- NumberInput: `prefix`, `suffix` props
- Avatar: `loading` prop
- ToggleGroup: `lg` size variant
- DialogFooter sub-component
- Variants exports: checkboxVariants, statusBadgeVariants, statusDotVariants, toggleGroupVariants, toggleItemVariants, tabVariants

### Breaking Changes

- Divider now uses CVA with variant prop (previously plain component)
- ToggleGroup internal sizeClasses renamed to toggleGroupVariants

## [1.0.10] - 2026-03-29

### Fixed

- even padding in Card + CardContent/CardFooter (top padding was larger due to mt-3 stacking with Card padding)

## [1.0.9] - 2026-03-29

### Added

- `theme.css` — `@import '@goliapkg/gds/theme.css'` maps GDS tokens to Tailwind @theme (shadow-sm, rounded-lg, bg-bg, text-fg, etc.)
- `llms.txt` and `llms-full.txt` subpath exports in npm package

## [1.0.8] - 2026-03-29

### Fixed

- resolve onChange type conflicts in ToggleGroup, SegmentedControl, InputWithButton, ChipGroup, FilterBar

### Added

- integration guide in README: @source directive, theme provider, FOUC prevention, troubleshooting

## [1.0.7] - 2026-03-29

### Fixed

- rewrite GlowEffect from filter:blur to box-shadow (fixes overflow clipping and stacking context issues)

## [1.0.6] - 2026-03-29

### Fixed

- increase GlowEffect opacity for visible color distinction on dark backgrounds

## [1.0.5] - 2026-03-29

### Fixed

- tune GlowEffect visual quality — softer blur, lower opacity, explicit radius prop

## [1.0.4] - 2026-03-29

### Changed

- rename dev-center to web (official website)
- read version from package.json in website toolbar
- add /deploy command for website deployment
- add auto-deploy to /pub workflow

## [1.0.3] - 2026-03-29

### Fixed

- replace negative z-index with DOM order layering in GlowEffect

## [1.0.2] - 2026-03-29

### Fixed

- rewrite GlowEffect to inline styles with improved glow spread
- add rounded-inherit and -z-1 as @utility in tokens.css for general use
- fix dev-center GlowEffect color pills using unreadable CSS variable strings

## [1.0.1] - 2026-03-28

### Fixed

- resolve PinInput onChange type conflict with HTMLAttributes

## [1.0.0] - 2026-03-28

GDS v1 — production-ready release after 6 rounds of systematic audit and hardening.

### Highlights

- **370+ components** across 8 architectural layers
- **93%+ branch coverage** — 393 test files, 3400+ test cases, all layers above 90%
- **Strict layer enforcement** — ESLint rules prevent cross-layer imports and unauthorized external dependencies
- **Anti-corruption wrappers** — cx(), VariantProps, renderPortal() — no raw external imports in component code
- **Full keyboard accessibility** — focus trapping in all overlays, Enter/Space on all interactive elements
- **Type safety** — zero `any`, zero `@ts-ignore`, instanceof guards on DOM casts
- **Tree-shakeable** — per-layer subpath exports, multi-entry build, sideEffects: false
- **Complete public API** — all hooks, utilities, and types exported from barrel

### Breaking Changes (since 0.9.4)

- `Truncate` component: `expandable` prop removed, replaced with controlled `expanded` + `onToggle`
- `NotificationToast` / `NotificationCenter`: `onDismiss` renamed to `onClose`

### Added (since 0.9.4)

- `renderPortal()` utility wrapping react-dom createPortal behind anti-corruption layer
- ESLint per-layer dependency constraints (cross-layer + external dep enforcement)
- subpath exports: `@goliapkg/gds/primitives`, `/atoms`, `/molecules`, `/organisms`, `/charts`, `/patterns`, `/utils`
- multi-entry vite build for per-layer tree-shaking
- barrel exports for 25+ previously missing utilities and types
- `forwardRef` added to KeyboardShortcut and Sparkle
- `data-component` attribute added to InfoTip
- `useFocusTrap` added to Sheet and Drawer
- keyboard support (Enter/Space) added to Popover, CopyToClipboard, CategoryTag
- dev-center CodeBlock: token-level syntax highlighting with line numbers and language auto-detection
- 1400+ new test cases across all layers

### Fixed (since 0.9.4)

- react-dom violations in L2/L4 eliminated via renderPortal wrapper
- unsafe `as HTMLElement` casts in gesture hooks replaced with `instanceof Element` guard
- non-null assertion in Tree component replaced with optional chaining
- index-as-key anti-pattern fixed in 13 dynamic list components
- `any` type in CandlestickChart replaced with proper CandleShapeProps
- react-router moved from dependencies to devDependencies
- L2 dependency constraint corrected to include class-variance-authority

### Changed (since 0.9.4)

- CLAUDE.md, README.md updated to reflect v1 architecture, quality standards, and API surface

## [0.9.10] - 2026-03-28

### Fixed

- Sheet and Drawer now trap focus within panel (added useFocusTrap)
- Popover trigger now keyboard accessible (Enter/Space to toggle)
- CopyToClipboard now keyboard accessible (Enter/Space to copy)
- CategoryTag now keyboard accessible when onClick is provided
- unsafe `as HTMLElement` cast in gesture hooks replaced with `instanceof Element` guard
- non-null assertion `children!` in Tree replaced with optional chaining
- react-router moved from dependencies to devDependencies (not used in library code)

## [0.9.9] - 2026-03-28

### Changed

- all 9 layers now above 90% branch coverage
- utils 85% → 96%, L6-charts 88% → 93%, L5-organisms 91% → 92%
- global: statements 95.6%, branches 93.1%, functions 95.9%, lines 97.1%
- total: 393 test files, 3432 test cases
- exported CandleShape from candlestick-chart for direct unit testing

## [0.9.8] - 2026-03-28

### Changed

- all layers now above 90% branch coverage (up from 74% at 0.9.4)
- L0-tokens 83% → 92%, L1-systems 77% → 93%, L3-atoms 87% → 95%
- L4-molecules 85% → 93%, L5-organisms 80% → 91%, L6-charts 76% → 88%, L7-patterns 78% → 94%
- global: statements 94.8%, branches 92.2%, functions 95.2%, lines 96.3%
- total: 391 test files, 3345 test cases (up from 344/2039 at 0.9.4)

## [0.9.7] - 2026-03-28

### Fixed

- unified callback naming: NotificationToast/NotificationCenter `onDismiss` → `onClose` — **breaking**
- replaced index-as-key with stable keys in 13 dynamic list components (DataTable, SortableTable, Breadcrumb, Stepper, etc.)

### Changed

- boosted L1-systems coverage: use-theme branches 25% → 100%
- boosted L6-charts coverage: branches 76% → 87.5%
- boosted L7-patterns coverage: branches 78% → 94%
- global: statements 90.4%, branches 85.78%, functions 91.56%, lines 92.32%
- total: 390 test files, 2830 test cases

## [0.9.6] - 2026-03-28

### Added

- 563 tests for 46 previously untested components across L2-L5
- L2: loading, shimmer, slider, container (80 tests)
- L3: 14 atoms including animated-counter, bounce-dot, color-swatch, countdown-badge, gradient-text, hotkey, percentage-circle, progress-ring, pulse-ring, relative-time, ribbon-banner, scroll-progress, shortcut-display, zoom-on-hover (153 tests)
- L4: 22 molecules including banner, before-after, code-snippet, pin-input, drop-zone, notification-bell, glass-button, glass-card, user-card, watermark (244 tests)
- L5: data-grid, masonry-grid, progress-timeline, responsive-stack, step-form, tour (86 tests)

### Changed

- coverage: branches 73.99% → 83.23%, all 4 metrics now above 80% threshold
- total: 390 test files, 2602 test cases

## [0.9.5] - 2026-03-28

### Added

- renderPortal utility — anti-corruption wrapper for react-dom createPortal
- ESLint per-layer dependency constraints enforcing LAYER_DEP_CONSTRAINTS
- ESLint cross-layer import prevention (lower layers cannot import higher layers)
- subpath exports: @goliapkg/gds/primitives, /atoms, /molecules, /organisms, /charts, /patterns, /utils
- multi-entry vite build for per-layer tree-shaking
- missing barrel exports: useSetThemePrimaryColor, gesture/glass/motion/hooks utilities, 10+ types
- forwardRef to KeyboardShortcut and Sparkle
- data-component attribute to InfoTip
- dev-center CodeBlock: token-level syntax highlighting with line numbers and language auto-detection

### Changed

- Truncate refactored to controlled component (expandable → expanded + onToggle) — **breaking**
- all createPortal usages migrated to renderPortal (8 files)
- L2 dependency constraint updated to include class-variance-authority (matches actual usage)
- candlestick-chart CandleShape typed properly (removed any)

## [0.9.4] - 2026-03-28

### Fixed

- pass activeLayerId/activeItemId to Nav as props (fix empty nav on route change)
- add key to ItemPage for proper remount on route change
- convert object DocTable rows to string arrays in editable/toggle-group/loading-overlay
- guard config values with ?? 0 and fix notification border color
- deduplicate items — remove accessibility/philosophy/icons from l-dep

### Changed

- reorganize component layers: move TagInput/PinInput/Popover/OverflowMenu/SplitButton/Editable from L3 to L4
- move SortableTable from L4 to L5
- merge TimeSince into RelativeTime, merge OtpInput into PinInput
- clean up content overlaps: remove time-since, sortable-table demos, rename stat → quick-stat
- deduplicate content and fix layer assignment across all items
- register every item as explicit route, no wildcards or dynamic params
- 344 tests, 2038 cases, typecheck + lint clean

## [0.9.3] - 2026-03-28

### Fixed

- guard Highlight against undefined text/query props (route change crash)

### Changed

- register every item as explicit route, no wildcards or dynamic params
- item state resets naturally on route change (component remount)

## [0.9.2] - 2026-03-28

### Added

- print button in stage header
- playground hook tests (use-favorites, use-recent) ported to dev-center
- dev-center deploy script with LLM files (llms.txt standard)

### Fixed

- DocTable rendering: remove table-fixed + truncate, use auto layout
- close missing brace in DocTable cx() call
- remove CLAUDE.md from public LLM files (dev-only)

### Changed

- break scoreColor into focused check functions
- fix layer organization and clean up type workarounds
- bootstrap dev-center with GDS semantic tokens and cx()
- widen inspector panel from 480px to 560px
- text-white → text-accent-fg in 16 library components
- form-actions raw buttons → GDS Button
- split L0 into Tokens / Glass / Motion navigation groups (remove l-lab)
- library: text-emerald/sky/red → semantic tokens (success/accent/danger)
- add glass effects (backdrop-blur) to dev-center cards and panels

## [0.9.1] - 2026-03-28

### Added

- syntax highlighting (shiki) and copy button on all dev-center code blocks
- reusable CodeBlock component with vitesse-dark theme
- data-selectable on DocTable for text selection

### Fixed

- resolve duplicate isFavorite declaration in nav.tsx (dev-center crash)

### Changed

- add missing l3-atoms index exports for ported components

## [0.9.0] - 2026-03-28

### Added

- complete playground coverage: 204/204 items ported to dev-center
- 6 Design Token reference items (iconography, tokens, token-comparison, elevation, formatting, breakpoints)
- 8 Glass Lab experiments (liquid-glass, refraction, content-vs-backdrop, edge-cases, dark-light, fallback, materials, physics)
- 10 Chart items (realtime, waterfall, gantt, polar-area, flame, bullet, choropleth, theming, patterns, colors)
- component demos for banner, user-card, stat, relative-time, cron-input, data-grid, num-table, step-form, tour, gantt-panel, radio, slider, color-swatch
- guide-research, audit-standard, patterns overview, responsive-pattern

## [0.2.0] - 2026-03-28

### Added

- comprehensive quality improvements: 404 routing, forwardRef, Props exports, 9 test files
- docs/code/controls for ~80 incomplete dev-center demo items
- Guides (l-docs) layer with architecture, theming, depth, AI, a11y, glass/motion docs
- port playground infrastructure: multi-tab inspector, weighted search, favorites, recent, keyboard nav
- shortcuts modal, ErrorBoundary on stage, collapsible inspector, variant pills in status bar
- 5 governance guides (philosophy, do/don't/best practices/cookbook)
- Lab layer with 4 Glass Lab items and 9 Motion system items
- 5 developer tools (contrast checker, component stats, hooks ref, i18n, media adaptive)
- 46 new components from admin: container, loading, shimmer, slider, pin-input, data-grid, tour, etc.

## [0.1.2] - 2026-03-28

### Added

- add /pub skill for automated release workflow
- add automatic changelog generation to /pub skill

### Changed

- remove local publish scripts, ci handles everything

## [0.1.0] - 2026-03-28

### Added

- initial GDS standalone repository
- 8-layer component architecture (L0 tokens → L7 patterns)
- ~370 components across all layers
- contextual depth system with auto-scaling CSS properties
- glass material system with backdrop-filter
- motion system with spring physics
- gesture system (drag, swipe, pinch, long-press)
- dark-native theme engine with Jotai state management
- 5-axis theme dimensions (density, elevation, glass, motion, shape)
- anti-corruption layer enforcing internal utility wrappers
- interactive dev-center with 150+ component demos
- 560+ co-located test files with 80% coverage threshold
