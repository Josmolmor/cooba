'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/context/modal'
import { Plus } from 'lucide-react'

export default function NewEventButton() {
    const { openModal } = useModal()

    return (
        <Button onClick={() => openModal('new_event')} className="w-auto">
            <>
                <Plus className="-ml-1 mr-2 h-4 w-4" />
                Add event
            </>
        </Button>
    )
}
