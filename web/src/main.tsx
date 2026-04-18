import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { AppLayout } from './app'
import { HomeView } from './views/home'
import { LabsView } from './views/labs'
import { PrinciplesView } from './views/principles'
import { ResearchesView } from './views/researches'
import { ThinkingsView } from './views/thinkings'

// apply persisted theme before render to avoid FOUC
const saved = localStorage.getItem('theme-mode') ?? 'system'
const resolved =
  saved === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : saved
document.documentElement.dataset.theme = resolved

const router = createBrowserRouter([
  {
    children: [
      { element: <HomeView />, index: true },
      { element: <PrinciplesView />, path: 'principles' },
      { element: <ResearchesView />, path: 'researches' },
      { element: <ThinkingsView />, path: 'thinkings' },
      { element: <LabsView />, path: 'labs' },
    ],
    element: <AppLayout />,
    path: '/',
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
