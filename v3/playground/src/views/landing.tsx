import { useState } from 'react'
import { ChevronDown, Star, Monitor, Moon, ArrowRight } from 'lucide-react'
import { Button, IconButton } from '@goliapkg/gds/primitives'
import { Card, CardContent } from '@goliapkg/gds/molecules'

const NAV_LINKS = [
  { label: 'Nudo', href: '#nudo' },
  { label: 'AI-Native プロジェクト協業プラットフォーム', href: '#platform' },
  { label: '関連研究', href: '#research' },
  { label: 'チーム紹介', href: '#team' },
  { label: '採用情報', href: '#careers' },
]

const LANG_OPTIONS = ['日', '中', '한', 'EN'] as const

function WavyUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="absolute -bottom-2 left-0 w-full"
        height="8"
        preserveAspectRatio="none"
        viewBox="0 0 200 8"
      >
        <path
          d="M0 4 Q25 0 50 4 Q75 8 100 4 Q125 0 150 4 Q175 8 200 4"
          fill="none"
          stroke="var(--color-accent)"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    </span>
  )
}

function Navbar() {
  const [activeLang, setActiveLang] = useState<string>('日')

  return (
    <header className="border-border bg-bg/80 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* logo */}
        <a className="text-fg text-lg font-bold tracking-tight" href="#">
          GOLIA
        </a>

        {/* center nav links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              className="text-fg-muted hover:text-fg text-sm transition-colors"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* right controls */}
        <div className="flex items-center gap-4">
          {/* theme icons */}
          <div className="hidden items-center gap-1 md:flex">
            <IconButton
              icon={<Star className="h-4 w-4" />}
              size="sm"
              tooltip="Star"
              variant="ghost"
            />
            <IconButton
              icon={<Monitor className="h-4 w-4" />}
              size="sm"
              tooltip="System theme"
              variant="default"
            />
            <IconButton
              icon={<Moon className="h-4 w-4" />}
              size="sm"
              tooltip="Dark mode"
              variant="ghost"
            />
          </div>

          {/* language switcher */}
          <div className="hidden items-center gap-1 text-xs md:flex">
            {LANG_OPTIONS.map((lang) => (
              <Button
                className={activeLang === lang ? 'bg-fg text-bg hover:bg-fg/80' : ''}
                key={lang}
                onClick={() => setActiveLang(lang)}
                size="sm"
                variant="ghost"
              >
                {lang}
              </Button>
            ))}
          </div>

          {/* cta button */}
          <Button
            className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50"
            onClick={() => {
              window.location.hash = '#contact'
            }}
            size="sm"
            variant="secondary"
          >
            お問い合わせ
          </Button>
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-20 pb-16 text-center">
      {/* heading */}
      <h1 className="text-fg mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Bring workspaces to life
        <br />
        with <WavyUnderline>ai partners</WavyUnderline>
      </h1>

      {/* subtitle */}
      <p className="text-fg-muted mx-auto mb-12 max-w-2xl text-base leading-relaxed sm:text-lg">
        LLM をベースに AI パートナーを開発、関連エージェントツールキットを改善し、AI-Native
        プロジェクト協業プラットフォームを構築、AI の実用的価値を最大限引き出しています
      </p>

      {/* character illustrations */}
      <div className="mb-12 flex items-end justify-center gap-6 sm:gap-10">
        {/* left character: deer */}
        <div className="flex h-40 w-32 flex-col items-center justify-center rounded-2xl bg-amber-50 sm:h-52 sm:w-40">
          <span className="text-5xl sm:text-6xl">🦌</span>
          <span className="mt-2 text-xs text-amber-700">pen & paper</span>
        </div>

        {/* center card */}
        <Card className="h-24 w-36 sm:h-28 sm:w-44" padding="sm">
          <CardContent className="flex h-full flex-col items-center justify-center">
            <span className="text-fg text-sm font-medium">全力開発中...</span>
            <span className="text-fg-muted mt-1 text-xs">building the future</span>
          </CardContent>
        </Card>

        {/* right character: dog */}
        <div className="flex h-40 w-32 flex-col items-center justify-center rounded-2xl bg-blue-50 sm:h-52 sm:w-40">
          <span className="text-5xl sm:text-6xl">🐕</span>
          <span className="mt-2 text-xs text-blue-700">phone & heart</span>
        </div>
      </div>

      {/* sub-text */}
      <p className="text-fg-muted mb-6 text-sm sm:text-base">
        GOLIA の東京チームは、以下の製品を積極的に開発しています
      </p>

      {/* down arrow */}
      <a className="text-fg-muted animate-bounce" href="#products">
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  )
}

