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
