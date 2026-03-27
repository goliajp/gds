import { DocTable, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>bun add @goliapkg/gds</code></pre>
            <p>GDS requires React 18+ and Tailwind CSS 4+.</p>
          </div>
        </DocSection>

        <DocSection title="Setup">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>1. Import the CSS variables in your root layout:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import '@goliapkg/gds/style.css'`}</code></pre>
            <p>2. Initialize the theme provider:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import { useThemeEffect } from '@goliapkg/gds'

function App() {
  useThemeEffect()
  return <div>...</div>
}`}</code></pre>
            <p>3. Use components:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import { Button, Card, Input } from '@goliapkg/gds'

function MyPage() {
  return (
    <Card>
      <Input placeholder="Enter name" />
      <Button>Submit</Button>
    </Card>
  )
}`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Import Patterns">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Import directly from the package — all components are tree-shakeable:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// named imports (recommended)
import { Button, Card, Dialog } from '@goliapkg/gds'

// layer imports (for exploration)
import { Button } from '@goliapkg/gds/l2-primitives'
import { Accordion } from '@goliapkg/gds/l4-molecules'`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs font-mono"><code>{`L0  Tokens      CSS variables, color derivation, scales
L1  Systems     Theme engine (Jotai atoms), hooks
L2  Primitives  Stateless visual blocks (Button, Input, Badge)
L3  Atoms       Simple composed elements (Avatar, Switch, Tooltip)
L4  Molecules   Multi-part stateful (Dialog, Tabs, Accordion)
L5  Organisms   Complex features (DataTable, Calendar, FileB)
L6  Charts      Recharts-based data visualization
L7  Patterns    Page-level layouts (Dashboard, Form, Settings)`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// forbidden in components
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// use instead
import { cx } from '@gds/utils/cx'
import { focusCls } from '@gds/utils/a11y'
import type { VariantProps } from '@gds/utils/types'`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Component Pattern">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Every library component follows this structure:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// 1. CVA variants
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
export type { ButtonProps }`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import { useTheme } from '@goliapkg/gds'

function ThemeControls() {
  const { mode, setMode, primaryColor, setPrimaryColor } = useTheme()

  return (
    <>
      <button onClick={() => setMode('dark')}>Dark</button>
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setPrimaryColor('#6366f1')}>Indigo</button>
    </>
  )
}`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// semantic color tokens (never use raw Tailwind colors)
bg-bg          // main background
bg-surface     // card/panel surface
text-fg        // primary text
text-fg-muted  // secondary text
border-border  // borders
bg-accent      // primary action color
text-success   // success state
text-warning   // warning state
text-danger    // danger state`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="CSS Custom Properties">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>All tokens are CSS custom properties, injectable at any scope:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// override at component level
<div style={{ '--gds-accent': '#10b981' }}>
  <Button>Green action</Button>
</div>

// or via Tailwind arbitrary values
<div className="[--gds-accent:#10b981]">
  <Button>Green action</Button>
</div>`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// container components (Card, Dialog, Panel, Sheet)
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
gds-heading   // depth-aware heading font size`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Building Components">
          <div className="space-y-3 text-sm text-fg-muted">
            <p><strong>Container components</strong> (Card, Dialog, Panel): add <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-ctx</code> to root element + use <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-*</code> utilities.</p>
            <p><strong>Leaf components</strong> (Button, Input, Badge): do NOT add <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">gds-ctx</code> — they inherit the current depth.</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// container component example
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
}`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// component identity
data-component="button"      // component type
data-variant="primary"       // current variant
data-state="disabled"        // current state

// data tables emit structured output
data-column="email"          // column identity
data-row-id="usr_123"        // row identity
data-sortable="true"         // interaction hints`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Typed Props for AI Consumption">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>All types are exported for programmatic introspection:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import type { ButtonProps, ButtonVariants } from '@goliapkg/gds'

// AI can enumerate all valid variants
type Variant = ButtonProps['variant']  // 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = ButtonProps['size']        // 'sm' | 'default' | 'lg'`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Command Palette Integration">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>AI agents can invoke any action via the CommandPalette API:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import { CommandPalette } from '@goliapkg/gds'

// actions are typed and discoverable
const actions = [
  { id: 'new-doc', label: 'New Document', shortcut: '⌘N', action: () => ... },
  { id: 'search', label: 'Search', shortcut: '⌘K', action: () => ... },
]

<CommandPalette items={actions} />`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// global shortcuts
⌘K        Command palette
⌘,        Settings
?         Show all shortcuts

// context shortcuts
N         New item
E         Edit
D         Delete
↑↓        Navigate items
Enter     Select/confirm
Escape    Close/cancel`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Focus Management">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>All interactive elements use <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">focusCls</code> for consistent focus rings:</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import { focusCls } from '@gds/utils/a11y'

// standard focus ring for all interactive elements
<button className={cx('px-3 py-2', focusCls)}>
  Click me
</button>

// focus trapping in modals
<Dialog>
  {/* Tab key cycles within dialog */}
  <input autoFocus />
  <Button>Confirm</Button>
</Dialog>`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Screen Reader Support">
          <div className="space-y-3 text-sm text-fg-muted">
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`import { VisuallyHidden, SkipNav } from '@goliapkg/gds'

// skip navigation link
<SkipNav targetId="main-content" />

// screen-reader only text
<button>
  <Icon name="trash" />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>

// ARIA attributes on all interactive components
<Switch aria-label="Enable notifications" />
<Tabs aria-label="Settings sections" />`}</code></pre>
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
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// enable glass on any component
<Card glass>Frosted card</Card>
<Dialog glass>Frosted dialog</Dialog>
<Button glass>Frosted button</Button>

// glass intensity adapts to context:
// - inline elements: light glass (subtle blur)
// - overlays/modals: heavy glass (strong blur)
// - dark mode: lower opacity, more blur
// - light mode: higher opacity, less blur`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Motion System">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>Every component accepts a <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">motion</code> prop for enter/exit/state-change animations.</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// built-in motion vocabulary
<Card motion="fade">        {/* opacity transition */}
<Dialog motion="scale">     {/* scale + fade */}
<Toast motion="slide">      {/* slide from edge */}
<List motion="stagger">     {/* stagger children */}

// spring physics over CSS easing
import { spring } from '@goliapkg/gds'

spring.gentle    // { tension: 120, friction: 14 }
spring.snappy    // { tension: 300, friction: 20 }
spring.bouncy    // { tension: 180, friction: 12 }`}</code></pre>
          </div>
        </DocSection>

        <DocSection title="Reduced Motion">
          <div className="space-y-3 text-sm text-fg-muted">
            <p>When <code className="rounded bg-bg-tertiary/50 px-1.5 py-0.5 text-xs">prefers-reduced-motion</code> is active, all animation is disabled entirely — not degraded, disabled. This is the fastest variant.</p>
            <pre className="rounded-md bg-bg-tertiary/50 px-4 py-3 text-xs"><code>{`// motion level in theme
const { motionLevel, setMotionLevel } = useTheme()

// levels: 'off' | 'reduced' | 'default' | 'playful'
setMotionLevel('reduced')  // minimal transitions only
setMotionLevel('off')      // zero animation`}</code></pre>
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
]

export { docsItems }
