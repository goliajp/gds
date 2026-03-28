// L-dep — dependency manifest
// documents every external dependency, its role, and layer constraints

export type DepInfo = {
  name: string
  version: string
  role: string
  layer: 'L-dep'
  type: 'peer' | 'runtime' | 'dev'
  usedBy: string[]
}

export const GDS_DEPS: DepInfo[] = [
  // peer — provided by consumer app
  {
    name: 'react',
    version: '>=19.0.0',
    role: 'UI runtime — component rendering, hooks, reconciler',
    layer: 'L-dep',
    type: 'peer',
    usedBy: ['L1-systems', 'L2-primitives', 'L3+'],
  },
  {
    name: 'react-dom',
    version: '>=19.0.0',
    role: 'DOM binding for React — portal, createRoot',
    layer: 'L-dep',
    type: 'peer',
    usedBy: ['L-dep utils (portal wrapper)'],
  },

  // runtime — bundled with gds
  {
    name: 'tailwindcss',
    version: '^4.2.1',
    role: 'CSS engine — utility-first classes, @theme mapping, @utility registration',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L0-tokens'],
  },
  {
    name: 'clsx',
    version: '^2.1.1',
    role: 'conditional className joining — lightweight boolean class logic',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L2+'],
  },
  {
    name: 'tailwind-merge',
    version: '^3.5.0',
    role: 'deduplicates conflicting Tailwind classes — powers cx() utility',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L2+'],
  },
  {
    name: 'class-variance-authority',
    version: '^0.7.1',
    role: 'type-safe variant API — cva() for component variant definitions',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L3-atoms', 'L4-molecules'],
  },
  {
    name: 'jotai',
    version: '^2.18.1',
    role: 'atomic state management — theme, i18n, responsive atoms',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L1-systems'],
  },
  {
    name: 'lucide-react',
    version: '^0.577.0',
    role: 'icon library — 1500+ SVG icons as React components',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L3-atoms', 'L4-molecules', 'L5-organisms'],
  },
  {
    name: 'recharts',
    version: '^3.8.0',
    role: 'chart foundation — ResponsiveContainer, ComposedChart, RadialBarChart',
    layer: 'L-dep',
    type: 'runtime',
    usedBy: ['L6-charts'],
  },
]

// internal utilities — part of L-dep, available to all layers
// these wrap external deps so components never import clsx/twMerge/cva directly
export const GDS_INTERNAL_UTILS = [
  { name: 'cx', module: 'utils/cx', role: 'class merging (clsx + tailwind-merge)', usedBy: 'L2+' },
  { name: 'focusCls', module: 'utils/a11y', role: 'focus ring preset class string', usedBy: 'L2+' },
  { name: 'srOnly', module: 'utils/a11y', role: 'screen-reader-only class string', usedBy: 'L2+' },
  { name: 'mergeRefs', module: 'utils/dom', role: 'combine multiple refs into one', usedBy: 'L2+' },
  { name: 'isActivationKey', module: 'utils/dom', role: 'detect Enter/Space on keydown', usedBy: 'L3+' },
  { name: 'clamp', module: 'utils/dom', role: 'clamp number to min/max', usedBy: 'L2+' },
  { name: 'uid', module: 'utils/dom', role: 'unique id generator for a11y', usedBy: 'L2+' },
  { name: 'VariantProps', module: 'utils/types', role: 'extract variant type from cva()', usedBy: 'L3+' },
  { name: 'MergeProps', module: 'utils/types', role: 'merge native + component props', usedBy: 'L2+' },
  { name: 'AsProps', module: 'utils/types', role: 'polymorphic as prop', usedBy: 'L2' },
  // hooks
  { name: 'useScrollLock', module: 'utils/hooks', role: 'prevent body scroll when overlay open', usedBy: 'L5+' },
  { name: 'useEscapeKey', module: 'utils/hooks', role: 'close overlay on Escape', usedBy: 'L5+' },
  { name: 'useClickOutside', module: 'utils/hooks', role: 'detect click outside element', usedBy: 'L5+' },
  { name: 'useMediaQuery', module: 'utils/hooks', role: 'subscribe to CSS media query', usedBy: 'L2+' },
  { name: 'useIsMobile', module: 'utils/hooks', role: 'boolean mobile breakpoint', usedBy: 'L2+' },
  { name: 'useIsDesktop', module: 'utils/hooks', role: 'boolean desktop breakpoint', usedBy: 'L2+' },
  { name: 'useFocusTrap', module: 'utils/hooks', role: 'trap tab focus in container', usedBy: 'L5+' },
  { name: 'renderPortal', module: 'utils/portal', role: 'portal rendering via react-dom createPortal', usedBy: 'L2+' },
] as const

// engineering infrastructure — enforced at every layer, not optional
export const GDS_INFRA = {
  typecheck: {
    tool: 'typescript',
    config: 'tsconfig.json',
    command: 'bun run typecheck',
    rule: 'zero errors on every commit. strict mode, no any in lib code',
  },
  lint: {
    tool: 'eslint',
    config: 'eslint.config.js',
    command: 'bun run lint',
    rule: 'zero warnings. import sorting, hooks rules, no console',
  },
  test: {
    tool: 'vitest',
    config: 'vitest.config.ts',
    command: 'bun run test',
    rule: 'TDD mandatory. tests BEFORE code. 80% coverage threshold enforced',
  },
  format: {
    tool: 'eslint --fix + prettier (via admin)',
    rule: 'no semicolons, single quotes JS, double quotes JSX, 2-space indent',
  },
} as const

// dependency constraint: which layers can import which external deps
// internal utils (cx, focusCls, etc.) are always allowed — they are L-dep
export const LAYER_DEP_CONSTRAINTS: Record<string, string[]> = {
  'L0-tokens': ['tailwindcss'],
  'L1-systems': ['react', 'jotai'],
  'L2-primitives': ['react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
  'L3-atoms': ['react', 'clsx', 'tailwind-merge', 'class-variance-authority', 'lucide-react'],
  'L4-molecules': ['react', 'clsx', 'tailwind-merge', 'class-variance-authority', 'lucide-react'],
  'L5-organisms': ['react', 'clsx', 'tailwind-merge', 'class-variance-authority', 'lucide-react'],
  'L6-charts': ['react', 'clsx', 'tailwind-merge', 'recharts', 'lucide-react'],
  'L7-patterns': ['react', 'clsx', 'tailwind-merge'],
}
