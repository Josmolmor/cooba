'use client'

import EmptyState from '@/components/empty-state'
import { useActionState, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ActionState } from '@/lib/auth/middleware'
import { addEvent } from './actions'
import { Loader2 } from 'lucide-react'

export default function EventForm() {
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)

    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        addEvent,
        { error: '' }
    )

    return (
        <>
            <EmptyState
                name="event"
                className="mr-auto"
                onClick={() => setIsAddEventOpen(!isAddEventOpen)}
            />
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <form action={formAction} className="flex flex-col gap-6">
                        <div className="">
                            <Label htmlFor="event-title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                className=""
                                type="text"
                                placeholder="Event title"
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="event-date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                required
                                className=""
                            />
                        </div>
                        {state?.error && (
                            <p className="text-red-500 text-sm">
                                {state.error}
                            </p>
                        )}
                        <Button type="submit" disabled={pending}>
                            {pending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Loading...
                                </>
                            ) : (
                                'Add event'
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