const PRODUCTS = [
  {
    name: 'Nudo',
    tagline: 'AI パートナー シミュレーション プラットフォーム',
    description:
      'Nudo は、AI エージェントパートナーのシミュレーションに焦点を当てた先進的な AI エージェントプラットフォームです。LLM 技術をベースに、自然な会話能力と豊かな人格特性を備えた AI パートナーを構築します。',
    color: 'blue' as const,
  },
  {
    name: 'Dada',
    tagline: 'AI-Native 研究管理ツール',
    description:
      'Dada は、AI を活用した研究プロジェクト管理ツールです。実験追跡、データ分析、論文管理を統合し、研究ワークフローを効率化します。',
    color: 'purple' as const,
  },
  {
    name: 'Mailrs',
    tagline: 'AI-Native メールクライアント',
    description:
      'Mailrs は、AI によるスマートな分類、要約、返信提案を備えた次世代メールクライアントです。メールコミュニケーションの生産性を飛躍的に向上させます。',
    color: 'emerald' as const,
  },
]

const COLOR_MAP = {
  blue: {
    bg: 'bg-blue-600',
    badge: 'bg-blue-500/20 text-blue-100',
    hover: 'hover:bg-blue-500',
  },
  purple: {
    bg: 'bg-purple-600',
    badge: 'bg-purple-500/20 text-purple-100',
    hover: 'hover:bg-purple-500',
  },
  emerald: {
    bg: 'bg-emerald-600',
    badge: 'bg-emerald-500/20 text-emerald-100',
    hover: 'hover:bg-emerald-500',
  },
}

