import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function convertEmailToUserid(email : string | null | undefined){
    if (email) return email.split('@')[0]
    return ''
}

export function twClassMerge(...inputs: ClassValue[]){
    return twMerge(clsx(inputs))
}