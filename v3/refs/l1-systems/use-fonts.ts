// use-fonts — auto-inject CJK font links into document head
// call once in app root to enable full CJK support (SC, JP, KR)
// latin fonts are loaded via fonts.css (self-hosted woff2)

import { useEffect } from 'react'

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap'

const PRECONNECT_URLS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
]

const MARKER_ID = 'gds-cjk-fonts'

/** Auto-inject CJK font <link> tags. Call once at app root alongside useThemeEffect(). */
export function useFonts(): void {
  useEffect(() => {
    if (typeof document === 'undefined') return
    // skip if already injected
    if (document.getElementById(MARKER_ID) !== null) return

    const head = document.head

    // preconnect links
    for (const url of PRECONNECT_URLS) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = url
      if (url.includes('gstatic')) {
        link.crossOrigin = 'anonymous'
      }
      link.setAttribute('data-gds', 'font-preconnect')
      head.appendChild(link)
    }

    // stylesheet link
    const stylesheet = document.createElement('link')
    stylesheet.id = MARKER_ID
    stylesheet.rel = 'stylesheet'
    stylesheet.href = GOOGLE_FONTS_URL
    stylesheet.setAttribute('data-gds', 'cjk-fonts')
    head.appendChild(stylesheet)
  }, [])
}
