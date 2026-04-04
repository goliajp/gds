import { useState } from 'react'
import { Button, IconButton } from '@goliapkg/gds/primitives'
import { Checkbox } from '@goliapkg/gds/atoms'
import {
  X,
  Maximize2,
  Pencil,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Settings,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// mock data
// ---------------------------------------------------------------------------

type FileItem = {
  id: string
  name: string
  ext: string
  size: number
  date: string
  category: string
}

const FILES: FileItem[] = [
  {
    id: '1',
    name: '张凡专门一年成绩',
    ext: 'ai',
    size: 4_200_000,
    date: '2026-03-21',
    category: '设计',
  },
  { id: '2', name: 'ai-17392685', ext: 'png', size: 432_000, date: '2026-03-21', category: '图标' },
  { id: '3', name: '55p3', ext: 'png', size: 28_400, date: '2026-03-20', category: '照片' },
  {
    id: '4',
    name: 'GOLIA K.K.',
    ext: 'pdf',
    size: 1_260_000,
    date: '2026-03-19',
    category: '合同',
  },
  {
    id: '5',
    name: 'RobotoFlex-Variable',
    ext: 'ttf',
    size: 3_800_000,
    date: '2026-03-18',
    category: '设计',
  },
  { id: '6', name: '55p4', ext: 'png', size: 32_600, date: '2026-03-20', category: '照片' },
  {
    id: '7',
    name: 'Screenshot 2026-03-15',
    ext: 'png',
    size: 856_000,
    date: '2026-03-15',
    category: '照片',
  },
  {
    id: '8',
    name: 'recording-meeting',
    ext: 'webm',
    size: 14_200_000,
    date: '2026-03-14',
    category: '音频',
  },
  {
    id: '9',
    name: 'product-demo',
    ext: 'mp4',
    size: 5_600_000,
    date: '2026-03-13',
    category: '音频',
  },
  { id: '10', name: 'tab-alerts', ext: 'svg', size: 4_800, date: '2026-03-12', category: '图标' },
  { id: '11', name: '400x800bb', ext: 'png', size: 124_000, date: '2026-03-11', category: '照片' },
  { id: '12', name: '家具', ext: 'dwg', size: 780_000, date: '2026-03-10', category: '设计' },
  { id: '13', name: 'dada', ext: 'jpg', size: 512_000, date: '2026-03-09', category: '照片' },
  { id: '14', name: '65p1', ext: 'png', size: 45_200, date: '2026-03-08', category: '照片' },
  {
    id: '15',
    name: 'invoice-2026-Q1',
    ext: 'pdf',
    size: 98_000,
    date: '2026-03-07',
    category: '发票',
  },
  { id: '16', name: 'fail', ext: 'svg', size: 2_100, date: '2026-03-06', category: '图标' },
]

const TOTAL_SIZE = FILES.reduce((s, f) => s + f.size, 0)

const CATEGORIES = ['全部', '合同', '发票', '证明', '图标', '设计', '照片', '音频', '日志', '其他']

const SIDEBAR_SECTIONS: {
  label: string
  items: { name: string; badge?: number; key: string }[]
}[] = [
  { label: '我的', items: [{ name: '我的', key: 'my' }] },
  {
    label: '业务',
    items: [
      { name: '仪表盘', key: 'dashboard' },
      { name: '日历', key: 'calendar' },
      { name: '员工', key: 'staff', badge: 6 },
      { name: '合同', key: 'contracts', badge: 4 },
      { name: '项目', key: 'projects' },
      { name: '工时', key: 'hours' },
      { name: '行政手续', key: 'admin' },
    ],
  },
  {
    label: '财务',
    items: [
      { name: '薪资', key: 'salary', badge: 0 },
      { name: '财务', key: 'finance' },
      { name: '経费', key: 'expenses', badge: 0 },
      { name: '固定资産', key: 'assets' },
    ],
  },
  {
    label: '开発',
    items: [
      { name: 'Git', key: 'git' },
      { name: '知识库', key: 'wiki' },
    ],
  },
  {
    label: '系統',
    items: [
      { name: '搜索', key: 'search' },
      { name: '数字资産', key: 'files', badge: 16 },
      { name: '消息', key: 'messages' },
      { name: '邮件', key: 'email', badge: 10 },
      { name: '設定', key: 'settings' },
    ],
  },
]

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function formatSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`
  return `${bytes} B`
}

const EXT_COLORS: Record<string, string> = {
  png: 'bg-accent/20 text-accent',
  jpg: 'bg-warning/20 text-warning',
  svg: 'bg-success/20 text-success',
  pdf: 'bg-danger/20 text-danger',
  ai: 'bg-palette-1/20 text-palette-1',
  dwg: 'bg-info/20 text-info',
  ttf: 'bg-palette-5/20 text-palette-5',
  webm: 'bg-palette-3/20 text-palette-3',
  mp4: 'bg-palette-3/20 text-palette-3',
}

const SIDEBAR_ICONS: Record<string, string> = {
  my: '👤',
  dashboard: '📊',
  calendar: '📅',
  staff: '👥',
  contracts: '📄',
  projects: '📁',
  hours: '⏱',
  admin: '📋',
  salary: '💰',
  finance: '💳',
  expenses: '🧾',
  assets: '🏢',
  git: '🔀',
  wiki: '📚',
  search: '🔍',
  files: '📦',
  messages: '💬',
  email: '✉️',
  settings: '⚙️',
}

// ---------------------------------------------------------------------------
// sub-components
// ---------------------------------------------------------------------------

function FileIcon({ ext }: { ext: string }) {
  const cls = EXT_COLORS[ext] ?? 'bg-fg/10 text-fg-muted'
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-[10px] font-bold uppercase ${cls}`}
    >
      {ext}
    </span>
  )
}

