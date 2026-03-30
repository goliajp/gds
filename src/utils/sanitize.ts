// anti-corruption wrapper — HTML sanitization
// L5 components import from here, never directly from dompurify
// consumers who don't use EmailThread don't need dompurify installed

import DOMPurify, { type Config } from 'dompurify'

export type SanitizeConfig = Config

// pre-configured sanitizer for email HTML rendering
const EMAIL_SANITIZE_CONFIG: SanitizeConfig = {
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
  ADD_ATTR: ['style', 'align', 'bgcolor', 'target', 'rel'],
  RETURN_TRUSTED_TYPE: false,
}

export function sanitizeEmailHtml(html: string): string {
  return DOMPurify.sanitize(html, EMAIL_SANITIZE_CONFIG) as string
}

export function sanitizeHtml(html: string, config?: SanitizeConfig): string {
  return DOMPurify.sanitize(html, {
    ...config,
    RETURN_TRUSTED_TYPE: false,
  }) as string
}

export { EMAIL_SANITIZE_CONFIG }
