import './styles.css'

import { applyDefaultCssVars } from '@gds/l0-tokens/generate-defaults'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { App } from './app'

// inject CSS vars BEFORE React render — no flash of unstyled content
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
applyDefaultCssVars(document.documentElement, prefersDark ? 'dark' : 'light')

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
