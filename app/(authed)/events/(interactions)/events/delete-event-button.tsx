'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useUser } from '@/lib/auth'
import { disableEvent } from '@/lib/db/actions/events'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export default function DeleteEventButton({
    ownerId,
    eventId,
}: {
    ownerId: number | null
    eventId: number
}) {
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    // button visible only for creator of event
    if (user?.id !== ownerId) return null

    const handleDelete = async () => {
        await disableEvent(eventId)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="p-2.5 w-auto" variant="outline">
                            <Trash2 size={16} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Disable event</p>
                    </TooltipContent>
                </Tooltip>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Event</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this event? This action
                        cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
