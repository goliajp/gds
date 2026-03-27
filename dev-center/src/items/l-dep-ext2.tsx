// l-dep-ext2 — icon system reference

import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  File,
  Filter,
  Folder,
  Globe,
  Heart,
  Home,
  Info,
  Link,
  Lock,
  Mail,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react'

import { Button } from '@gds/l2-primitives'
import { IconButton } from '@gds/l2-primitives'

import { DocTable, DemoCard, DocSection, ImportLine } from '../components/demo'

import type { DevCenterItem } from '../types'

const commonIcons = [
  { icon: Search, name: 'Search' },
  { icon: Plus, name: 'Plus' },
  { icon: X, name: 'X' },
  { icon: Check, name: 'Check' },
  { icon: Edit, name: 'Edit' },
  { icon: Trash2, name: 'Trash2' },
  { icon: Copy, name: 'Copy' },
  { icon: Download, name: 'Download' },
  { icon: Upload, name: 'Upload' },
  { icon: Settings, name: 'Settings' },
  { icon: User, name: 'User' },
  { icon: Mail, name: 'Mail' },
  { icon: Bell, name: 'Bell' },
  { icon: Calendar, name: 'Calendar' },
  { icon: Clock, name: 'Clock' },
  { icon: Home, name: 'Home' },
  { icon: File, name: 'File' },
  { icon: Folder, name: 'Folder' },
  { icon: Globe, name: 'Globe' },
  { icon: Lock, name: 'Lock' },
  { icon: Eye, name: 'Eye' },
  { icon: Heart, name: 'Heart' },
  { icon: Star, name: 'Star' },
  { icon: Filter, name: 'Filter' },
  { icon: Link, name: 'Link' },
  { icon: ExternalLink, name: 'ExternalLink' },
  { icon: Info, name: 'Info' },
  { icon: AlertTriangle, name: 'AlertTriangle' },
  { icon: Menu, name: 'Menu' },
  { icon: MoreHorizontal, name: 'MoreHorizontal' },
]

const sizeClasses = [
  { name: 'gds-icon-xs', size: '12px', cls: 'h-3 w-3' },
  { name: 'gds-icon-sm', size: '14px', cls: 'h-3.5 w-3.5' },
  { name: 'gds-icon', size: '16px', cls: 'h-4 w-4' },
  { name: 'gds-icon-lg', size: '20px', cls: 'h-5 w-5' },
]

