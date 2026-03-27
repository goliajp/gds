// l-dep-ext — architectural reference guides for GDS

import { Kbd } from '@gds/l2-primitives'

import { DocTable, DemoCard, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

// reusable inline code style
function Code({ children }: { children: string }) {
  return (
    <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[10px] text-accent">
      {children}
    </code>
  )
}

// numbered principle card
function PrincipleCard({ number, title, description }: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 font-mono text-[11px] font-bold text-accent">
        {String(number).padStart(2, '0')}
      </span>
      <div>
        <div className="text-[11px] font-semibold text-fg">{title}</div>
        <div className="mt-0.5 text-[10px] leading-relaxed text-fg-muted/50">{description}</div>
      </div>
    </div>
  )
}


export const depItemsExt: DevCenterItem[] = [
  // accessibility guide
  {
    id: 'accessibility',
    label: 'Accessibility',
    layer: 'l-dep',
    type: 'reference',
    tags: ['a11y', 'aria', 'focus', 'keyboard', 'screen-reader'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <DocSection title="Focus management">
          <DemoCard title="focusCls" description="Standard focus ring applied to all interactive elements">
            <div className="flex flex-wrap gap-3">
              <button className="rounded-md border border-border/50 px-3 py-1.5 text-[11px] text-fg outline-none ring-accent/50 focus-visible:ring-2">
                focus-visible ring
              </button>
              <input
                className="rounded-md border border-border/50 bg-transparent px-3 py-1.5 text-[11px] text-fg outline-none ring-accent/50 focus-visible:ring-2"
                defaultValue="Tab to me"
                readOnly
              />
            </div>
          </DemoCard>
          <DemoCard
            title="Focus rules"
            description="All interactive elements use focus-visible, never focus"
            code={`import { focusCls } from '@gds/utils/a11y'

// focusCls provides consistent focus ring
<button className={cx('...base', focusCls)}>Click</button>

// never use focus: — always focus-visible:
// focus: triggers on mouse click (bad)
// focus-visible: triggers on keyboard only (good)`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>focusCls</Code> — standard 2px accent ring with offset</p>
              <p>• Always <Code>focus-visible:</Code> never <Code>focus:</Code></p>
              <p>• Focus ring must not shift layout (use ring, not border)</p>
              <p>• Tab order follows visual left-to-right, top-to-bottom</p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="ARIA attributes">
          <DemoCard title="Common patterns" description="ARIA attributes used across GDS components">
            <DocTable
              headers={['Attribute', 'Used in', 'Purpose']}
              rows={[
                ['role="button"', 'Clickable non-buttons', 'Semantic action element'],
                ['role="dialog"', 'Dialog, Sheet', 'Modal container'],
                ['role="listbox"', 'Select, Combobox', 'Option list container'],
                ['role="option"', 'Select items', 'Selectable option'],
                ['role="tab" / "tabpanel"', 'Tabs', 'Tab navigation'],
                ['aria-expanded', 'Dropdown, Accordion', 'Open/closed state'],
                ['aria-checked', 'Checkbox, Switch', 'On/off state'],
                ['aria-selected', 'Tabs, List items', 'Selection state'],
                ['aria-disabled', 'Button, Input', 'Disabled state'],
                ['aria-label', 'Icon buttons', 'Accessible name'],
                ['aria-describedby', 'Form fields', 'Error/help text link'],
                ['aria-live="polite"', 'Toast, Status', 'Dynamic content announcement'],
              ]}
            />
          </DemoCard>
        </DocSection>

        <DocSection title="Keyboard navigation" columns={2}>
          <DemoCard title="Tab & focus trap" description="Tab cycles through interactive elements; modals trap focus">
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Kbd>Tab</Kbd> moves focus forward</p>
              <p>• <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> moves focus backward</p>
              <p>• Dialogs trap focus within — Tab wraps at boundaries</p>
              <p>• <Kbd>Escape</Kbd> closes modals, dropdowns, sheets</p>
            </div>
          </DemoCard>
          <DemoCard title="Activation" description="Enter and Space activate focused elements">
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Kbd>Enter</Kbd> activates buttons and links</p>
              <p>• <Kbd>Space</Kbd> activates buttons, toggles checkboxes</p>
              <p>• <Kbd>Arrow</Kbd> keys navigate within composite widgets</p>
              <p>• <Kbd>Home</Kbd> / <Kbd>End</Kbd> jump to first/last item</p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Screen reader utilities">
          <DemoCard
            title="srOnly / VisuallyHidden"
            description="Content visible to screen readers but hidden visually"
            code={`import { srOnly } from '@gds/utils/a11y'

// visually hidden but announced by screen reader
<span className={srOnly}>Close dialog</span>

// icon-only button with accessible label
<button aria-label="Close">
  <X className="h-4 w-4" />
</button>`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>srOnly</Code> — class string for visually hidden content</p>
              <p>• Use <Code>aria-label</Code> on icon-only buttons</p>
              <p>• Use <Code>aria-describedby</Code> to link help text to inputs</p>
              <p>• All images need <Code>alt</Code> text or <Code>role="presentation"</Code></p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Color & contrast" columns={2}>
          <DemoCard title="Contrast requirements">
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• Normal text: 4.5:1 minimum contrast ratio (WCAG AA)</p>
              <p>• Large text (18px+): 3:1 minimum</p>
              <p>• UI components and borders: 3:1 minimum</p>
              <p>• Never rely on color alone to convey information</p>
            </div>
          </DemoCard>
          <DemoCard title="Touch targets">
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• Minimum 44x44px on mobile (WCAG 2.5.5)</p>
              <p>• Use <Code>min-h-[44px] min-w-[44px]</Code> on touch targets</p>
              <p>• Spacing between targets: at least 8px</p>
              <p>• Applies to: buttons, links, checkboxes, radios, tabs</p>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Accessibility checklist</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Every interactive element has a visible focus indicator</p>
          <p>• All functionality is keyboard-accessible</p>
          <p>• ARIA roles and states are correctly applied</p>
          <p>• Color is never the sole means of conveying information</p>
          <p>• Touch targets meet 44px minimum on mobile</p>
          <p>• Screen reader announcements for dynamic content</p>
        </div>
      </div>
    ),
  },

  // hooks reference
  {
    id: 'hooks',
    label: 'Hooks',
    layer: 'l-dep',
    type: 'reference',
    tags: ['hooks', 'react', 'utility', 'gesture'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <DocSection title="DOM & interaction hooks">
          <DocTable rows={[
            ['useScrollLock', 'Locks body scroll while active', '(active: boolean) => void', '—'],
            ['useEscapeKey', 'Calls handler on Escape keydown', '(handler: () => void) => void', '—'],
            ['useClickOutside', 'Calls handler on click outside ref', '(ref: RefObject, handler: () => void) => void', '—'],
            ['useFocusTrap', 'Traps Tab focus within container', '(ref: RefObject, active: boolean) => void', '—'],
          ]} />
          <DemoCard
            title="Usage examples"
            code={`import { useScrollLock, useEscapeKey, useClickOutside, useFocusTrap } from '@gds/utils/hooks'

// lock scroll when dialog is open
useScrollLock(isOpen)

// close on escape
useEscapeKey(() => setOpen(false))

// close on click outside
const ref = useRef<HTMLDivElement>(null)
useClickOutside(ref, () => setOpen(false))

// trap focus in modal
const dialogRef = useRef<HTMLDivElement>(null)
useFocusTrap(dialogRef, isOpen)`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>useScrollLock</Code> — prevents background scroll in modals/sheets</p>
              <p>• <Code>useEscapeKey</Code> — standard dismiss pattern for overlays</p>
              <p>• <Code>useClickOutside</Code> — dismiss dropdowns, popovers, panels</p>
              <p>• <Code>useFocusTrap</Code> — WCAG-compliant focus containment in dialogs</p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Responsive hooks">
          <DocTable rows={[
            ['useMediaQuery', 'Tracks a CSS media query match', '(query: string) => boolean', '—'],
            ['useIsMobile', 'True when viewport < 768px', '() => boolean', '—'],
            ['useIsDesktop', 'True when viewport >= 1024px', '() => boolean', '—'],
          ]} />
          <DemoCard
            title="Usage examples"
            code={`import { useMediaQuery, useIsMobile, useIsDesktop } from '@gds/utils/hooks'

// custom breakpoint
const isWide = useMediaQuery('(min-width: 1440px)')

// built-in breakpoints
const isMobile = useIsMobile()
const isDesktop = useIsDesktop()

// conditional rendering
if (isMobile) return <MobileLayout />
return <DesktopLayout />`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>useMediaQuery</Code> — generic media query listener with SSR safety</p>
              <p>• <Code>useIsMobile</Code> — shorthand for max-width: 767px</p>
              <p>• <Code>useIsDesktop</Code> — shorthand for min-width: 1024px</p>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Gesture hooks">
          <DocTable rows={[
            ['useDrag', 'Track pointer drag with delta', '(options: DragOptions) => DragHandlers', '—'],
            ['useSwipe', 'Detect swipe direction', '(options: SwipeOptions) => SwipeHandlers', '—'],
            ['useLongPress', 'Detect press-and-hold', '(handler: () => void, ms?: number) => PressHandlers', '500'],
          ]} />
          <DemoCard
            title="Usage examples"
            code={`import { useDrag, useSwipe, useLongPress } from '@gds/utils/hooks'

// draggable element
const { dragHandlers } = useDrag({
  onDrag: ({ dx, dy }) => setPosition({ x: x + dx, y: y + dy }),
  onDragEnd: () => snap(),
})

// swipe to dismiss
const { swipeHandlers } = useSwipe({
  onSwipeLeft: () => dismiss(),
  threshold: 50,
})

// long press for context menu
const { pressHandlers } = useLongPress(() => showMenu(), 600)`}
          >
            <div className="space-y-1 text-[10px] text-fg-muted/50" data-selectable>
              <p>• <Code>useDrag</Code> — pointer-based drag with delta tracking</p>
              <p>• <Code>useSwipe</Code> — directional swipe detection with threshold</p>
              <p>• <Code>useLongPress</Code> — press-and-hold with configurable delay</p>
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Hook guidelines</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• All hooks are tree-shakeable — import only what you use</p>
          <p>• Hooks handle cleanup automatically via useEffect return</p>
          <p>• SSR-safe — all hooks check for window/document existence</p>
          <p>• Gesture hooks use pointer events for unified mouse/touch</p>
        </div>
      </div>
    ),
  },

  // design philosophy
  {
    id: 'philosophy',
    label: 'Philosophy',
    layer: 'l-dep',
    type: 'reference',
    tags: ['principles', 'design', 'philosophy', 'architecture'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <DocSection title="GDS design principles">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <PrincipleCard
              number={1}
              title="Clarity over decoration"
              description="Data is the product. Remove anything that competes with content for attention. Dense tables over card grids. No gratuitous color, gradients, or decorative borders."
            />
            <PrincipleCard
              number={2}
              title="Consistency breeds trust"
              description="Same action, same appearance, same position, everywhere. One component per concept. All tokens and patterns come from the system — never ad hoc."
            />
            <PrincipleCard
              number={3}
              title="Keyboard-first"
              description="Every action reachable by keyboard. Visible focus indicators, global shortcuts, context shortcuts. Tab order follows visual layout."
            />
            <PrincipleCard
              number={4}
              title="Dark-native"
              description="Design for dark mode first. All color decisions and contrast ratios optimized for dark backgrounds. Light mode is a derived adaptation."
            />
            <PrincipleCard
              number={5}
              title="Immediate feedback"
              description="Every interaction gets visible response within 100ms. Optimistic updates, execute + undo over confirm dialogs, skeleton shimmer for loading."
            />
            <PrincipleCard
              number={6}
              title="Motion as expression"
              description="Animation is a communication channel. Spring physics over CSS duration. Every component accepts a motion prop. Animation must never block interaction."
            />
            <PrincipleCard
              number={7}
              title="AI-native"
              description="Components expose semantic structure via data-* attributes and typed props. AI agents can invoke any action a keyboard user can."
            />
            <PrincipleCard
              number={8}
              title="Glass as material"
              description="Frosted translucency as a material system. Every visual component accepts a glass boolean prop. Intensity adapts to context, auto-fallback on unsupported."
            />
            <PrincipleCard
              number={9}
              title="Mobile-native"
              description="Mobile is a parallel design target. 44px minimum touch targets, gesture navigation, viewport adaptation, no hover-dependent functionality."
            />
            <PrincipleCard
              number={10}
              title="Contextual depth system"
              description="Components auto-scale spacing, radius, shadow, and typography based on nesting depth. Zero configuration — compose normally and CSS handles the rest."
            />
          </div>
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Priority order</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• When principles conflict, lower-numbered principles take priority</p>
          <p>• Clarity (01) always wins over Motion (06) or Glass (08)</p>
          <p>• Keyboard (03) always wins over Mobile (09)</p>
          <p>• Every component should embody all 10 principles where applicable</p>
        </div>
      </div>
    ),
  },

  // keyboard shortcuts
  {
    id: 'keyboard-shortcuts',
    label: 'Keyboard Shortcuts',
    layer: 'l-dep',
    type: 'reference',
    tags: ['keyboard', 'shortcuts', 'a11y', 'interaction'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <DocSection title="Button & link">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['Enter', 'Activate button or follow link'],
              ['Space', 'Activate button (does not follow links)'],
            ]}
          />
        </DocSection>

        <DocSection title="Dialog / Sheet">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['Escape', 'Close dialog'],
              ['Tab', 'Move focus to next element (trapped)'],
              ['Shift + Tab', 'Move focus to previous element (trapped)'],
              ['Enter', 'Confirm primary action'],
            ]}
          />
        </DocSection>

        <DocSection title="Dropdown / Select">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['ArrowDown', 'Open dropdown / move to next option'],
              ['ArrowUp', 'Move to previous option'],
              ['Enter', 'Select highlighted option'],
              ['Escape', 'Close dropdown without selecting'],
              ['Home', 'Jump to first option'],
              ['End', 'Jump to last option'],
            ]}
          />
        </DocSection>

        <DocSection title="Tabs">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['ArrowRight', 'Activate next tab'],
              ['ArrowLeft', 'Activate previous tab'],
              ['Home', 'Activate first tab'],
              ['End', 'Activate last tab'],
            ]}
          />
        </DocSection>

        <DocSection title="Input / Textarea">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['Ctrl + A', 'Select all text'],
              ['Ctrl + C', 'Copy selection'],
              ['Ctrl + V', 'Paste from clipboard'],
              ['Ctrl + Z', 'Undo'],
              ['Ctrl + Shift + Z', 'Redo'],
            ]}
          />
        </DocSection>

        <DocSection title="Checkbox / Switch">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['Space', 'Toggle checked state'],
            ]}
          />
        </DocSection>

        <DocSection title="Accordion">
          <DocTable
            headers={['Key', 'Action']}
            rows={[
              ['Enter', 'Toggle expand/collapse'],
              ['Space', 'Toggle expand/collapse'],
              ['ArrowDown', 'Move focus to next header'],
              ['ArrowUp', 'Move focus to previous header'],
              ['Home', 'Move focus to first header'],
              ['End', 'Move focus to last header'],
            ]}
          />
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Implementation notes</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• All keyboard patterns follow WAI-ARIA Authoring Practices</p>
          <p>• Ctrl shown above maps to Cmd on macOS</p>
          <p>• Arrow key navigation uses roving tabindex pattern</p>
          <p>• Global shortcuts registered via useHotkey hook</p>
        </div>
      </div>
    ),
  },
]
