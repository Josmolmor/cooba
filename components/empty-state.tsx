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
    const { toggleModal } = useModal()

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-[400px] text-center p-4 bg-muted/0 rounded-lg ${className}`}
        >
            <BoxSelect className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No {name}s yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Get started by adding your first {name}. You can add as many as
                you need.
            </p>
            <Button onClick={toggleModal}>Add {name}</Button>
        </div>
    )
}
