import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type { ClassValue }

export function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