function SidebarSection({ section }: { section: (typeof SIDEBAR_SECTIONS)[number] }) {
  return (
    <div className="mb-2">
      <div className="text-fg-muted mb-1 px-3 text-[10px] font-semibold tracking-wider uppercase">
        {section.label}
      </div>
      {section.items.map((item) => {
        const active = item.key === 'files'
        return (
          <Button
            className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs transition-colors ${
              active
                ? 'bg-accent/15 text-accent font-medium'
                : 'text-fg-muted hover:bg-bg-secondary hover:text-fg'
            }`}
            key={item.key}
            variant="ghost"
            size="sm"
          >
            <span className="w-4 text-center text-sm">{SIDEBAR_ICONS[item.key] ?? '·'}</span>
            <span className="flex-1 truncate">{item.name}</span>
            {item.badge !== undefined && item.badge !== null && (
              <span
                className={`min-w-[18px] rounded-full px-1.5 py-0.5 text-center text-[10px] leading-none font-medium ${
                  active ? 'bg-accent/25 text-accent' : 'bg-fg/10 text-fg-muted'
                }`}
              >
                {item.badge}
              </span>
            )}
          </Button>
        )
      })}
    </div>
  )
}

function FilePreviewPanel({ file, onClose }: { file: FileItem; onClose: () => void }) {
  const [zoom, setZoom] = useState(100)
  const [infoOpen, setInfoOpen] = useState(true)

  const isImage = ['png', 'jpg', 'svg'].includes(file.ext)

  return (
    <div className="border-border bg-bg flex h-full flex-col border-l">
      {/* header */}
      <div className="border-border flex h-10 shrink-0 items-center justify-between border-b px-3">
        <span className="text-fg truncate text-xs font-medium">
          {file.name}.{file.ext}
        </span>
        <div className="flex items-center gap-1">
          <IconButton icon={<Maximize2 />} variant="ghost" size="sm" tooltip="全屏" />
          <IconButton icon={<Pencil />} variant="ghost" size="sm" tooltip="编辑" />
          <IconButton icon={<X />} variant="ghost" size="sm" onClick={onClose} tooltip="关闭" />
        </div>
      </div>

      {/* toolbar */}
      <div className="border-border flex h-8 shrink-0 items-center gap-2 border-b px-3">
        <IconButton
          icon={<ZoomOut />}
          variant="ghost"
          size="sm"
          onClick={() => setZoom((z) => Math.max(25, z - 25))}
        />
        <span className="text-fg-muted min-w-[40px] text-center text-[10px]">🔍 {zoom}%</span>
        <IconButton
          icon={<ZoomIn />}
          variant="ghost"
          size="sm"
          onClick={() => setZoom((z) => Math.min(400, z + 25))}
        />
        <div className="border-border mx-1 h-4 border-l" />
        <IconButton icon={<ChevronLeft />} variant="ghost" size="sm" />
        <IconButton icon={<ChevronRight />} variant="ghost" size="sm" />
        <div className="flex-1" />
        <span className="bg-accent/15 text-accent rounded px-2 py-0.5 text-[10px] font-medium">
          素材
        </span>
      </div>

      {/* preview area */}
      <div className="flex flex-1 items-center justify-center overflow-auto p-4">
        {isImage ? (
          <div
            className="bg-bg-secondary border-border flex items-center justify-center rounded-lg border"
            style={{
              width: `${Math.round(240 * (zoom / 100))}px`,
              height: `${Math.round(400 * (zoom / 100))}px`,
            }}
          >
            <div className="text-fg-muted flex flex-col items-center gap-2 text-center">
              <span className="text-4xl">🖼</span>
              <span className="text-[10px]">
                {file.name}.{file.ext}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-fg-muted flex flex-col items-center gap-2">
            <FileIcon ext={file.ext} />
            <span className="text-xs">プレビュー不可</span>
          </div>
        )}
      </div>

      {/* file info collapsible */}
      <div className="border-border border-t">
        <Button
          className="text-fg hover:bg-bg-secondary flex w-full items-center gap-2 px-3 py-2 text-xs font-medium"
          onClick={() => setInfoOpen((v) => !v)}
          variant="ghost"
          size="sm"
        >
          {infoOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          文件信息
        </Button>
        {infoOpen && (
          <div className="space-y-1.5 px-3 pb-3">
            <InfoRow label="文件名" value={`${file.name}.${file.ext}`} />
            <InfoRow label="大小" value={formatSize(file.size)} />
            <InfoRow label="类型" value={extToMime(file.ext)} />
            <InfoRow label="上传日期" value={file.date} />
          </div>
        )}
      </div>

      {/* actions */}
      <div className="border-border flex flex-wrap gap-1.5 border-t px-3 py-2">
        <ActionBtn label="编辑" />
        <ActionBtn label="下载" />
        <ActionBtn label="压缩" />
        <ActionBtn label="替换" />
        <ActionBtn label="分享" />
        <ActionBtn label="删除" variant="danger" />
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center text-xs">
      <span className="text-fg-muted w-16 shrink-0">{label}</span>
      <span className="text-fg truncate">{value}</span>
    </div>
  )
}

function ActionBtn({ label, variant }: { label: string; variant?: 'danger' }) {
  if (variant === 'danger') {
    return (
      <Button size="sm" variant="danger">
        {label}
      </Button>
    )
  }
  return (
    <Button size="sm" variant="secondary">
      {label}
    </Button>
  )
}

function extToMime(ext: string): string {
  const map: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    ai: 'application/illustrator',
    dwg: 'application/acad',
    ttf: 'font/ttf',
    webm: 'video/webm',
    mp4: 'video/mp4',
  }
  return map[ext] ?? `application/${ext}`
}

// ---------------------------------------------------------------------------
// main view
// ---------------------------------------------------------------------------

export function FileManagerView() {
  const [selectedId, setSelectedId] = useState<string | null>('6') // 55p4.png selected
  const [activeCategory, setActiveCategory] = useState('全部')
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())

  const selectedFile = FILES.find((f) => f.id === selectedId) ?? null

  const filteredFiles =
    activeCategory === '全部' ? FILES : FILES.filter((f) => f.category === activeCategory)

  function toggleCheck(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function toggleAll() {
    if (checkedIds.size === filteredFiles.length) {
      setCheckedIds(new Set())
    } else {
      setCheckedIds(new Set(filteredFiles.map((f) => f.id)))
    }
  }

  return (
    <div className="bg-bg text-fg flex h-screen w-screen overflow-hidden">
      {/* ===== top bar ===== */}
      <div className="fixed inset-x-0 top-0 z-30">
        <div className="border-border bg-bg/90 flex h-11 items-center border-b px-4 backdrop-blur-xl">
          {/* left: logo + tabs */}
          <div className="flex items-center gap-4">
            <span className="text-accent text-xs font-bold tracking-wide">GOLIA ADMIN</span>
            <div className="border-border ml-2 hidden items-center gap-0 rounded-md border text-[11px] sm:flex">
              <span className="text-fg-muted px-3 py-1">GOLIA DevOps</span>
              <span className="border-border bg-bg-secondary text-fg border-l px-3 py-1 font-medium">
                GOLIA Admin
              </span>
            </div>
          </div>
          <div className="flex-1" />
          {/* right: env + search + user */}
          <div className="flex items-center gap-3">
            <Button
              className="border-border text-fg-muted hidden rounded-md border px-2.5 py-1 text-[11px] sm:block"
              variant="ghost"
              size="sm"
            >
              生产环境 ▾
            </Button>
            <IconButton icon={<Search />} variant="ghost" size="sm" />
            <span className="relative">
              <IconButton icon={<Bell />} variant="ghost" size="sm" />
              <span className="bg-accent absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full" />
            </span>
            <IconButton icon={<Settings />} variant="ghost" size="sm" />
            <div className="bg-accent/20 text-accent flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold">
              LH
            </div>
          </div>
        </div>
      </div>

      {/* ===== sidebar ===== */}
      <aside className="border-border bg-bg fixed top-11 bottom-0 left-0 z-20 hidden w-[180px] shrink-0 overflow-y-auto border-r py-2 lg:block">
        {SIDEBAR_SECTIONS.map((sec) => (
          <SidebarSection key={sec.label} section={sec} />
        ))}
      </aside>

      {/* ===== main content ===== */}
      <div className="mt-11 flex flex-1 lg:ml-[180px]">
        {/* --- file list panel --- */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* header bar */}
          <div className="border-border flex h-11 shrink-0 items-center gap-3 border-b px-4">
            <span className="text-fg text-xs font-semibold">
              {filteredFiles.length} 资産 · {formatSize(TOTAL_SIZE)}
            </span>
            <div className="flex-1" />
            <Button size="sm" variant="primary">
              上传
            </Button>
            <Button size="sm" variant="secondary">
              新建
            </Button>
          </div>

          {/* category filter */}
          <div className="border-border flex shrink-0 gap-1 overflow-x-auto border-b px-4 py-2">
            {CATEGORIES.map((cat) => (
              <Button
                className={`rounded-full px-2.5 py-1 text-[11px] whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-accent/15 text-accent font-medium'
                    : 'text-fg-muted hover:bg-bg-secondary hover:text-fg'
                }`}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                variant="ghost"
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* table header */}
          <div className="border-border bg-bg-secondary/50 flex h-8 shrink-0 items-center border-b px-4 text-[10px] font-semibold tracking-wider uppercase">
            <div className="w-8 shrink-0">
              <Checkbox
                checked={checkedIds.size === filteredFiles.length && filteredFiles.length > 0}
                onChange={toggleAll}
              />
            </div>
            <div className="text-fg-muted min-w-0 flex-1">名称</div>
            <div className="text-fg-muted hidden w-20 text-right sm:block">大小</div>
            <div className="text-fg-muted hidden w-24 text-right md:block">日期</div>
          </div>

          {/* file rows */}
          <div className="flex-1 overflow-y-auto">
            {filteredFiles.map((file) => {
              const isSelected = file.id === selectedId
              const isChecked = checkedIds.has(file.id)
              return (
                <Button
                  className={`flex w-full items-center justify-start px-4 py-2 text-left transition-colors ${
                    isSelected
                      ? 'bg-accent/10 border-accent/30 border-l-2'
                      : 'hover:bg-bg-secondary border-l-2 border-transparent'
                  }`}
                  key={file.id}
                  onClick={() => setSelectedId(file.id)}
                  variant="ghost"
                  size="sm"
                >
                  <div className="w-8 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={isChecked} onChange={() => toggleCheck(file.id)} />
                  </div>
                  <FileIcon ext={file.ext} />
                  <span className="text-fg ml-2.5 min-w-0 flex-1 truncate text-xs">
                    {file.name}
                    <span className="text-fg-muted">.{file.ext}</span>
                  </span>
                  <span className="text-fg-muted hidden w-20 text-right text-[11px] sm:block">
                    {formatSize(file.size)}
                  </span>
                  <span className="text-fg-muted hidden w-24 text-right text-[11px] md:block">
                    {file.date}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* --- preview panel --- */}
        {selectedFile !== null && (
          <div className="hidden w-[340px] shrink-0 md:flex lg:w-[380px]">
            <FilePreviewPanel file={selectedFile} onClose={() => setSelectedId(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
