import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isSurveyActive = (start?: Date, end?: Date): boolean => {
  if (!start && !end) {
    return true
  }

  const now = Date.now()
  const mStart = start ? new Date(start).getTime() : null
  const mEnd = end ? new Date(end).getTime() : null
  if (mStart && mStart < now) {
    if (!mEnd) {
      return true
    }
    if (mEnd > now) {
      return true
    }
  }
  if (mEnd && mEnd > now) {
    if (!mStart) {
      return true
    }
    if (mStart < now) {
      return true
    }
  }
  return false
}