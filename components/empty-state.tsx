'use client'

import { Button } from '@/components/ui/button'
import { BoxSelect } from 'lucide-react'
import { useModal } from '@/context/modal'

export default function EmptyState({
    name = 'event',
    className,
}: {
    name: string
    className?: string
}) {
    const { openModal } = useModal()

    const handleEmptyStateButtonClick = () => {
        switch (name) {
            case 'expense': {
                openModal('new_expense')
                break
            }
            case 'event':
            default: {
                openModal('new_event')
                break
            }
        }
    }

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-[320px] text-center p-4 bg-card border rounded-lg ${className}`}
        >
            <BoxSelect className="h-12 w-12 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No {name}s yet</h3>
            <p className="text-sm mb-4 max-w-sm">
                Get started by adding your first {name}. You can add as many as
                you need.
            </p>
            <Button className="sm:w-auto" onClick={handleEmptyStateButtonClick}>
                Add {name}
            </Button>
        </div>
    )
}
