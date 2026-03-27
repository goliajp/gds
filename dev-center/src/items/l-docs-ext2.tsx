import { DocTable, DemoCard, DocSection, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

type AuditCheck = {
  description: string
  id: string
  label: string
  severity: 'critical' | 'high' | 'medium'
}

const componentChecks: AuditCheck[] = [
  { id: 'cva', label: 'CVA Variants', severity: 'high', description: 'Visual variants defined via cva(). Variants object exported for playground introspection.' },
  { id: 'forward-ref', label: 'forwardRef', severity: 'high', description: 'All DOM-wrapping components use forwardRef for consumer ref access.' },
  { id: 'semantic-tokens', label: 'Semantic Tokens Only', severity: 'critical', description: 'No raw Tailwind colors (bg-red-500). All colors from semantic tokens.' },
  { id: 'dark-mode', label: 'Dark Mode', severity: 'critical', description: 'Component renders correctly in both themes. No hardcoded colors.' },
  { id: 'focus-visible', label: 'Focus Visible', severity: 'high', description: 'All interactive elements include focusCls. Uses focus-visible, never focus.' },
  { id: 'keyboard', label: 'Keyboard Navigation', severity: 'high', description: 'Fully operable via keyboard. Enter/Space for activation, Escape for dismiss.' },
  { id: 'aria', label: 'ARIA Attributes', severity: 'high', description: 'Proper role, aria-label, aria-expanded, aria-modal. Screen reader compatible.' },
  { id: 'select-none', label: 'select-none', severity: 'medium', description: 'Non-content elements are select-none. Content areas use data-selectable.' },
  { id: 'cursor', label: 'Cursor Discipline', severity: 'medium', description: 'cursor-pointer on clickable, cursor-default on non-interactive.' },
  { id: 'className-prop', label: 'className Prop', severity: 'medium', description: 'Accepts className prop for consumer overrides via cx() merge.' },
  { id: 'spread-props', label: 'Spread Props', severity: 'medium', description: 'Remaining props spread onto root DOM element.' },
  { id: 'type-exports', label: 'Type Exports', severity: 'medium', description: 'All prop types exported. Named exports only, no default exports.' },
  { id: 'i18n-ready', label: 'i18n Ready', severity: 'high', description: 'No hardcoded user-facing strings. All text passed as props.' },
  { id: 'animation', label: 'Animation Tokens', severity: 'medium', description: 'Uses duration/easing tokens. Respects prefers-reduced-motion.' },
]

const severityColors: Record<string, string> = {
  critical: 'text-danger bg-danger/10',
  high: 'text-warning bg-warning/10',
  medium: 'text-fg-muted bg-bg-tertiary/50',
}

const docsItemsExt2: DevCenterItem[] = [
  {
    id: 'audit-standard',
    label: 'Audit Standard',
    layer: 'l-docs',
    type: 'reference',
    tags: ['audit', 'checklist', 'quality', 'standard', 'review'],

    stage: () => (
      <div>
        <ImportLine text="// GDS component audit standard — quality checklist" />

        <LivePreview className="!justify-start !items-start">
          <div className="text-lg font-bold text-fg">GDS Audit Standard</div>
          <p className="mt-1 text-sm text-fg-muted">
            Quality checklist for every GDS component. All checks must pass before production release.
          </p>
        </LivePreview>

        <DocSection title="Component Checklist">
          <div className="rounded-lg border border-border/20">
            {componentChecks.map((check, i) => (
              <div
                className={`flex items-start gap-3 px-4 py-3 ${i < componentChecks.length - 1 ? 'border-b border-border/10' : ''}`}
                key={check.id}
              >
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success/40">
                    <path d="M3 7l3 3 5-6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-fg">{check.label}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium uppercase ${severityColors[check.severity]}`}>
                      {check.severity}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-fg-muted">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection title="Severity Levels">
          <div className="grid grid-cols-3 gap-3">
            {[
              { cls: 'text-danger', level: 'Critical', desc: 'Must fix before any release. Component is broken without this.' },
              { cls: 'text-warning', level: 'High', desc: 'Should fix before release. Significant UX or accessibility impact.' },
              { cls: 'text-fg-muted', level: 'Medium', desc: 'Nice to have. Improves developer experience or consistency.' },
            ].map((s) => (
              <div className="rounded-lg border border-border/20 bg-bg-secondary/20 p-4" key={s.level}>
                <div className={`text-xs font-semibold ${s.cls}`}>{s.level}</div>
                <p className="mt-1 text-[11px] text-fg-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection title="Scoring">
          <div className="space-y-2 text-xs text-fg-muted">
            <p>Each component is scored by the number of checks passed out of {componentChecks.length}.</p>
            <div className="flex gap-4 text-[11px]">
              <span className="text-success">{componentChecks.length}/{componentChecks.length} = Production Ready</span>
              <span className="text-warning">{componentChecks.length - 3}/{componentChecks.length} = Needs Work</span>
              <span className="text-danger">&lt;{componentChecks.length - 5}/{componentChecks.length} = Not Ready</span>
            </div>
          </div>
        </DocSection>
      </div>
    ),

    code: () => `// GDS Component Audit Checklist
// Run through these checks for every component

// 1. CVA — variants defined and exported
export { buttonVariants }

// 2. forwardRef — consumer can access DOM
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)

// 3. Semantic tokens — no raw colors
className="bg-accent text-accent-fg"  // correct
className="bg-blue-500 text-white"    // wrong

// 4. Dark mode — automatic via tokens

// 5. Focus visible
import { focusCls } from '@/utils/a11y'
className={cx('...', focusCls)}

// 6. Keyboard + ARIA
aria-expanded={isOpen}
aria-label="Close dialog"
role="dialog"
aria-modal="true"

// 7. i18n ready — no hardcoded strings
<Button>{t('action.save')}</Button>`,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">How to use</div>
          <div className="space-y-1.5 text-[10px] text-fg-muted/50">
            <p>Run through this checklist for every new or modified component in the design system.</p>
            <p>Critical items must pass — no exceptions.</p>
            <p>High items should pass for production release.</p>
            <p>Medium items are recommended for consistency.</p>
          </div>
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Process</div>
          <div className="space-y-1.5 text-[10px] text-fg-muted/50">
            <p>1. Create component following GDS lib standards</p>
            <p>2. Add dev-center item with all variants exercisable</p>
            <p>3. Toggle dark mode and verify all states</p>
            <p>4. Tab through with keyboard, verify focus rings</p>
            <p>5. Check with screen reader (VoiceOver)</p>
            <p>6. Run through this checklist, fix any failures</p>
          </div>
        </div>
      </div>
    ),
  },
]

export { docsItemsExt2 }
