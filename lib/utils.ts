import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isObjectEmpty = (objectName: Record<string, unknown>) => {
    return (
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    )
}

export const formatDateForInputDatetimeLocal = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function getUsernameFromEmail(email: string): string {
    const atIndex = email.indexOf('@')
    if (atIndex === -1) {
        throw new Error('Invalid email address')
    }
    return email.substring(0, atIndex)
}
