import './index.css'

import { loadPersistedTheme, resolveThemeCssVars } from '@goliapkg/gds/systems'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

import { AppLayout } from './app'
import { HomeView } from './views/home'

// pre-render theme to avoid FOUC
const saved = loadPersistedTheme()
if (saved) {
  const mode =
    saved.mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : saved.mode
  const vars = resolveThemeCssVars(saved, mode as 'dark' | 'light')
  const root = document.documentElement
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v as string)
  root.dataset.theme = mode
}

const router = createBrowserRouter([
  {
    children: [
      { element: <HomeView />, index: true },
      {
        path: 'compare',
        lazy: () => import('./views/compare').then((m) => ({ Component: m.CompareView })),
      },
      {
        path: 'audit-log',
        lazy: () => import('./views/audit-log').then((m) => ({ Component: m.AuditLogView })),
      },
      {
        path: 'lesson-viewer',
        lazy: () =>
          import('./views/lesson-viewer').then((m) => ({ Component: m.LessonViewerView })),
      },
      {
        path: 'devops',
        lazy: () =>
          import('./views/devops-overview').then((m) => ({ Component: m.DevOpsOverviewView })),
      },
      {
        path: 'devops/analytics',
        lazy: () =>
          import('./views/devops-analytics').then((m) => ({ Component: m.DevOpsAnalyticsView })),
      },
      {
        path: 'devops/wiki',
        lazy: () => import('./views/devops-wiki').then((m) => ({ Component: m.DevOpsWikiView })),
      },
      {
        path: 'file-manager',
        lazy: () => import('./views/file-manager').then((m) => ({ Component: m.FileManagerView })),
      },
      {
        path: 'admin-dashboard',
        lazy: () =>
          import('./views/admin-dashboard').then((m) => ({ Component: m.AdminDashboardView })),
      },
      {
        path: 'dada/dashboard',
        lazy: () =>
          import('./views/dada-dashboard').then((m) => ({ Component: m.DadaDashboardView })),
      },
      {
        path: 'dada/roadmap',
        lazy: () => import('./views/dada-roadmap').then((m) => ({ Component: m.DadaRoadmapView })),
      },
      {
        path: 'landing',
        lazy: () => import('./views/landing').then((m) => ({ Component: m.LandingView })),
      },
      {
        path: 'email',
        lazy: () => import('./views/email').then((m) => ({ Component: m.EmailView })),
      },
      { element: <Navigate replace to="/" />, path: '*' },
    ],
    element: <AppLayout />,
    path: '/',
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 60_000,
      retry: 1,
      staleTime: 30_000,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
