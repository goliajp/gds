import { useState } from 'react'
import { Badge, Button, IconButton, Input, Divider } from '@goliapkg/gds/primitives'
import { Avatar, CountBadge, Tooltip } from '@goliapkg/gds/atoms'
import { Tabs } from '@goliapkg/gds/molecules'
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Bold,
  Calendar,
  ChevronDown,
  Code,
  Folder,
  Forward,
  Heading,
  Home,
  Image,
  Inbox,
  Italic,
  Link,
  List,
  Mail,
  Minus,
  MoreHorizontal,
  Pencil,
  Plus,
  Quote,
  Reply,
  Search as SearchIcon,
  Settings,
  SlidersHorizontal,
  Square,
  Star,
  Strikethrough,
  Table,
  Trash2,
  Underline,
  X,
} from 'lucide-react'

// -- types --

type EmailItem = {
  id: string
  sender: string
  senderEmail: string
  avatar: string
  avatarColor: string
  time: string
  subject: string
  preview: string
  unread?: number
  starred?: boolean
}

type ConversationEntry = {
  sender: string
  time: string
  preview: string
}

// -- mock data --

const EMAILS: EmailItem[] = [
  {
    id: '1',
    sender: 'カメラのキタムラ',
    senderEmail: 'info@kitamura.jp',
    avatar: 'K',
    avatarColor: 'bg-orange-500',
    time: '12:06',
    subject: '20%引き中☆ 春のカメラフェア開催中',
    preview: '大好評の春キャンペーン！今だけ人気カメラ・レンズが20%OFF。さらにポイント5倍...',
  },
  {
    id: '2',
    sender: 'LG Japan',
    senderEmail: 'newsletter@lg.jp',
    avatar: 'LG',
    avatarColor: 'bg-red-500',
    time: '12:01',
    subject: 'Spring SALE 2026開催中!',
    preview: 'LG OLED テレビ最大30%OFF！新生活応援キャンペーンも同時開催。今すぐチェック...',
  },
  {
    id: '3',
    sender: 'Bing Jian (Jira)',
    senderEmail: 'jira@focusai.atlassian.net',
    avatar: 'BJ',
    avatarColor: 'bg-blue-600',
    time: '11:55',
    subject: '[JIRA] (GOL-453) Remove dead code and fix minor quality issues',
    preview: 'Bing Jian 已添加 1 条新评论',
    unread: 1,
  },
  {
    id: '4',
    sender: 'Bing Jian (Jira)',
    senderEmail: 'jira@focusai.atlassian.net',
    avatar: 'BJ',
    avatarColor: 'bg-blue-600',
    time: '11:46',
    subject: '[JIRA] (GOL-456) Add accessibility labels to navigation',
    preview: 'Bing Jian 已将此工作项的状态更改为 "In Review"',
    unread: 1,
  },
  {
    id: '5',
    sender: 'Bing Jian (Jira)',
    senderEmail: 'jira@focusai.atlassian.net',
    avatar: 'BJ',
    avatarColor: 'bg-blue-600',
    time: '11:40',
    subject: '[JIRA] (GOL-455) Split oversized components into sub-modules',
    preview: 'Bing Jian mentioned this issue in a commit of Focus.AI / web-core...',
  },
  {
    id: '6',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    avatar: 'GH',
    avatarColor: 'bg-gray-700',
    time: '11:32',
    subject: '[goliajp/gds] Pull request #287: feat: add contextual depth system',
    preview: 'doracawl requested your review on this pull request. Changes in 12 files...',
  },
  {
    id: '7',
    sender: 'Slack',
    senderEmail: 'notification@slack.com',
    avatar: 'S',
    avatarColor: 'bg-purple-500',
    time: '11:25',
    subject: 'New messages in #dev-frontend',
    preview: 'Tanaka: @channel The staging deploy is complete. Please test the new...',
  },
  {
    id: '8',
    sender: 'Hi Seoul Hostel',
    senderEmail: 'booking@hiseoul.com',
    avatar: 'HS',
    avatarColor: 'bg-teal-500',
    time: '11:19',
    subject: 'Booking Confirmation #SK-20260412',
    preview: 'Your reservation for Apr 12-15, 2026 has been confirmed. Check-in: 3PM...',
  },
  {
    id: '9',
    sender: '住信SBIネット銀行',
    senderEmail: 'info@netbk.co.jp',
    avatar: 'S',
    avatarColor: 'bg-green-600',
    time: '10:34',
    subject: '振込入金のお知らせ',
    preview: '以下の振込入金がありました。金額: ¥475,343 振込人名義: ゴリアカブシキガイシャ...',
  },
  {
    id: '10',
    sender: '楽天スーパーDEAL',
    senderEmail: 'deal@rakuten.co.jp',
    avatar: 'R',
    avatarColor: 'bg-red-600',
    time: '10:32',
    subject: '本日限定！最大50%ポイントバック',
    preview: '人気のガジェット・家電がお買い得。楽天スーパーDEAL限定ポイントバック...',
  },
  {
    id: '11',
    sender: 'AWS',
    senderEmail: 'no-reply@aws.amazon.com',
    avatar: 'A',
    avatarColor: 'bg-amber-600',
    time: '09:45',
    subject: 'Your March 2026 AWS Bill is available',
    preview: 'Your total charges for March 2026: $127.43. View your bill in the AWS...',
  },
  {
    id: '12',
    sender: 'Vercel',
    senderEmail: 'notifications@vercel.com',
    avatar: 'V',
    avatarColor: 'bg-black',
    time: '09:12',
    subject: 'Deployment succeeded: gds-web-2f8a3c1',
    preview: 'Your project gds-web was deployed to production. Preview: https://gds...',
  },
  {
    id: '13',
    sender: 'Google Calendar',
    senderEmail: 'calendar@google.com',
    avatar: 'G',
    avatarColor: 'bg-blue-500',
    time: '08:00',
    subject: 'Reminder: Sprint Planning at 10:00',
    preview: 'Sprint Planning - Q2 Week 2. Location: Google Meet. Attendees: Li Hao...',
  },
  {
    id: '14',
    sender: 'Apple',
    senderEmail: 'no_reply@apple.com',
    avatar: '',
    avatarColor: 'bg-gray-500',
    time: 'Yesterday',
    subject: 'Your receipt from Apple',
    preview: 'Apple ID: lihao@golia.jp. Billed to: Visa ****4523. iCloud+ 2TB: ¥1,300...',
  },
]

