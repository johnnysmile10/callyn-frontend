import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function date2Str(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: "short",
    day: '2-digit',
  })
}