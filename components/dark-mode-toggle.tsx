'use client' // To use client-side state and effects

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const darkModePreference =
            localStorage.getItem('cooba-theme') === 'dark'
        if (
            darkModePreference ||
            (!('cooba-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
            setIsDarkMode(true)
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.toggle('dark')
        setIsDarkMode(isDark)
        localStorage.setItem('cooba-theme', isDark ? 'dark' : 'light')
    }

    return (
        <button onClick={toggleDarkMode} className="p-1">
            {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
        </button>
    )
}
