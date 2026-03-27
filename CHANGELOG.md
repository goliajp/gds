# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

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
