import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(value)
}


export const formatDate = (date: string | Date | undefined) => {
  return date ? new Date(date).toLocaleDateString('en-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : "N/A"
}

//  how many days between two dates
export const daysBetween = (date1: string, date2: string) => {
  if (date1 && date2) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diff = Math.abs(d1.getTime() - d2.getTime())
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  } else {
    return 0
  }
}
