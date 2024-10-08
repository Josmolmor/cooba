'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useUser } from '@/lib/auth'
import { disableEvent } from '@/lib/db/actions/events'

export default function DeleteEventButton({
    ownerId,
    eventId,
}: {
    ownerId: number | null
    eventId: number
}) {
    const { user } = useUser()

    // button visible only for creator of event
    if (user?.id !== ownerId) return

    return (
        <Button
            className="p-2.5"
            variant="outline"
            onClick={() => disableEvent(eventId)}
        >
            <Trash2 size={16} />
        </Button>
    )
}