function ProductSection() {
  return (
    <section className="bg-blue-600 px-6 py-20" id="products">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-sm font-medium tracking-widest text-blue-200 uppercase">
          Products
        </h2>
        <h3 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          Nudo をベースにした AI パートナー
        </h3>
        <p className="mx-auto mb-16 max-w-2xl text-center text-base leading-relaxed text-blue-100">
          Nudo は、AI エージェントパートナーのシミュレーションに焦点を当てた先進的な AI
          エージェントプラットフォームです。人間のように考え、対話し、協力する AI
          パートナーを実現します。
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((product) => {
            const colors = COLOR_MAP[product.color]
            return (
              <div
                className={`${colors.bg} group rounded-2xl p-6 transition-all ${colors.hover}`}
                key={product.name}
              >
                <span
                  className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}
                >
                  {product.name}
                </span>
                <h4 className="mb-2 text-lg font-semibold text-white">{product.tagline}</h4>
                <p className="mb-4 text-sm leading-relaxed text-white/80">{product.description}</p>
                <Button
                  className="bg-transparent text-white/90 hover:bg-transparent hover:text-white"
                  iconRight={<ArrowRight className="h-4 w-4" />}
                  variant="ghost"
                >
                  Learn more
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const members = [
    { name: 'Bambi', role: 'Founder & CEO', emoji: '🦌' },
    { name: 'Hachi', role: 'CTO', emoji: '🐕' },
    { name: 'Kuma', role: 'Lead Engineer', emoji: '🐻' },
    { name: 'Neko', role: 'Designer', emoji: '🐱' },
  ]

  return (
    <section className="px-6 py-20" id="team">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-fg-muted mb-4 text-center text-sm font-medium tracking-widest uppercase">
          Team
        </h2>
        <h3 className="text-fg mb-12 text-center text-3xl font-bold">チーム紹介</h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <Card className="items-center" key={m.name}>
              <CardContent className="flex flex-col items-center">
                <div className="bg-bg-secondary mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl">
                  {m.emoji}
                </div>
                <h4 className="text-fg text-sm font-semibold">{m.name}</h4>
                <p className="text-fg-muted text-xs">{m.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResearchSection() {
  const papers = [
    {
      title: 'AI パートナーにおける人格モデリング手法の提案',
      venue: 'Workshop on AI Agents, 2025',
    },
    {
      title: 'マルチモーダル対話における感情認識の改善',
      venue: 'ACL 2025 (under review)',
    },
    {
      title: 'エージェント協業フレームワークの設計と評価',
      venue: 'NeurIPS 2024 Workshop',
    },
  ]

  return (
    <section className="bg-bg-secondary px-6 py-20" id="research">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-fg-muted mb-4 text-center text-sm font-medium tracking-widest uppercase">
          Research
        </h2>
        <h3 className="text-fg mb-12 text-center text-3xl font-bold">関連研究</h3>

        <div className="space-y-4">
          {papers.map((p) => (
            <Card key={p.title} padding="sm">
              <CardContent>
                <h4 className="text-fg mb-1 text-sm font-semibold">{p.title}</h4>
                <p className="text-fg-muted text-xs">{p.venue}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CareersSection() {
  const positions = [
    { title: 'フルスタックエンジニア', type: '正社員', location: '東京' },
    { title: 'AI リサーチャー', type: '正社員', location: '東京 / リモート' },
    { title: 'プロダクトデザイナー', type: '正社員', location: '東京' },
  ]

  return (
    <section className="px-6 py-20" id="careers">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-fg-muted mb-4 text-center text-sm font-medium tracking-widest uppercase">
          Careers
        </h2>
        <h3 className="text-fg mb-4 text-center text-3xl font-bold">採用情報</h3>
        <p className="text-fg-muted mx-auto mb-12 max-w-lg text-center text-sm">
          AI の未来を一緒に創りましょう。東京を拠点に、世界を変えるプロダクトを開発しています。
        </p>

        <div className="space-y-3">
          {positions.map((pos) => (
            <Card className="flex-row items-center justify-between" key={pos.title} padding="sm">
              <CardContent>
                <h4 className="text-fg text-sm font-semibold">{pos.title}</h4>
                <p className="text-fg-muted text-xs">
                  {pos.type} ・ {pos.location}
                </p>
              </CardContent>
              <Button className="shrink-0 rounded-full" size="sm" variant="primary">
                応募する
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="bg-gray-900 px-6 py-20" id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">お問い合わせ</h2>
        <p className="mb-8 text-sm text-gray-400">
          プロダクトに関するご質問、パートナーシップのご提案、採用に関するお問い合わせなど、お気軽にご連絡ください。
        </p>
        <Button
          className="rounded-full bg-blue-500 hover:bg-blue-400"
          onClick={() => {
            window.location.href = 'mailto:contact@golia.jp'
          }}
          variant="primary"
        >
          contact@golia.jp
        </Button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-border bg-bg border-t px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-fg text-sm font-bold">GOLIA</span>
        <p className="text-fg-muted text-xs">&copy; 2024 GOLIA Inc. All rights reserved.</p>
        <div className="text-fg-muted flex gap-4 text-xs">
          <a className="hover:text-fg" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-fg" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}

export function LandingView() {
  return (
    <div
      className="bg-bg text-fg min-h-screen antialiased"
      data-theme="light"
      style={{
        // override any dark-mode body styles from index.css
        colorScheme: 'light',
      }}
    >
      <Navbar />
      <HeroSection />
      <ProductSection />
      <TeamSection />
      <ResearchSection />
      <CareersSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
