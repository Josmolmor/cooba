'use client'

import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark')
        isDark
            ? document.documentElement.style.setProperty('color-scheme', 'dark')
            : document.documentElement.style.removeProperty('color-scheme')
        // setting SameSite property to satisfy relevant console warning. Use SameSite=None if site relies on cross-site requests
        document.cookie = `cooba-theme=${isDark ? 'dark' : 'light'}; SameSite=Lax; Path=/;`
    }

    return (
        <button onClick={toggleTheme} className="">
            <Sun size={32} className="hidden dark:block animate-in spin-in" />
            <Moon size={32} className="block dark:hidden animate-in spin-in" />
        </button>
    )
}
