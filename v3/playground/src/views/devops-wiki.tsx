import { Button, Input } from '@goliapkg/gds/primitives'
import { useState } from 'react'
import {
  Server,
  Activity,
  GitBranch,
  BarChart3,
  BookOpen,
  Terminal,
  Settings,
  ChevronDown,
  FileText,
} from 'lucide-react'

// --- types ---

type WikiCategory = {
  label: string
  items: WikiItem[]
}

type WikiItem = {
  id: string
  label: string
}

type DeviceEntry = {
  id: string
  label: string
  status: 'online' | 'offline'
}

// --- constants ---

const DEVICES: DeviceEntry[] = [
  { id: 't01', label: 't01', status: 'online' },
  { id: 't02', label: 't02', status: 'online' },
  { id: 'lx64', label: 'lx64', status: 'online' },
  { id: 'r01', label: 'r01', status: 'offline' },
]

const SIDEBAR_SECTIONS = [
  {
    items: DEVICES.map((d) => ({
      icon: Server,
      id: d.id,
      label: d.label,
      status: d.status,
    })),
    label: 'DEVICES',
  },
  {
    items: [
      { icon: Activity, id: 'overview', label: 'Overview' },
      { icon: Terminal, id: 'deploy', label: 'Deploy' },
      { icon: Settings, id: 'config', label: 'Config' },
    ],
    label: 'OPERATIONS',
  },
  {
    items: [
      { icon: GitBranch, id: 'repos', label: 'Repos' },
      { icon: BookOpen, id: 'wiki', label: 'Wiki' },
    ],
    label: 'DEVELOPMENT',
  },
  {
    items: [{ icon: BarChart3, id: 'analytics', label: 'Analytics' }],
    label: 'ANALYTICS',
  },
] as const

const WIKI_CATEGORIES: WikiCategory[] = [
  {
    label: 'UPGRADE',
    items: [{ id: 'typescript-6', label: 'typescript-6' }],
  },
  {
    label: 'DEPLOY',
    items: [
      { id: 'api', label: 'api' },
      { id: 'binary', label: 'binary' },
      { id: 'caddy', label: 'caddy' },
      { id: 'docker', label: 'docker' },
      { id: 'register', label: 'register' },
      { id: 'static', label: 'static' },
    ],
  },
  {
    label: 'LINT',
    items: [
      { id: 'expo', label: 'expo' },
      { id: 'monorepo', label: 'monorepo' },
      { id: 'rust', label: 'rust' },
      { id: 'typescript', label: 'typescript' },
    ],
  },
]

// --- wiki content ---

