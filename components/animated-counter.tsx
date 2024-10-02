'use client'

import { useState, useEffect } from 'react'

const AnimatedCounter = ({ targetValue }: { targetValue: number }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const duration = targetValue * 5
        const stepTime = Math.abs(duration / targetValue)
        let startTime = null

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime

            // Calculate the new count based on the elapsed time
            const newCount = Math.min(
                parseFloat((progress / stepTime).toFixed(2)), // Use parseFloat to handle decimal
                targetValue
            )

            setCount(newCount)

            if (progress < duration) {
                requestAnimationFrame(animateCount)
            }
        }

        requestAnimationFrame(animateCount)
    }, [targetValue])

    return (
        <div className="text-2xl font-bold animate-in fade-in-0 duration-1000">
            {count.toFixed(2)}
        </div>
    )
}

export default AnimatedCounter