const CONVERSATION: ConversationEntry[] = [
  {
    sender: 'Bing Jian (Jira)',
    time: '11:40',
    preview:
      'Bing Jian mentioned this issue in a commit of Focus.AI / web-core / mobile-app on branch develop: "Merge branch \'feature/GOL-453-menu-type-fix\' into develop"',
  },
  {
    sender: 'Bing Jian (Jira)',
    time: '11:55',
    preview:
      'Bing Jian 已添加 1 条新评论: "GOLIA K.K. mentioned this issue in a commit of Focus.AI / web-core / mobile-app on branch develop"',
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'starred', label: 'Starred' },
  { id: 'sent', label: 'Sent' },
  { id: 'action', label: 'Action 495' },
  { id: 'spam', label: 'Spam' },
]

const ACCOUNT_SHORTCUTS = [
  { label: 'dsd', color: 'bg-info' },
  { label: 'gol', color: 'bg-success' },
  { label: 'gol', color: 'bg-violet-500' },
]

// -- icon sidebar --

function IconSidebar() {
  const [active, setActive] = useState('inbox')

  const topIcons = [
    { id: 'inbox', icon: Inbox, badge: 2 },
    { id: 'home', icon: Home },
    { id: 'calendar', icon: Calendar },
    { id: 'folder', icon: Folder },
    { id: 'mail', icon: Mail },
  ]

  return (
    <aside className="border-border bg-bg-secondary flex w-[50px] shrink-0 flex-col items-center border-r py-2">
      <div className="flex flex-1 flex-col items-center gap-1">
        {topIcons.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <span key={item.id} className="relative">
              <IconButton
                onClick={() => setActive(item.id)}
                icon={<Icon size={18} />}
                className={isActive ? 'bg-accent/15 text-accent' : undefined}
              />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-danger text-on-danger absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </span>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-1.5 pb-1">
        {ACCOUNT_SHORTCUTS.map((acct, i) => (
          <Tooltip key={i} content={acct.label} placement="right">
            <Avatar name={acct.label} size="xs" className={acct.color} />
          </Tooltip>
        ))}
        <Divider className="my-1 w-6" />
        <IconButton icon={<Settings size={16} />} tooltip="Settings" />
        <Avatar name="LI HAO" size="xs" />
      </div>
    </aside>
  )
}

// -- email list panel --

function EmailListPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (id: string) => void
}) {
  const [filterTab, setFilterTab] = useState('all')

  return (
    <div className="border-border bg-bg flex w-[320px] shrink-0 flex-col border-r">
      {/* header */}
      <div className="border-border flex h-11 shrink-0 items-center gap-2 border-b px-3">
        <Input
          placeholder="Search..."
          inputSize="sm"
          icon={<SearchIcon size={14} />}
          className="flex-1 text-xs"
        />
        <IconButton variant="ghost" size="sm" icon={<Pencil size={14} />} />
        <IconButton variant="ghost" size="sm" icon={<SlidersHorizontal size={14} />} />
        <IconButton variant="ghost" size="sm" icon={<MoreHorizontal size={14} />} />
      </div>

      {/* filter tabs */}
      <div className="border-border flex shrink-0 flex-wrap items-center gap-1 border-b px-3 py-1.5">
        {FILTER_TABS.map((tab) => {
          const isActive = filterTab === tab.id
          let colorCls = 'bg-bg-tertiary text-fg-muted hover:text-fg'
          if (isActive && tab.id === 'unread') colorCls = 'bg-info/15 text-info'
          else if (isActive && tab.id === 'starred') colorCls = 'bg-success/15 text-success'
          else if (isActive && tab.id === 'sent') colorCls = 'bg-accent/15 text-accent'
          else if (isActive && tab.id === 'spam') colorCls = 'bg-danger/15 text-danger'
          else if (isActive) colorCls = 'bg-accent/15 text-accent'

          return (
            <Button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              variant="ghost"
              size="sm"
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${colorCls}`}
            >
              {tab.label}
            </Button>
          )
        })}
      </div>

      {/* email list */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-fg-muted px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase">
          Today
        </div>
        {EMAILS.map((email) => {
          const isSelected = email.id === selectedId
          return (
            <Button
              key={email.id}
              onClick={() => onSelect(email.id)}
              variant="ghost"
              className={`flex h-auto w-full gap-2.5 rounded-none px-3 py-2 text-left transition-colors ${
                isSelected
                  ? 'bg-accent/10 border-accent border-l-2'
                  : 'hover:bg-bg-secondary border-l-2 border-transparent'
              }`}
            >
              <Avatar
                name={email.avatar !== '' ? email.sender : '?'}
                size="sm"
                className={`${email.avatarColor} mt-0.5`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-fg truncate text-xs font-semibold">{email.sender}</span>
                  <span className="text-fg-muted shrink-0 text-[10px]">{email.time}</span>
                </div>
                <div className="text-fg truncate text-[11px] font-medium">{email.subject}</div>
                <div className="text-fg-muted truncate text-[10px]">{email.preview}</div>
              </div>
              {email.unread !== undefined && email.unread > 0 && (
                <div className="mt-1 shrink-0">
                  <CountBadge count={email.unread} variant="accent" />
                </div>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

// -- email detail panel --

function EmailDetailPanel() {
  const [replyTab, setReplyTab] = useState('reply')

  return (
    <div className="bg-bg flex min-w-0 flex-1 flex-col">
      {/* subject header */}
      <div className="border-border flex h-11 shrink-0 items-center gap-2 border-b px-4">
        <span className="text-fg min-w-0 flex-1 truncate text-sm font-semibold">
          [JIRA] (GOL-453) Remove dead code and fix minor quality issues &nbsp;
          <Badge variant="info" className="text-[10px]">
            2/2
          </Badge>
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <IconButton variant="ghost" size="sm" icon={<Archive size={14} />} />
          <IconButton variant="ghost" size="sm" icon={<Trash2 size={14} />} />
          <IconButton variant="ghost" size="sm" icon={<Star size={14} />} />
          <IconButton variant="ghost" size="sm" icon={<Forward size={14} />} />
          <IconButton variant="ghost" size="sm" icon={<Reply size={14} />} />
          <IconButton variant="ghost" size="sm" icon={<X size={14} />} />
        </div>
      </div>

      {/* email body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* sender info */}
        <div className="mb-4 flex items-start gap-3">
          <Avatar name="Bing Jian" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-fg text-sm font-semibold">Bing Jian (Jira)</span>
            </div>
            <div className="text-fg-muted text-xs">jira@focusai.atlassian.net</div>
            <div className="text-fg-muted text-[11px]">
              to lihao &middot; 2026年4月4日 周六 11:55
            </div>
          </div>
          <div className="text-fg-muted flex items-center gap-1">
            <IconButton variant="ghost" size="sm" icon={<ArrowLeft size={12} />} />
            <IconButton variant="ghost" size="sm" icon={<ArrowRight size={12} />} />
          </div>
        </div>

        {/* email content */}
        <div className="text-fg space-y-4 text-sm leading-relaxed">
          <p>Bing Jian 已添加 1 条新评论</p>
          <Divider />

          {/* jira card */}
          <div className="border-border bg-bg-secondary rounded-lg border p-4">
            <div className="text-fg-muted mb-1 text-[11px]">Golia MobileApp / GOL-453</div>
            <a href="#" className="text-accent text-sm font-semibold hover:underline">
              Remove dead code and fix minor quality issues
            </a>

            <div className="mt-3 flex items-center gap-2">
              <Avatar name="Bing Jian" size="sm" />
              <div>
                <span className="text-fg text-xs font-medium">Bing Jian</span>
                <span className="text-fg-muted text-xs"> 日本时间 11:50</span>
              </div>
            </div>

            <p className="text-fg mt-3 text-xs">
              GOLIA K.K. mentioned this issue in a commit of Focus.AI / web-core / mobile-app on
              branch <code className="text-accent">develop</code>:
            </p>

            <div className="border-border bg-bg border-l-accent mt-2 rounded border-l-2 px-3 py-2 text-xs">
              <code className="text-fg-muted">
                Merge branch &apos;feature/GOL-453-menu-type-fix&apos; into develop
              </code>
            </div>
          </div>

          {/* reactions */}
          <div className="flex items-center gap-2">
            <span className="text-fg-muted text-xs">回复</span>
            <div className="flex gap-1">
              {['👍', '🔥', '❤️', '👏'].map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  className="border-border border text-sm"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>

          {/* cta button */}
          <div>
            <Button variant="primary" size="sm">
              查看工作项
            </Button>
          </div>

          {/* footer */}
          <div className="text-fg-muted space-y-1 text-[10px]">
            <p>This message was sent by Atlassian Jira (v9.12.4#9120004)</p>
            <p>
              Get Jira on your phone ·{' '}
              <a href="#" className="text-accent hover:underline">
                Manage notifications
              </a>{' '}
              ·{' '}
              <a href="#" className="text-accent hover:underline">
                Unsubscribe
              </a>
            </p>
          </div>

          <Divider />

          <div className="text-fg-muted flex items-center gap-2 text-[11px]">
            <Square size={12} />
            <span>Preview in clients</span>
          </div>
        </div>
      </div>

      {/* reply area */}
      <div className="border-border shrink-0 border-t">
        {/* reply tabs */}
        <div className="flex items-center gap-1 px-4 pt-2">
          <Tabs
            tabs={[
              { id: 'forward', label: 'Forward' },
              { id: 'reply', label: 'Reply' },
              { id: 'reply-all', label: 'Reply All' },
            ]}
            active={replyTab}
            onChange={setReplyTab}
            size="sm"
            variant="pills"
          />
        </div>

        <div className="text-fg-muted px-4 py-1 text-[11px]">to jira@focusai.atlassian.net</div>

        {/* toolbar */}
        <div className="border-border flex flex-wrap items-center gap-0.5 border-t px-3 py-1">
          {[
            { icon: Bold, label: 'Bold' },
            { icon: Italic, label: 'Italic' },
            { icon: Underline, label: 'Underline' },
            { icon: Strikethrough, label: 'Strikethrough' },
            { icon: Code, label: 'Code' },
            { icon: Heading, label: 'Heading' },
            { icon: Quote, label: 'Quote' },
            { icon: List, label: 'List' },
            { icon: Link, label: 'Link' },
            { icon: Image, label: 'Image' },
            { icon: Table, label: 'Table' },
            { icon: Minus, label: 'Divider' },
          ].map((tool) => {
            const Icon = tool.icon
            return (
              <Tooltip key={tool.label} content={tool.label}>
                <IconButton variant="ghost" size="sm" icon={<Icon size={13} />} />
              </Tooltip>
            )
          })}
        </div>

        {/* compose area */}
        <div className="px-4 py-2">
          <div className="text-fg-muted border-border min-h-[60px] rounded-md border bg-transparent p-2 text-sm">
            Type a reply...
          </div>
          <div className="text-fg-muted flex items-center gap-1 text-xs">
            <ChevronDown size={12} />
            <span>Show original</span>
          </div>
        </div>

        {/* add block + send */}
        <div className="flex items-center justify-between px-4 pb-3">
          <Button variant="ghost" size="sm">
            <Plus size={12} />
            Add block
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-accent">
              Suggest
            </Button>
            <Button variant="ghost" size="sm" className="text-accent">
              Polish
            </Button>
            <Button variant="ghost" size="sm" className="text-accent">
              Pro
            </Button>
            <Button variant="primary" size="sm">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// -- conversation sidebar --

function ConversationSidebar() {
  return (
    <div className="border-border bg-bg-secondary flex w-[280px] shrink-0 flex-col border-l">
      {/* header */}
      <div className="border-border flex h-11 shrink-0 items-center justify-between border-b px-3">
        <span className="text-fg text-xs font-semibold">Conversation ({CONVERSATION.length})</span>
        <span className="text-fg-muted text-[10px]">Today</span>
      </div>

      {/* entries */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {CONVERSATION.map((entry, i) => (
            <div key={i} className="border-border bg-bg rounded-lg border p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name="Bing Jian" size="xs" />
                  <span className="text-fg text-[11px] font-medium">{entry.sender}</span>
                </div>
                <span className="text-fg-muted text-[10px]">{entry.time}</span>
              </div>
              <p className="text-fg-muted line-clamp-3 text-[11px] leading-relaxed">
                {entry.preview}
              </p>
              <Button variant="ghost" size="sm" className="text-accent mt-1 h-auto p-0 text-[11px]">
                show more
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// -- status bar --

function StatusBar() {
  return (
    <div className="border-border bg-bg-secondary flex h-7 shrink-0 items-center justify-between border-t px-3 text-[10px]">
      <div className="flex items-center gap-2">
        <Tabs
          tabs={[
            { id: 'pg', label: 'PG' },
            { id: 'valley', label: 'Valley' },
            { id: 'mail', label: 'Mail' },
          ]}
          active="mail"
          onChange={() => {}}
          size="sm"
          variant="pills"
        />
      </div>
      <div className="text-fg-muted flex items-center gap-2">
        <span>lihao@golia.jp</span>
        <span className="text-border">|</span>
        <span>
          <span className="text-info">↓ 1</span>
        </span>
        <span className="text-border">|</span>
        <span>
          <span className="text-warning">▲ 2</span>
        </span>
      </div>
    </div>
  )
}

// -- main view --

export function EmailView() {
  const [selectedEmailId, setSelectedEmailId] = useState('3')

  return (
    <div className="bg-bg flex h-screen flex-col">
      <div className="flex min-h-0 flex-1">
        <IconSidebar />
        <EmailListPanel selectedId={selectedEmailId} onSelect={setSelectedEmailId} />
        <EmailDetailPanel />
        <ConversationSidebar />
      </div>
      <StatusBar />
    </div>
  )
}
