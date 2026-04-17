import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { AppLayout } from './app'
import { HomeView } from './views/home'

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
    children: [{ element: <HomeView />, index: true }],
    element: <AppLayout />,
    path: '/',
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
