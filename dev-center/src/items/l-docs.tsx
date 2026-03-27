import { Card } from '@gds/l4-molecules'

import { CodeBlock, DocTable, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

// ─── philosophy data ───

const principles = [
  {
    brief: 'data is the product — remove everything that competes with content',
    number: '01',
    rules: [
      'dense tables over card grids',
      'semantic color only where attention is needed',
      'whitespace is structure, not filler',
    ],
    title: 'Clarity over decoration',
  },
  {
    brief: 'same action, same look, same position — everywhere, no exceptions',
    number: '02',
    rules: [
      'one component per concept, no one-off overrides',
      'all tokens and patterns come from the system',
      'new pattern? add to system first, then use',
    ],
    title: 'Consistency breeds trust',
  },
  {
    brief: 'every action reachable by keyboard, no exceptions',
    number: '03',
    rules: [
      'focusCls on all interactive elements',
      '\u2318K command palette + context shortcuts',
      '? key reveals available shortcuts',
    ],
    title: 'Keyboard-first',
  },
  {
    brief: 'design for dark first — light mode is a derived adaptation',
    number: '04',
    rules: [
      'color, contrast, hierarchy optimized for dark',
      'light mode maps from dark tokens',
      'test dark first, verify light second',
    ],
    title: 'Dark-native',
  },
  {
    brief: 'every interaction \u2192 visible response within 100ms',
    number: '05',
    rules: [
      'optimistic updates — reflect change instantly',
      'undo toast over confirmation dialogs',
      'skeleton shimmer for load, spinner for mutations',
    ],
    title: 'Immediate feedback',
  },
  {
    brief: 'animation is a communication channel, not decoration',
    number: '06',
    rules: [
      'every component accepts motion prop',
      'spring physics over duration-based easing',
      'prefers-reduced-motion disables all animation',
    ],
    title: 'Motion as expression',
  },
  {
    brief: 'components serve human users and AI agents equally',
    number: '07',
    rules: [
      'data-* attributes for machine parsing',
      'typed props, no abbreviations',
      'playground docs = AI reference manual',
    ],
    title: 'AI-native',
  },
  {
    brief: 'glass is a material system, not a style toggle',
    number: '08',
    rules: [
      'every component accepts glass prop',
      'intensity adapts to context and depth',
      'auto-fallback when backdrop-filter unsupported',
    ],
    title: 'Glass as material',
  },
  {
    brief: 'mobile is a parallel design target, not responsive afterthought',
    number: '09',
    rules: [
      '44\u00d744px minimum touch targets',
      'swipe/pull/pinch gestures built in',
      'no hover-dependent functionality',
    ],
    title: 'Mobile-native',
  },
  {
    brief: 'components auto-scale spacing, shadow, type by nesting depth',
    number: '10',
    rules: [
      'container components add gds-ctx automatically',
      '5-level depth scale: root \u2192 0 \u2192 1 \u2192 2 \u2192 3+',
      'developers compose normally, CSS handles the rest',
    ],
    title: 'Contextual depth',
  },
]

const depthScale = [
  { depth: 'root', fg: '1.0', gap: 24, heading: 16, pad: 20, radius: 12, shadow: 'md', text: 13 },
  { depth: '0', fg: '0.95', gap: 16, heading: 14, pad: 16, radius: 10, shadow: 'sm', text: 12 },
  { depth: '1', fg: '0.88', gap: 12, heading: 13, pad: 12, radius: 8, shadow: '\u2014', text: 11 },
  { depth: '2', fg: '0.80', gap: 8, heading: 12, pad: 8, radius: 6, shadow: '\u2014', text: 10 },
  { depth: '3+', fg: '0.72', gap: 6, heading: 11, pad: 6, radius: 4, shadow: '\u2014', text: 10 },
]

// ─── guide-do data ───

const doRules = [
  { category: 'Tokens', text: 'use semantic color tokens (text-fg, bg-surface, border-border) — never raw Tailwind colors' },
  { category: 'Tokens', text: 'use cx() from @gds/utils/cx for class merging — never string concatenation' },
  { category: 'Tokens', text: 'use focusCls from @gds/utils/a11y on all interactive elements' },
  { category: 'Tokens', text: 'use ?? (nullish coalescing) for defaults — never ||' },
  { category: 'Component', text: 'export all types — consumers need them for wrapper components' },
  { category: 'Component', text: 'support className prop on root element for consumer overrides' },
  { category: 'Component', text: 'add data-component attribute for AI/machine parsing' },
  { category: 'Component', text: 'use forwardRef for all DOM-wrapping components' },
  { category: 'Component', text: 'container components: add gds-ctx class and use gds-pad, gds-gap, gds-radius, gds-shadow' },
  { category: 'Component', text: 'spread remaining props {...props} on root DOM element' },
  { category: 'Pattern', text: 'prefer composition (slots/children) over configuration (many props)' },
  { category: 'Pattern', text: 'use CVA for all visual variants — export the variants object' },
  { category: 'Pattern', text: 'immutable state updates — never mutate existing objects' },
  { category: 'Pattern', text: 'one component per file, enforced by react-refresh/only-export-components' },
  { category: 'Interaction', text: 'escape key closes all overlays (modal, dialog, sheet, dropdown)' },
  { category: 'Interaction', text: 'backdrop click closes overlays' },
  { category: 'Interaction', text: 'tab order follows visual layout' },
  { category: 'Interaction', text: 'all hover effects must have tap/press equivalents' },
]

const doCategoryColors: Record<string, string> = {
  Component: 'bg-accent/15 text-accent',
  Interaction: 'bg-warning/15 text-warning',
  Pattern: 'bg-success/15 text-success',
  Tokens: 'bg-palette-3/15 text-palette-3',
}

// ─── guide-do-not data ───

const doNotRules = [
  { category: 'Styling', text: 'never use raw Tailwind colors (bg-red-500, text-blue-600) — use semantic tokens' },
  { category: 'Styling', text: 'never use interface — use type only' },
  { category: 'Styling', text: 'never use enum — use union types + const objects' },
  { category: 'Styling', text: 'never use inline styles for anything that has a token equivalent' },
  { category: 'Styling', text: 'never use || for defaults — use ?? (nullish coalescing)' },
  { category: 'Component', text: 'never use useEffect in primitive/library components — effects belong in business layer' },
  { category: 'Component', text: 'never use type assertions (as) — use type narrowing' },
  { category: 'Component', text: 'never create one-off components — add to the system first' },
  { category: 'Component', text: 'never use space-y-* in depth-aware containers — use flex flex-col gds-gap' },
  { category: 'Component', text: 'never nest ternaries' },
  { category: 'Interaction', text: 'never rely on hover-only functionality — mobile has no hover' },
  { category: 'Interaction', text: 'never use confirmation dialogs — use undo with toast' },
  { category: 'Interaction', text: 'never use focus pseudo-class — use focus-visible' },
  { category: 'Interaction', text: 'never block interaction with animation' },
  { category: 'Data', text: 'never use || for default values — it swallows 0 and ""' },
  { category: 'Data', text: 'never conflate null with zero — they are different concepts' },
]

const doNotCategoryColors: Record<string, string> = {
  Component: 'bg-danger/15 text-danger',
  Data: 'bg-warning/15 text-warning',
  Interaction: 'bg-danger/10 text-danger/80',
  Styling: 'bg-danger/20 text-danger',
}

// ─── guide-best data ───

const bestSections = [
  {
    items: [
      'memoize expensive computations with useMemo, event handlers with useCallback',
      'use virtual scrolling for lists > 100 items',
      'lazy-load heavy components (charts, editors) with React.lazy()',
      'prefer CSS animations over JS-driven animations',
      'debounce search/filter inputs — 200ms minimum',
    ],
    title: 'Performance',
  },
  {
    items: [
      'keep components under 200 lines, files under 400 lines',
      'one component per file (enforced by react-refresh/only-export-components)',
      'props extend native HTML attributes where applicable',
      'spread remaining props {...props} on root DOM element',
      'use composition (children/slots) over config props',
    ],
    title: 'Component Design',
  },
  {
    items: [
      'use jotai atoms for shared state, useState for local UI state',
      'URL is single source of truth for routable state (section, filters, pagination)',
      'optimistic updates for all mutations',
      'derive state instead of syncing — useMemo over useEffect + setState',
    ],
    title: 'State Management',
  },
  {
    items: [
      'write tests BEFORE implementation (TDD)',
      'test behavior, not implementation details',
      'target 80%+ coverage on utils/services, 80% on components',
      'use testing-library queries: getByRole > getByTestId',
    ],
    title: 'Testing',
  },
  {
    items: [
      'validate all user input at system boundaries',
      'never hardcode secrets — use environment variables',
      'use parameterized queries — never string interpolation for SQL',
      'sanitize HTML output to prevent XSS',
    ],
    title: 'Security',
  },
]

// ─── guide-cookbook data ───

const recipes = [
  {
    code: `<PageLayout title="Members" actions={<Button>Add</Button>}>
  <SearchBar onSearch={setQuery} />
  <DataTable
    columns={memberColumns}
    data={filtered}
    sortable
    selectable
    onBatchAction={handleBatch}
  />
  <Pagination total={total} page={page} onChange={setPage} />
</PageLayout>`,
    title: 'List Page',
    usage: 'Master list with sorting, search, pagination, and batch actions. Use for any entity index view (members, contracts, invoices).',
  },
  {
    code: `<PageLayout title={member.name} back="/members">
  <KvTable rows={memberFields} />
  <Tabs value={tab} onChange={setTab}>
    <TabPanel value="contracts"><ContractList /></TabPanel>
    <TabPanel value="payroll"><PayrollHistory /></TabPanel>
    <TabPanel value="documents"><DocumentGrid /></TabPanel>
  </Tabs>
</PageLayout>`,
    title: 'Detail Page',
    usage: 'Entity detail with KvTable header and tabbed sections. Use for any single-record view (member profile, contract detail).',
  },
  {
    code: `<FormLayout
  title="New Contract"
  onSubmit={handleSubmit}
  onCancel={() => navigate(-1)}
>
  <FieldSet legend="Basic Info">
    <Input label="Title" {...register('title')} />
    <DatePicker label="Start" {...register('startDate')} />
  </FieldSet>
  <FieldSet legend="Compensation">
    <NumberInput label="Salary" {...register('salary')} />
  </FieldSet>
</FormLayout>`,
    title: 'Form Page',
    usage: 'Structured form with validation, grouped fields, submit and cancel. Use for create/edit flows.',
  },
  {
    code: `<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
  <StatGrid stats={kpis} />
</div>
<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
  <Card><ChartLine data={revenue} /></Card>
  <Card><ChartBar data={expenses} /></Card>
</div>`,
    title: 'Dashboard',
    usage: 'KPI stats + chart cards in responsive grid. Use for overview/summary pages (finance dashboard, HR overview).',
  },
  {
    code: `<PageLayout title="Settings">
  <Accordion>
    <AccordionItem title="Profile">
      <Input label="Company Name" {...register('name')} />
      <Input label="Email" {...register('email')} />
    </AccordionItem>
    <AccordionItem title="Notifications">
      <Switch label="Email alerts" {...register('emailAlerts')} />
    </AccordionItem>
  </Accordion>
</PageLayout>`,
    title: 'Settings Page',
    usage: 'Accordion sections with form fields. Use for configuration/preferences pages with many grouped options.',
  },
  {
    code: `<EmptyState
  icon={FileSearch}
  title="No contracts found"
  description="Create your first contract to get started."
  action={
    <Button onClick={() => navigate('/contracts/new')}>
      Create Contract
    </Button>
  }
/>`,
    title: 'Empty State',
    usage: 'Placeholder when a list or section has no data. Use with icon, message, and optional action button.',
  },
]

// ─── items ───

const docsItems: DevCenterItem[] = [
  // getting started
  {
    id: 'getting-started',
    label: 'Getting Started',
    layer: 'l-docs',
    type: 'reference',
    tags: ['install', 'setup', 'quickstart', 'introduction'],

    stage: () => (
      <div>
        <DocSection title="Installation">
          <div className="space-y-3 text-sm text-fg-muted">
            <CodeBlock code={`bun add @goliapkg/gds`} />
            <p>GDS requires React 18+ and Tailwind CSS 4+.</p>
          </div>
        </DocSection>

        <DocSection title="Setup">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>1. Import the CSS variables in your root layout:</p>
            <CodeBlock code={`import '@goliapkg/gds/style.css'`} />
            <p>2. Initialize the theme provider:</p>
            <CodeBlock code={`import { useThemeEffect } from '@goliapkg/gds'

function App() {
  useThemeEffect()
  return <div>...</div>
}`} />
            <p>3. Use components:</p>
            <CodeBlock code={`import { Button, Card, Input } from '@goliapkg/gds'

function MyPage() {
  return (
    <Card>
      <Input placeholder="Enter name" />
      <Button>Submit</Button>
    </Card>
  )
}`} />
          </div>
        </DocSection>

        <DocSection title="Import Patterns">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Import directly from the package — all components are tree-shakeable:</p>
            <CodeBlock code={`// named imports (recommended)
import { Button, Card, Dialog } from '@goliapkg/gds'

// layer imports (for exploration)
import { Button } from '@goliapkg/gds/l2-primitives'
import { Accordion } from '@goliapkg/gds/l4-molecules'`} />
          </div>
        </DocSection>
      </div>
    ),

    code: () => [
      "import { Button, Card, Input } from '@goliapkg/gds'",
      "import { useThemeEffect } from '@goliapkg/gds'",
      '',
      'function App() {',
      '  useThemeEffect()',
      '  return (',
      '    <Card>',
      '      <Input placeholder="Enter name" />',
      '      <Button>Submit</Button>',
      '    </Card>',
      '  )',
      '}',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>GDS is a standalone React component library with 350+ components across 8 layers.</p>
          <p className="mt-2">Key features: contextual depth system, glass materials, spring-based motion, dark-native theme engine, and AI-native structure.</p>
        </div>
      </div>
    ),
  },

  // architecture
  {
    id: 'architecture',
    label: 'Architecture',
    layer: 'l-docs',
    type: 'reference',
    tags: ['architecture', 'layers', 'structure', 'design'],

    stage: () => (
      <div>
        <DocSection title="Layer System">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>GDS follows a strict 8-layer architecture. Each layer has dependency constraints enforced by ESLint.</p>
            <CodeBlock code={`L0  Tokens      CSS variables, color derivation, scales
L1  Systems     Theme engine (Jotai atoms), hooks
L2  Primitives  Stateless visual blocks (Button, Input, Badge)
L3  Atoms       Simple composed elements (Avatar, Switch, Tooltip)
L4  Molecules   Multi-part stateful (Dialog, Tabs, Accordion)
L5  Organisms   Complex features (DataTable, Calendar, FileB)
L6  Charts      Recharts-based data visualization
L7  Patterns    Page-level layouts (Dashboard, Form, Settings)`} />
          </div>
        </DocSection>

        <DocSection title="Dependency Rules">
          <DocTable rows={[
            ['L0', 'tailwindcss only', 'Pure CSS, no runtime'],
            ['L1', 'react, jotai', 'State management layer'],
            ['L2', 'react, clsx, tailwind-merge (via cx)', 'Visual primitives'],
            ['L3-L4', '+ class-variance-authority, lucide-react', 'Composed elements'],
            ['L5', '+ react-dom', 'Complex features'],
            ['L6', 'recharts (no cva)', 'Chart specialization'],
            ['L7', 'react, clsx, tailwind-merge only', 'Layout compositions'],
          ]} />
        </DocSection>

        <DocSection title="Anti-Corruption Layer">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Direct imports of external utilities are forbidden in component code. Use wrappers:</p>
            <CodeBlock code={`// forbidden in components
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// use instead
import { cx } from '@gds/utils/cx'
import { focusCls } from '@gds/utils/a11y'
import type { VariantProps } from '@gds/utils/types'`} />
          </div>
        </DocSection>

        <DocSection title="Component Pattern">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Every library component follows this structure:</p>
            <CodeBlock code={`// 1. CVA variants
const buttonVariants = cva('inline-flex ...', {
  variants: { variant: { ... }, size: { ... } },
  defaultVariants: { variant: 'primary', size: 'default' },
})

// 2. Props type
type ButtonProps = VariantProps<typeof buttonVariants>
  & ButtonHTMLAttributes<HTMLButtonElement>
  & { glass?: boolean; motion?: string }

// 3. forwardRef component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, size, glass, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cx(buttonVariants({ variant, size }), props.className)}
        {...props}
      />
    )
  }
)

// 4. named exports
export { Button, buttonVariants }
export type { ButtonProps }`} />
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>The layer system ensures clean dependency flow. Higher layers can import from lower layers, never the reverse.</p>
          <p className="mt-2">The anti-corruption layer (utils/) prevents direct dependency on third-party APIs, making it easy to swap implementations without touching component code.</p>
        </div>
      </div>
    ),
  },

  // theme customization
  {
    id: 'theming',
    label: 'Theme Customization',
    layer: 'l-docs',
    type: 'reference',
    tags: ['theme', 'color', 'dark', 'light', 'customization', 'primary'],

    stage: () => (
      <div>
        <DocSection title="Theme Engine">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>GDS uses a Jotai-based theme engine with 5 configurable axes:</p>
            <CodeBlock code={`import { useTheme } from '@goliapkg/gds'

function ThemeControls() {
  const { mode, setMode, primaryColor, setPrimaryColor } = useTheme()

  return (
    <>
      <button onClick={() => setMode('dark')}>Dark</button>
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setPrimaryColor('#6366f1')}>Indigo</button>
    </>
  )
}`} />
          </div>
        </DocSection>

        <DocSection title="5-Axis Theme Dimensions">
          <DocTable rows={[
            ['density', "'compact' | 'default' | 'spacious'", 'Controls spacing, padding, gaps'],
            ['elevation', "'flat' | 'default' | 'raised'", 'Controls shadow depth'],
            ['glass', "'off' | 'subtle' | 'default' | 'heavy'", 'Controls glass blur intensity'],
            ['motion', "'off' | 'reduced' | 'default' | 'playful'", 'Controls animation level'],
            ['shape', "'sharp' | 'default' | 'round'", 'Controls border-radius'],
          ]} />
        </DocSection>

        <DocSection title="Dark-Native Design">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>GDS is dark-native — all color decisions are optimized for dark backgrounds. Light mode is derived from dark tokens.</p>
            <CodeBlock code={`// semantic color tokens (never use raw Tailwind colors)
bg-bg          // main background
bg-surface     // card/panel surface
text-fg        // primary text
text-fg-muted  // secondary text
border-border  // borders
bg-accent      // primary action color
text-success   // success state
text-warning   // warning state
text-danger    // danger state`} />
          </div>
        </DocSection>

        <DocSection title="CSS Custom Properties">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>All tokens are CSS custom properties, injectable at any scope:</p>
            <CodeBlock code={`// override at component level
<div style={{ '--gds-accent': '#10b981' }}>
  <Button>Green action</Button>
</div>

// or via Tailwind arbitrary values
<div className="[--gds-accent:#10b981]">
  <Button>Green action</Button>
</div>`} />
          </div>
        </DocSection>
      </div>
    ),

    code: () => [
      "import { useTheme, useThemeEffect } from '@goliapkg/gds'",
      '',
      'function App() {',
      '  useThemeEffect()',
      '  const { setMode, setPrimaryColor } = useTheme()',
      '',
      '  return (',
      '    <div>',
      '      <button onClick={() => setMode("dark")}>Dark</button>',
      '      <button onClick={() => setPrimaryColor("#6366f1")}>Indigo</button>',
      '    </div>',
      '  )',
      '}',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['useTheme()', 'Hook', 'Returns theme state + setters'],
          ['useThemeEffect()', 'Hook', 'Applies CSS vars to :root, call once in App'],
          ['useSetThemeMode()', 'Hook', 'Setter-only for mode (dark/light/system)'],
          ['useSetThemePrimaryColor()', 'Hook', 'Setter-only for primary color'],
          ['themeAtom', 'Jotai atom', 'Full theme state atom for advanced use'],
        ]} />
      </div>
    ),
  },

  // contextual depth
  {
    id: 'contextual-depth',
    label: 'Contextual Depth',
    layer: 'l-docs',
    type: 'reference',
    tags: ['depth', 'nesting', 'spacing', 'radius', 'shadow', 'context', 'gds-ctx'],

    stage: () => (
      <div>
        <DocSection title="How It Works">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Container components add the <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-ctx</code> CSS class. Each nesting level automatically reduces spacing, radius, shadow, and text size.</p>
            <p>Developers never set depth manually — just compose components normally.</p>
          </div>
        </DocSection>

        <DocSection title="Depth Scale">
          <DocTable rows={[
            ['root', '24px', '20px', '12px', 'md', '13px'],
            ['0 (.gds-ctx)', '16px', '16px', '10px', 'sm', '12px'],
            ['1 (nested)', '12px', '12px', '8px', 'none', '11px'],
            ['2', '8px', '8px', '6px', 'none', '10px'],
            ['3+', '6px', '6px', '4px', 'none', '10px'],
          ]} />
        </DocSection>

        <DocSection title="CSS Utilities">
          <div className="space-y-3 text-sm text-fg-muted">
            <CodeBlock code={`// container components (Card, Dialog, Panel, Sheet)
<div className="gds-ctx gds-pad gds-gap gds-radius gds-shadow">
  {children}
</div>

// available utilities
gds-pad       // depth-aware padding
gds-pad-x     // depth-aware horizontal padding
gds-pad-y     // depth-aware vertical padding
gds-gap       // depth-aware gap (use with flex/grid)
gds-radius    // depth-aware border-radius
gds-shadow    // depth-aware box-shadow
gds-text      // depth-aware base font size
gds-heading   // depth-aware heading font size`} />
          </div>
        </DocSection>

        <DocSection title="Building Components">
          <div className="space-y-3 text-sm text-fg-muted">
            <p><strong>Container components</strong> (Card, Dialog, Panel): add <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-ctx</code> to root element + use <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-*</code> utilities.</p>
            <p><strong>Leaf components</strong> (Button, Input, Badge): do NOT add <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-ctx</code> — they inherit the current depth.</p>
            <CodeBlock code={`// container component example
function MyPanel({ children }) {
  return (
    <div className="gds-ctx gds-pad gds-radius gds-shadow border border-border bg-surface">
      {children}
    </div>
  )
}

// leaf — just uses current depth values
function MyLabel({ text }) {
  return <span className="gds-text text-fg-muted">{text}</span>
}`} />
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>The contextual depth system eliminates manual spacing decisions when nesting components. A Card inside a Dialog inside a Sheet automatically uses progressively tighter spacing.</p>
          <p className="mt-2">Currently depth-aware: Card, Dialog, Panel, Sheet.</p>
        </div>
      </div>
    ),
  },

  // ai integration
  {
    id: 'ai-integration',
    label: 'AI Integration',
    layer: 'l-docs',
    type: 'reference',
    tags: ['ai', 'llm', 'machine', 'data-attribute', 'semantic', 'structured'],

    stage: () => (
      <div>
        <DocSection title="AI-Native Design">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>GDS serves human users and AI agents equally. Components expose semantic structure via <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">data-*</code> attributes, ARIA labels, and typed props.</p>
          </div>
        </DocSection>

        <DocSection title="Data Attributes">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Every component includes machine-readable attributes:</p>
            <CodeBlock code={`// component identity
data-component="button"      // component type
data-variant="primary"       // current variant
data-state="disabled"        // current state

// data tables emit structured output
data-column="email"          // column identity
data-row-id="usr_123"        // row identity
data-sortable="true"         // interaction hints`} />
          </div>
        </DocSection>

        <DocSection title="Typed Props for AI Consumption">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>All types are exported for programmatic introspection:</p>
            <CodeBlock code={`import type { ButtonProps, ButtonVariants } from '@goliapkg/gds'

// AI can enumerate all valid variants
type Variant = ButtonProps['variant']  // 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = ButtonProps['size']        // 'sm' | 'default' | 'lg'`} />
          </div>
        </DocSection>

        <DocSection title="Command Palette Integration">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>AI agents can invoke any action via the CommandPalette API:</p>
            <CodeBlock code={`import { CommandPalette } from '@goliapkg/gds'

// actions are typed and discoverable
const actions = [
  { id: 'new-doc', label: 'New Document', shortcut: '⌘N', action: () => ... },
  { id: 'search', label: 'Search', shortcut: '⌘K', action: () => ... },
]

<CommandPalette items={actions} />`} />
          </div>
        </DocSection>

        <DocSection title="Best Practices">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>When building with GDS for AI consumption:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Export all types — consumers (and AI) may need them for wrapper components</li>
              <li>Use descriptive prop names — <code className="rounded bg-bg-tertiary/50 px-1 text-xs">variant</code> not <code className="rounded bg-bg-tertiary/50 px-1 text-xs">v</code></li>
              <li>Add <code className="rounded bg-bg-tertiary/50 px-1 text-xs">data-component</code> to root elements</li>
              <li>Ensure all interactive elements are keyboard-accessible</li>
              <li>Provide complete playground demos — these serve as AI training data</li>
            </ul>
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>GDS Principle #7: AI can invoke any action that a keyboard user can. Component documentation is machine-readable.</p>
        </div>
      </div>
    ),
  },

  // accessibility
  {
    id: 'accessibility',
    label: 'Accessibility',
    layer: 'l-docs',
    type: 'reference',
    tags: ['a11y', 'accessibility', 'keyboard', 'focus', 'screen-reader', 'aria'],

    stage: () => (
      <div>
        <DocSection title="Keyboard-First Design">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Every action in GDS is reachable by keyboard. No exceptions.</p>
            <CodeBlock code={`// global shortcuts
⌘K        Command palette
⌘,        Settings
?         Show all shortcuts

// context shortcuts
N         New item
E         Edit
D         Delete
↑↓        Navigate items
Enter     Select/confirm
Escape    Close/cancel`} />
          </div>
        </DocSection>

        <DocSection title="Focus Management">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>All interactive elements use <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">focusCls</code> for consistent focus rings:</p>
            <CodeBlock code={`import { focusCls } from '@gds/utils/a11y'

// standard focus ring for all interactive elements
<button className={cx('px-3 py-2', focusCls)}>
  Click me
</button>

// focus trapping in modals
<Dialog>
  {/* Tab key cycles within dialog */}
  <input autoFocus />
  <Button>Confirm</Button>
</Dialog>`} />
          </div>
        </DocSection>

        <DocSection title="Screen Reader Support">
          <div className="space-y-3 text-sm text-fg-muted">
            <CodeBlock code={`import { VisuallyHidden, SkipNav } from '@goliapkg/gds'

// skip navigation link
<SkipNav targetId="main-content" />

// screen-reader only text
<button>
  <Icon name="trash" />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>

// ARIA attributes on all interactive components
<Switch aria-label="Enable notifications" />
<Tabs aria-label="Settings sections" />`} />
          </div>
        </DocSection>

        <DocSection title="Checklist">
          <div className="space-y-3 text-sm text-fg-muted">
            <ul className="list-disc pl-4 space-y-1">
              <li>All interactive elements have visible focus indicators</li>
              <li>Tab order follows visual layout</li>
              <li>Focus trapped in modals/dialogs</li>
              <li>Escape closes overlays</li>
              <li>Color is never the only indicator (use icons/text too)</li>
              <li>Touch targets minimum 44x44px on mobile</li>
              <li>No hover-only features — tap/press equivalent required</li>
              <li><code className="rounded bg-bg-tertiary/50 px-1 text-xs">prefers-reduced-motion</code> disables all animation</li>
            </ul>
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>GDS Principle #3: Keyboard-first. Every action reachable by keyboard, no exceptions.</p>
          <p className="mt-1">Utilities: focusCls (focus ring), srOnly (screen-reader text), SkipNav, VisuallyHidden.</p>
        </div>
      </div>
    ),
  },

  // glass & motion
  {
    id: 'glass-motion',
    label: 'Glass & Motion',
    layer: 'l-docs',
    type: 'reference',
    tags: ['glass', 'motion', 'animation', 'spring', 'blur', 'material'],

    stage: () => (
      <div>
        <DocSection title="Glass Material System">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Glass (frosted translucency) is a material system. Every visual component accepts a <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">glass</code> boolean prop.</p>
            <CodeBlock code={`// enable glass on any component
<Card glass>Frosted card</Card>
<Dialog glass>Frosted dialog</Dialog>
<Button glass>Frosted button</Button>

// glass intensity adapts to context:
// - inline elements: light glass (subtle blur)
// - overlays/modals: heavy glass (strong blur)
// - dark mode: lower opacity, more blur
// - light mode: higher opacity, less blur`} />
          </div>
        </DocSection>

        <DocSection title="Motion System">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Every component accepts a <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">motion</code> prop for enter/exit/state-change animations.</p>
            <CodeBlock code={`// built-in motion vocabulary
<Card motion="fade">        {/* opacity transition */}
<Dialog motion="scale">     {/* scale + fade */}
<Toast motion="slide">      {/* slide from edge */}
<List motion="stagger">     {/* stagger children */}

// spring physics over CSS easing
import { spring } from '@goliapkg/gds'

spring.gentle    // { tension: 120, friction: 14 }
spring.snappy    // { tension: 300, friction: 20 }
spring.bouncy    // { tension: 180, friction: 12 }`} />
          </div>
        </DocSection>

        <DocSection title="Reduced Motion">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>When <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">prefers-reduced-motion</code> is active, all animation is disabled entirely — not degraded, disabled. This is the fastest variant.</p>
            <CodeBlock code={`// motion level in theme
const { motionLevel, setMotionLevel } = useTheme()

// levels: 'off' | 'reduced' | 'default' | 'playful'
setMotionLevel('reduced')  // minimal transitions only
setMotionLevel('off')      // zero animation`} />
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="text-[10px] text-fg-muted/50">
          <p>Principle #6: Motion as expression — animation is a communication channel.</p>
          <p className="mt-1">Principle #8: Glass as material — frosted translucency adapts to context.</p>
        </div>
      </div>
    ),
  },

  // ─── design governance (ported from admin playground) ───

  // philosophy
  {
    id: 'philosophy',
    label: 'Philosophy',
    layer: 'l-docs',
    type: 'reference',
    tags: ['principles', 'density', 'dark', 'keyboard', 'motion', 'ai', 'glass', 'mobile', 'depth'],

    stage: () => (
      <div>
        <DocSection title="Architecture">
          <div className="space-y-0.5 font-mono text-[11px]">
            {[
              { label: 'L-dep', desc: 'Tailwind CSS 4 \u00b7 React 19 \u00b7 Recharts \u00b7 Lucide', cls: 'text-fg-muted/30' },
              { label: 'L0', desc: 'Tokens \u2014 color, spacing, shadow, radius, glass, spring, depth scale + 5 theme axes', cls: 'text-accent/60' },
              { label: 'L1', desc: 'Systems \u2014 theme, i18n, depth, glass, motion, responsive (context + hooks)', cls: 'text-accent/50' },
              { label: 'L2', desc: 'Primitives \u2014 Box, Stack, Grid, Text, Icon, VisuallyHidden', cls: 'text-accent/40' },
              { label: 'L3', desc: 'Atoms \u2014 Badge, Avatar, Dot, Separator, Kbd, Spinner, Label, Progress, Skeleton', cls: 'text-success/60' },
              { label: 'L4', desc: 'Molecules \u2014 Button, Input, Card, Alert, Tooltip, Stat, Chip, Toast', cls: 'text-success/50' },
              { label: 'L5', desc: 'Organisms \u2014 DataTable, Dialog, Sheet, Tabs, Kanban, GanttPanel, CommandPalette', cls: 'text-success/40' },
              { label: 'L6', desc: 'Charts \u2014 40 types (Line, Bar, Pie, Sankey, Sunburst, Network, Violin...)', cls: 'text-warning/50' },
              { label: 'L7', desc: 'Patterns \u2014 KPI Dashboard, Form Page, List Page, Settings, Skeleton Loading', cls: 'text-warning/40' },
            ].map((layer, i) => (
              <div className="flex items-baseline gap-3" key={layer.label}>
                <span className={`w-10 shrink-0 text-right font-bold ${layer.cls}`}>
                  {layer.label}
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div
                    className="h-px flex-1"
                    style={{ background: 'var(--color-border)', opacity: 0.2 + i * 0.05 }}
                  />
                </div>
                <span className="max-w-[520px] shrink-0 text-fg-muted/70">
                  {layer.desc}
                </span>
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2 text-[10px] text-fg-muted/40">
              <span>{'\u2191'} each layer only imports from layers below</span>
              <span>{'\u00b7'}</span>
              <span>no skip-level imports allowed</span>
            </div>
          </div>
        </DocSection>

        <DocSection title="Principles">
          <div className="space-y-1">
            {principles.map((p) => (
              <div
                className="flex gap-4 rounded border border-transparent px-3 py-2.5 transition-colors hover:border-border/40 hover:bg-surface/50"
                key={p.number}
              >
                <span className="w-6 shrink-0 pt-0.5 text-right font-mono text-xs font-bold text-accent/40">
                  {p.number}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-fg">{p.title}</div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-fg-muted">
                    {p.brief}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5">
                    {p.rules.map((r) => (
                      <span
                        className="text-[10px] text-fg-muted/50 before:mr-1 before:text-accent/30 before:content-['\u2022']"
                        key={r}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection title="Depth Scale">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border text-left text-fg-muted/50">
                  {['depth', 'gap', 'pad', 'radius', 'shadow', 'text', 'heading', 'fg-\u03B1'].map((h) => (
                    <th className="px-2 py-1.5 font-mono font-medium" key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {depthScale.map((row) => (
                  <tr
                    className="border-b border-border/30 text-fg-muted transition-colors hover:bg-surface/30"
                    key={row.depth}
                  >
                    <td className="px-2 py-1.5 font-mono font-medium text-fg">{row.depth}</td>
                    <td className="px-2 py-1.5 font-mono tabular-nums">{row.gap}px</td>
                    <td className="px-2 py-1.5 font-mono tabular-nums">{row.pad}px</td>
                    <td className="px-2 py-1.5 font-mono tabular-nums">{row.radius}px</td>
                    <td className="px-2 py-1.5 font-mono">{row.shadow}</td>
                    <td className="px-2 py-1.5 font-mono tabular-nums">{row.text}px</td>
                    <td className="px-2 py-1.5 font-mono tabular-nums">{row.heading}px</td>
                    <td className="px-2 py-1.5 font-mono tabular-nums">{row.fg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="Depth Demo">
          <p className="mb-3 text-[11px] text-fg-muted">
            Nested Cards auto-scale padding, gap, radius, and shadow via the
            gds-ctx cascade. No manual configuration needed.
          </p>
          <Card>
            <div className="text-xs font-semibold text-fg">
              depth 0 — 16px pad, 10px radius, shadow-sm
            </div>
            <div className="text-[11px] text-fg-muted">
              first gds-ctx container
            </div>
            <Card>
              <div className="text-xs font-semibold text-fg">
                depth 1 — 12px pad, 8px radius, no shadow
              </div>
              <div className="text-[11px] text-fg-muted">
                nested inside depth 0
              </div>
              <Card>
                <div className="text-xs font-semibold text-fg">
                  depth 2 — 8px pad, 6px radius
                </div>
                <div className="text-[11px] text-fg-muted">
                  nested inside depth 1
                </div>
              </Card>
            </Card>
          </Card>
        </DocSection>
      </div>
    ),

    code: () => `// depth system — just compose, spacing auto-scales
<Card>                         {/* depth 0: pad 16, radius 10, shadow sm */}
  <Card>                       {/* depth 1: pad 12, radius 8, no shadow */}
    <Card>                     {/* depth 2: pad 8, radius 6 */}
      deeply nested content
    </Card>
  </Card>
</Card>

// glass — every component
<Card glass>translucent card</Card>
<Button glass>frosted button</Button>
<Dialog glass>glass modal</Dialog>

// motion — built-in props
<Card motion="fade-in">animated entrance</Card>
<Button motion="ripple">click feedback</Button>
<List motion="stagger">sequenced items</List>

// ai-native — semantic attributes
<DataTable
  data-component="data-table"
  data-state="loaded"
  columns={typedColumns}  // exported types = AI reference
  rows={structuredData}
/>

// keyboard-first
import { focusCls } from '@gds/utils/a11y'
<button className={cx('rounded px-3 py-1', focusCls)}>
  visible focus ring on tab
</button>`,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          quick reference
        </div>
        <div className="space-y-2 text-xs text-fg-muted">
          {principles.map((p) => (
            <p key={p.number}>
              <span className="font-medium text-fg">
                {p.number}. {p.title}
              </span>
              {' \u2014 '}
              {p.brief}
            </p>
          ))}
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          depth utilities
        </div>
        <div className="space-y-1 font-mono text-[11px] text-fg-muted">
          <p><span className="text-accent">gds-ctx</span> — marks a depth container (Card, Dialog, Panel, Sheet)</p>
          <p><span className="text-accent">gds-pad</span> / gds-pad-x / gds-pad-y — depth-aware padding</p>
          <p><span className="text-accent">gds-gap</span> — depth-aware gap (flex/grid)</p>
          <p><span className="text-accent">gds-radius</span> — depth-aware border-radius</p>
          <p><span className="text-accent">gds-shadow</span> — depth-aware box-shadow</p>
          <p><span className="text-accent">gds-text</span> / gds-heading — depth-aware font-size</p>
        </div>
      </div>
    ),
  },

  // guide: DO
  {
    id: 'guide-do',
    label: 'DO',
    layer: 'l-docs',
    type: 'reference',
    tags: ['guide', 'rules', 'do', 'required', 'checklist'],

    stage: () => (
      <div>
        <DocSection title="DO — Required Practices">
          <div className="text-[11px] text-fg-muted mb-4">
            Required practices — follow these in every component and page.
          </div>
          <div className="rounded-lg border border-border/30">
            {doRules.map((rule, i) => (
              <div
                className={`flex items-start gap-3 px-4 py-2.5 transition-colors hover:bg-surface/30 ${
                  i < doRules.length - 1 ? 'border-b border-border/15' : ''
                }`}
                key={i}
              >
                <span
                  className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                    doCategoryColors[rule.category] ?? 'bg-fg-muted/10 text-fg-muted'
                  }`}
                >
                  {rule.category}
                </span>
                <span className="text-xs leading-relaxed text-fg-muted">
                  {rule.text}
                </span>
              </div>
            ))}
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          summary
        </div>
        <div className="space-y-1 text-xs text-fg-muted">
          <p>
            {doRules.length} required practices across{' '}
            {Object.keys(doCategoryColors).length} categories.
          </p>
          <p>
            Every rule here is non-negotiable. Violations should be caught in code
            review.
          </p>
        </div>
      </div>
    ),
  },

  // guide: DO NOT
  {
    id: 'guide-do-not',
    label: 'DO NOT',
    layer: 'l-docs',
    type: 'reference',
    tags: ['guide', 'rules', 'donot', 'forbidden', 'antipattern'],

    stage: () => (
      <div>
        <DocSection title="DO NOT — Forbidden Patterns">
          <div className="text-[11px] text-fg-muted mb-4">
            Forbidden patterns — these cause inconsistency, bugs, or tech debt.
          </div>
          <div className="rounded-lg border border-danger/20">
            {doNotRules.map((rule, i) => (
              <div
                className={`flex items-start gap-3 px-4 py-2.5 transition-colors hover:bg-danger/5 ${
                  i < doNotRules.length - 1 ? 'border-b border-danger/10' : ''
                }`}
                key={i}
              >
                <span
                  className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                    doNotCategoryColors[rule.category] ?? 'bg-fg-muted/10 text-fg-muted'
                  }`}
                >
                  {rule.category}
                </span>
                <span className="text-xs leading-relaxed text-fg-muted">
                  {rule.text}
                </span>
              </div>
            ))}
          </div>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          summary
        </div>
        <div className="space-y-1 text-xs text-fg-muted">
          <p>
            {doNotRules.length} forbidden patterns across{' '}
            {Object.keys(doNotCategoryColors).length} categories.
          </p>
          <p>If you see any of these in existing code, refactor it out.</p>
        </div>
      </div>
    ),
  },

  // guide: best practices
  {
    id: 'guide-best',
    label: 'Best Practices',
    layer: 'l-docs',
    type: 'reference',
    tags: ['guide', 'best', 'practices', 'patterns', 'recommended'],

    stage: () => (
      <div>
        <DocSection title="Best Practices">
          <div className="text-[11px] text-fg-muted mb-4">
            Recommended approaches — not strict rules, but proven patterns that lead to better results.
          </div>
        </DocSection>

        {bestSections.map((section) => (
          <DocSection key={section.title} title={section.title}>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li
                  className="flex items-start gap-2 text-xs leading-relaxed text-fg-muted"
                  key={item}
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                  {item}
                </li>
              ))}
            </ul>
          </DocSection>
        ))}
      </div>
    ),

    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          summary
        </div>
        <div className="space-y-1 text-xs text-fg-muted">
          <p>{bestSections.length} categories of best practices.</p>
          <p>
            These are recommendations, not hard rules. Use judgment when
            trade-offs arise.
          </p>
        </div>
      </div>
    ),
  },

  // guide: cookbook
  {
    id: 'guide-cookbook',
    label: 'Cookbook',
    layer: 'l-docs',
    type: 'reference',
    tags: ['guide', 'cookbook', 'recipes', 'patterns', 'howto'],

    stage: () => (
      <div>
        <DocSection title="Cookbook — Standard Recipes">
          <div className="text-[11px] text-fg-muted mb-4">
            Standard recipes for common UI patterns — copy, adapt, ship.
          </div>
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <div
                className="rounded-lg border border-border/30 transition-colors hover:border-border/60"
                key={recipe.title}
              >
                <div className="border-b border-border/20 px-4 py-3">
                  <div className="text-xs font-semibold text-fg">
                    {recipe.title}
                  </div>
                  <div className="mt-1 text-[11px] leading-relaxed text-fg-muted">
                    {recipe.usage}
                  </div>
                </div>
                <CodeBlock code={recipe.code} />
              </div>
            ))}
          </div>
        </DocSection>
      </div>
    ),

    code: () => recipes.map((r) => `// ${r.title}\n${r.code}`).join('\n\n'),

    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          summary
        </div>
        <div className="space-y-1 text-xs text-fg-muted">
          <p>{recipes.length} standard page recipes.</p>
          <p>Each recipe is a starting point — adapt to your specific needs.</p>
        </div>
      </div>
    ),
  },

  // research & benchmarks
  {
    id: 'guide-research',
    label: 'Research',
    layer: 'l-docs',
    type: 'reference',
    tags: ['guide', 'research', 'benchmark', 'comparison', 'reference'],

    stage: () => {
      const benchmarks = [
        { ai: true, components: '198', depth: true, glass: true, name: 'GDS (GOLIA)', principles: '10' },
        { ai: false, components: '~60', depth: false, glass: false, name: 'Material UI', principles: '3' },
        { ai: false, components: '~70', depth: false, glass: false, name: 'Ant Design', principles: '4' },
        { ai: false, components: '~30', depth: false, glass: false, name: 'Radix UI', principles: '\u2014' },
        { ai: false, components: '~40', depth: false, glass: false, name: 'shadcn/ui', principles: '\u2014' },
        { ai: false, components: '~60', depth: false, glass: false, name: 'Chakra UI', principles: '3' },
      ]

      const differentiators = [
        'contextual depth system \u2014 auto-scaling spacing, shadow, and radius by nesting level',
        'glass as first-class material \u2014 every component accepts glass prop with intensity control',
        'AI-native structured output \u2014 data-* attributes and typed props for machine parsing',
        'motion as built-in vocabulary \u2014 spring physics, gesture support, reduced-motion fallback',
        '40 chart types \u2014 from sparklines to chord diagrams, all theme-aware',
        'project management components \u2014 GanttPanel, Kanban, Timeline with real interactivity',
      ]

      const Mark = ({ value }: { value: boolean }) => (
        <span className={value ? 'text-success' : 'text-fg-muted/20'}>
          {value ? '\u2713' : '\u2014'}
        </span>
      )

      return (
        <div>
          <DocSection title="Comparison">
            <div className="overflow-x-auto rounded-lg border border-border/30">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border text-left text-fg-muted/50">
                    {['System', 'Components', 'Principles', 'Depth', 'Glass', 'AI-native'].map((h) => (
                      <th className="px-3 py-2 font-mono font-medium" key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((row, i) => (
                    <tr
                      className={`transition-colors hover:bg-surface/30 ${i < benchmarks.length - 1 ? 'border-b border-border/15' : ''} ${i === 0 ? 'bg-accent/5' : ''}`}
                      key={row.name}
                    >
                      <td className={`px-3 py-2 font-mono font-medium ${i === 0 ? 'text-accent' : 'text-fg'}`}>{row.name}</td>
                      <td className="px-3 py-2 font-mono text-fg-muted tabular-nums">{row.components}</td>
                      <td className="px-3 py-2 font-mono text-fg-muted tabular-nums">{row.principles}</td>
                      <td className="px-3 py-2 text-center"><Mark value={row.depth} /></td>
                      <td className="px-3 py-2 text-center"><Mark value={row.glass} /></td>
                      <td className="px-3 py-2 text-center"><Mark value={row.ai} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocSection>

          <DocSection title="Key Differentiators">
            <ul className="space-y-1.5">
              {differentiators.map((item) => (
                <li className="flex items-start gap-2 text-xs leading-relaxed text-fg-muted" key={item}>
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                  {item}
                </li>
              ))}
            </ul>
          </DocSection>

          <DocSection title="References">
            <div className="space-y-1 text-xs text-fg-muted">
              <p><span className="font-mono text-accent">.claude/rules/gds-lib.md</span>{' \u2014 GDS library code standards'}</p>
              <p><span className="font-mono text-accent">.claude/rules/gds-philosophy.md</span>{' \u2014 10 design principles'}</p>
            </div>
          </DocSection>
        </div>
      )
    },

    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          summary
        </div>
        <div className="space-y-1 text-xs text-fg-muted">
          <p>GDS compared against 5 major design systems.</p>
          <p>6 key differentiators documented.</p>
        </div>
      </div>
    ),
  },
]

export { docsItems }
