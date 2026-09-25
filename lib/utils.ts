import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function titleFromDelims(
  input?: string | null,
  locale?: string,
): string {
  if (!input) return ""

  return input
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((word) => {
      const chars = Array.from(word)
      if (chars.length === 0) return ""

      const first = locale
        ? chars[0].toLocaleUpperCase(locale)
        : chars[0].toUpperCase()

      const rest = chars.slice(1).join("").toLowerCase()
      return first + rest
    })
    .join(" ")
}

