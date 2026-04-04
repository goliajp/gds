// cx — class merging utility
// wraps clsx + tailwind-merge
// this is the ONLY place clsx and tailwind-merge are imported

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...inputs: Parameters<typeof clsx>): string {
  return twMerge(clsx(inputs))
}