export const depItemsExt2: DevCenterItem[] = [
  {
    id: 'icons',
    label: 'Icons',
    layer: 'l-dep',
    type: 'reference',
    tags: ['icons', 'lucide', 'svg', 'iconography'],
    stage: () => (
      <div className="flex flex-col gap-2">
        <ImportLine text="import { Search, Plus, X, Check, Edit, Trash2 } from 'lucide-react'" />

        <DocSection title="Icon library">
          <DemoCard
            title="lucide-react"
            description="GDS uses lucide-react — 1500+ open-source icons, tree-shakeable, consistent 24x24 stroke style"
            full
          >
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
              {commonIcons.map(({ icon: Icon, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1.5 rounded-md border border-white/[0.04] bg-white/[0.02] px-1 py-2"
                >
                  <Icon className="h-4 w-4 text-fg-muted/70" />
                  <span className="text-[8px] text-fg-muted/30">{name}</span>
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Icon sizing">
          <DemoCard title="Size Scale" description="Use consistent size classes for icons across components" full>
            <div className="flex flex-col gap-3">
              {sizeClasses.map(s => (
                <div
                  key={s.name}
                  className="flex items-center gap-4 rounded-md border border-white/[0.04] bg-white/[0.02] px-3 py-2"
                >
                  <span className="w-24 shrink-0 font-mono text-[10px] text-accent">{s.name}</span>
                  <Search className={`${s.cls} text-fg`} />
                  <Plus className={`${s.cls} text-fg`} />
                  <Check className={`${s.cls} text-fg`} />
                  <span className="ml-auto text-[9px] text-fg-muted/30">{s.size}</span>
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Icons with components" columns={2}>
          <DemoCard title="Button with icon" description="Icons inside buttons via children composition">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">
                <Plus className="h-3.5 w-3.5" />
                Create
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
            </div>
          </DemoCard>
          <DemoCard title="IconButton" description="Icon-only buttons with aria-label">
            <div className="flex flex-wrap gap-2">
              <IconButton aria-label="Search"><Search className="h-4 w-4" /></IconButton>
              <IconButton aria-label="Settings"><Settings className="h-4 w-4" /></IconButton>
              <IconButton aria-label="Close"><X className="h-4 w-4" /></IconButton>
              <IconButton aria-label="More"><MoreHorizontal className="h-4 w-4" /></IconButton>
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Navigation icons">
          <DemoCard title="Directional" description="Arrows and chevrons for navigation patterns" full>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: ArrowUp, name: 'ArrowUp' },
                { icon: ArrowDown, name: 'ArrowDown' },
                { icon: ArrowLeft, name: 'ArrowLeft' },
                { icon: ArrowRight, name: 'ArrowRight' },
                { icon: ChevronDown, name: 'ChevronDown' },
                { icon: ChevronRight, name: 'ChevronRight' },
              ].map(({ icon: Icon, name }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-1.5"
                >
                  <Icon className="h-4 w-4 text-fg" />
                  <span className="text-[9px] text-fg-muted/40">{name}</span>
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),
    docs: () => (
      <div className="space-y-4" data-selectable>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Icon System</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• GDS uses lucide-react (1500+ icons, MIT license)</p>
            <p>• All icons are tree-shakeable — import only what you use</p>
            <p>• Consistent 24x24 viewBox, 2px stroke width</p>
            <p>• Use className for sizing: h-4 w-4 (default), h-3 w-3 (small), h-5 w-5 (large)</p>
            <p>• Icons inherit currentColor — set color via text-* classes on parent or icon</p>
            <p>• Always add aria-label on icon-only buttons for accessibility</p>
          </div>
        </div>
        <DocTable rows={[
          ['className', 'Size and color via Tailwind classes', 'string', 'h-4 w-4'],
          ['strokeWidth', 'SVG stroke width', 'number', '2'],
          ['size', 'Shorthand for width + height', 'number', '24'],
          ['color', 'Stroke color (prefer className)', 'string', 'currentColor'],
          ['absoluteStrokeWidth', 'Prevent stroke scaling with size', 'boolean', 'false'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Component integration</div>
          <DocTable rows={[
            ['Button', 'Pass icon as child alongside text', 'children: ReactNode', '—'],
            ['IconButton', 'Icon-only button, requires aria-label', 'children: ReactNode', '—'],
            ['Input', 'leadingIcon / trailingIcon props', 'ReactNode', '—'],
            ['Alert', 'icon prop for status indicator', 'ReactNode', '—'],
            ['Notification', 'icon prop for notification type', 'ReactNode', '—'],
          ]} />
        </div>
      </div>
    ),
    code: () => `// import individual icons (tree-shakeable)
import { Search, Plus, X, Check, Edit, Trash2 } from 'lucide-react'

// sizing
<Search className="h-3 w-3" />     {/* xs: 12px */}
<Search className="h-3.5 w-3.5" /> {/* sm: 14px */}
<Search className="h-4 w-4" />     {/* default: 16px */}
<Search className="h-5 w-5" />     {/* lg: 20px */}

// with Button
<Button variant="primary">
  <Plus className="h-3.5 w-3.5" />
  Create
</Button>

// IconButton (icon-only, accessible)
<IconButton aria-label="Search">
  <Search className="h-4 w-4" />
</IconButton>

// color via parent
<span className="text-accent">
  <Star className="h-4 w-4" />
</span>

// color via className
<AlertTriangle className="h-4 w-4 text-warning" />`,
  },
]