function CaddyContent() {
  return (
    <article className="max-w-[800px]">
      <h1 className="text-fg mb-6 text-2xl font-bold">Caddy Routing</h1>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        All public-facing services are behind Caddy reverse proxy. The routing chain:
      </p>

      <pre className="bg-bg-secondary text-fg-secondary mb-6 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">
        {`DNS (Cloudflare) → Device (t01/lx64) → Caddy → Service (container port / static files)`}
      </pre>

      <h2 className="text-fg mt-8 mb-4 text-lg font-bold">How It Works</h2>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        Caddy configuration is stored in CaddyStore (PostgreSQL). Each site has:
      </p>

      <ul className="text-fg-secondary mb-4 list-inside list-disc space-y-1.5 pl-1 text-sm leading-relaxed">
        <li>
          <strong className="text-fg">domains</strong> — list of domain names (e.g.,{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
            {`["golia.jp", "www.golia.jp"]`}
          </code>
          )
        </li>
        <li>
          <strong className="text-fg">caddy_device</strong> — which device runs Caddy for this site
          (usually{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">'t01'</code>)
        </li>
        <li>
          <strong className="text-fg">block</strong> — Caddyfile configuration block (reverse_proxy,
          file_server, etc.)
        </li>
        <li>
          <strong className="text-fg">enabled</strong> — toggle without deleting
        </li>
      </ul>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        The{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
          caddy deploy
        </code>{' '}
        command generates a complete Caddyfile from all enabled sites, writes it to the target
        device, and triggers a Caddy reload. The generated file is deterministic — same database
        state always produces the same Caddyfile.
      </p>

      <h2 className="text-fg mt-8 mb-4 text-lg font-bold">Common Patterns</h2>

      <h3 className="text-fg mt-6 mb-3 text-sm font-bold">Reverse proxy (backend service)</h3>

      <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
        Route traffic to a Docker container or binary listening on a port:
      </p>

      <pre className="bg-bg-secondary text-fg-secondary mb-6 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">
        {`reverse_proxy {{resolve:lx64:3080}}`}
      </pre>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        The{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
          {`{{resolve:device:port}}`}
        </code>{' '}
        macro resolves the device's internal IP at deploy time. This means you never hardcode IPs in
        configuration — if a device's IP changes, re-deploy and all routes update automatically.
      </p>

      <h3 className="text-fg mt-6 mb-3 text-sm font-bold">Static file server (frontend)</h3>

      <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
        Serve a built frontend app from disk:
      </p>

      <pre className="bg-bg-secondary text-fg-secondary mb-6 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">
        {`root * /apps/goliajp-web
file_server
try_files {path} /index.html`}
      </pre>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        The{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">try_files</code>{' '}
        directive is essential for SPA routing — it falls back to{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">index.html</code>{' '}
        for any path that doesn't match a real file, letting the client-side router handle it.
      </p>

      <h3 className="text-fg mt-6 mb-3 text-sm font-bold">Handle path prefix (sub-path routing)</h3>

      <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
        Mount a frontend app under a sub-path of another domain:
      </p>

      <pre className="bg-bg-secondary text-fg-secondary mb-6 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">
        {`handle_path /admin/* {
    root * /apps/goliajp-admin
    file_server
    try_files {path} /index.html
}`}
      </pre>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">handle_path</code>{' '}
        strips the prefix before passing to inner directives, so the app sees{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">/</code> instead
        of <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">/admin/</code>.
        This is important for SPAs that assume they're served from root.
      </p>

      <h3 className="text-fg mt-6 mb-3 text-sm font-bold">Multiple backends on one domain</h3>

      <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
        Combine a frontend and API on the same domain using path-based routing:
      </p>

      <pre className="bg-bg-secondary text-fg-secondary mb-6 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">
        {`handle /api/* {
    reverse_proxy {{resolve:lx64:8080}}
}

handle {
    root * /apps/frontend
    file_server
    try_files {path} /index.html
}`}
      </pre>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        Order matters here — Caddy evaluates{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">handle</code>{' '}
        blocks by specificity, so{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">/api/*</code>{' '}
        matches first and the catch-all handles everything else.
      </p>

      <h2 className="text-fg mt-8 mb-4 text-lg font-bold">Deployment Flow</h2>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        When you run{' '}
        <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
          ops caddy deploy
        </code>
        , the following steps execute:
      </p>

      <ol className="text-fg-secondary mb-4 list-inside list-decimal space-y-1.5 pl-1 text-sm leading-relaxed">
        <li>Query all enabled sites from CaddyStore</li>
        <li>
          Resolve all{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
            {`{{resolve:...}}`}
          </code>{' '}
          macros to actual IPs
        </li>
        <li>Generate Caddyfile with global options (email for ACME, log format)</li>
        <li>Write to target device via SSH</li>
        <li>
          Run{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
            caddy reload
          </code>{' '}
          on the target device
        </li>
        <li>Verify the reload succeeded (check Caddy's admin API)</li>
      </ol>

      <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
        If any step fails, the deployment aborts and the previous Caddyfile remains active. No
        rollback is needed because the old config was never overwritten until step 4 succeeds.
      </p>

      <h2 className="text-fg mt-8 mb-4 text-lg font-bold">Troubleshooting</h2>

      <ul className="text-fg-secondary mb-4 list-inside list-disc space-y-1.5 pl-1 text-sm leading-relaxed">
        <li>
          <strong className="text-fg">502 Bad Gateway</strong> — the upstream service is not running
          or listening on the wrong port. Check{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">docker ps</code>{' '}
          or{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
            systemctl status
          </code>
          .
        </li>
        <li>
          <strong className="text-fg">SSL certificate error</strong> — Caddy auto-provisions
          certificates via Let's Encrypt. Ensure DNS is pointing to the correct device and port 443
          is open.
        </li>
        <li>
          <strong className="text-fg">Config not updating</strong> — verify the site is{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">enabled</code>{' '}
          in CaddyStore and re-run{' '}
          <code className="bg-bg-secondary rounded px-1.5 py-0.5 font-mono text-xs">
            ops caddy deploy
          </code>
          .
        </li>
        <li>
          <strong className="text-fg">Port conflict</strong> — two services trying to use the same
          port. Check the deploy registry for port allocations.
        </li>
      </ul>
    </article>
  )
}

// --- component ---

export function DevOpsWikiView() {
  const [activeWikiItem, setActiveWikiItem] = useState('caddy')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    DEVICES: true,
    OPERATIONS: true,
    DEVELOPMENT: true,
    ANALYTICS: true,
  })

  function toggleSection(label: string) {
    setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div className="bg-bg flex h-screen overflow-hidden">
      {/* primary sidebar */}
      <aside className="border-border bg-bg-secondary flex w-[200px] shrink-0 flex-col border-r">
        {/* dual tabs */}
        <div className="border-border flex shrink-0 border-b">
          <Button
            className="text-fg flex-1 px-3 py-2 text-center text-[11px] font-semibold tracking-wide"
            variant="ghost"
          >
            GOLIA DevOps
          </Button>
          <Button
            className="text-fg-muted flex-1 px-3 py-2 text-center text-[11px] tracking-wide"
            variant="ghost"
          >
            GOLIA Admin
          </Button>
        </div>

        {/* search */}
        <div className="border-border border-b px-3 py-2">
          <Input className="text-[11px]" inputSize="sm" placeholder="Search..." />
        </div>

        {/* navigation sections */}
        <nav className="flex-1 overflow-y-auto py-1">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.label}>
              <Button
                className="text-fg-muted hover:text-fg flex w-full items-center gap-1 px-3 py-1.5 text-left text-[10px] font-semibold tracking-wider"
                onClick={() => toggleSection(section.label)}
                size="sm"
                variant="ghost"
              >
                <ChevronDown
                  className={`shrink-0 transition-transform ${expandedSections[section.label] ? '' : '-rotate-90'}`}
                  size={10}
                />
                {section.label}
              </Button>
              {expandedSections[section.label] && (
                <div className="mb-1">
                  {section.items.map((item) => {
                    const isActive = item.id === 'wiki'
                    const Icon = item.icon
                    return (
                      <Button
                        className={`flex w-full items-center gap-2 rounded-none px-4 py-1 text-left text-[11px] ${
                          isActive
                            ? 'bg-accent/10 text-accent font-medium'
                            : 'text-fg-muted hover:text-fg hover:bg-fg/5'
                        }`}
                        key={item.id}
                        size="sm"
                        variant="ghost"
                      >
                        {'status' in item ? (
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              item.status === 'online' ? 'bg-success' : 'bg-fg-muted/40'
                            }`}
                          />
                        ) : (
                          <Icon className="shrink-0" size={12} />
                        )}
                        <span>{item.label}</span>
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* wiki category sidebar */}
      <aside className="border-border bg-bg flex w-[140px] shrink-0 flex-col border-r py-2">
        {WIKI_CATEGORIES.map((category) => (
          <div key={category.label} className="mb-2">
            <div className="text-fg-muted px-3 py-1 text-[10px] font-semibold tracking-wider">
              {category.label}
            </div>
            {category.items.map((item) => {
              const isActive = item.id === activeWikiItem
              return (
                <Button
                  className={`block w-full rounded-none px-4 py-0.5 text-left text-[11px] ${
                    isActive ? 'text-accent font-medium' : 'text-fg-muted hover:text-fg'
                  }`}
                  key={item.id}
                  onClick={() => setActiveWikiItem(item.id)}
                  size="sm"
                  variant="ghost"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="shrink-0" size={10} />
                    {item.label}
                  </span>
                </Button>
              )
            })}
          </div>
        ))}
      </aside>

      {/* main content */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <CaddyContent />
      </main>
    </div>
  )
}
