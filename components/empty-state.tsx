'use client'

import { Button } from '@/components/ui/button'
import { BoxSelect, Edit, Plus } from 'lucide-react'
import { useModal } from '@/context/modal'
import { EventMembers } from '@/lib/db/queries/users'

export default function EmptyState({
    name = 'event',
    members = [],
    className,
}: {
    name: string
    members?: EventMembers[]
    className?: string
}) {
    const { openModal } = useModal()

    const handleEmptyStateButtonClick = () => {
        switch (name) {
            case 'expense': {
                openModal('new_expense', undefined, undefined, undefined, {
                    members,
                })
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
            <BoxSelect className="h-12 w-12 mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg mb-2">
                No {name}s registered yet
            </h3>
            <p className="text-sm mb-4 max-w-sm text-muted-foreground">
                Get started by adding your first {name}. You can add as many as
                you need.
            </p>
            <Button className="sm:w-auto" onClick={handleEmptyStateButtonClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add {name}
            </Button>
        </div>
    )
}
